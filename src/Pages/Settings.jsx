import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";
import Modal from "../Components/Modal.jsx";
import EditForm from "../Components/EditForm.jsx";
import Button from "../Components/Button.jsx";
import { useAuth } from "../Context/AuthContext.jsx";
import api from "../api/api.js";

function Settings() {
  //get theme from context
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  //get

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get(`/users/${user._id}`);

        console.log(res.data);
        setProfile(res.data.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    if (user?._id) {
      getUser();
    }
  }, [user]);

//onSave
  const handleSave = (updatedUser) => {
    setProfile(updatedUser);
    setIsOpen(false);
  };


  //test
  useEffect(() => {
    console.log("Profile:", profile);
  }, [profile]);

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h2>تنظیمات تم: {theme}</h2>
      <button
        className={`${theme === "dark" ? "bg-blue-950 text-white" : "bg-blue-400 text-white"} px-4 py-1 rounded-lg`}
        onClick={toggleTheme}
      >
        change theme
      </button>
      <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <EditForm
            profile={profile}
            userId={user._id}
            onSave={handleSave}
            onCancel={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
export default Settings;
