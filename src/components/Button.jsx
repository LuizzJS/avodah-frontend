import React from "react";

const Button = ({
  click,
  icon,
  label,
  type = "button",
  secondary,
  className = "",
  ...props
}) => {
  return (
    <button
      onClick={click}
      type={type}
      className={`
                flex justify-center items-center gap-2 p-3 text-sm rounded-xl shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500
                ${
                  secondary
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }
                ${type === "submit" ? "px-6 mx-auto w-full" : ""}
                ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}
                ${className}
            `}
      {...props}>
      {icon && <span className="mr-2">{icon}</span>} {label}
    </button>
  );
};

export default Button;
