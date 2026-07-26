import { useEffect, useState } from "react";
import { FaBrain, FaCheckCircle, FaRobot } from "react-icons/fa";
import api from "../services/api";

export default function Train() {
  const [status, setStatus] = useState("Loading...");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchStatus = async () => {
    try {
      const res = await api.get("/model-status");
      setStatus(res.data.status);
    } catch (err) {
      console.error(err);
      setStatus("Unknown");
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleTrain = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await api.post("/train");

      setMessage(res.data.message);

      await fetchStatus();
    } catch (err) {
      console.error(err);
      setMessage("Training failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

        <div className="flex items-center gap-4 mb-6">

          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
            <FaBrain className="text-2xl text-blue-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Train Face Recognition Model
            </h1>

            <p className="text-gray-500 mt-1">
              Generate the face recognition model from all registered students.
            </p>
          </div>

        </div>

        {/* Status Card */}

        <div className="bg-slate-50 rounded-xl border border-gray-200 p-5 mb-6">

          <div className="flex justify-between items-center">

            <span className="font-medium text-gray-700">
              Current Model Status
            </span>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                status === "Ready"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status}
            </span>

          </div>

        </div>

        {/* Information */}

        <div className="bg-blue-50 rounded-xl border border-blue-100 p-6 mb-8">

          <div className="flex items-start gap-3">

            <FaRobot className="text-blue-600 text-xl mt-1" />

            <div>

              <h2 className="font-semibold text-blue-700 mb-3">
                Training Process
              </h2>

              <ul className="space-y-2 text-gray-600">

                <li>• Reads all registered student images</li>

                <li>• Extracts facial features</li>

                <li>• Trains the LBPH Face Recognizer</li>

                <li>• Saves the trained model</li>

              </ul>

            </div>

          </div>

        </div>

        {/* Train Button */}

        <button
          onClick={handleTrain}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-semibold transition"
        >
          {loading ? "Training Model..." : "Train Model"}
        </button>

        {/* Success Message */}

        {message && (
          <div className="mt-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">

            <FaCheckCircle className="text-green-600 text-xl" />

            <span className="text-green-700 font-medium">
              {message}
            </span>

          </div>
        )}

      </div>

    </div>
  );
}