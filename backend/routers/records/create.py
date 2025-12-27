from fastapi import Depends, FastAPI, APIRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.db import get_db, models
from backend.tools import get_current_user

router = APIRouter()


class Record(BaseModel):
	type: str
	sum: int | float
	description: str | None = None
	category_id: str | None = None


@router.post("/createRecord")
async def create_record(
		record: Record,
		user: models.Users = Depends(get_current_user),
		db: Session = Depends(get_db)
):
	return record