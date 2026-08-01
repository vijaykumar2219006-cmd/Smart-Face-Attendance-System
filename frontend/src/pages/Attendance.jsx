import { useEffect, useState, useRef } from "react";
import { FaCamera, FaUserCheck, FaPlay, FaInfoCircle } from "react-icons/fa";
import api from "../services/api";
import Camera from "../components/Camera";
import toast from "react-hot-toast";

export default function Attendance() {
  const [name, setName] = useState("");
  const [confidence, setConfidence] = useState("");
  const [face, setFace] = useState(null);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [capturing, setCapturing] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [status, setStatus] = useState("");

  const processingRef = useRef(false);

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
    setStudentName("");
    setConfidence("");
    setStatus("");
    setCapturing(true);
  };

  const captureFrame = async (image) => {
    if (processingRef.current) return;

    processingRef.current = true;

    try {
      const res = await api.post("/attendance-frame", {
        image,
      });

      const data = res.data;

      setName(data.name || "");
      setConfidence(data.confidence || "");
      setFace(data.face || null);

      if (data.status === "NO_FACE") {
        setStatus("No Face Detected");
        return;
      }

      if (data.status === "MULTIPLE_FACES") {
        setStatus("Multiple Faces Detected");
        return;
      }

      if (data.status === "UNKNOWN") {
        setStatus("Unknown Person");
        return;
      }

      if (data.recognized) {
        setStudentName(data.name);
        setConfidence(data.confidence);

        setStatus(
          data.status === "MARKED"
            ? "Attendance Marked"
            : "Already Marked Today",
        );

        setCapturing(false);

        fetchAttendanceCount();

        if (data.status === "MARKED") {
          toast.success(`Attendance marked for ${data.name}`);
        } else {
          toast.success(`${data.name} already marked today`);
        }
      }
    } catch (err) {
      console.error(err);

      setCapturing(false);

      toast.error("Recognition failed");
    } finally {
      processingRef.current = false;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-800">
          Live Face Attendance
        </h1>

        <p className="text-slate-500 mt-2 text-lg">
          Capture student attendance using AI-powered face recognition.
        </p>
      </div>

      {/* Top Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Camera */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 min-h-[120px] flex items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <FaCamera className="text-2xl text-blue-600" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Camera Status
              </h3>

              <p
                className={`font-medium ${
                  capturing ? "text-blue-600" : "text-green-600"
                }`}
              >
                {capturing ? "Recognizing Face..." : "Ready for Recognition"}
              </p>
            </div>
          </div>
        </div>

        {/* Attendance */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                <FaUserCheck className="text-2xl text-green-600" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Today's Attendance
                </h2>

                <p className="text-slate-500">Students Present Today</p>

                <p className="text-xs text-slate-400 mt-1">
                  Live attendance count
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end justify-center">
    <h1 className="text-6xl font-extrabold text-blue-600">
        {attendanceCount}
    </h1>

    <p className="text-xs uppercase text-slate-400 tracking-wider">
        Students
    </p>
</div>
          </div>
        </div>
      </div>

      {/* Main Layout */}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* LEFT PANEL */}

        <div className="lg:col-span-2 space-y-6">
          {/* Recognition Status */}

          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Recognition Status
            </h2>

            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold
                ${
                  status.includes("Attendance")
                    ? "bg-green-100 text-green-700"
                    : status.includes("Already")
                      ? "bg-blue-100 text-blue-700"
                      : status.includes("Unknown")
                        ? "bg-red-100 text-red-700"
                        : status.includes("Multiple")
                          ? "bg-orange-100 text-orange-700"
                          : status.includes("No Face")
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                }`}
            >
              <span
                className={`w-2 h-2 rounded-full
                  ${
                    status.includes("Attendance")
                      ? "bg-green-500"
                      : status.includes("Already")
                        ? "bg-blue-500"
                        : status.includes("Unknown")
                          ? "bg-red-500"
                          : status.includes("Multiple")
                            ? "bg-orange-500"
                            : status.includes("No Face")
                              ? "bg-red-500"
                              : "bg-yellow-500"
                  }`}
              ></span>

              {status || "Waiting for recognition..."}
            </div>

            {studentName && (
              <div className="rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 p-5 transition-all duration-500 ease-in-out">
                <h3 className="font-bold text-lg text-slate-800 mb-4">
                  Recognition Result
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-xs uppercase text-slate-500">Student</p>

                    <h2 className="text-3xl font-bold text-slate-800 mt-1">
                      {studentName}
                    </h2>
                  </div>

                  <div className="text-center">
                    <p className="text-xs uppercase text-slate-500">
                      Confidence
                    </p>

                    <h2 className="text-3xl font-bold text-blue-600 mt-1">
                      {confidence}%
                    </h2>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}

          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaInfoCircle className="text-blue-600 text-xl" />

              <h2 className="text-xl font-bold text-blue-700">
                Attendance Instructions
              </h2>
            </div>

            <ul className="space-y-3 text-slate-700">
              <li>✅ Keep only one face in front of the camera.</li>

              <li>✅ Ensure proper lighting.</li>

              <li>✅ Look directly at the camera.</li>

              <li>✅ Wait until attendance is confirmed.</li>
            </ul>
          </div>

          {/* Start Button */}

          <button
            onClick={handleAttendance}
            disabled={capturing}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {/* <FaPlay /> */}

            {capturing ? "🔍 Recognizing..." : "🎥 Start Recognition"}
          </button>
        </div>

        {/* RIGHT PANEL */}

        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl border-2 border-blue-500 shadow-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>

              <h2 className="text-2xl font-bold text-slate-800">Live Camera</h2>
              <p className="text-sm text-slate-500">
    Real-time Face Detection
</p>
            </div>

            <Camera
              capturing={capturing}
              onCapture={captureFrame}
              face={face}
              name={name}
              confidence={confidence}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
