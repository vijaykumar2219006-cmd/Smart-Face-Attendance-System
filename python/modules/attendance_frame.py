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

# from profiling.tracing import label
from utils import (
    get_current_date,
    get_current_time,
    create_csv_if_not_exists,
    save_attendance,
)


recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read(MODEL_FILE)

with open(LABEL_FILE, "r") as file:
    labels = json.load(file)

os.makedirs(ATTENDANCE_PATH, exist_ok=True)
create_csv_if_not_exists(ATTENDANCE_FILE)


def process_attendance_frame(image_data):

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

    # print("=" * 40)
    # print("Predicted Label:", label)
    # print("Confidence:", confidence)
    # print("Available Labels:", labels)
    # print("=" * 40)

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

    existing = attendance_collection.find_one({
        "name": name,
        "date": today
    })

    if existing:

        status = "ALREADY_MARKED"

    else:

        save_attendance(
            ATTENDANCE_FILE,
            name,
            today,
            current_time
        )

        attendance_collection.insert_one({
            "name": name,
            "date": today,
            "time": current_time,
            "status": "Present",
            "confidence": round(confidence,2)
        })

        status = "MARKED"

    #     print(f"Face: x={x}, y={y}, w={w}, h={h}")
    #     print(f"Frame: {frame.shape}")

    # print("ATTENDANCE:", x, y, w, h)

    # print("MODEL:", MODEL_FILE)
    # print("LABELS:", LABEL_FILE)
    # print("Loaded labels:", labels)

    return {
        "success": True,
        "detected": True,
        "recognized": True,
        "status": status,
        "name": name,
        "confidence": round(confidence,2),
        "face": {
            "x": int(x),
            "y": int(y),
            "w": int(w),
            "h": int(h)
        }
    }