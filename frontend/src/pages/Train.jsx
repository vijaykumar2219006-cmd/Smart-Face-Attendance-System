import { useEffect, useState } from "react";
import { FaBrain, FaCheckCircle, FaRobot, FaDatabase } from "react-icons/fa";
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
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
        {/* Header */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800">
            Train Face Recognition Model
          </h1>

          <p className="text-slate-500 mt-2 text-lg">
            Generate a new face recognition model using all registered student
            datasets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* LEFT */}

          <div className="lg:col-span-2">
            {/* Status */}

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-slate-200 p-6 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">
                  Current Model Status
                </span>

                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold
    ${
      status === "Ready"
        ? "bg-green-100 text-green-700"
        : status === "Training"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
    }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full
      ${
        status === "Ready"
          ? "bg-green-500"
          : status === "Training"
            ? "bg-yellow-500"
            : "bg-red-500"
      }`}
                  ></span>

                  {status}
                </span>
              </div>
            </div>

            {/* Training Process */}

            <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FaRobot className="text-blue-600 text-2xl" />

                <h2 className="text-xl font-bold text-blue-700">
                  Training Process
                </h2>
              </div>

              <ul className="space-y-3 text-slate-700">
                <li>✅ Reads all registered student images</li>

                <li>✅ Extracts facial features</li>

                <li>✅ Trains the LBPH Face Recognizer</li>

                <li>✅ Saves the trained model automatically</li>
              </ul>
            </div>

            {/* Dataset */}

            <div className="mt-8 bg-purple-50 rounded-2xl border border-purple-100 p-6">
              <div className="flex items-center gap-3">
                <FaDatabase className="text-purple-600 text-2xl" />

                <div>
                  <h3 className="font-bold text-purple-700">Dataset</h3>

                  <p className="text-slate-600 text-sm mt-1">
                    All registered student images will be used for model
                    training.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
              <h3 className="text-emerald-700 font-bold">
                🧠 Recognition Algorithm
              </h3>

              <p className="mt-2 text-slate-600">LBPH Face Recognizer</p>

              <p className="text-sm text-slate-500 mt-1">
                Fast • Lightweight • Accurate
              </p>
            </div>

            {/* Button */}

            <button
              onClick={handleTrain}
              disabled={loading}
              className="mt-8 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {loading
                ? "🧠 Training Face Recognition Model..."
                : "🚀 Train Face Recognition Model"}
            </button>

            {loading && (
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-slate-600">
                    Training Model...
                  </span>

                  <span className="text-blue-600">Please Wait</span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div className="h-3 bg-gradient-to-r from-blue-500 to-indigo-600 animate-pulse w-full"></div>
                </div>
              </div>
            )}

            {/* Success */}

            {message && (
              <div className="mt-8 rounded-2xl bg-green-50 border border-green-200 p-5 flex gap-4">
                <FaCheckCircle className="text-3xl text-green-600 mt-1" />

                <div>
                  <h3 className="font-bold text-green-700">
                    Model Trained Successfully
                  </h3>

                  <p className="text-green-600 mt-1">The face recognition model has been trained successfully and is now ready for attendance.</p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT */}

          <div className="lg:col-span-3">
            <div className="h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 rounded-3xl border border-blue-100 shadow-lg flex flex-col items-center justify-center p-10">
              <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center">
                <FaBrain className="text-7xl text-blue-600 animate-pulse" />
              </div>

              <h2 className="text-3xl font-bold text-slate-800 mt-8">
                AI Face Recognition
              </h2>

              <p className="text-slate-600 text-center max-w-lg mt-5 leading-7">
                Train the LBPH Face Recognition model using all registered
                student datasets. The system extracts facial features, generates
                a new recognition model and stores it automatically for
                attendance recognition.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-6 w-full">
                <div className="bg-white rounded-2xl shadow p-5 text-center">
                  <h3 className="text-3xl font-bold text-blue-600">📷</h3>

                  <p className="text-slate-500 mt-2">Face Detection</p>
                </div>

                <div className="bg-white rounded-2xl shadow p-5 text-center">
                  <h3 className="text-3xl font-bold text-green-600">LBPH</h3>

                  <p className="text-slate-500 mt-2">Algorithm</p>
                </div>

                <div className="bg-white rounded-2xl shadow p-5 text-center">
                  <h3 className="text-3xl font-bold text-purple-600">⚡</h3>

                  <p className="text-slate-500 mt-2">Auto Training</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
