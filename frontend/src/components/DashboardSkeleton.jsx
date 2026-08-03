export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="h-10 w-72 bg-gray-200 rounded-xl mb-3"></div>
          <div className="h-5 w-96 bg-gray-200 rounded-lg"></div>
        </div>

        <div className="h-36 w-72 rounded-3xl bg-gray-200"></div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-3xl shadow-md border border-gray-200 p-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="h-4 w-28 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 w-16 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="h-96 rounded-3xl bg-gray-200"></div>

        <div className="xl:col-span-2 h-96 rounded-3xl bg-gray-200"></div>
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-80 rounded-3xl bg-gray-200"></div>

        <div className="h-80 rounded-3xl bg-gray-200"></div>
      </div>
    </div>
  );
}