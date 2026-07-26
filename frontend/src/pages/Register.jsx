import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function RegisterStudent() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim()) {
      alert("Please enter student name.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/register", {
        name,
      });

      alert(response.data.message);

      navigate("/students");
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Register Student
        </h1>

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
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        <div className="mt-8 p-5 rounded-xl bg-blue-50 border border-blue-100">

          <h3 className="font-semibold text-blue-700">
            Face Dataset
          </h3>

          <p className="text-gray-600 mt-2">
            Clicking Register Student will open the camera and capture
            approximately 100 face images for training.
          </p>

        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition"
        >
          {loading ? "Registering..." : "Register Student"}
        </button>

      </div>

    </div>
  );
}