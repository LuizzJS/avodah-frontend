import React from "react";

const Button = ({ click, icon = null, label, type, ...props }) => {
  return (
    <button
      onClick={click}
      className={`flex ${
        type == "submit" ? "px-6 mx-auto" : null
      } items-center gap-2 p-3  text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition-all duration-500 hover:scale-105 mb-2`}>
      {icon ? icon : null}
      {label}
    </button>
  );
};

export default Button;
