import {
  FaBars,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const username = localStorage.getItem("username") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/login");
  };

  useEffect(() => {
  function handleClickOutside(event) {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setShowMenu(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden w-10 h-10 rounded-xl bg-gray-100 hover:bg-indigo-100 flex items-center justify-center"
        >
          <FaBars className="text-gray-700" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
            {greeting}, {username}
          </h1>

          <p className="hidden md:block text-gray-500 text-sm mt-1">
            Welcome back to Smart Face Attendance System
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-5">
        {/* Notification */}
        {/* <button
          onClick={() => navigate("/settings")}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-indigo-100 rounded-xl flex items-center justify-center transition-all duration-300 group"
        >
          <FaCog className="text-gray-600 group-hover:text-indigo-600 text-lg" />
        </button> */}

        {/* Divider */}
        <div className="w-px h-10 bg-gray-200"></div>

        {/* Profile */}
        {/* Profile Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 hover:bg-gray-100 rounded-xl px-2 py-1 transition"
          >
            <FaUserCircle size={40} className="text-blue-600" />

            <div className="hidden sm:block text-left">
              <p className="font-semibold text-gray-800">{username}</p>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>

            <FaChevronDown
              className={`hidden sm:block text-gray-500 transition-transform duration-300 ${
                showMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
              {/* User Info */}
              <div className="px-5 py-4 border-b">
                <p className="font-semibold text-gray-800">{username}</p>
                <p className="text-sm text-gray-500">Administrator</p>
              </div>

              {/* Settings */}
              <button
                onClick={() => {
                  navigate("/settings");
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition"
              >
                <FaCog className="text-indigo-600" />
                Settings
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600 transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
