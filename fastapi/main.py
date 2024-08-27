from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import json

with open('data.json', 'r') as file:
    data = json.load(file)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to the allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return data

@app.post("/save")
async def save_table_data(request: Request):
    data = await request.json()
    with open("data.json", 'w') as json_file:
        json.dump(data, json_file, indent=4)
    return {"message": "Data saved successfully"}
