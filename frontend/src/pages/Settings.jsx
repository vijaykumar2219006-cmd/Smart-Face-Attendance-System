import { useEffect, useState } from "react";
import api from "../services/api";

import {
  FaCog,
  FaDatabase,
  FaCamera,
  FaBrain,
  FaLaptopCode,
  FaServer,
  FaUserGraduate,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function Settings() {
  const [stats, setStats] = useState(null);
  const [modelStatus, setModelStatus] = useState("Loading...");
  const [cameraStatus, setCameraStatus] = useState("Checking...");

  useEffect(() => {
    loadData();
    checkCamera();
  }, []);

  const loadData = async () => {
    try {
      const [dashboard, model] = await Promise.all([
        api.get("/dashboard-stats"),
        api.get("/model-status"),
      ]);

      setStats(dashboard.data);
      setModelStatus(model.data.status);
    } catch (err) {
      console.error(err);
    }
  };

  const checkCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      setCameraStatus("Available");
    } catch {
      setCameraStatus("Not Available");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}

      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
            <FaCog className="text-3xl text-blue-600" />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-800">Settings</h1>

            <p className="text-slate-500 mt-2">
              Manage your application and view system information.
            </p>
          </div>
        </div>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Information */}

        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaLaptopCode className="text-2xl text-blue-600" />

            <h2 className="text-2xl font-bold text-slate-800">
              System Information
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-500">Project</span>

              <span className="font-semibold">
                Smart Face Attendance System
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Version</span>

              <span className="font-semibold">v1.0.0</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Developer</span>

              <span className="font-semibold">Vijay Kumar</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Frontend</span>

              <span className="font-semibold">React + Tailwind CSS</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Backend</span>

              <span className="font-semibold">Node.js + Flask</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Database</span>

              <span className="font-semibold">MongoDB Atlas</span>
            </div>
          </div>
        </div>

        {/* Camera Status */}

        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaCamera className="text-2xl text-green-600" />

            <h2 className="text-2xl font-bold text-slate-800">Camera Status</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Status</span>

              <span
                className={`font-semibold ${
                  cameraStatus === "Available"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {cameraStatus}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Browser Camera</span>

              <span className="font-semibold">
                {cameraStatus === "Available" ? "Ready" : "Unavailable"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Resolution</span>

              <span className="font-semibold">640 × 480</span>
            </div>
          </div>
        </div>

        {/* Face Recognition Model */}

        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaBrain className="text-2xl text-purple-600" />

            <h2 className="text-2xl font-bold text-slate-800">
              Face Recognition Model
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Model</span>

              <span className="font-semibold">LBPH Recognizer</span>
            </div>

            <div className="flex justify-between">
              <span>Status</span>

              <span
                className={`font-semibold ${
                  modelStatus === "Ready" ? "text-green-600" : "text-red-600"
                }`}
              >
                {modelStatus}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Recognition</span>

              <span className="font-semibold">Active</span>
            </div>
          </div>
        </div>

        {/* Database */}

        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaDatabase className="text-2xl text-emerald-600" />

            <h2 className="text-2xl font-bold text-slate-800">Database</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Status</span>

              <span className="flex items-center gap-2 text-green-600 font-semibold">
                <FaCheckCircle />
                Connected
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Students</span>

              <span className="font-semibold">{stats?.totalStudents ?? 0}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Attendance</span>

              <span className="font-semibold">
                {stats?.totalAttendance ?? 0}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Database</span>

              <span className="font-semibold">MongoDB Atlas</span>
            </div>
          </div>
        </div>
      </div>
      {/* Application Preferences */}

      <div className="mt-8 bg-white rounded-3xl shadow-md border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <FaCog className="text-2xl text-indigo-600" />

          <h2 className="text-2xl font-bold text-slate-800">
            Application Preferences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between border rounded-2xl p-4">
            <div>
              <h3 className="font-semibold text-slate-800">
                Toast Notifications
              </h3>

              <p className="text-sm text-slate-500">
                Display success and error notifications.
              </p>
            </div>

            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between border rounded-2xl p-4">
            <div>
              <h3 className="font-semibold text-slate-800">
                Auto Refresh Dashboard
              </h3>

              <p className="text-sm text-slate-500">
                Refresh dashboard statistics automatically.
              </p>
            </div>

            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between border rounded-2xl p-4">
            <div>
              <h3 className="font-semibold text-slate-800">Camera Sound</h3>

              <p className="text-sm text-slate-500">
                Play a sound after successful recognition.
              </p>
            </div>

            <input type="checkbox" className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between border rounded-2xl p-4">
            <div>
              <h3 className="font-semibold text-slate-800">
                Confidence Percentage
              </h3>

              <p className="text-sm text-slate-500">
                Display recognition confidence.
              </p>
            </div>

            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* About Project */}

      <div className="mt-8 bg-white rounded-3xl shadow-md border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <FaServer className="text-2xl text-blue-600" />

          <h2 className="text-2xl font-bold text-slate-800">About Project</h2>
        </div>

        <p className="text-slate-600 leading-8">
          Smart Face Attendance System is a real-time attendance management
          application that uses facial recognition to automatically identify
          students and record attendance. The project is developed using
          React.js, Tailwind CSS, Node.js, Flask, OpenCV, and MongoDB Atlas. It
          provides secure authentication, student management, face registration,
          model training, attendance tracking, analytics, reporting, and export
          functionality through a modern admin dashboard.
        </p>
      </div>

      {/* Quick Actions */}

      <div className="mt-8 bg-white rounded-3xl shadow-md border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <FaCog className="text-2xl text-green-600" />

          <h2 className="text-2xl font-bold text-slate-800">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <button
            onClick={loadData}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 font-semibold transition-all duration-300"
          >
            Refresh Statistics
          </button>

          <button
            onClick={() => window.open("/train", "_self")}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl py-4 font-semibold transition-all duration-300"
          >
            Retrain Model
          </button>

          <button
            onClick={() => window.open("/history", "_self")}
            className="bg-green-600 hover:bg-green-700 text-white rounded-2xl py-4 font-semibold transition-all duration-300"
          >
            View History
          </button>

          <button
            onClick={() => window.open("/", "_self")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-4 font-semibold transition-all duration-300"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
