import { useEffect, useState, useCallback } from "react";
import "./App.css";

const E = {orange:"🍊",coin:"🪙",envelope:"🧧",firecracker:"🎆",ingot:"💰",bag:"🎁",wild:"🐂"};
const API = process.env.REACT_APP_BACKEND_URL || "http://localhost:8001/api";

async function api(path, options={}) {
  const r = await fetch(API + path, {headers:{"Content-Type":"application/json"}, ...options});
  const data = await r.json();
  if (!r.ok) throw new Error(data.detail || "Request failed");
  return data;
}
function params() {
  const p = new URLSearchParams(location.search);
  return {session_id:p.get("session_id"), balance:p.get("balance") ? Number(p.get("balance")) : null, user_ref:p.get("user_ref")};
}
export default function App() {
  const [sid,setSid]=useState(null),[balance,setBalance]=useState(0),[base,setBase]=useState(5);
  const [mult,setMult]=useState(1),[grid,setGrid]=useState([["orange","coin","envelope"],["firecracker","ingot","bag"],["envelope","orange","coin"]]);
  const [busy,setBusy]=useState(false),[win,setWin]=useState(null),[ready,setReady]=useState(false);
  const [sound,setSound]=useState(true);
  useEffect(()=>{(async()=>{try{const p=params();const d=await api("/game/session",{method:"POST",body:JSON.stringify(p)});setSid(d.session_id);setBalance(d.balance);setBase(d.base_bet);setReady(true)}catch(e){alert(e.message)}})()},[]);
  useEffect(()=>{const f=e=>{if(e.data?.type==="fortune-ox:set-balance")setBalance(Number(e.data.balance))};addEventListener("message",f);return()=>removeEventListener("message",f)},[]);
  const spin=useCallback(async()=>{if(busy||!sid)return;const bet=base*mult;if(balance<bet){alert("Insufficient balance");return}
    setBusy(true);setWin(null);try{const d=await api("/game/spin",{method:"POST",body:JSON.stringify({session_id:sid,bet_multiplier:mult})});setGrid(d.grid);setBalance(d.balance);setBase(d.base_bet);setWin(d);parent!==window&&parent.postMessage({source:"fortune-ox",event:"spin",balance:d.balance,win_amount:d.win_amount,bet:d.bet,spin_count:d.spin_count},"*")}catch(e){alert(e.message)}finally{setBusy(false)}},[busy,sid,base,mult,balance]);
  if(!ready)return <div className="loading">🐂 Loading Fortune Ox…</div>;
  return <div className="app"><div className="cabinet">
    <div className="title">🐂 FORTUNE OX <small>SLOTS</small></div>
    <div className="reels">{grid.flatMap((row,r)=>row.map((s,c)=><div key={r+"-"+c} className="cell">{E[s]}</div>))}</div>
    <div className="win">{win?`${win.win_type || "WIN"} — ${win.win_multiplier}x`: "WIN UP TO 2000x"}</div>
    <div className="stats"><b>Balance<br/>₹{balance.toFixed(2)}</b><b>Bet<br/>₹{(base*mult).toFixed(2)}</b><b>Last Win<br/>₹{(win?.win_amount||0).toFixed(2)}</b></div>
    <div className="controls"><button onClick={()=>setSound(!sound)}>{sound?"🔊":"🔇"}</button><button disabled={busy||mult<=1} onClick={()=>setMult(mult-1)}>−</button><button className="spin" disabled={busy} onClick={spin}>{busy?"…":"↻"}</button><button disabled={busy||mult>=4} onClick={()=>setMult(mult+1)}>+</button></div>
    <div className="bet">Bet multiplier: {mult}× · Base ₹{base}</div>
  </div></div>
}
