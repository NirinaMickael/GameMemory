from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from schemas import ScoreCreate, ScoreOut, StatsOut
from services.score_service import ScoreService
from database import get_db

router = APIRouter()

@router.post("/", response_model=ScoreOut)
async def save_score(score: ScoreCreate, db: AsyncSession = Depends(get_db)):
    return await ScoreService(db).create_score(score)

@router.get("/top", response_model=list[ScoreOut])
async def get_top_scores(db: AsyncSession = Depends(get_db)):
    return await ScoreService(db).get_top_scores()

@router.get("/stats", response_model=StatsOut)
async def get_stats(db: AsyncSession = Depends(get_db)):
    return await ScoreService(db).get_stats()
