from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("MONGO_URI not found in .env")

client = MongoClient(MONGO_URI)

db = client["face_attendance"]

students_collection = db["students"]
attendance_collection = db["attendance"]
admins_collection = db["admins"]

print("✅ MongoDB Connected Successfully!")