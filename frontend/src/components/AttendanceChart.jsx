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

const colors = [
  "#3B82F6",
  "#6366F1",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

export default function AttendanceChart({ data }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-xl transition-all duration-300">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Weekly Attendance
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Attendance recorded over the last 7 days.
          </p>
        </div>

        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold">
          Last 7 Days
        </div>

      </div>

      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: -15,
            bottom: 5,
          }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="4 4"
            stroke="#E5E7EB"
          />

          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "#64748B",
              fontSize: 14,
            }}
          />

          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "#64748B",
              fontSize: 14,
            }}
          />

          <Tooltip
            cursor={{ fill: "#EFF6FF" }}
            contentStyle={{
              borderRadius: "14px",
              border: "none",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.08)",
            }}
          />

          <Bar
            dataKey="count"
            radius={[12, 12, 0, 0]}
            maxBarSize={55}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}