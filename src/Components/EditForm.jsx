import Input from "../Components/Common/Input.jsx";
import Button from "../Components/Common/Button.jsx";
import { useEffect, useState } from "react";
import api from "../api/api.js";

function EditForm({ onCancel, onSave, profile }) {
  // formData
  const [formData, setFormData] = useState({
    firstname: "",
    username: "",
    password: "",
  });

  // error state
  const [firstnameError, setFirstnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect
  useEffect(() => {
    if (!profile) return;
    setFormData({
      firstname: profile.firstname || profile.firstName || "",
      username: profile.username || "",
      password: "",
    });
  }, [profile]);

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
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

      {serverError && (
        <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded-lg text-center">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          value={formData.firstname}
          onChange={(e) =>
            setFormData({
              ...formData,
              firstname: e.target.value,
            })
          }
          error={firstnameError}
          label="Firstname"
          className="w-full text-black bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
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
          label="Username"
          className="w-full text-black bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
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
          label="New Password (optional)"
          placeholder="در صورت عدم تغییر خالی بگذارید"
          className="w-full text-black bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />

        <div className="flex justify-end gap-3 mt-2">
          <Button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
