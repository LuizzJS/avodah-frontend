const Link = ({ href, label }) => {
  return (
    <a
      href={href}
      className="text-gray-700 hover:text-base text-sm hover:text-blue-500 transition-all duration-300 break-words text-center mb-2">
      {label}
    </a>
  );
};

export default Link;
