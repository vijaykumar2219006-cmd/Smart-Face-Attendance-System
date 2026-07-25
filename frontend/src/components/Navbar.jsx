import {
  FaBell,
  FaSearch,
  FaUserCircle
} from "react-icons/fa";

export default function Navbar() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {greeting}, Admin 
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Welcome back to Smart Face Attendance System
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="relative">

          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Notification */}
        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition">

          <FaBell size={20} />

          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">

          <FaUserCircle size={38} className="text-blue-600" />

          <div>

            <p className="font-semibold">
              Admin
            </p>

            <p className="text-sm text-gray-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}