from flask import Flask, jsonify
from flask_cors import CORS
import os
from flask import Flask, jsonify, request
from modules.register_student import register_student
from modules.train_model import train_model
from modules.attendance import mark_attendance

from config import DATASET_PATH

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "message": "Smart Face Attendance API is Running",
        "status": "success"
    })


@app.route("/students", methods=["GET"])
def get_students():

    if not os.path.exists(DATASET_PATH):
        return jsonify({
            "students": []
        })

    students = []

    for folder in os.listdir(DATASET_PATH):

        folder_path = os.path.join(DATASET_PATH, folder)

        if os.path.isdir(folder_path):
            students.append(folder)

    students.sort()

    return jsonify({
        "count": len(students),
        "students": students
    })
@app.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data or "name" not in data:
        return jsonify({
            "status": "error",
            "message": "Student name is required."
        }), 400

    student_name = data["name"].strip()

    if student_name == "":
        return jsonify({
            "status": "error",
            "message": "Student name cannot be empty."
        }), 400

    register_student(student_name)

    return jsonify({
        "status": "success",
        "message": f"{student_name} registered successfully."
    })

@app.route("/train", methods=["POST"])
def train():

    train_model()

    return jsonify({
        "status": "success",
        "message": "Model trained successfully."
    })

@app.route("/attendance", methods=["POST"])
def attendance():

    mark_attendance()

    return jsonify({
        "status": "success",
        "message": "Attendance completed successfully."
    })

if __name__ == "__main__":
    app.run(debug=True)