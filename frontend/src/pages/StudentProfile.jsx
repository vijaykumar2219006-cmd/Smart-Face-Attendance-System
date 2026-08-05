import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import ProfileImage from "../components/ProfileImage";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaChartBar,
  FaBullseye,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [history, setHistory] = useState([]);
  const [totalAttendance, setTotalAttendance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await api.get(`/student/${id}`);

      setStudent(res.data.student);
      setHistory(res.data.attendanceHistory);
      setTotalAttendance(res.data.totalAttendance);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
        <h2 className="text-2xl font-bold text-red-600">Student Not Found</h2>

        <p className="text-gray-500 mt-2">
          The requested student does not exist.
        </p>

        <button
          onClick={() => navigate("/students")}
          className="mt-6 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Back to Students
        </button>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Student Profile</h1>

          <p className="text-gray-500 mt-2">
            View student details and attendance history.
          </p>
        </div>

        <button
          onClick={() => navigate("/students")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <FaArrowLeft />
          Back to Students
        </button>
      </div>

      {/* Student Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left */}
          <div className="flex items-center gap-6">
            <ProfileImage studentName={student.name} size={110} />

            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                {student.name}
              </h1>

              <p className="text-slate-500 mt-1">Registered Student</p>

              <span className="inline-flex items-center mt-4 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                ● Active
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl p-5">
              <FaCalendarAlt className="text-blue-600 text-xl mb-3" />

              <p className="text-sm text-slate-500">Registered</p>

              <p className="font-semibold mt-2">
                {new Date(student.registeredAt).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5">
              <FaChartBar className="text-indigo-600 text-xl mb-3" />

              <p className="text-sm text-slate-500">Attendance</p>

              <p className="font-bold text-2xl mt-2">{totalAttendance}</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5">
              <FaBullseye className="text-orange-500 text-xl mb-3" />

              <p className="text-sm text-slate-500">Best Confidence</p>

              <p className="font-bold text-2xl mt-2">
                {history.length ? `${history[0].confidence}%` : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Attendance */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm uppercase text-slate-500">
                Total Attendance
              </p>

              <h2 className="text-4xl font-bold text-blue-600 mt-3">
                {totalAttendance}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <FaChartBar className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Last Seen */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm uppercase text-slate-500">Last Seen</p>

              <h2 className="text-lg font-semibold mt-3">
                {history.length ? history[0].date : "N/A"}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
              <FaClock className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm uppercase text-slate-500">Status</p>

              <h2 className="text-lg font-semibold text-green-600 mt-3">
                Active
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Confidence */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm uppercase text-slate-500">Confidence</p>

              <h2 className="text-lg font-semibold mt-3">
                {history.length ? `${history[0].confidence}%` : "N/A"}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <FaBullseye className="text-orange-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
              <FaCalendarAlt className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Attendance History
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Complete attendance records for this student.
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        {history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">Date</th>

                  <th className="px-6 py-4">Time</th>

                  <th className="px-6 py-4">Status</th>

                  <th className="px-6 py-4">Confidence</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {history.map((record, index) => {
                  const confidence = Number(record.confidence) || 0;

                  return (
                    <tr
                      key={index}
                      className="hover:bg-blue-50/50 transition-colors duration-200"
                    >
                      {/* Date */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                            <FaCalendarAlt className="text-blue-600 text-sm" />
                          </div>

                          <span className="font-medium text-slate-700">
                            {record.date}
                          </span>
                        </div>
                      </td>

                      {/* Time */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <FaClock className="text-purple-500" />

                          <span className="text-slate-700">{record.time}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                          <FaCheckCircle />

                          {record.status}
                        </span>
                      </td>

                      {/* Confidence */}
                      <td className="px-6 py-5">
                        <div className="w-44">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <FaBullseye className="text-orange-500" />

                              <span className="text-sm text-slate-600">
                                Confidence
                              </span>
                            </div>

                            <span className="font-semibold text-blue-600">
                              {confidence.toFixed(2)}%
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(confidence, 100)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center">
              <FaCalendarAlt className="text-blue-500 text-2xl" />
            </div>

            <h3 className="text-lg font-semibold text-slate-800 mt-4">
              No attendance yet
            </h3>

            <p className="text-slate-500 text-sm mt-2">
              Attendance records will appear here after the student is
              recognized.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
