const Link = ({ href, label }) => {
  return (
    <a
      href={href}
      className="text-sm text-gray-700 hover:text-blue-500 hover:text-base transition-all duration-300 mb-2">
      {label}
    </a>
  );
};

export default Link;
