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
    <div>
      {label && <label htmlFor={id || name}>{label}</label>}

      <input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={className}
        {...rest}
      />

      <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>
    </div>
  );
}

export default Input;
