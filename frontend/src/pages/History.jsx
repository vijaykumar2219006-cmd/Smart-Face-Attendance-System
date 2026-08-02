import { useEffect, useState } from "react";
import api from "../services/api";
import * as XLSX from "xlsx";
import {
  FaSearch,
  FaHistory,
  FaUserCheck,
  FaFileCsv,
  FaFileExcel,
  FaPrint,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import DeleteAttendanceModal from "../components/DeleteAttendanceModal";

export default function History() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    const filtered = records.filter((record) => {
      const matchName = record.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const recordDate = String(record.date).substring(0, 10);

      const matchDate = selectedDate === "" || recordDate === selectedDate;

      return matchName && matchDate;
    });

    setFilteredRecords(filtered);
  }, [search, selectedDate, records]);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/attendance-history");

      setRecords(response.data);
      setFilteredRecords(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load attendance history.");
    } finally {
      setLoading(false);
    }
  };

  const deleteAttendance = async () => {
    if (!selectedRecord) return;

    try {
      await api.delete(`/attendance/${selectedRecord._id}`);

      toast.success("Attendance record deleted successfully.");

      setShowDeleteModal(false);
      setSelectedRecord(null);

      fetchHistory();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete attendance record.");
    }
  };

  const exportCSV = () => {
    if (filteredRecords.length === 0) {
      toast.error("No attendance records to export.");
      return;
    }

    const headers = ["Student", "Date", "Time", "Status"];

    const rows = filteredRecords.map((record) => [
      record.name,
      String(record.date).substring(0, 10),
      record.time,
      "Present",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Attendance_Report_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    toast.success("CSV report exported successfully!");
  };

  const exportExcel = () => {
    if (filteredRecords.length === 0) {
      toast.error("No attendance records to export.");
      return;
    }

    const excelData = filteredRecords.map((record) => ({
      Student: record.name,
      Date: String(record.date).substring(0, 10),
      Time: record.time,
      Status: "Present",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");

    XLSX.writeFile(
      workbook,
      `Attendance_Report_${new Date().toISOString().slice(0, 10)}.xlsx`,
    );

    toast.success("Excel report exported successfully!");
  };

  const printReport = () => {
    if (filteredRecords.length === 0) {
      toast.error("No attendance records to print.");
      return;
    }

    const printWindow = window.open("", "_blank");

    const tableRows = filteredRecords
      .map(
        (record) => `
      <tr>
        <td>${record.name}</td>
        <td>${String(record.date).substring(0, 10)}</td>
        <td>${record.time}</td>
        <td>Present</td>
      </tr>
    `,
      )
      .join("");

    printWindow.document.write(`
    <html>
      <head>
        <title>Attendance Report</title>

        <style>
          body{
            font-family:Arial,sans-serif;
            padding:40px;
          }

          h1{
            text-align:center;
          }

          p{
            text-align:center;
            color:#555;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:30px;
          }

          th,td{
            border:1px solid #000;
            padding:12px;
            text-align:left;
          }

          th{
            background:#4f46e5;
            color:white;
          }

        </style>

      </head>

      <body>

        <h1>Smart Face Attendance System</h1>

        <p>
          Attendance Report<br/>
          Generated on: ${new Date().toLocaleString()}
        </p>

        <table>

          <thead>
            <tr>
              <th>Student</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            ${tableRows}
          </tbody>

        </table>

      </body>

    </html>
  `);

    printWindow.document.close();

    toast.success("Opening print dialog...");

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaHistory className="text-3xl text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Attendance History
          </h1>
          <p className="text-gray-500">View all attendance records</p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Total Records */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500 text-sm">Total Attendance Records</p>

              <h2 className="text-4xl font-bold text-indigo-600 mt-3">
                {filteredRecords.length}
              </h2>

              <p className="text-slate-400 text-sm mt-2">Records Available</p>
            </div>

            <FaUserCheck className="text-3xl text-green-500" />
          </div>
        </div>

        {/* Search */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-600 text-xl">🔍</span>

            <h3 className="text-lg font-bold text-slate-800">Search Student</h3>
          </div>

          <p className="text-sm text-slate-500 mb-4">
            Quickly find attendance records by student name.
          </p>

          <div className="relative">
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Date Filter */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📅</span>

            <h3 className="text-lg font-bold text-slate-800">Filter by Date</h3>
          </div>

          <p className="text-sm text-slate-500 mb-4">
            Select attendance records for a specific day.
          </p>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-12 bg-white rounded-3xl border border-slate-200 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Quick Actions
              </h3>

              <p className="text-slate-500 text-sm">
                Export attendance reports or clear applied filters.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedDate("");
                }}
                className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition"
              >
                🧹 Clear Filters
              </button>

              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition"
              >
                <FaFileCsv />
                Export CSV
              </button>

              <button
                onClick={exportExcel}
                className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition"
              >
                <FaFileExcel />
                Export Excel
              </button>

              <button
                onClick={printReport}
                className="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
              >
                <FaPrint />
                Print Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8 overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-lg">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : filteredRecords.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">📂</div>

            <h3 className="text-2xl font-bold text-slate-700">
              No Attendance Records
            </h3>

            <p className="text-slate-500 mt-2">
              Register students and mark attendance to see history here.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="py-4 px-6 text-left">Student</th>
                <th className="py-4 px-6 text-left">Date</th>
                <th className="py-4 px-6 text-left">Time</th>
                <th className="py-4 px-6 text-left">Status</th>
                <th className="py-4 px-6 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((record, index) => (
                <tr
                  key={index}
                  className={`border-b border-slate-100 hover:bg-indigo-50 transition-all duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  <td className="py-4 px-6 font-medium">
                    {record.name.charAt(0).toUpperCase() + record.name.slice(1)}
                  </td>

                  <td className="py-4 px-6">
                    {String(record.date).substring(0, 10)}
                  </td>

                  <td className="py-4 px-6">{record.time}</td>

                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      <FaCheckCircle />
                      Present
                    </span>
                  </td>

                  {/* New Action Column */}
                  <td className="py-4 px-6 text-left">
                    <button
                      onClick={() => {
                        setSelectedRecord(record);
                        setShowDeleteModal(true);
                      }}
                      className="w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:scale-110 transition-all duration-300 flex items-center justify-center mx-auto"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <DeleteAttendanceModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedRecord(null);
        }}
        onDelete={deleteAttendance}
        record={selectedRecord}
      />
    </div>
  );
}
