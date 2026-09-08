// Input.jsx
function Input({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  className = "",
  error,
  ...rest
}) {
  return (
    <div className="w-full flex flex-col gap-1.5 text-right">
      {/* Label */}
      {label && (
        <label
          htmlFor={id || name}
          className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-200"
        >
          {label}
        </label>
      )}

      {/* Input Field */}
      <input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm outline-none transition focus:border-neutral-400 dark:focus:border-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...rest}
      />

      {/* Error Message */}
      {error && (
        <p className="text-xs text-rose-500 font-medium mt-0.5 mr-1">{error}</p>
      )}
    </div>
  );
}

export default Input;
