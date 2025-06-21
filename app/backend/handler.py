from fastapi import Request
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError
from schemas import APIResponse

async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    return JSONResponse(
        status_code=500,
        content=APIResponse(
            data=None,
            message="A database error occurred.",
            success=False
        ).dict()
    )

async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content=APIResponse(
            data=None,
            message="An unexpected error occurred.",
            success=False
        ).dict()
    )

def register_exception_handlers(app):
    app.add_exception_handler(SQLAlchemyError, sqlalchemy_exception_handler)
    app.add_exception_handler(Exception, general_exception_handler)
