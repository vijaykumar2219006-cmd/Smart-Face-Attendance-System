import os
from config import DATASET_PATH

# Simple in-memory session (good enough for a single-user admin app)
registration_session = {
    "student_name": None,
    "image_count": 0
}

def start_registration(student_name):
    student_folder = os.path.join(DATASET_PATH, student_name)
    os.makedirs(student_folder, exist_ok=True)

    registration_session["student_name"] = student_name
    registration_session["image_count"] = 0

    return student_folder