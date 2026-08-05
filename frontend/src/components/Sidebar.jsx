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

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
      fixed top-0 left-0 h-screen w-72 bg-white border-r border-slate-200
      flex flex-col shadow-xl z-50 transform transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0
    `}
      >
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

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setSidebarOpen(false)}
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

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-sm font-medium text-green-600">
                System Online
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Smart Face Attendance • v1.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
