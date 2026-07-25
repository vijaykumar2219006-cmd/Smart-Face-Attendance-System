import { useEffect, useState } from "react";
import api from "../services/api";

export default function Students() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Students
          </h1>

          <p className="text-gray-500 mt-2">
            Registered Students
          </p>

        </div>

        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">

          {filteredStudents.length} Students

        </div>

      </div>

      <input
        type="text"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="bg-white rounded-xl shadow border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

  <tr>

    <th className="text-left p-4">Student</th>

    <th className="text-left p-4">Images</th>

    <th className="text-left p-4">Status</th>

    <th className="text-left p-4">Actions</th>

  </tr>

</thead>

          <tbody>

  {filteredStudents.map((student, index) => (

    <tr
      key={index}
      className="border-t hover:bg-gray-50 transition duration-200"
    >

      {/* Student */}
      <td className="p-4">

        <div className="flex items-center gap-4">

          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">

            {student.name.charAt(0).toUpperCase()}

          </div>

          <div>

            <p className="font-semibold">
              {student.name}
            </p>

            <p className="text-sm text-gray-500">
              Student
            </p>

          </div>

        </div>

      </td>

      {/* Images */}
      <td className="p-4">

        <span className="font-medium">
          {student.images}
        </span>

      </td>

      {/* Status */}
      <td className="p-4">

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

          Registered

        </span>

      </td>

      {/* Actions */}
      <td className="p-4">

        <div className="flex gap-2">

          <button
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View
          </button>

          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>

        </div>

      </td>

    </tr>

  ))}

</tbody>

        </table>

      </div>

    </div>

  );

}