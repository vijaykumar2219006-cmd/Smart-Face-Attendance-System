import { useEffect, useState } from "react";
import {
  FaCamera,
  FaCheckCircle,
  FaSpinner,
  FaUserCheck,
} from "react-icons/fa";
import api from "../services/api";

import Camera from "../components/Camera";
import toast from "react-hot-toast";

export default function Attendance() {
  const [name, setName] = useState("");
  const [confidence, setConfidence] = useState("");
  const [face, setFace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [capturing, setCapturing] = useState(false);
  const [studentName, setStudentName] = useState("");

  const [status, setStatus] = useState("");

  const fetchAttendanceCount = async () => {
    try {
      const res = await api.get("/attendance-count");
      setAttendanceCount(res.data.count);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAttendanceCount();
  }, []);

  const handleAttendance = () => {
    setMessage("");
    setStudentName("");
    setConfidence("");
    setStatus("");
    setCapturing(true);
  };

  const captureFrame = async (image) => {
    try {
      const res = await api.post("/attendance-frame", {
        image,
      });

      const data = res.data;
      setName(data.name || "");
      setConfidence(data.confidence || "");
      setFace(data.face || null);

      if (data.status === "NO_FACE") {
        setStatus("🔴 No Face Detected");
        return;
      }

      if (data.status === "MULTIPLE_FACES") {
        setStatus("🟡 Multiple Faces Detected");
        return;
      }

      if (data.status === "UNKNOWN") {
        setStatus("❌ Unknown Person");
        return;
      }

      if (data.recognized) {
        setStudentName(data.name);
        setConfidence(data.confidence);
        setStatus(
          data.status === "MARKED"
            ? "✅ Attendance Marked"
            : "ℹ️ Already Marked Today",
        );

        setCapturing(false);

        fetchAttendanceCount();

        toast.success(data.name + " recognized");
      }
    } catch (err) {
      console.error(err);
      setCapturing(false);
      toast.error("Recognition failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Live Face Attendance
        </h1>

        <p className="text-gray-500 mt-1">
          Capture attendance using facial recognition.
        </p>
      </div>

      {/* Camera Status */}

      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
            <FaCamera className="text-blue-600 text-2xl" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Camera Status</h2>

            <p className="text-green-600 font-medium">Ready for Attendance</p>
          </div>
        </div>
      </div>

      {/* Attendance Count */}

      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
              <FaUserCheck className="text-green-600 text-2xl" />
            </div>

            <div>
              <h2 className="text-xl font-semibold">Today's Attendance</h2>

              <p className="text-gray-500">Students marked today</p>
            </div>
          </div>

          <span className="text-4xl font-bold text-blue-600">
            {attendanceCount}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-6 flex justify-center">
        <div className="w-full max-w-2xl">
          <Camera
            capturing={capturing}
            onCapture={captureFrame}
            face={face}
            name={name}
            confidence={confidence}
          />
        </div>
      </div>

      {/* Button */}

      <button
        onClick={handleAttendance}
        disabled={capturing}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-semibold transition"
      >
        {capturing ? "Recognizing..." : "Start Attendance"}
      </button>

      {/* Result */}

      {status && (
        <div className="bg-white rounded-xl border p-5 space-y-2">
          <h3 className="font-bold text-lg">Recognition Result</h3>

          <p>
            <strong>Status:</strong> {status}
          </p>

          {studentName && (
            <p>
              <strong>Name:</strong> {studentName}
            </p>
          )}

          {confidence !== "" && (
            <p>
              <strong>Confidence:</strong> {confidence}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
