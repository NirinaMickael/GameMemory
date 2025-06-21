from fastapi import FastAPI
from database import engine
from models import Base
from controllers.score_controller import router as score_router
from handler import register_exception_handlers 

app = FastAPI()

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# handlers
register_exception_handlers(app)

#  Route
app.include_router(score_router, prefix="/scores", tags=["scores"])
