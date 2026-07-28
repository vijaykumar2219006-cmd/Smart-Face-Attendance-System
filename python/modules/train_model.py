import os
import cv2
import json
import numpy as np

from config import (
    DATASET_PATH,
    MODEL_PATH,
    MODEL_FILE,
    LABEL_FILE,
)

print("DATASET PATH:", DATASET_PATH)
print("Folders:", os.listdir(DATASET_PATH))


def train_model() -> None:
    """
    Train the LBPH face recognition model using
    all registered student images.
    """

    os.makedirs(MODEL_PATH, exist_ok=True)

    recognizer = cv2.face.LBPHFaceRecognizer_create()

    faces = []
    labels = []
    label_map = {}

    current_label = 0

    for student_name in os.listdir(DATASET_PATH):

        student_folder = os.path.join(DATASET_PATH, student_name)

        if not os.path.isdir(student_folder):
            continue

        label_map[current_label] = student_name

        for image_name in os.listdir(student_folder):

            image_path = os.path.join(student_folder, image_name)

            image = cv2.imread(
                image_path,
                cv2.IMREAD_GRAYSCALE
            )

            if image is None:
                continue

            faces.append(image)
            labels.append(current_label)

        current_label += 1

    if len(faces) == 0:

        if os.path.exists(MODEL_FILE):
            os.remove(MODEL_FILE)

        if os.path.exists(LABEL_FILE):
            os.remove(LABEL_FILE)

        print("No training images found.")
        return

    # Train the recognizer
    recognizer.train(faces, np.array(labels))

    # Save trained model
    recognizer.save(MODEL_FILE)

    # Save label mapping
    with open(LABEL_FILE, "w") as file:
        json.dump(label_map, file, indent=4)

    print("\nModel trained successfully!")
    print(f"Students trained : {len(label_map)}")
    print(f"Images trained   : {len(faces)}")
    print(f"Model saved      : {MODEL_FILE}")
    print(f"Labels saved     : {LABEL_FILE}")