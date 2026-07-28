import cv2
import json
import os
import base64
import numpy as np

from PIL import Image
from io import BytesIO

from database import attendance_collection
from modules.face_detector import detect_faces

from config import (
    MODEL_FILE,
    LABEL_FILE,
    ATTENDANCE_PATH,
    ATTENDANCE_FILE,
    FACE_WIDTH,
    FACE_HEIGHT,
    CONFIDENCE_THRESHOLD,
)

from utils import (
    get_current_date,
    get_current_time,
    create_csv_if_not_exists,
    save_attendance,
)

recognizer = cv2.face.LBPHFaceRecognizer_create()
labels = {}


def load_model():
    global recognizer, labels

    recognizer = cv2.face.LBPHFaceRecognizer_create()

    if os.path.exists(MODEL_FILE):
        recognizer.read(MODEL_FILE)

    if os.path.exists(LABEL_FILE):
        with open(LABEL_FILE, "r") as file:
            labels = json.load(file)
    else:
        labels = {}


# Load once when the server starts
load_model()

os.makedirs(ATTENDANCE_PATH, exist_ok=True)
create_csv_if_not_exists(ATTENDANCE_FILE)


def process_attendance_frame(image_data):

    # Safety: if model files were deleted, don't call predict()
    if not os.path.exists(MODEL_FILE) or not labels:
        return {
            "success": False,
            "message": "Face recognition model is not trained."
        }

    image_data = image_data.split(",")[1]

    image = Image.open(BytesIO(base64.b64decode(image_data)))

    frame = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = detect_faces(frame)

    if len(faces) == 0:
        return {
            "success": True,
            "detected": False,
            "status": "NO_FACE"
        }

    if len(faces) > 1:
        return {
            "success": True,
            "detected": False,
            "status": "MULTIPLE_FACES"
        }

    x, y, w, h = faces[0]

    face = gray[y:y+h, x:x+w]
    face = cv2.resize(face, (FACE_WIDTH, FACE_HEIGHT))

    label, confidence = recognizer.predict(face)

    if confidence >= CONFIDENCE_THRESHOLD:
        return {
            "success": True,
            "detected": True,
            "recognized": False,
            "status": "UNKNOWN"
        }

    name = labels[str(label)]

    today = get_current_date()
    current_time = get_current_time()

    result = attendance_collection.update_one(
        {
            "name": name,
            "date": today
        },
        {
            "$setOnInsert": {
                "name": name,
                "date": today,
                "time": current_time,
                "status": "Present",
                "confidence": round(confidence, 2)
            }
        },
        upsert=True
    )

    if result.upserted_id:

        save_attendance(
            ATTENDANCE_FILE,
            name,
            today,
            current_time
        )

        status = "MARKED"

    else:

        status = "ALREADY_MARKED"

    return {
        "success": True,
        "detected": True,
        "recognized": True,
        "status": status,
        "name": name,
        "confidence": round(confidence, 2),
        "face": {
            "x": int(x),
            "y": int(y),
            "w": int(w),
            "h": int(h)
        }
    }