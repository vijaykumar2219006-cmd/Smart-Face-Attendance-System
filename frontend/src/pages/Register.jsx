import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import Camera from "../components/Camera";
// import Camera from "../components/Camera";

export default function RegisterStudent() {
  const [face, setFace] = useState(null);
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("text-gray-500");
  const [capturing, setCapturing] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  // const [webcamRef, setWebcamRef] = useState(null);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  

  const handleRegister = async () => {
    if (!name.trim()) {
      toast.error("Please enter a student name.");
      return;
    }

    setLoading(true);

    const loadingToast = toast.loading(
      "Opening camera and registering student...",
    );

    try {
      const response = await api.post("/register", {
        name,
      });
      console.log(response.data);
      setImageCount(response.data.count);

      toast.dismiss(loadingToast);
      toast.success("Camera started. Look at the camera.");
      setCapturing(true);
    } catch (err) {
      console.error(err);
      console.log(err.response);

      toast.dismiss(loadingToast);

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed.";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const captureFrame = async (image) => {
    try {
      const response = await api.post("/register-frame", {
        image,
      });

      const data = response.data;
      setFace(data.face || null);

      setImageCount(data.count);

      if (data.status === "FACE_DETECTED") {
        setStatus(" Face Detected");
        setStatusColor("text-green-600");
      }

      if (data.status === "NO_FACE") {
        setStatus(" No Face Detected");
        setStatusColor("text-red-600");
      }

      if (data.status === "MULTIPLE_FACES") {
        setStatus(" Multiple Faces Detected");
        setStatusColor("text-yellow-600");
      }

      if (data.completed) {
        setCapturing(false);

        toast.success("Student Registered Successfully!");

        navigate("/students");
      }
    } catch (err) {
      console.error(err);

      setCapturing(false);

      toast.error("Camera connection lost.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800">
            Register Student
          </h1>

          <p className="text-slate-500 mt-2 text-lg">
            Register a new student by capturing facial images for attendance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Student Name
              </label>

              <input
                type="text"
                placeholder="Enter student name"
                value={name}
                disabled={capturing}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 text-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
              />
            </div>

            {/* Progress */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-slate-700">
                  Capture Progress
                </span>

                <span className="font-bold text-blue-600">
                  {imageCount} / 100 Images
                </span>
              </div>

              <div className="w-full h-4 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
                  style={{
                    width: `${imageCount}%`,
                  }}
                />
              </div>
            </div>

            {/* Detection Status */}
            <div className="mt-8">
              <h3 className="font-semibold text-slate-700 mb-3">
                Detection Status
              </h3>

              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold
    ${
      status.includes("No Face")
        ? "bg-red-100 text-red-700"
        : status.includes("Multiple")
          ? "bg-orange-100 text-orange-700"
          : status.includes("Face Detected")
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
    }`}
              >
                <span
                  className={`w-2 h-2 rounded-full
      ${
        status.includes("No Face")
          ? "bg-red-500"
          : status.includes("Multiple")
            ? "bg-orange-500"
            : status.includes("Face Detected")
              ? "bg-green-500"
              : "bg-yellow-500"
      }`}
                ></span>

                {status || "Waiting for camera..."}
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-100 p-5">
              <h3 className="text-lg font-bold text-blue-700 mb-4">
                📋 Capture Instructions
              </h3>

              <ul className="space-y-3 text-slate-700">
                <li>✅ Keep only one face in front of the camera.</li>

                <li>✅ Slowly move your head left and right.</li>

                <li>✅ Look directly into the camera.</li>

                <li>✅ Maintain good lighting.</li>

                <li>✅ Wait until all 100 images are captured.</li>
              </ul>
            </div>

            {/* Button */}

            <button
              onClick={handleRegister}
              disabled={loading || capturing}
              className="mt-8 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {loading
                ? "Starting Camera..."
                : capturing
                  ? `📸 Capturing ${imageCount}/100`
                  : "Register Student"}
            </button>
          </div>

          {/* RIGHT SIDE */}

          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border-2 border-blue-500 shadow-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

                <h3 className="text-2xl font-bold text-slate-800">
                  Live Camera
                </h3>
              </div>

              <Camera
                capturing={capturing}
                onCapture={captureFrame}
                face={face}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
