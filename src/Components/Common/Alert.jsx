function Alert({ type = "info", message }) {
  const config = {
    error: {
      title: "Error",
      className: "bg-red-500 text-white",
    },
    success: {
      title: "Success",
      className: "bg-green-500 text-white",
    },
    warning: {
      title: "Warning",
      className: "bg-yellow-500 text-white",
    },
    info: {
      title: "Info",
      className: "bg-blue-500 text-white",
    },
  };

  const typeConfig = config[type] || config.info;
  return (
    <div className={`${typeConfig.className} p-4 rounded-md`}>
      <h2 className="text-lg font-bold">{typeConfig.title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Alert;
