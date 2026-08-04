import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">

      <Sidebar />

      {/* Main content */}
      <div className="ml-72 h-screen flex flex-col">

        <Navbar />

        <main className="flex-1 overflow-y-auto px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
}