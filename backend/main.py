from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, records, families, categories


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
main_router = APIRouter(prefix="/api")
main_router.include_router(auth.router)
main_router.include_router(records.router)
main_router.include_router(families.router)
main_router.include_router(categories.router)
app.include_router(main_router)


if __name__ == "__main__":
	import uvicorn
	from config import settings
	from db.database import create_db

	create_db()
	uvicorn.run(app, port=settings.server_port, host=settings.server_host)