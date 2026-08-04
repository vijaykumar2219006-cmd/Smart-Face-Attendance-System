import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaBrain,
  FaCamera,
  FaHistory,
  FaBolt,
  FaCog,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <FaHome />, path: "/" },
  { name: "Students", icon: <FaUsers />, path: "/students" },
  { name: "Register", icon: <FaUserPlus />, path: "/register" },
  { name: "Train", icon: <FaBrain />, path: "/train" },
  { name: "Attendance", icon: <FaCamera />, path: "/attendance" },
  { name: "History", icon: <FaHistory />, path: "/history" },
  {
    name: "Settings",
    path: "/settings",
    icon: <FaCog />,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-white border-r border-slate-200 flex flex-col shadow-xl">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center text-xl shadow-lg">
            <FaBolt />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-800">
              Face Attendance
            </h1>

            <p className="text-sm text-slate-500">Smart Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6 space-y-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `group flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-[1.02]"
                  : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:translate-x-1"
              }`
            }
          >
            <span className="text-xl transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </span>

            {item.name}
          </NavLink>
        ))}
      </nav>

      
    </aside>
  );
}
