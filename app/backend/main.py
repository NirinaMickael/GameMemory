from fastapi import FastAPI
from database import engine
from models import Base
from controllers.score_controller import router as score_router
from handler import register_exception_handlers 

from fastapi.middleware.cors import CORSMiddleware
import os
FRONT_URL = os.getenv("FRONT_URL", "http://localhost:4000")
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONT_URL,"http://0.0.0.0:4000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# handlers
register_exception_handlers(app)

#  Route
app.include_router(score_router, prefix="/scores", tags=["scores"])
