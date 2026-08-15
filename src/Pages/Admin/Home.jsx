import { useEffect, useState } from "react";
import StatCard from "../../Components/StatCard";
import api from "../../api/api.js";
import Loading from "../../Components/Common/Loading.jsx";

function Home() {
  const [stats, setStats] = useState({
    usersCount: 0,
    productsCount: 0,
    ordersCount: 0,
    categoriesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch users and products stats concurrently
        const [usersRes, productsRes] = await Promise.allSettled([
          api.get("/users"),
          api.get("/products"),
        ]);

        // Calculate users count
        const usersData =
          usersRes.status === "fulfilled"
            ? usersRes.value.data?.users || usersRes.value.data || []
            : [];

        // Calculate products count
        const productsData =
          productsRes.status === "fulfilled"
            ? productsRes.value.data?.products || productsRes.value.data || []
            : [];

        setStats({
          usersCount: Array.isArray(usersData) ? usersData.length : 0,
          productsCount: Array.isArray(productsData) ? productsData.length : 0,
          ordersCount: 0, // Placeholder for future orders feature
          categoriesCount: 0, // Placeholder for future categories feature
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Users" value={stats.usersCount} icon="👤" />
        <StatCard title="Products" value={stats.productsCount} icon="📦" />
        <StatCard title="Orders" value={stats.ordersCount} icon="🛒" />
        <StatCard title="Categories" value={stats.categoriesCount} icon="📂" />
      </div>

      {/* Sales chart */}
      <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Sales Chart</h2>
        <div className="h-72 flex items-center justify-center text-gray-400">
          Chart Here...
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="text-gray-400">No recent orders</div>
      </div>
    </div>
  );
}

export default Home;
