import { useEffect, useState } from "react";
import { FaCamera, FaCheckCircle, FaSpinner, FaUserCheck } from "react-icons/fa";
import api from "../services/api";

export default function Attendance() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [attendanceCount, setAttendanceCount] = useState(0);

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

  const handleAttendance = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await api.post("/attendance");

      setMessage(res.data.message);

      fetchAttendanceCount();
    } catch (err) {
      console.error(err);
      setMessage("Failed to mark attendance.");
    } finally {
      setLoading(false);
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
            <h2 className="text-xl font-semibold">
              Camera Status
            </h2>

            <p className="text-green-600 font-medium">
              Ready for Attendance
            </p>
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
              <h2 className="text-xl font-semibold">
                Today's Attendance
              </h2>

              <p className="text-gray-500">
                Students marked today
              </p>
            </div>

          </div>

          <span className="text-4xl font-bold text-blue-600">
            {attendanceCount}
          </span>

        </div>

      </div>

      {/* Button */}

      <button
        onClick={handleAttendance}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-semibold transition"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <FaSpinner className="animate-spin" />
            Recognizing Faces...
          </span>
        ) : (
          "Start Attendance"
        )}
      </button>

      {/* Result */}

      {message && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">

          <FaCheckCircle className="text-green-600 text-xl" />

          <span className="text-green-700 font-medium">
            {message}
          </span>

        </div>
      )}

    </div>
  );
}