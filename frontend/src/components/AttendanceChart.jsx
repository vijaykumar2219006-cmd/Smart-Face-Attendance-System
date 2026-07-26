import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AttendanceChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Weekly Attendance
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}