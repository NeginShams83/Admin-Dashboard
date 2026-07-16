import Button from "./Button.jsx";

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative w-full max-w-lg bg-white text-black dark:bg-gray-800 dark:text-white rounded-2xl shadow-2xl p-6">
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          ✕
        </Button>

        {children}
      </div>
    </div>
  );
}

export default Modal;
