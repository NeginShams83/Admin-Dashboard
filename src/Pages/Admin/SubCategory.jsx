import { useState, useEffect } from "react";
import Input from "../../Components/Common/Input.jsx";
import Button from "../../Components/Common/Button.jsx";
import Loading from "../../Components/Common/Loading.jsx";
import api from "../../api/api.js";

function SubCategory() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);

  //get category
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const resCat = await api.get(`/categories`);
        setCategory(resCat.data);
      } catch (err) {
        console.error("خطا در دریافت کتگوری‌ها:", err);
        setError("خطا در دریافت اطلاعات از سرور");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  //get subCategory
  useEffect(() => {
    if (!selectedCategory) return;

    const getSubCategories = async () => {
      try {
        const resSub = await api.get(
          `/categories/${selectedCategory}/subcategories`,
        );
        setSubCategory(resSub.data);
      } catch (err) {
        console.error("خطا در دریافت ساب‌کتگوری‌ها:", err);
      }
    };

    getSubCategories();
  }, [selectedCategory]);

  //handle sub
  const handleSubmit = async () => {
    if (!selectedCategory.trim() || !name.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.post(
        `/categories/${selectedCategory}/subcategories`,
        {
          name: name,
        },
      );

      setSubCategory((prev) => [...prev, res.data]);
      setName("");
    } catch (err) {
      console.error("خطا در ثبت:", err);
      alert("خطا در ثبت ساب‌کتگوری جدید");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg text-center"
        role="alert"
      >
        {error}
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 dir-rtl text-neutral-800 dark:text-neutral-100 transition-colors duration-200">
      {/* Main form */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-sm space-y-6">
        {/*first category*/}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
            دسته‌بندی اصلی
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSubCategory([]);
            }}
            className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-neutral-700/60 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500 outline-none text-neutral-800 dark:text-neutral-100 transition"
          >
            <option value="">انتخاب کتگوری مادر...</option>
            {category.map((cat) => (
              <option
                key={cat._id}
                value={cat._id}
                className="bg-white dark:bg-neutral-800"
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/*name sub*/}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
            نام زیردسته
          </label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام ساب‌کتگوری"
            className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-neutral-700/60 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500 outline-none text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 transition"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={submitting || !selectedCategory}
          className="w-full md:w-auto px-6 py-2.5 bg-neutral-800 hover:bg-neutral-900 dark:bg-neutral-200 dark:hover:bg-white text-white dark:text-neutral-900 font-medium rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {submitting ? "در حال ثبت..." : "ثبت"}
        </Button>
      </div>

      {/*show subCategories*/}
      {selectedCategory && (
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-sm transition-colors">
          <table className="w-full text-sm text-right">
            <thead className="bg-neutral-100 dark:bg-neutral-700/50 text-neutral-600 dark:text-neutral-300 border-b border-neutral-200 dark:border-neutral-700">
              <tr>
                <th scope="col" className="px-6 py-3.5 font-semibold">
                  نام ساب‌کتگوری
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700/50">
              {subCategory.map((sub) => (
                <tr
                  key={sub._id}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition duration-150"
                >
                  <td className="px-6 py-4 font-medium text-neutral-800 dark:text-neutral-200">
                    {sub.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SubCategory;
