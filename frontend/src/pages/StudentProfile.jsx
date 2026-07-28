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
      <div className="text-center text-gray-500 py-10">
        Loading student...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center text-red-500 py-10">
        Student not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <button
        onClick={() => navigate("/students")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <FaArrowLeft />
        Back to Students
      </button>

      {/* Student Card */}
      <div className="bg-white rounded-2xl shadow-md border p-8">

        <div className="flex items-center gap-6">

          <ProfileImage studentName={student.name} size={96} />

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {student.name}
            </h1>

            <p className="text-gray-500 mt-2">
              Registered on{" "}
              {new Date(student.registeredAt).toLocaleDateString()}
            </p>
          </div>

        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow-md border p-6">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
            <FaUserGraduate className="text-green-600 text-2xl" />
          </div>

          <div>
            <p className="text-gray-500">
              Total Attendance
            </p>

            <h2 className="text-3xl font-bold">
              {totalAttendance}
            </h2>
          </div>

        </div>

      </div>

      {/* Attendance History */}

      <div className="bg-white rounded-2xl shadow-md border p-6">

        <h2 className="text-2xl font-semibold mb-5">
          Attendance History
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Date</th>
              <th className="text-left py-3">Time</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Confidence</th>

            </tr>

          </thead>

          <tbody>

            {history.map((record, index) => (

              <tr key={index} className="border-b">

                <td className="py-3">{record.date}</td>

                <td>{record.time}</td>

                <td>
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                    {record.status}
                  </span>
                </td>

                <td>{record.confidence}%</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}