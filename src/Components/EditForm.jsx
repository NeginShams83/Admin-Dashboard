import Input from "../Components/Common/Input.jsx";
import Button from "../Components/Common/Button.jsx";
import { useState } from "react";
import api from "../api/api.js";

function EditForm({ onCancel, onSave, profile }) {
  // formData
  const [formData, setFormData] = useState({
    firstname: profile?.firstname || profile?.firstName || "",
    username: profile?.username || "",
    password: "",
  });

  // error state
  const [firstnameError, setFirstnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFirstnameError("");
    setUsernameError("");
    setServerError("");

    let hasError = false;

    if (!formData.firstname.trim()) {
      setFirstnameError("نام الزامی است");
      hasError = true;
    }
    if (!formData.username.trim()) {
      setUsernameError("نام کاربری الزامی است");
      hasError = true;
    }

    if (hasError) return;

    const payload = {
      firstname: formData.firstname,
      username: formData.username,
    };
    if (formData.password.trim()) {
      payload.password = formData.password;
    }

    try {
      setIsSubmitting(true);

      const res = await api.patch("/users/profile", payload);

      console.log("PATCH SUCCESS:", res.data);

      onSave?.();
    } catch (error) {
      console.error("Error updating profile:", error);

      const msg =
        error.response?.data?.message || "خطا در به‌روزرسانی اطلاعات پروفایل";

      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstname: profile?.firstname || profile?.firstName || "",
      username: profile?.username || "",
      password: "",
    });
    setUsernameError("");
    setFirstnameError("");
    setServerError("");

    onCancel();
  };

  return (
    <div className="w-full dir-rtl text-neutral-800 dark:text-neutral-100">
      <h2 className="text-xl font-bold text-center mb-6 text-neutral-900 dark:text-neutral-50">
        ویرایش پروفایل
      </h2>

      {serverError && (
        <div className="mb-5 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 p-3 rounded-xl text-center font-medium">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          value={formData.firstname}
          onChange={(e) =>
            setFormData({
              ...formData,
              firstname: e.target.value,
            })
          }
          error={firstnameError}
          label="نام"
          className="w-full text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700/70 rounded-xl px-4 py-2.5 focus:border-neutral-400 dark:focus:border-neutral-500 focus:outline-none transition"
        />

        <Input
          value={formData.username}
          onChange={(e) =>
            setFormData({
              ...formData,
              username: e.target.value,
            })
          }
          error={usernameError}
          label="نام کاربری"
          className="w-full text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700/70 rounded-xl px-4 py-2.5 focus:border-neutral-400 dark:focus:border-neutral-500 focus:outline-none transition"
        />

        <Input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
          label="رمز عبور جدید (اختیاری)"
          placeholder="در صورت عدم تغییر خالی بگذارید"
          className="w-full text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700/70 rounded-xl px-4 py-2.5 focus:border-neutral-400 dark:focus:border-neutral-500 focus:outline-none transition placeholder-neutral-400 dark:placeholder-neutral-500"
        />

        <div className="flex justify-end gap-2.5 mt-4">
          <Button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-700/60 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-600 font-medium transition text-sm"
          >
            انصراف
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-medium transition text-sm shadow-sm"
          >
            {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
