import random

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(docs_url=None, redoc_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/")
async def main_page():
	return "Hello world!"

@app.post("/api/test")
async def test_request():
	return {
		"id": random.randint(0, 1000),
		"form": "uv"
	}


if __name__ == "__main__":
	uvicorn.run(app, port=8525)