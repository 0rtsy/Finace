from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from db import models, get_db
from tools import get_current_user, generate_random_string


class NewCategory(BaseModel):
	name: str
	icon_name: str
	color: str


router = APIRouter()


@router.post("/create")
async def create_new_category(
		category_data: NewCategory,
		user: models.Users = Depends(get_current_user),
		db: Session = Depends(get_db)
):
	while True:
		new_category_id = generate_random_string(64)
		if db.query(models.Categories).filter(models.Categories.id == new_category_id).first() is None:
			break
	db.add(
		models.Categories(
			id=new_category_id,
			name=category_data.name,
			icon_name=category_data.icon_name,
			color=category_data.color,
			owner=db.query(models.Users).filter(models.Users.id == user.id).first()
		)
	)
	db.commit()