export default function DeleteStudentModal({
  student,
  onClose,
  onDelete,
}) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-[420px] p-8">

        <div className="flex justify-center mb-5">

          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-3xl">
            ⚠
          </div>

        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Delete Student
        </h2>

        <p className="text-center text-gray-500 mt-4">
          Are you sure you want to delete
        </p>

        <h3 className="text-center text-xl font-semibold mt-2">
          {student.name}
        </h3>

        <p className="text-center text-red-500 text-sm mt-4">
          This action cannot be undone.
        </p>

        <div className="flex gap-3 mt-8">

          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => onDelete(student)}
            className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}