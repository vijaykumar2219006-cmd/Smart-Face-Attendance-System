import cv2
import json
import os

from modules.face_detector import detect_faces


def recognize_face():

    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read(os.path.join("models", "face_trainer.yml"))

    with open(os.path.join("models", "labels.json"), "r") as file:
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
            face = cv2.resize(face, (200, 200))

            label, confidence = recognizer.predict(face)
            # print(f"Name: {labels.get(str(label), 'Unknown')} | Confidence: {confidence:.2f}")

            if confidence < 70:
                name = labels[str(label)]
            else:
                name = "Unknown"

            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

            cv2.putText(
    frame,
    f"{name} ({confidence:.2f})",
    (x, y - 10),
    cv2.FONT_HERSHEY_SIMPLEX,
    0.7,
    (0, 255, 0),
    2
)

        cv2.imshow("Face Recognition", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    camera.release()
    cv2.destroyAllWindows()