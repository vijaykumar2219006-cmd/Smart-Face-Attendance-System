import cv2
import os

from modules.face_detector import detect_faces
from config import DATASET_PATH, FACE_WIDTH, FACE_HEIGHT, TOTAL_IMAGES


def register_student(student_name):

    student_folder = os.path.join(DATASET_PATH, student_name)
    os.makedirs(student_folder, exist_ok=True)

    camera = cv2.VideoCapture(0)

    image_count = 0
    frame_count = 0

    print("\nRegistration Started...")
    print("Move your head Left, Right, Up and Down.")
    print("Press 'Q' to Quit.\n")

    while True:

        success, frame = camera.read()

        if not success:
            break

        frame_count += 1

        faces = detect_faces(frame)

        if len(faces) == 1:

            x, y, w, h = faces[0]

            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

            if frame_count % 5 == 0:

                face = frame[y:y+h, x:x+w]
                face = cv2.resize(face, (FACE_WIDTH, FACE_HEIGHT))

                image_count += 1

                image_path = os.path.join(student_folder, f"{image_count}.jpg")
                cv2.imwrite(image_path, face)

        cv2.putText(
            frame,
            f"Images : {image_count}/{TOTAL_IMAGES}",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2
        )

        cv2.putText(
            frame,
            "Move your head slowly",
            (10, 70),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (255, 0, 0),
            2
        )

        cv2.imshow("Student Registration", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

        if image_count >= TOTAL_IMAGES:
            break

    camera.release()
    cv2.destroyAllWindows()

    print(f"\n{student_name} registered successfully!")