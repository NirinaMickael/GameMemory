from pydantic import BaseModel
from pydantic import BaseModel
from typing import Any
class ScoreCreate(BaseModel):
    moves: int
    duration: float
    theme: str
    grid_size: str
    mode: str
    player_count: int
    winner: str | None = None

class ScoreOut(ScoreCreate):
    id: int

    class Config:
        from_attributes = True

class StatsOut(BaseModel):
    average_score: float
    total_participations: int



class APIResponse(BaseModel):
    data: Any
    message: str
    success: bool
