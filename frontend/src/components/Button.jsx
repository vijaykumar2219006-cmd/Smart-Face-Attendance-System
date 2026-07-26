export default function Button({
  children,
  onClick,
  variant = "primary",
  icon = false,
}) {
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
  };

  return (
    <button
      onClick={onClick}
      className={
        icon
          ? `w-10 h-10 flex items-center justify-center rounded-xl transition ${styles[variant]}`
          : `px-5 py-2.5 rounded-xl font-medium transition ${styles[variant]}`
      }
    >
      {children}
    </button>
  );
}