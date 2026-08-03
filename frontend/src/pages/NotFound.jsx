import { useNavigate } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-10 text-center">

        <div className="w-24 h-24 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center text-4xl">
          <FaExclamationTriangle />
        </div>

        <h1 className="text-7xl font-extrabold text-slate-800 mt-6">
          404
        </h1>

        <h2 className="text-3xl font-bold text-slate-700 mt-3">
          Page Not Found
        </h2>

        <p className="text-slate-500 mt-4 leading-relaxed">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FaHome />
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}