

export default function StatCard({
    title,
    value,
    subtitle,
    icon
}) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-gray-500 text-sm">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {value}
                    </h2>

                    <p className="text-sm text-gray-400 mt-2">
                        {subtitle}
                    </p>

                </div>

                <div className="text-3xl text-blue-600">
                    {icon}
                </div>

            </div>

        </div>
    );
}