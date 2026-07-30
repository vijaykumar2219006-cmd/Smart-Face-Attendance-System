import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function AttendanceChart({ data }) {
  const colors = [
    "#3B82F6",
    "#6366F1",
    "#8B5CF6",
    "#06B6D4",
    "#10B981",
    "#F59E0B",
    "#EF4444",
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Weekly Attendance
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Attendance recorded over the last 7 days.
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={330}>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="#E5E7EB"
          />

          <XAxis dataKey="day" tickLine={false} axisLine={false} />

          <YAxis allowDecimals={false} tickLine={false} axisLine={false} />

          <Tooltip
            formatter={(value) => [`${value} Students`, "Attendance"]}
            labelFormatter={(label) => `Day : ${label}`}
            cursor={{ fill: "#F3F4F6" }}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          />

          <Bar dataKey="count" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
