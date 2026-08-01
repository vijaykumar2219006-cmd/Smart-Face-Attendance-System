import { useEffect, useState } from "react";
import { FaEye, FaTrash, FaEdit, FaUsers } from "react-icons/fa";
import ProfileImage from "../components/ProfileImage";
import EditStudentModal from "../components/EditStudentModal";
import api from "../services/api";
import StudentModal from "../components/StudentModal";
import DeleteStudentModal from "../components/DeleteStudentModal";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const [editingStudent, setEditingStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const navigate = useNavigate();

  const loadStudents = async () => {
    try {
      const response = await api.get("/students-list");
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredStudents = students
  .filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) =>
    a.name.localeCompare(b.name, undefined, {
      sensitivity: "base",
    })
  );

  const handleDelete = async (student) => {
    try {
      await api.delete(`/students/${student.name}`);

      setStudents((prev) => prev.filter((s) => s.name !== student.name));

      setStudentToDelete(null);

      toast.success("Student deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete student.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
            Student Management
          </p>

          <h1 className="text-4xl font-bold text-slate-800 mt-2">Students</h1>

          <p className="text-slate-500 mt-2">
            Manage all registered students in one place.
          </p>
        </div>

        <button
          onClick={() => navigate("/register")}
          className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          + Register Student
        </button>
      </div>

      {/* Search & Student Count */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Search */}
          <div className="w-full lg:w-[550px] lg:ml-6">
            <input
              type="text"
              placeholder="🔍 Search by student name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
            />
          </div>

          {/* Student Count */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl px-6 py-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FaUsers size={20} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Total Students
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                {filteredStudents.length}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <div
              key={index}
              className="relative bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Left Accent */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-600 to-indigo-600"></div>
              <div className="flex justify-between items-start">
                {/* Left */}
                <div className="flex gap-5">
                  <div className="w-20 h-20">
                    <ProfileImage studentName={student.name} />
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                      {student.name}
                    </h2>

                    <p className="text-slate-500 mt-1">Registered Student</p>
                    <p className="text-sm text-slate-400 mt-2">
                      Registered: {student.createdAt?.split("T")[0] || "N/A"}
                    </p>

                    <div className="flex gap-10 mt-6">
                      <div>
                        <p className="text-xs uppercase text-slate-400">
                          Images
                        </p>

                        <p className="font-bold text-2xl text-slate-800">
                          {student.images}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase text-slate-400">
                          Status
                        </p>

                        <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                          ● Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-6">
                  {/* View */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => navigate(`/student/${student._id}`)}
                      className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <FaEye size={20} />
                    </button>

                    <span className="mt-2 text-xs font-medium text-blue-600">
                      View
                    </span>
                  </div>

                  {/* Edit */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setEditingStudent(student)}
                      className="w-16 h-16 rounded-2xl bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <FaEdit size={20} />
                    </button>

                    <span className="mt-2 text-xs font-medium text-yellow-600">
                      Edit
                    </span>
                  </div>

                  {/* Delete */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setStudentToDelete(student)}
                      className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <FaTrash size={20} />
                    </button>

                    <span className="mt-2 text-xs font-medium text-red-600">
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">👨‍🎓</div>

            <h2 className="text-2xl font-bold">No Students Found</h2>

            <p className="text-slate-500 mt-2">
              Register your first student to get started.
            </p>
          </div>
        )}
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

      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSuccess={loadStudents}
        />
      )}
    </div>
  );
}
