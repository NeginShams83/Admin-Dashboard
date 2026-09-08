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

        // Fetch users, products and categories stats concurrently
        const [usersRes, productsRes, categoriesRes] = await Promise.allSettled([
          api.get("/users"),
          api.get("/products"),
          api.get("/categories"),
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

        // Calculate categories count
        const categoriesData =
          categoriesRes.status === "fulfilled"
            ? categoriesRes.value.data?.categories ||
              categoriesRes.value.data ||
              []
            : [];

        setStats({
          usersCount: Array.isArray(usersData) ? usersData.length : 0,
          productsCount: Array.isArray(productsData) ? productsData.length : 0,
          ordersCount: 0, // Placeholder for future orders feature
          categoriesCount: Array.isArray(categoriesData)
            ? categoriesData.length
            : 0,
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
    <div className="space-y-8 dir-rtl text-neutral-800 dark:text-neutral-100 transition-colors duration-200">
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="کاربران" value={stats.usersCount} icon="👤" />
        <StatCard title="محصولات" value={stats.productsCount} icon="📦" />
        <StatCard title="سفارشات" value={stats.ordersCount} icon="🛒" />
        <StatCard
          title="دسته‌بندی‌ها"
          value={stats.categoriesCount}
          icon="📂"
        />
      </div>

      {/* Sales chart */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/70 rounded-2xl shadow-sm p-6 transition-colors duration-200">
        <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50 border-b border-neutral-100 dark:border-neutral-700/50 pb-3">
          نمودار فروش
        </h2>
        <div className="h-72 flex items-center justify-center text-neutral-400 dark:text-neutral-500 font-medium bg-neutral-50 dark:bg-neutral-900/40 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-700">
          نمودار در اینجا قرار می‌گیرد...
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/70 rounded-2xl shadow-sm p-6 transition-colors duration-200">
        <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50 border-b border-neutral-100 dark:border-neutral-700/50 pb-3">
          سفارش‌های اخیر
        </h2>
        <div className="text-neutral-400 dark:text-neutral-500 text-sm py-4 text-center">
          هیچ سفارشی یافت نشد.
        </div>
      </div>
    </div>
  );
}

export default Home;
