import { useEffect, useState } from "react";
import {
  FaUsers,
  FaClipboardCheck,
  FaBrain,
  FaUserPlus,
  FaCamera,
  FaUserTimes,
  FaChartLine,
  FaCalendarAlt,
  FaClock,
  FaBullseye,
  FaArrowRight,
} from "react-icons/fa";
import ProfileImage from "../components/ProfileImage";
import DashboardSkeleton from "../components/DashboardSkeleton";

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
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [dashboard, weekly] = await Promise.all([
          api.get("/dashboard-stats"),
          api.get("/weekly-attendance"),
        ]);

        setStats(dashboard.data);
        setChartData(weekly.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Good{" "}
            {new Date().getHours() < 12
              ? "Morning"
              : new Date().getHours() < 18
                ? "Afternoon"
                : "Evening"}{" "}
            👋
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back! Here's today's attendance overview.
            
          </p>
          <p className="text-gray-500 mt-2">
            Ready to manage today's attendance efficiently.
            
          </p>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl text-white px-5 py-5 shadow-xl w-full sm:w-auto sm:min-w-[260px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-indigo-100">Today</p>

              <h3 className="text-2xl font-bold mt-1">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </h3>

              <p className="mt-2 text-indigo-100">
                {new Date().toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <p className="mt-3 text-xl font-semibold">
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
              <FaCalendarAlt />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Model Status */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-5 hover:shadow-xl transition-all duration-300">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl">
              <FaBrain />
            </div>

            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Model Status
              </p>

              <div className="flex items-center gap-2 mt-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>

                <h2 className="text-4xl font-bold mt-2 text-slate-800">
                  {stats.modelStatus}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-6">
                <div>
                  <p className="text-xs uppercase text-slate-400">Algorithm</p>

                  <p className="font-semibold text-slate-700 mt-1">
                    LBPH Recognizer
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-slate-400">Status</p>

                  <span className="inline-flex mt-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                    Active
                  </span>
                </div>

                <div>
                  <p className="text-xs uppercase text-slate-400">Students</p>

                  <p className="font-semibold text-slate-700 mt-1">
                    {stats.totalStudents}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-slate-400">
                    Last Updated
                  </p>

                  <p className="font-semibold text-slate-700 mt-1">
                    {new Date().toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Attendance */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Recent Attendance
                </h2>

                <p className="text-sm text-slate-600 mt-1">
                  Latest attendance records
                </p>
              </div>

              <button
                onClick={() => navigate("/history")}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                View All
                <FaArrowRight />
              </button>
            </div>

            {stats.recentAttendance?.length > 0 ? (
              <div className="space-y-4">
                {stats.recentAttendance.slice(0, 2).map((student, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start">
                      {/* Left */}
                      <div className="flex gap-4">
                        <ProfileImage studentName={student.name} />

                        <div>
                          <h3 className="font-bold text-lg text-slate-800">
                            {student.name}
                          </h3>

                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">
                            <span className="flex items-center gap-2">
                              <FaCalendarAlt className="text-blue-500" />
                              {new Date(student.date).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </span>

                            <span className="flex items-center gap-2">
                              <FaClock className="text-green-500" />
                              {student.time}
                            </span>

                            <span className="flex items-center gap-2">
                              <FaBullseye className="text-orange-500" />
                              {student.confidence ?? "N/A"}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right */}
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          student.status === "Present"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center text-5xl mb-6">
                  📋
                </div>

                <h2 className="text-2xl font-bold text-slate-800">
                  No Attendance Records
                </h2>

                <p className="text-slate-500 mt-3 text-center max-w-sm">
                  Attendance records will appear here after students
                  successfully mark their attendance.
                </p>

                <button
                  onClick={() => navigate("/attendance")}
                  className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Mark Attendance
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="xl:col-span-2">
          <AttendanceChart data={chartData} />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Quick Actions
          </h2>

          <div className="flex flex-col gap-5">
            {/* Register */}
            <button
              onClick={() => navigate("/register")}
              className="group bg-white rounded-3xl border border-slate-200 p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <FaUserPlus />
                  </div>

                  <div className="text-left">
                    <h3 className="font-bold text-slate-800">
                      Register Student
                    </h3>

                    <p className="text-sm text-slate-600 mt-1">
                      Add a new student to the system
                    </p>
                  </div>
                </div>

                <FaArrowRight className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </button>

            {/* Train */}
            <button
              onClick={() => navigate("/train")}
              className="group bg-white rounded-3xl border border-slate-200 p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                    <FaBrain />
                  </div>

                  <div className="text-left">
                    <h3 className="font-bold text-slate-800">Train Model</h3>

                    <p className="text-sm text-slate-600 mt-1">
                      Update the face recognition model
                    </p>
                  </div>
                </div>

                <FaArrowRight className="text-slate-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </button>

            {/* Attendance */}
            <button
              onClick={() => navigate("/attendance")}
              className="group bg-white rounded-3xl border border-slate-200 p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                    <FaCamera />
                  </div>

                  <div className="text-left">
                    <h3 className="font-bold text-slate-800">
                      Mark Attendance
                    </h3>

                    <p className="text-sm text-slate-600 mt-1">
                      Start live face recognition
                    </p>
                  </div>
                </div>

                <FaArrowRight className="text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
