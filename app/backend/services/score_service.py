from sqlalchemy.ext.asyncio import AsyncSession
from schemas import ScoreCreate
from repositories.score_repository import ScoreRepository

class ScoreService:
    def __init__(self, db: AsyncSession):
        self.repo = ScoreRepository(db)

    async def create_score(self, score: ScoreCreate):
        return await self.repo.create(score)

    async def get_top_scores(self):
        return await self.repo.get_top(10)

    async def get_stats(self):
       stats = await self.repo.get_stats()  
       average_score, total_participations = stats
       return {
        "average_score": float(average_score or 0.0),
        "total_participations": total_participations or 0
       }
