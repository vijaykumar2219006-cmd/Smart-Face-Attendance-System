const colors = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    hover: "group-hover:bg-blue-600",
    hoverText: "group-hover:text-white",
    bar: "bg-blue-600",
    border: "hover:border-blue-300",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    hover: "group-hover:bg-green-600",
    hoverText: "group-hover:text-white",
    bar: "bg-green-600",
    border: "hover:border-green-300",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    hover: "group-hover:bg-red-600",
    hoverText: "group-hover:text-white",
    bar: "bg-red-600",
    border: "hover:border-red-300",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    hover: "group-hover:bg-purple-600",
    hoverText: "group-hover:text-white",
    bar: "bg-purple-600",
    border: "hover:border-purple-300",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    hover: "group-hover:bg-indigo-600",
    hoverText: "group-hover:text-white",
    bar: "bg-indigo-600",
    border: "hover:border-indigo-300",
  },
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = "blue",
}) {
  const theme = colors[color] || colors.blue;

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-300 p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </p>

          <h2 className="text-5xl font-bold text-gray-800 mt-3">{value}</h2>

          <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6
            ${theme.bg}
            ${theme.text}
            ${theme.hover}
            ${theme.hoverText}`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-6 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${theme.border}`}
        ></div>
      </div>
    </div>
  );
}
