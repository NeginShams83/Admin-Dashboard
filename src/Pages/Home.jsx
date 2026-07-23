import StatCard from "../Components/StatCard";

function Home() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Users" value={120} icon="👤" />
        <StatCard title="Products" value={54} icon="📦" />
        <StatCard title="Orders" value={340} icon="🛒" />
        <StatCard title="Categories" value={12} icon="📂" />
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Sales Chart</h2>

        <div className="h-72 flex items-center justify-center text-gray-400">
          Chart Here...
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <div className="text-gray-400">No recent orders</div>
      </div>
    </div>
  );
}

export default Home;
