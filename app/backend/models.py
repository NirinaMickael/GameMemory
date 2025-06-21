from sqlalchemy import Column, Integer, String, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
Base = declarative_base()

class Score(Base):
    __tablename__ = "scores"
    id = Column(Integer, primary_key=True, index=True)
    moves = Column(Integer, nullable=False)
    duration = Column(Float, nullable=False)
    theme = Column(String, nullable=False)
    grid_size = Column(String, nullable=False)
    mode = Column(String, nullable=False)
    player_count = Column(Integer, nullable=False)
    winner = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
