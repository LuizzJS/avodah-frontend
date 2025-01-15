const Button = ({ click, icon, label, type = "button", ...props }) => {
  return (
    <button
      onClick={click}
      type={type}
      className={`flex items-center gap-2 p-3 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition-all duration-500 hover:scale-105 mb-2 ${
        type === "submit" ? "px-6 mx-auto" : ""
      }`}
      {...props}>
      {icon && icon}
      {label}
    </button>
  );
};

export default Button;
