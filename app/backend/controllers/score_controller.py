from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from schemas import ScoreCreate, ScoreOut, StatsOut, APIResponse
from services.score_service import ScoreService
from database import get_db

router = APIRouter()

@router.post("/", response_model=APIResponse)
async def save_score(score: ScoreCreate, db: AsyncSession = Depends(get_db)):
    saved_score = await ScoreService(db).create_score(score)
    print(saved_score)
    return APIResponse(
        data=ScoreOut.from_orm(saved_score),
        message="Score saved successfully",
        success=True
    )

@router.get("/top", response_model=APIResponse)
async def get_top_scores(db: AsyncSession = Depends(get_db)):
    scores = await ScoreService(db).get_top_scores()
    return APIResponse(
        data=[ScoreOut.from_orm(s) for s in scores],
        message="Top scores retrieved successfully",
        success=True
    )

@router.get("/stats", response_model=APIResponse)
async def get_stats(db: AsyncSession = Depends(get_db)):
    stats = await ScoreService(db).get_stats()
    return APIResponse(
        data=StatsOut(**stats),  
        message="Stats retrieved successfully",
        success=True
    )
