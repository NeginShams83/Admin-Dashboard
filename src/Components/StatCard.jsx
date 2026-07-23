function StatCard({ title, value, icon }) {
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition duration-300">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>

          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>

        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-3xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
