function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  ...rest
}) {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
