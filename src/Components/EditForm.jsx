import Input from "./Input";
import Button from "./Button";
import { useEffect, useState } from "react";
import api from "../api/api.js";

function EditForm({ onCancel, onSave, profile, userId }) {
  //formData
  const [formData, setFormData] = useState({
    firstname: "",
    username: "",
    password: "",
  });
  //error state
  const [firstnameError, setFirstnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //useEffect
  useEffect(() => {
    if (!profile) return;
    setFormData({
      firstname: profile.firstname,
      username: profile.username,
      password: "",
    });
  }, [profile]);

  //handle sub
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFirstnameError("");
    setUsernameError("");
    setPasswordError("");

    let hasError = false;
    //
    if (!formData.firstname.trim()) {
      setFirstnameError("firstname required");
      hasError = true;
    }
    if (!formData.username.trim()) {
      setUsernameError("username required");
      hasError = true;
    }
    if (!formData.password.trim()) {
      setPasswordError("Password required");
      hasError = true;
    }
    if (hasError) return;
    console.log({
      formData,
    });

    try {
      const res = await api.patch(`/users/${userId}`, formData);
      console.log(res.data);
      onSave?.();
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const handleCancel = () => {
    setFormData({
      firstname: profile.firstname || "",
      username: profile.username,
      password: "",
    });
    setUsernameError("");
    setFirstnameError("");
    setPasswordError("");

    onCancel();
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center  mb-6">Edit Profile</h2>

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
          label="firstname"
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
          label="username"
          className="w-full text-black bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />

        <Input
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
          error={passwordError}
          label="Password"
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
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
