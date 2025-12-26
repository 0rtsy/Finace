import os

from dotenv import load_dotenv

load_dotenv()


class Settings:
	secret_key: str = os.getenv("SECRET_KEY")
	algorithm: str = os.getenv("ALGORITHM", "HS256")
	access_token_expire_minutes: int = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30)
	database_url: str = os.getenv("DATABASE_URL", "sqlite:///Base.db")

	server_host: str = os.getenv("SERVER_HOST", "127.0.0.1")
	server_port: int = os.getenv("SERVER_PORT", 5858)
	server_domain: str = os.getenv("SERVER_DOMAIN", "http://127.0.0.1")

settings = Settings()