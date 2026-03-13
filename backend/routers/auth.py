import logging
import random

from fastapi import Depends, APIRouter
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import jwt
from typing import Optional
from sqlalchemy.orm import Session

from config import settings
from db import get_db, models
from tools import data_validation, get_current_user


class Login(BaseModel):
	email: str
	password: str

class Register(BaseModel):
	name: str
	email: str
	password: str

class Token(BaseModel):
	access_token: str
	token_type: str


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
	to_encode = data.copy()
	expire = datetime.now() + (expires_delta or timedelta(minutes=settings.access_token_expire_minutes))
	to_encode.update({"exp": expire})
	encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
	return encoded_jwt



router = APIRouter()


@router.post("/register")
def register(user: Register, db: Session = Depends(get_db)):
	status, error = data_validation(user.email, user.password, user.name)
	if not status:
		return {"error": error}

	if db.query(models.Users).filter_by(email=user.email).first() is not None:
		return {"error": "Данная почта уже занята"}

	while True:
		new_user_id = random.randint(100_000_000, 999_999_999)
		if db.query(models.Users).filter_by(id=new_user_id).first() is None:
			break
	try:
		db.add(
			models.Users(
				id=new_user_id,
				email=user.email,
				password=user.password,
				name=user.name,
				family=None
			)
		)
		db.commit()
	except Exception as e:
		logging.error(f"Registration error: {e}")
		return {"error": "Ошибка регистрации. Попробуйте позже"}

	return {"error": None}


@router.post("/login")
def login(user_data: Login, db: Session = Depends(get_db)):
	status, error = data_validation(user_data.email, user_data.password)
	if not status:
		return {"error": error}

	user = db.query(models.Users).filter_by(email=user_data.email).first()
	if user is None:
		return {"error": "Неправильная почта или пароль"}

	if user_data.password != user.password:
		return {"error": "Неправильная почта или пароль"}

	access_token = create_access_token(data={"sub": user.email})

	return {
		"error": None,
		"access_token": access_token,
		"token_type": "bearer",
		"name": user.name
	}


@router.get("/get_me")
def get_user_data(user: models.Users = Depends(get_current_user)):
	return {
		"id": user.id,
		"name": user.name,
		"avatar": user.avatar,
		"family_role": user.family_role
	}