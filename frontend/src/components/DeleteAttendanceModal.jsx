export default function DeleteAttendanceModal({
  isOpen,
  onClose,
  onDelete,
  record,
}) {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Delete Attendance Record
        </h2>

        <p className="text-gray-600 mb-2">
          Are you sure you want to delete this attendance record?
        </p>

        <div className="bg-gray-100 rounded-lg p-4 my-4">
          <p><strong>Student:</strong> {record.name}</p>
          <p><strong>Date:</strong> {String(record.date).substring(0,10)}</p>
          <p><strong>Time:</strong> {record.time}</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}