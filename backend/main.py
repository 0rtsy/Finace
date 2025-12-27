from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import auth


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
app.include_router(main_router)


if __name__ == "__main__":
	import uvicorn
	uvicorn.run(app, port=8525)