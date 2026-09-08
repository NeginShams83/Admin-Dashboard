function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/70 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between dir-rtl">
      <div>
        <h3 className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">
          {title}
        </h3>

        <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mt-2">
          {value}
        </p>
      </div>

      <div className="w-13 h-13 rounded-xl bg-neutral-100 dark:bg-neutral-700/60 text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-600/50 flex items-center justify-center text-2xl shrink-0">
        {icon}
      </div>
    </div>
  );
}

export default StatCard;
