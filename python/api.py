import csv
from database import students_collection, attendance_collection
from collections import OrderedDict
from datetime import datetime, timedelta

from modules.attendance_frame import load_model

from modules.register_frame import process_frame

from modules.attendance_frame import process_attendance_frame

from modules.register_session import start_registration

from bson import ObjectId
import jwt

from auth import token_required

from passlib.hash import bcrypt

from database import admins_collection
from config import SECRET_KEY, JWT_ALGORITHM, JWT_EXPIRATION_HOURS

from flask import Flask, jsonify
from flask import send_file
from flask_cors import CORS
import os
from flask import Flask, jsonify, request
from modules.register_student import register_student
from modules.train_model import train_model
from modules.attendance import mark_attendance
import shutil

from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required

from config import DATASET_PATH, ATTENDANCE_FILE, MODEL_FILE

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = SECRET_KEY
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_NAME"] = "Authorization"
app.config["JWT_HEADER_TYPE"] = "Bearer"


CORS(app)
jwt_manager = JWTManager(app)


@app.route("/")
def home():
    return jsonify({
        "message": "Smart Face Attendance API is Running",
        "status": "success"
    })


@app.route("/students", methods=["GET"])
@token_required
def get_students():

    students = list(
        students_collection.find({}, {"_id": 0, "name": 1})
    )

    return jsonify({
        "count": len(students),
        "students": [student["name"] for student in students]
    })


@app.route("/register", methods=["POST"])
@token_required
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

    # Check if student already exists
    existing_student = students_collection.find_one({
        "name": student_name
    })

    if existing_student:
        return jsonify({
            "status": "error",
            "message": "Student already exists."
        }), 400

    # Save student in MongoDB
    students_collection.insert_one({
        "name": student_name,
        "registeredAt": datetime.utcnow()
    })

    # Existing functionality
    # Start registration session
    start_registration(student_name)

    return jsonify({
    "status": "success",
    "message": "Registration session started."
})

@app.route("/register-frame", methods=["POST"])
@token_required
def register_frame():

    data = request.get_json()

    image = data.get("image")

    if not image:
        return jsonify({
            "success": False,
            "message": "Image missing."
        }), 400

    result = process_frame(image)

    return jsonify(result)

@app.route("/train", methods=["POST"])
@token_required
def train():

    train_model()

    load_model()   # <-- reload latest trainer.yml and labels.json

    return jsonify({
        "status": "success",
        "message": "Model trained successfully."
    })

@app.route("/attendance", methods=["POST"])
@token_required
def attendance():

    mark_attendance()

    return jsonify({
        "status": "success",
        "message": "Attendance completed successfully."
    })

@app.route("/attendance-count", methods=["GET"])
@token_required
def attendance_count():

    today = datetime.now().strftime("%Y-%m-%d")

    count = attendance_collection.count_documents({
        "date": today
    })

    return jsonify({
        "count": count
    })

@app.route("/model-status", methods=["GET"])
@token_required
def model_status():

    import os

    if os.path.exists(MODEL_FILE):

        return jsonify({
            "status": "Ready"
        })

    return jsonify({
        "status": "Not Trained"
    })

@app.route("/students-list", methods=["GET"])
@token_required
def students_list():

    students = []

    all_students = students_collection.find()

    for student in all_students:

        student_name = student["name"]

        image_count = 0

        student_folder = os.path.join(DATASET_PATH, student_name)

        if os.path.exists(student_folder):

            image_count = len([
                file
                for file in os.listdir(student_folder)
                if file.endswith(".jpg")
            ])

        students.append({
    "_id": str(student["_id"]),
    "name": student_name,
    "images": image_count
})

    return jsonify(students)

