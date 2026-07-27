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
        setStatus("🟢 Face Detected");
        setStatusColor("text-green-600");
      }

      if (data.status === "NO_FACE") {
        setStatus("🔴 No Face Detected");
        setStatusColor("text-red-600");
      }

      if (data.status === "MULTIPLE_FACES") {
        setStatus("🟡 Multiple Faces Detected");
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
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-800">Register Student</h1>

        <p className="text-gray-500 mt-2">
          Register a new student by capturing face images.
        </p>

        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student Name
          </label>

          <input
            type="text"
            placeholder="Enter student name"
            value={name}
            disabled={capturing}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
          />
        </div>

        <div className="mt-8 p-5 rounded-xl bg-blue-50 border border-blue-100">
          <Camera
  capturing={capturing}
  onCapture={captureFrame}
  face={face}
/>

          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Images Captured</span>
              <span>{imageCount}/100</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all duration-300"
                style={{
                  width: `${(imageCount / 100) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className={`mt-4 text-center font-semibold ${statusColor}`}>
            {status}
          </div>

          <p className="text-gray-500 text-center mt-2">
            Move your head slowly. Keep only one face in front of the camera.
          </p>

          <h3 className="font-semibold text-blue-700">Face Dataset</h3>

          <p className="text-gray-600 mt-2">
            Clicking Register Student will open the camera and capture
            approximately 100 face images for training.
          </p>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading || capturing}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition"
        >
          {loading
            ? "Starting..."
            : capturing
              ? "Capturing Faces..."
              : "Register Student"}
        </button>
      </div>
    </div>
  );
}
