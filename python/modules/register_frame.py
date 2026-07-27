import os
import cv2
import base64
import numpy as np

from PIL import Image
from io import BytesIO

from config import (
    DATASET_PATH,
    FACE_WIDTH,
    FACE_HEIGHT,
    TOTAL_IMAGES,
)

from modules.face_detector import detect_faces
from modules.register_session import registration_session


def process_frame(image_data):

    student_name = registration_session["student_name"]

    if not student_name:
        return {
            "success": False,
            "message": "No active registration session."
        }

    student_folder = os.path.join(DATASET_PATH, student_name)

    # Remove: data:image/jpeg;base64,
    image_data = image_data.split(",")[1]

    image_bytes = base64.b64decode(image_data)

    image = Image.open(BytesIO(image_bytes))

    frame = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    faces = detect_faces(frame)

    if len(faces) == 0:
        return {
        "success": True,
        "detected": False,
        "status": "NO_FACE",
        "message": "No face detected",
        "count": registration_session["image_count"],
        "completed": False
    }

    if len(faces) > 1:
        return {
        "success": True,
        "detected": False,
        "status": "MULTIPLE_FACES",
        "message": "Multiple faces detected",
        "count": registration_session["image_count"],
        "completed": False
    }

    x, y, w, h = faces[0]

    face = frame[y:y+h, x:x+w]

    face = cv2.resize(face, (FACE_WIDTH, FACE_HEIGHT))

    registration_session["image_count"] += 1

    count = registration_session["image_count"]

    image_path = os.path.join(student_folder, f"{count}.jpg")

    cv2.imwrite(image_path, face)

    completed = count >= TOTAL_IMAGES

    frame_width = frame.shape[1]
    print("REGISTER:", x, y, w, h)

    return {
    "success": True,
    "detected": True,
    "status": "FACE_DETECTED",
    "message": "Move your head slowly",
    "count": count,
    "completed": completed,


    "face": {
    "x": int(frame_width - x - w),
    "y": int(y),
    "w": int(w),
    "h": int(h)
}
}