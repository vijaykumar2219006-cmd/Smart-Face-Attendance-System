export default function StudentModal({
  student,
  onClose,
}) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-[450px] p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Student Details
        </h2>

        <div className="flex justify-center mb-6">

          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center text-4xl font-bold">

            {student.name.charAt(0).toUpperCase()}

          </div>

        </div>

        <h3 className="text-xl font-semibold text-center mb-8">
          {student.name}
        </h3>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span className="text-gray-500">
              Images Captured
            </span>

            <span className="font-semibold">
              {student.images}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Status
            </span>

            <span className="text-green-600 font-semibold">
              Active
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Dataset Folder
            </span>

            <span className="font-semibold">
              dataset/{student.name}
            </span>
          </div>

        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
        >
          Close
        </button>

      </div>

    </div>
  );
}