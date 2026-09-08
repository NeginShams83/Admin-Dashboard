import Button from "../Common/Button";

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-200 dir-rtl">
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700/70 p-6 sm:p-7 transform transition-all scale-100">
        {/* Close button */}
        <Button
          onClick={onClose}
          type="button"
          aria-label="بستن"
          className="absolute top-4 left-4 w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-700/60 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-600 flex items-center justify-center transition-all text-sm font-bold"
        >
          ✕
        </Button>

        {/* Modal content */}
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
