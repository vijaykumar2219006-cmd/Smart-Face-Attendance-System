import { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";

import api from "../services/api";
import StudentModal from "../components/StudentModal";
import DeleteStudentModal from "../components/DeleteStudentModal";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await api.get("/students-list");
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (student) => {
    try {
      await api.delete(`/students/${student.name}`);

      setStudents((prev) =>
        prev.filter((s) => s.name !== student.name)
      );

      setStudentToDelete(null);

      alert("Student deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete student.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Students
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all registered students.
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-md transition">
          + Register Student
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 111.398-1.398l3.85 3.85-1.414 1.414-3.834-3.866z" />
            </svg>
          </div>

          <div className="bg-blue-50 text-blue-700 px-5 py-3 rounded-xl font-semibold">
            {filteredStudents.length} Students
          </div>

        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-50 text-gray-600 uppercase text-sm border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left">Student</th>
              <th className="px-6 py-4 text-left">Images</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-100 hover:bg-blue-50 transition-all duration-200"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow">
                        {student.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {student.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Registered Student
                        </p>
                      </div>

                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span className="font-semibold text-gray-700">
                      {student.images}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Active
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-3">

                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="w-10 h-10 rounded-xl bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white transition flex items-center justify-center"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => setStudentToDelete(student)}
                        className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-600 text-red-600 hover:text-white transition flex items-center justify-center"
                      >
                        <FaTrash />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-12 text-center text-gray-500"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

      {/* Student Details Modal */}
      <StudentModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteStudentModal
        student={studentToDelete}
        onClose={() => setStudentToDelete(null)}
        onDelete={handleDelete}
      />
    </div>
  );
}