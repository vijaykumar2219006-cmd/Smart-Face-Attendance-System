import cv2
import json

from modules.face_detector import detect_faces
from config import (
    MODEL_FILE,
    LABEL_FILE,
    FACE_WIDTH,
    FACE_HEIGHT,
    CONFIDENCE_THRESHOLD,
)


def recognize_face() -> None:
    """
    Recognize registered students using the trained LBPH model.
    """

    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read(MODEL_FILE)

    with open(LABEL_FILE, "r") as file:
        labels = json.load(file)

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
                color = (0, 255, 0)
            else:
                name = "Unknown"
                color = (0, 0, 255)

            cv2.rectangle(frame, (x, y), (x+w, y+h), color, 2)

            cv2.putText(
                frame,
                f"Name: {name}",
                (x, y - 35),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                color,
                2
            )

            cv2.putText(
                frame,
                f"Confidence: {confidence:.2f}",
                (x, y - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                color,
                2
            )

        cv2.imshow("Face Recognition", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    camera.release()
    cv2.destroyAllWindows()