const Input = ({
  icon: Icon,
  placeholder,
  onChange,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`w-full flex items-center gap-4 border rounded-xl overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-blue-500 ${className}`}>
      {Icon && (
        <div className="text-gray-500 p-4 bg-slate-50 border-gray-400">
          <Icon size={20} />
        </div>
      )}
      <input
        className="p-3 w-full border-none outline-none text-gray-800 focus:ring-0 placeholder:text-gray-400"
        id={`input-${placeholder}`}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Input;
