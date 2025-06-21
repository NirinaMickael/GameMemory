from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.sql import func
from models import Score

class ScoreRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, score_data):
        score = Score(**score_data.dict())
        self.db.add(score)
        await self.db.commit()
        await self.db.refresh(score)
        return score

    async def get_top(self, limit):
        result = await self.db.execute(
            select(Score).order_by(Score.moves.asc(), Score.duration.asc()).limit(limit)
        )
        return result.scalars().all()

    async def get_stats(self):
        result = await self.db.execute(
            select(
                func.avg(Score.moves).label("average_score"),
                func.count(Score.id).label("total_participations")
            )
        )
        return result.first()
