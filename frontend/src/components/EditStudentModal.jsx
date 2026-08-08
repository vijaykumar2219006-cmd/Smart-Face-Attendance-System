import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const EditStudentModal = ({ student, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) {
      setName(student.name);
    }
  }, [student]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Student name is required.");
    }

    try {
      setLoading(true);

      const res = await api.put(`/student/${student._id}`, {
        name,
      });

      toast.success(res.data.message);

      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-5">Edit Student</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
