import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaBrain,
  FaCamera,
  FaHistory,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <FaHome />, path: "/" },
  { name: "Students", icon: <FaUsers />, path: "/students" },
  { name: "Register", icon: <FaUserPlus />, path: "/register" },
  { name: "Train", icon: <FaBrain />, path: "/train" },
  { name: "Attendance", icon: <FaCamera />, path: "/attendance" },
  { name: "History", icon: <FaHistory />, path: "/history" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm flex flex-col">

      {/* Logo */}
      <div className="px-6 py-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">
          Face Attendance
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Smart Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">

        {menuItems.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>

        ))}

      </nav>

      {/* Footer */}
      <div className="border-t p-5">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            A
          </div>

          <div>

            <h3 className="font-semibold">
              Admin
            </h3>

            <p className="text-sm text-gray-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}