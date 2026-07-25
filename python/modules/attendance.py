import csv
import cv2
import json
import os
from datetime import datetime

from modules.face_detector import detect_faces


def mark_attendance():

    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read(os.path.join("models", "face_trainer.yml"))

    with open(os.path.join("models", "labels.json"), "r") as file:
        labels = json.load(file)

    attendance_folder = "attendance"
    os.makedirs(attendance_folder, exist_ok=True)

    attendance_file = os.path.join(attendance_folder, "attendance.csv")

    # Create CSV if it doesn't exist
    if not os.path.exists(attendance_file):
        with open(attendance_file, "w", newline="") as file:
            writer = csv.writer(file)
            writer.writerow(["Name", "Date", "Time"])

    camera = cv2.VideoCapture(0)

    while True:

        success, frame = camera.read()

        if not success:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        faces = detect_faces(frame)

        for (x, y, w, h) in faces:

            face = gray[y:y+h, x:x+w]
            face = cv2.resize(face, (200, 200))

            label, confidence = recognizer.predict(face)

            if confidence < 70:

                name = labels[str(label)]

                today = datetime.now().strftime("%Y-%m-%d")
                current_time = datetime.now().strftime("%H:%M:%S")

                already_marked = False

                with open(attendance_file, "r") as file:
                    reader = csv.reader(file)

                    next(reader)

                    for row in reader:
                        if row[0] == name and row[1] == today:
                            already_marked = True
                            break

                if not already_marked:

                    with open(attendance_file, "a", newline="") as file:
                        writer = csv.writer(file)
                        writer.writerow([name, today, current_time])

                    status = "Attendance Marked"

                else:
                    status = "Already Marked"

            else:

                name = "Unknown"
                status = ""

            cv2.rectangle(frame, (x, y), (x+w, y+h), (0,255,0), 2)

            cv2.putText(
                frame,
                name,
                (x, y-10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                (0,255,0),
                2
            )

            cv2.putText(
                frame,
                status,
                (10,30),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                (255,0,0),
                2
            )

        cv2.imshow("Attendance System", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    camera.release()
    cv2.destroyAllWindows()