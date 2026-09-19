from dotenv import load_dotenv
from pathlib import Path
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import os
import logging
import random
import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import FastAPI, APIRouter, HTTPException
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="Fortune Ox Slots")
api_router = APIRouter(prefix="/api")
logging.basicConfig(level=logging.INFO)

class SessionInit(BaseModel):
    session_id: Optional[str] = None
    balance: Optional[float] = None
    user_ref: Optional[str] = None

class SpinInput(BaseModel):
    session_id: str
    bet_multiplier: int = Field(default=1, ge=1, le=4)

SYMBOLS = ["orange", "coin", "envelope", "firecracker", "ingot", "bag", "wild"]
SYMBOL_META = {
    "orange": {"emoji": "🍊", "name": "Orange", "value": "5x"},
    "coin": {"emoji": "🪙", "name": "Lucky Coin", "value": "8x"},
    "envelope": {"emoji": "🧧", "name": "Red Envelope", "value": "10x"},
    "firecracker": {"emoji": "🎆", "name": "Firecracker", "value": "12x"},
    "ingot": {"emoji": "💰", "name": "Gold Ingot", "value": "15x"},
    "bag": {"emoji": "🎁", "name": "Fortune Bag", "value": "20x"},
    "wild": {"emoji": "🐂", "name": "OX WILD", "value": "50x"},
}

def base_bet_for_balance(balance: float) -> int:
    if balance >= 4000: return 40
    if balance >= 3000: return 30
    if balance >= 2000: return 20
    if balance >= 1000: return 10
    return 5

def determine_win_multiplier(spin_count: int) -> float:
    if spin_count % 16 == 0: return 50.0
    if spin_count % 8 == 0: return 15.0
    if spin_count % 2 == 0: return 2.0
    if random.random() < 0.6:
        return random.choice([1.0, 1.5, 2.0, 3.0])
    return 0.0

def generate_grid(multiplier: float) -> dict:
    non_wild = [s for s in SYMBOLS if s != "wild"]
    low_syms = ["orange", "coin", "envelope"]
    mid_syms = ["firecracker", "ingot"]
    high_syms = ["bag"]
    if multiplier == 0:
        while True:
            grid = [[random.choice(non_wild) for _ in range(3)] for _ in range(3)]
            if any(row[0] == row[1] == row[2] for row in grid): continue
            if grid[0][0] == grid[1][1] == grid[2][2]: continue
            if grid[0][2] == grid[1][1] == grid[2][0]: continue
            return {"grid": grid, "line": None, "symbol": None, "win_type": None}
    if multiplier >= 50:
        win_symbol, win_type = "wild", "MEGA WIN"
    elif multiplier >= 15:
        win_symbol, win_type = random.choice(high_syms + ["ingot"]), "BIG WIN"
    elif multiplier >= 3:
        win_symbol, win_type = random.choice(mid_syms), "SUPER WIN"
    else:
        win_symbol, win_type = random.choice(low_syms), "WIN"
    grid = [[random.choice(non_wild) for _ in range(3)] for _ in range(3)]
    grid[1] = [win_symbol] * 3
    return {"grid": grid, "line": "middle", "symbol": win_symbol, "win_type": win_type}

async def get_or_create_session(session_id, balance, user_ref):
    if session_id:
        s = await db.slot_sessions.find_one({"session_id": session_id})
        if s:
            if balance is not None and abs(float(s.get("balance", 0)) - float(balance)) > .001:
                await db.slot_sessions.update_one(
                    {"session_id": session_id}, {"$set": {"balance": float(balance)}}
                )
                s["balance"] = float(balance)
            return s
    sid = session_id or str(uuid.uuid4())
    doc = {
        "session_id": sid,
        "balance": float(balance) if balance is not None else 1000.0,
        "spin_count": 0,
        "total_wins": 0,
        "total_won": 0.0,
        "user_ref": user_ref,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.slot_sessions.insert_one(doc)
    return doc

@api_router.get("/game/config")
async def config():
    return {"symbols": SYMBOL_META, "multipliers": [1,2,3,4], "max_win": "2000x"}

@api_router.post("/game/session")
async def init_session(input: SessionInit):
    s = await get_or_create_session(input.session_id, input.balance, input.user_ref)
    return {"session_id": s["session_id"], "balance": s["balance"],
            "spin_count": s["spin_count"], "base_bet": base_bet_for_balance(s["balance"])}

@api_router.get("/game/session/{session_id}")
async def get_session(session_id: str):
    s = await db.slot_sessions.find_one({"session_id": session_id})
    if not s: raise HTTPException(404, "Session not found")
    return {"session_id": s["session_id"], "balance": s["balance"],
            "spin_count": s["spin_count"], "base_bet": base_bet_for_balance(s["balance"])}

@api_router.post("/game/spin")
async def spin(input: SpinInput):
    s = await db.slot_sessions.find_one({"session_id": input.session_id})
    if not s: raise HTTPException(404, "Session not found. Call /game/session first.")
    balance = float(s.get("balance", 0))
    base_bet = base_bet_for_balance(balance)
    bet = base_bet * input.bet_multiplier
    if balance < bet: raise HTTPException(400, "Insufficient balance")
    count = int(s.get("spin_count", 0)) + 1
    multiplier = determine_win_multiplier(count)
    win = round(bet * multiplier, 2)
    net = win - bet
    new_balance = round(balance + net, 2)
    result = generate_grid(multiplier)
    update = {"$set": {"balance": new_balance, "spin_count": count}}
    if win > 0: update["$inc"] = {"total_wins": 1, "total_won": win}
    await db.slot_sessions.update_one({"session_id": input.session_id}, update)
    return {
        "grid": result["grid"], "win_line": result["line"], "win_symbol": result["symbol"],
        "win_type": result["win_type"], "bet": bet, "base_bet": base_bet_for_balance(new_balance),
        "multiplier_applied": input.bet_multiplier, "win_multiplier": multiplier,
        "win_amount": win, "net": net, "balance": new_balance, "spin_count": count,
        "next_milestone": {
            "spins_to_big": 8-(count%8) if count%8 else 8,
            "spins_to_mega": 16-(count%16) if count%16 else 16,
        },
    }

@api_router.post("/game/session/{session_id}/set-balance")
async def set_balance(session_id: str, balance: float):
    res = await db.slot_sessions.update_one({"session_id": session_id},
                                            {"$set": {"balance": float(balance)}})
    if res.matched_count == 0: raise HTTPException(404, "Session not found")
    return {"session_id": session_id, "balance": float(balance)}

@app.on_event("startup")
async def startup():
    await db.slot_sessions.create_index("session_id", unique=True)

@app.on_event("shutdown")
async def shutdown():
    client.close()

@app.get("/")
async def home():
    return {"message": "Fortune Ox Game API is running"}
app.include_router(api_router)

origins = [x.strip() for x in os.environ.get("CORS_ORIGINS", "*").split(",") if x.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=[] if origins == ["*"] else origins,
    allow_origin_regex=".*" if origins == ["*"] else None,
    allow_methods=["*"], allow_headers=["*"], expose_headers=["*"],
)
