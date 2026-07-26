import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed."
      );
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-2xl p-10 w-[400px]"
      >

        <h1 className="text-3xl font-bold mb-8 text-center">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-600 mb-4">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Username"
          className="w-full border rounded-lg p-3 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
}