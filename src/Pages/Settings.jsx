import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import Modal from "../Components/Modal.jsx";
import EditForm from "../Components/EditForm.jsx";
import Button from "../Components/Button.jsx";

function Settings() {
  //get theme from context
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

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
          <EditForm onCancel={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
export default Settings;
