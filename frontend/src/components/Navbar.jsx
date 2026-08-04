import { FaCog, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const username = localStorage.getItem("username") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/login");
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {greeting}, {username}
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Welcome back to Smart Face Attendance System
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <button
          onClick={() => navigate("/settings")}
          className="w-12 h-12 bg-gray-100 hover:bg-indigo-100 rounded-xl flex items-center justify-center transition-all duration-300 group"
        >
          <FaCog className="text-gray-600 group-hover:text-indigo-600 text-lg" />
        </button>

        {/* Divider */}
        <div className="w-px h-10 bg-gray-200"></div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <FaUserCircle size={40} className="text-blue-600" />

          <div>
            <p className="font-semibold text-gray-800">{username}</p>

            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
}
