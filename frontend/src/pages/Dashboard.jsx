import { useEffect, useState } from "react";
import {
  FaUsers,
  FaClipboardCheck,
  FaBrain,
  FaUserPlus,
  FaCamera,
  FaUserTimes,
  FaChartLine,
} from "react-icons/fa";
import ProfileImage from "../components/ProfileImage";

import { useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard";
import api from "../services/api";
import AttendanceChart from "../components/AttendanceChart";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    todayAttendance: 0,
    totalAttendance: 0,
    modelStatus: "Not Trained",
  });

  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const response = await api.get("/dashboard-stats");
        setStats(response.data);

        const weekly = await api.get("/weekly-attendance");
        setChartData(weekly.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>

        <p className="text-gray-500 mt-2">
          Monitor students, attendance records and model status.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          subtitle="Registered Students"
          icon={<FaUsers />}
          color="blue"
        />

        <StatCard
          title="Present Today"
          value={stats.todayAttendance}
          subtitle="Students Present"
          icon={<FaClipboardCheck />}
          color="green"
        />

        <StatCard
          title="Absent Today"
          value={stats.absentToday}
          subtitle="Students Absent"
          icon={<FaUserTimes />}
          color="red"
        />

        <StatCard
          title="Attendance Rate"
          value={`${stats.attendancePercentage}%`}
          subtitle="Today's Attendance"
          icon={<FaChartLine />}
          color="purple"
        />
      </div>

      {/* Recent Attendance */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">
          Recent Attendance
        </h2>

        {stats.recentAttendance?.length > 0 ? (
          <div className="space-y-4">
            {stats.recentAttendance.map((student, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 rounded-xl hover:bg-blue-50 transition border-b last:border-none"
              >
                <div className="flex items-center gap-4">
                  <ProfileImage studentName={student.name} />

                  <div>
                    <p className="font-semibold text-gray-800">
                      {student.name}
                    </p>

                    <p className="text-sm text-gray-500">{student.date}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-700">{student.time}</p>

                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {student.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No attendance records found.</p>
        )}
      </div>

      <AttendanceChart data={chartData} />

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Register */}
          <button
            onClick={() => navigate("/register")}
            className="bg-white rounded-2xl border border-gray-200 p-6 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
              <FaUserPlus size={24} />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              Register Student
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Add a new student and capture facial images for training.
            </p>
          </button>

          {/* Train */}
          <button
            onClick={() => navigate("/train")}
            className="bg-white rounded-2xl border border-gray-200 p-6 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-5">
              <FaBrain size={24} />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">Train Model</h3>

            <p className="text-gray-500 text-sm mt-2">
              Train the face recognition model using registered students.
            </p>
          </button>

          {/* Attendance */}
          <button
            onClick={() => navigate("/attendance")}
            className="bg-white rounded-2xl border border-gray-200 p-6 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-5">
              <FaCamera size={24} />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              Mark Attendance
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Start face recognition and automatically mark attendance.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
