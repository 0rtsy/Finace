import re
from typing import Optional

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from jose import jwt, JWTError

from backend.config import security, settings
from backend.db import models, SessionLocal


def data_validation(email: str, password: str, name: str | None = None) -> tuple[bool, str | None]:
	if len(name) > 32:
		return False, "Имя должно быть не длиннее 32 символов"
	else:
		name_pattern = r'^[A-Za-zА-Яа-яёЁ\-\.]+$'
		if not re.match(name_pattern, name):
			return False, "Имя может содержать только английские и русские буквы, тире и точку"

	# RFC 5322
	email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

	if not re.match(email_pattern, email):
		return False, "Некорректный формат электронной почты"
	else:
		local_part = email.split('@')[0]
		# a-zA-Z !#$%&'*+-/=?^_`{|}~.
		local_part_pattern = r'^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+$'

		if not re.match(local_part_pattern, local_part):
			return False, "Некорректный формат электронной почты"
		elif local_part.startswith('.') or local_part.endswith('.'):
			return False, "Некорректный формат электронной почты"
		elif '..' in local_part:
			return False, "Некорректный формат электронной почты"

	if len(password) > 64:
		return False, "Пароль должен быть не длиннее 64 символов"
	elif len(password) < 6:
		return False, "Пароль должен быть не короче 6 символов"

	return True, None

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> models.Users:
	token = credentials.credentials
	email = verify_token(token)

	db = SessionLocal()
	user = db.query(models.Users).filter_by(email=email).first()

	if user is None:
		raise HTTPException(status_code=401, detail="Invalid token")

	return user

def verify_token(token: str) -> Optional[str]:
	try:
		payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
		email: str = payload.get("sub")
		return email
	except JWTError:
		return None