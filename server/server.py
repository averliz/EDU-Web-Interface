import os
import json
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import util

# from fastapi.staticfiles import StaticFiles


app = FastAPI()
# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Serve the raw data file
@app.get("/api/rest-raw-data")
def get_raw_data():
    # with open("/path/to/your/raw-data-file", "r") as f:
    #     data = f.read()
    # return data
    file_path = "C:\\Users\\jimmy\\Documents\\GitHub\\FYP-App\\server\\rest_han_reg.raw"
    json_string = util.convert_to_json(file_path)
    return json_string


@app.get("/api/rest-raw-data-2")
def get_raw_data():
    # with open("/path/to/your/raw-data-file", "r") as f:
    #     data = f.read()
    # return data
    file_path = (
        "C:\\Users\\jimmy\\Documents\\GitHub\\FYP-App\\server\\rest_han_reg_v2.raw"
    )
    json_string = util.convert_to_json(file_path)
    return json_string


# Serve the React frontend
# app.mount("/", StaticFiles(directory="frontend/build"), name="static")

# @app.get("/")
# def serve_frontend():
#     return FileResponse("frontend/build/index.html")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
