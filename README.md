# 🎓 Smart Face Attendance System

An AI-powered Face Recognition Attendance System that automates student attendance using real-time facial recognition. The system provides a modern web dashboard for student registration, attendance tracking, model training, and attendance history management.

---

## 🚀 Features

- 🔐 Secure Admin Login (JWT Authentication)
- 👨‍🎓 Student Registration with Face Capture
- 🤖 LBPH Face Recognition Model Training
- 📷 Real-time Face Recognition Attendance
- 📊 Interactive Dashboard & Analytics
- 👥 Student Management
- 📜 Attendance History
- 📁 CSV Export Support
- ⚙️ System Settings
- 📱 Fully Responsive User Interface

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- Flask (Python)

### Database
- MongoDB Atlas

### AI / Computer Vision
- OpenCV
- LBPH Face Recognizer
  ---

# 📸 Screenshots

## 🔐 Login

![Login](https://raw.githubusercontent.com/vijaykumar2219006-cmd/Smart-Face-Attendance-System/main/screenshots/login.png)

---

## 📊 Dashboard

![Dashboard](https://raw.githubusercontent.com/vijaykumar2219006-cmd/Smart-Face-Attendance-System/main/screenshots/dashboard.png)

---

## 👥 Student Management

![Students](https://raw.githubusercontent.com/vijaykumar2219006-cmd/Smart-Face-Attendance-System/main/screenshots/students.png)

---

## 👤 Student Profile

![Student Profile](https://raw.githubusercontent.com/vijaykumar2219006-cmd/Smart-Face-Attendance-System/main/screenshots/student-profile.png)

---

## 📝 Register Student

![Register](https://raw.githubusercontent.com/vijaykumar2219006-cmd/Smart-Face-Attendance-System/main/screenshots/register.png)

---

## 🧠 Train Face Recognition Model

![Train](https://raw.githubusercontent.com/vijaykumar2219006-cmd/Smart-Face-Attendance-System/main/screenshots/train.png)

---

## 📷 Live Attendance

![Attendance](https://raw.githubusercontent.com/vijaykumar2219006-cmd/Smart-Face-Attendance-System/main/screenshots/attendance.png)

---

## 📜 Attendance History

![History](https://raw.githubusercontent.com/vijaykumar2219006-cmd/Smart-Face-Attendance-System/main/screenshots/history.png)

---

## ⚙️ Settings

![Settings](https://raw.githubusercontent.com/vijaykumar2219006-cmd/Smart-Face-Attendance-System/main/screenshots/settings.png)
# 📂 Project Structure

```
Smart-Face-Attendance-System/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── ...
│
├── python/
│   ├── attendance/
│   ├── dataset/
│   ├── models/
│   ├── modules/
│   ├── venv/
│   ├── api.py
│   ├── app.py
│   ├── auth.py
│   ├── config.py
│   ├── requirements.txt
│   └── .env
│
├── screenshots/
│   ├── dashboard.png
│   ├── students.png
│   ├── register.png
│   ├── attendance.png
│   ├── history.png
│   ├── settings.png
│   ├── profile.png
│   └── login.png
│
├── .gitignore
├── LICENSE
└── README.md
```
---

# 🚀 Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/vijaykumar2219006-cmd/Smart-Face-Attendance-System.git

cd Smart-Face-Attendance-System
```

---

## 2️⃣ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

The React application will start at:

```
http://localhost:5173
```

---

## 3️⃣ Python Backend Setup

Navigate to the Python folder:

```bash
cd python
```

Create a virtual environment (optional but recommended):

### Windows

```bash
python -m venv venv

venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv

source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## 4️⃣ Configure Environment Variables

Create a `.env` file inside the `python` folder.

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

SECRET_KEY=YOUR_SECRET_KEY
```

---

## 5️⃣ Start the Backend

```bash
python app.py
```

The Flask server will start on:

```
http://localhost:5000
```

---

## 6️⃣ Start Using the Application

1. Open the React application.
2. Login as Administrator.
3. Register a Student.
4. Capture Face Images.
5. Train the Face Recognition Model.
6. Start Attendance.
7. View Dashboard and Attendance History.
   ---

# 🔄 System Workflow

The Smart Face Attendance System follows the workflow below:

```text
                 Admin Login
                      │
                      ▼
              Register Student
                      │
                      ▼
           Capture Face Images
                      │
                      ▼
          Store Images in Dataset
                      │
                      ▼
         Train Face Recognition Model
                      │
                      ▼
      Generate LBPH Model & Labels
                      │
                      ▼
          Start Attendance Session
                      │
                      ▼
        Capture Live Camera Frames
                      │
                      ▼
         Detect & Recognize Faces
                      │
                      ▼
      Verify Student Identity
                      │
                      ▼
        Mark Attendance in MongoDB
                      │
                      ▼
      Display Dashboard & History
```

### Workflow Explanation

1. **Administrator logs into the system.**
2. **A new student is registered** by entering the student's name.
3. **The system captures multiple facial images** using the webcam.
4. **Captured images are stored** in the dataset folder.
5. **The LBPH face recognition model is trained** using the captured images.
6. **During attendance**, the webcam captures live video frames.
7. **OpenCV detects and recognizes the student's face.**
8. **Attendance is recorded in MongoDB** with the student's name, date, time, and confidence score.
9. **The dashboard and attendance history** are updated automatically.
    ---

# 📡 REST API Endpoints

The Flask backend exposes the following REST APIs:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/login` | Authenticate administrator and generate JWT token |
| GET | `/students` | Get all registered student names |
| GET | `/students-list` | Get detailed list of registered students |
| GET | `/student/:id` | Get a student's profile and attendance history |
| PUT | `/student/:id` | Update student details |
| DELETE | `/students/:name` | Delete a student and associated dataset |
| POST | `/register` | Register a new student |
| POST | `/register-frame` | Capture student face images |
| POST | `/train` | Train the face recognition model |
| POST | `/attendance` | Start attendance session |
| POST | `/attendance-frame` | Process live attendance frames |
| GET | `/attendance-history` | Retrieve attendance records |
| DELETE | `/attendance/:id` | Delete an attendance record |
| GET | `/dashboard-stats` | Retrieve dashboard statistics |
| GET | `/weekly-attendance` | Retrieve weekly attendance data |
| GET | `/attendance-count` | Get today's attendance count |
| GET | `/model-status` | Check if the trained model is available |
| GET | `/student-image/:name` | Retrieve a student's profile image |
---

# 🔒 Authentication

The application uses **JSON Web Token (JWT)** based authentication.

After successful login, the backend generates a JWT token, which is stored on the client side. Every protected API request includes the token in the HTTP Authorization header.

```http
Authorization: Bearer <JWT_TOKEN>
```

Protected routes can only be accessed by authenticated administrators.
---

# 🚀 Future Enhancements

The following features can be added in future versions of the project:

- 📧 Email Notifications for Attendance
- 📱 Mobile Application Support
- ☁️ Cloud Deployment (AWS / Azure / GCP)
- 🧠 Deep Learning-based Face Recognition (FaceNet / ArcFace)
- 🛡️ Face Anti-Spoofing Detection
- 🎭 Face Mask Recognition
- 👥 Multi-User Admin Panel
- 📄 PDF & Excel Attendance Report Generation
- 📊 Advanced Attendance Analytics
- 🎥 Multi-Camera Attendance System

---

# 🏆 Project Highlights

- ✅ AI-Powered Face Recognition Attendance
- ✅ Full-Stack Web Application
- ✅ Modern Responsive User Interface
- ✅ JWT-Based Secure Authentication
- ✅ MongoDB Database Integration
- ✅ OpenCV LBPH Face Recognition
- ✅ Real-Time Attendance Monitoring
- ✅ Student Profile Management
- ✅ Attendance History Tracking
- ✅ Professional Dashboard with Analytics

---

# 👨‍💻 Author

**Vijay Kumar**

Information Science and Engineering Student

### Connect with Me

- 💼 LinkedIn: www.linkedin.com/in/vijay-kumar-4a6957414
- 💻 GitHub: https://github.com/vijaykumar2219006-cmd
- 📧 Email: vijaykumar2219006@gmail.com

---

# 📄 License

This project is developed for educational purposes as a Final Year Engineering Project.

You are free to use, modify, and learn from this project for academic and personal purposes.

---

# 🙏 Acknowledgements

Special thanks to:

- OpenCV
- React.js
- Flask
- MongoDB
- Tailwind CSS
- Vite
- Python Community

for providing the tools and frameworks used in this project.

---

# ⭐ Support

If you found this project helpful, please consider giving it a **⭐ Star** on GitHub.

It helps others discover the project and supports future improvements.

---

<div align="center">

## 🎓 Smart Face Attendance System

### Made with ❤️ using React, Flask, MongoDB & OpenCV

</div>

### Authentication
- JSON Web Token (JWT)