@app.route("/students/<student_name>", methods=["DELETE"])
@token_required
def delete_student(student_name):

    student_folder = os.path.join(DATASET_PATH, student_name)

    # Check if student exists
    if not os.path.exists(student_folder):
        return jsonify({
            "status": "error",
            "message": "Student not found."
        }), 404

    try:
        # Delete dataset folder
        shutil.rmtree(student_folder)
        students_collection.delete_one({
    "name": student_name
})

        return jsonify({
            "status": "success",
            "message": f"{student_name} deleted successfully."
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route("/student/<student_id>", methods=["GET"])
@token_required
def get_student(student_id):

    print("Student ID received:", student_id)

    student = students_collection.find_one({
        "_id": ObjectId(student_id)
    })

    print("Student:", student)
    try:
        student = students_collection.find_one({
            "_id": ObjectId(student_id)
        })

        if not student:
            return jsonify({"message": "Student not found"}), 404

        attendance = list(
            attendance_collection.find(
                {"name": student["name"]},
                {"_id": 0}
            ).sort("date", -1)
        )

        return jsonify({
            "student": {
                "_id": str(student["_id"]),
                "name": student["name"],
                "registeredAt": student.get("registeredAt")
            },
            "totalAttendance": len(attendance),
            "attendanceHistory": attendance
        })

    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route("/student/<student_id>", methods=["PUT"])
@token_required
def update_student(student_id):

    try:
        data = request.get_json()

        new_name = data.get("name", "").strip()

        if not new_name:
            return jsonify({
                "success": False,
                "message": "Student name is required."
            }), 400

        student = students_collection.find_one({
            "_id": ObjectId(student_id)
        })

        if not student:
            return jsonify({
                "success": False,
                "message": "Student not found."
            }), 404

        old_name = student["name"]

        # Update MongoDB
        students_collection.update_one(
            {"_id": ObjectId(student_id)},
            {
                "$set": {
                    "name": new_name
                }
            }
        )

        # Update attendance records
        attendance_collection.update_many(
            {"name": old_name},
            {
                "$set": {
                    "name": new_name
                }
            }
        )

        # Rename dataset folder
        old_folder = os.path.join(DATASET_PATH, old_name)
        new_folder = os.path.join(DATASET_PATH, new_name)

        if os.path.exists(old_folder):
            os.rename(old_folder, new_folder)

        return jsonify({
            "success": True,
            "message": "Student updated successfully."
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

@app.route("/attendance-history", methods=["GET"])
@token_required
def attendance_history():

    records = []

    attendance = attendance_collection.find().sort("date", -1)

    for record in attendance:

        records.append({
            "_id": str(record["_id"]),
            "name": record["name"],
            "date": record["date"],
            "time": record["time"]
        })

    return jsonify(records)

from bson import ObjectId

@app.route("/attendance/<attendance_id>", methods=["DELETE"])
@token_required
def delete_attendance(attendance_id):
    try:
        result = attendance_collection.delete_one(
            {"_id": ObjectId(attendance_id)}
        )

        if result.deleted_count == 0:
            return jsonify({
                "success": False,
                "message": "Attendance record not found."
            }), 404

        return jsonify({
            "success": True,
            "message": "Attendance record deleted successfully."
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

@app.route("/dashboard-stats", methods=["GET"])
@token_required
def dashboard_stats():

    total_students = students_collection.count_documents({})

    total_attendance = attendance_collection.count_documents({})

    today = datetime.now().strftime("%Y-%m-%d")

    today_attendance = attendance_collection.count_documents({
        "date": today
    })

    # New Statistics
    absent_today = max(total_students - today_attendance, 0)

    attendance_percentage = 0

    if total_students > 0:
        attendance_percentage = round(
            (today_attendance / total_students) * 100,
            2
        )

    model_ready = os.path.exists(MODEL_FILE)

    recent = []

    latest = attendance_collection.find().sort("_id", -1).limit(5)

    for record in latest:
        recent.append({
            "name": record["name"],
            "date": record["date"],
            "time": record["time"],
            "status": record.get("status", "Present")
        })

    print("Total Students:", total_students)
    print("Total Attendance:", total_attendance)
    print("Today's Attendance:", today_attendance)

    return jsonify({
        "totalStudents": total_students,
        "todayAttendance": today_attendance,
        "totalAttendance": total_attendance,

        # New values
        "absentToday": absent_today,
        "attendancePercentage": attendance_percentage,

        "modelStatus": "Ready" if model_ready else "Not Trained",

        "recentAttendance": recent
    })

@app.route("/weekly-attendance", methods=["GET"])
@token_required
def weekly_attendance():

    last7 = OrderedDict()

    for i in range(6, -1, -1):
        day = datetime.now() - timedelta(days=i)
        last7[day.strftime("%Y-%m-%d")] = {
            "day": day.strftime("%a"),
            "count": 0
        }

    attendance = attendance_collection.find()

    for record in attendance:
        date = record.get("date")

        if date in last7:
            last7[date]["count"] += 1

    return jsonify(list(last7.values()))

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    print("Username:", username)
    print("Password:", password)

    if not username or not password:
        return jsonify({
            "success": False,
            "message": "Username and password are required."
        }), 400

    admin = admins_collection.find_one({
        "username": username
    })

    admin = admins_collection.find_one({"username": username})

    print("Admin Found:", admin)

    if not admin:
        return jsonify({
            "success": False,
            "message": "Invalid username or password."
        }), 401

    print("Password Match:", bcrypt.verify(password, admin["password"]))

    if not bcrypt.verify(password, admin["password"]):
        return jsonify({
            "success": False,
            "message": "Invalid username or password."
        }), 401

    payload = {
        "username": username,
        "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=JWT_ALGORITHM
    )

    return jsonify({
        "success": True,
        "token": token,
        "username": username
    })

@app.route("/attendance-frame", methods=["POST"])
@token_required
def attendance_frame():

    data = request.get_json()

    image = data.get("image")

    if not image:
        return jsonify({
            "success": False,
            "message": "No image received"
        }), 400

    result = process_attendance_frame(image)

    return jsonify(result)

@app.route("/student-image/<student_name>")
@token_required
def get_student_image(student_name):

    image_path = os.path.join(
        DATASET_PATH,
        student_name,
        "50.jpg"
    )

    # Fallback if 50.jpg doesn't exist
    if not os.path.exists(image_path):
        image_path = os.path.join(
            DATASET_PATH,
            student_name,
            "1.jpg"
        )

    if not os.path.exists(image_path):
        return {"error": "Image not found"}, 404

    return send_file(image_path, mimetype="image/jpeg")


if __name__ == "__main__":
    app.run(debug=True)