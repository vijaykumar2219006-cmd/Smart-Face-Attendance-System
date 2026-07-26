import { useEffect, useState } from "react";
import api from "../services/api";
import { FaSearch, FaHistory, FaUserCheck } from "react-icons/fa";

export default function History() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    console.log("Selected Date:", selectedDate);

    const filtered = records.filter((record) => {
      console.log("Record:", record);

      const matchName = record.name
        .toLowerCase()
        .includes(search.toLowerCase());

      // Compare only the first 10 characters (YYYY-MM-DD)
      const recordDate = String(record.date).substring(0, 10);

      console.log("Record Date:", recordDate);

      const matchDate =
        selectedDate === "" || recordDate === selectedDate;

      return matchName && matchDate;
    });

    setFilteredRecords(filtered);
  }, [search, selectedDate, records]);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/attendance-history");

      console.log("Attendance Data:", response.data);

      setRecords(response.data);
      setFilteredRecords(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
          <p className="text-gray-500">
            View all attendance records
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

        {/* Total Records */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Records</p>
              <h2 className="text-3xl font-bold mt-2">
                {filteredRecords.length}
              </h2>
            </div>

            <FaUserCheck className="text-4xl text-green-500" />
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-3">
          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        {/* Date Filter */}
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-3">
          <label className="text-gray-600 font-medium whitespace-nowrap">
            Date
          </label>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>

        {/* Clear Filters */}
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center justify-center">
          <button
            onClick={() => {
              setSearch("");
              setSelectedDate("");
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
          >
            Clear Filters
          </button>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading...
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No attendance records found.
          </div>
        ) : (
          <table className="w-full">

            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-4 px-6 text-left">Student</th>
                <th className="py-4 px-6 text-left">Date</th>
                <th className="py-4 px-6 text-left">Time</th>
                <th className="py-4 px-6 text-left">Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredRecords.map((record, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-6 font-medium">
                    {record.name}
                  </td>

                  <td className="py-4 px-6">
                    {String(record.date).substring(0, 10)}
                  </td>

                  <td className="py-4 px-6">
                    {record.time}
                  </td>

                  <td className="py-4 px-6">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Present
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}