# Fortune Ox local project

1. Install Node.js and Python.
2. In `frontend`: `npm install`, then `npm start`.
3. In `backend`: `pip install -r requirements.txt`.
4. Copy `.env.example` to `.env` and put your MongoDB connection string in it.
5. Start backend: `uvicorn server:app --reload --port 8001`.
6. Frontend defaults to `http://localhost:8001/api`.

Do not commit `.env` or expose database credentials.
