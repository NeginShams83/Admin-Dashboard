function Input({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  disabled,
  className,
  error,
}) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={className}
        id={id}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Input;
