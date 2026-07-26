import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaBrain,
  FaCamera,
  FaHistory,
  FaBolt,
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
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">

      {/* Logo */}
      <div className="px-6 py-7 border-b">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center">

            <FaBolt />

          </div>

          <div>

            <h1 className="text-xl font-bold text-gray-800">
              Face Attendance
            </h1>

            <p className="text-sm text-gray-500">
              Smart Management
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6 space-y-2">

        {menuItems.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-semibold border border-blue-200"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              }`
            }
          >

            <span className="text-lg">

              {item.icon}

            </span>

            {item.name}

          </NavLink>

        ))}

      </nav>

      {/* Footer */}

      <div className="border-t p-5">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">

            A

          </div>

          <div>

            <p className="font-semibold text-gray-800">

              Admin

            </p>

            <p className="text-sm text-gray-500">

              Administrator

            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}