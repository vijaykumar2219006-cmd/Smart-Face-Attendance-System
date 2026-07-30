import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import ProfileImage from "../components/ProfileImage";
import { FaArrowLeft, FaUserGraduate } from "react-icons/fa";

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
    <h1 className="text-4xl font-bold text-gray-800">
      Student Profile
    </h1>

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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition duration-300">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ProfileImage studentName={student.name} size={110} />

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-800">
                  {student.name}
                </h1>

                <p className="text-gray-500 mt-2">Registered Student</p>
              </div>

              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                ● Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div>
                <p className="text-sm text-gray-500">Registration Date</p>

                <p className="font-semibold text-gray-800 mt-1">
                  {new Date(student.registeredAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Student ID</p>

                <p className="font-mono text-gray-800 mt-1">{student._id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition duration-300">
          <p className="text-gray-500 text-sm">Total Attendance</p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">
            {totalAttendance}
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition duration-300">
          <p className="text-gray-500 text-sm">Last Seen</p>

          <h2 className="text-lg font-semibold mt-3">
            {history.length ? history[0].date : "N/A"}
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition duration-300">
          <p className="text-gray-500 text-sm">Status</p>

          <h2 className="text-lg font-semibold text-green-600 mt-3">Active</h2>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition duration-300">
          <p className="text-gray-500 text-sm">Last Confidence</p>

          <h2 className="text-lg font-semibold mt-3">
            {history.length ? `${history[0].confidence}%` : "N/A"}
          </h2>
        </div>
      </div>

      {/* Attendance History */}

      <div className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-lg transition duration-300">
        <h2 className="text-2xl font-semibold mb-5">Attendance History</h2>

        <table className="w-full">
          <thead className="bg-slate-50 text-gray-600 uppercase text-sm border-b border-gray-200">
            <tr className="border-b">
              <th className="text-left py-3">Date</th>
              <th className="text-left py-3">Time</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Confidence</th>
            </tr>
          </thead>

          <tbody>
            {history.length > 0 ? (
              history.map((record, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-blue-50 transition"
                >
                  <td className="py-4">{record.date}</td>

                  <td>{record.time}</td>

                  <td>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      {record.status}
                    </span>
                  </td>

                  <td className="font-semibold text-blue-600">
                    {record.confidence}%
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-10 text-center text-gray-500">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
