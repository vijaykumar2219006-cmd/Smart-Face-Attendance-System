export default function StatCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-gray-800 mt-3">
            {value}
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            {subtitle}
          </p>

        </div>

        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">

          {icon}

        </div>

      </div>

      <div className="mt-6 h-1 w-full bg-gray-100 rounded-full overflow-hidden">

        <div className="h-full w-1/2 bg-blue-600 rounded-full"></div>

      </div>

    </div>
  );
}