import cv2
import json
import os
import time

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
    is_attendance_marked,
    save_attendance,
)


def mark_attendance() -> None:
    """
    Recognize a student and mark attendance.
    """

    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read(MODEL_FILE)

    with open(LABEL_FILE, "r") as file:
        labels = json.load(file)

    os.makedirs(ATTENDANCE_PATH, exist_ok=True)
    create_csv_if_not_exists(ATTENDANCE_FILE)

    camera = cv2.VideoCapture(0)

    while True:

        success, frame = camera.read()

        if not success:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        faces = detect_faces(frame)

        for (x, y, w, h) in faces:

            face = gray[y:y+h, x:x+w]
            face = cv2.resize(face, (FACE_WIDTH, FACE_HEIGHT))

            label, confidence = recognizer.predict(face)

            if confidence < CONFIDENCE_THRESHOLD:

                name = labels[str(label)]

                today = get_current_date()
                current_time = get_current_time()

                if is_attendance_marked(
                    ATTENDANCE_FILE,
                    name,
                    today
                ):
                    status = "Already Marked Today"

                else:

                    save_attendance(
                        ATTENDANCE_FILE,
                        name,
                        today,
                        current_time
                    )

                    status = "Attendance Marked Successfully"

            else:

                name = "Unknown"
                status = ""

            color = (0, 255, 0) if name != "Unknown" else (0, 0, 255)

            cv2.rectangle(
                frame,
                (x, y),
                (x+w, y+h),
                color,
                2
            )

            cv2.putText(
                frame,
                f"Name : {name}",
                (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                color,
                2
            )

            if name != "Unknown":
                cv2.putText(
                    frame,
                    f"Confidence : {confidence:.2f}",
                    (10, 65),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.7,
                    color,
                    2
                )

                cv2.putText(
    frame,
    status,
    (10, 100),
    cv2.FONT_HERSHEY_SIMPLEX,
    0.9,
    (0, 255, 255),   # Yellow
    2
)

                # Show the final result
            cv2.imshow("Attendance System", frame)

            print(f"Student : {name}")
            print(f"Confidence : {confidence:.2f}")
            print(status)

# Keep the window visible for 3 seconds
            cv2.waitKey(3000)

            camera.release()
            cv2.destroyAllWindows()
            return

        cv2.imshow("Attendance System", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    camera.release()
    cv2.destroyAllWindows()