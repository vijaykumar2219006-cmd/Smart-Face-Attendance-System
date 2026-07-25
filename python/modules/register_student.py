import cv2
import os

from modules.face_detector import detect_faces


def register_student(student_name):

    dataset_path = os.path.join("dataset", student_name)
    os.makedirs(dataset_path, exist_ok=True)

    camera = cv2.VideoCapture(0)

    image_count = 0
    frame_count = 0

    print("Registration Started...")
    print("Slowly move your head Left, Right, Up, Down and Straight.")
    print("Press 'Q' to Quit.\n")

    while True:

        success, frame = camera.read()

        if not success:
            break

        frame_count += 1

        faces = detect_faces(frame)

        # Save only when exactly one face is detected
        if len(faces) == 1:

            x, y, w, h = faces[0]

            cv2.rectangle(frame, (x, y), (x+w, y+h), (0,255,0), 2)

            # Save every 5th frame
            if frame_count % 5 == 0:

                face = frame[y:y+h, x:x+w]
                face = cv2.resize(face, (200,200))

                image_count += 1

                cv2.imwrite(
                    os.path.join(dataset_path, f"{image_count}.jpg"),
                    face
                )

        cv2.putText(
            frame,
            f"Images : {image_count}/100",
            (10,30),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0,255,0),
            2
        )

        cv2.putText(
            frame,
            "Move your head slowly",
            (10,70),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (255,0,0),
            2
        )

        cv2.imshow("Student Registration", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

        if image_count >= 100:
            break

    camera.release()
    cv2.destroyAllWindows()

    print(f"\n{student_name} registered successfully!")