import os
import cv2
import json
import numpy as np


def train_model():

    dataset_path = "dataset"
    model_path = "models"

    os.makedirs(model_path, exist_ok=True)

    recognizer = cv2.face.LBPHFaceRecognizer_create()

    faces = []
    labels = []
    label_map = {}

    current_label = 0

    # Read every student folder
    for student_name in os.listdir(dataset_path):

        student_folder = os.path.join(dataset_path, student_name)

        if not os.path.isdir(student_folder):
            continue

        label_map[current_label] = student_name

        # Read every image of the student
        for image_name in os.listdir(student_folder):

            image_path = os.path.join(student_folder, image_name)

            image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

            if image is None:
                continue

            faces.append(image)
            labels.append(current_label)

        current_label += 1

    # Train recognizer
    recognizer.train(faces, np.array(labels))

    # Save trained model
    recognizer.save(os.path.join(model_path, "face_trainer.yml"))

    # Save labels
    with open(os.path.join(model_path, "labels.json"), "w") as file:
        json.dump(label_map, file, indent=4)

    print("\nModel trained successfully!")
    print(f"Students trained: {len(label_map)}")