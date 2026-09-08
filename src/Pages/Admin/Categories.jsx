import { useState, useEffect } from "react";
import api from "../../api/api.js";
import Button from "../../Components/Common/Button.jsx";
import Modal from "../../Components/Common/Modal.jsx";
import Loading from "../../Components/Common/Loading.jsx";

function Categories() {
  // State
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  //get categories form api
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("خطا در دریافت دسته‌بندی‌ها:", err);
        setError("خطا در دریافت اطلاعات از سرور!");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  // Save Category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      const res = await api.post("/categories", {
        name: newCategoryName,
      });

      setCategories((prev) => [...prev, res.data]);

      setNewCategoryName("");
      setIsModalOpen(false);
    } catch (err) {
      console.error("خطا در ثبت دسته‌بندی:", err);
      alert("خطایی در ثبت دسته‌بندی جدید رخ داد!");
    }
  };

  //error and loading
  if (loading) return <Loading />;
  if (error)
    return (
      <div className="p-4 mb-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 rounded-xl text-center border border-red-200 dark:border-red-900/50 max-w-md mx-auto my-8">
        {error}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 dir-rtl text-neutral-800 dark:text-neutral-100 transition-colors duration-200">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          دسته‌بندی‌ها
        </h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 font-medium rounded-xl transition duration-200 shadow-sm"
        >
          + افزودن دسته‌بندی
        </Button>
      </div>

      {categories.length === 0 ? (
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/60 rounded-2xl p-12 text-center shadow-sm">
          <p className="text-neutral-500 dark:text-neutral-400 text-base">
            هیچ دسته‌بندی‌ای وجود ندارد.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {categories.map((category) => (
            <li
              key={category._id}
              className="p-5 border border-neutral-200 dark:border-neutral-700/70 rounded-2xl bg-white dark:bg-neutral-800/80 shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-600 transition duration-200 flex flex-col justify-between"
            >
              <div>
                <strong className="text-lg font-bold block mb-3 text-neutral-900 dark:text-neutral-100">
                  {category.name}
                </strong>

                {category.subcategories?.length > 0 && (
                  <ul className="space-y-1.5 border-r-2 border-neutral-200 dark:border-neutral-700 pr-3 my-2">
                    {category.subcategories.map((sub) => (
                      <li
                        key={sub._id}
                        className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                      >
                        {sub.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/*open modal*/}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <form
            onSubmit={handleAddCategory}
            className="space-y-5 text-right p-2 text-neutral-800 dark:text-neutral-100"
          >
            <h2 className="text-xl font-bold border-b border-neutral-200 dark:border-neutral-700 pb-3 text-neutral-900 dark:text-neutral-50">
              افزودن دسته‌بندی جدید
            </h2>

            <div>
              <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
                نام دسته‌بندی
              </label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="مثلاً: لوازم خانگی"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700/60 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500 transition duration-200"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-700/50">
              {/*cancle*/}
              <Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 font-medium transition duration-200"
              >
                انصراف
              </Button>
              {/*save*/}
              <Button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 font-medium transition duration-200 shadow-sm"
              >
                ذخیره
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default Categories;
