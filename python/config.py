import os
import os

SECRET_KEY = "your_super_secret_key_change_this"

JWT_ALGORITHM = "HS256"

JWT_EXPIRATION_HOURS = 24

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET_PATH = os.path.join(BASE_DIR, "dataset")
MODEL_PATH = os.path.join(BASE_DIR, "models")
ATTENDANCE_PATH = os.path.join(BASE_DIR, "attendance")

MODEL_FILE = os.path.join(MODEL_PATH, "face_trainer.yml")
LABEL_FILE = os.path.join(MODEL_PATH, "labels.json")
ATTENDANCE_FILE = os.path.join(ATTENDANCE_PATH, "attendance.csv")

FACE_WIDTH = 200
FACE_HEIGHT = 200

CONFIDENCE_THRESHOLD = 70
TOTAL_IMAGES = 100