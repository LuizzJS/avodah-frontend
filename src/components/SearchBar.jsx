import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const resultsRef = useRef(null);

  const findSimilar = () => {
    if (!search) {
      setResults([]);
      return;
    }
    const simulatedResults = [
      "Dias de culto",
      "Horas de culto",
      "Eventos",
      "Versículo do dia",
      "Sedes",
      "Sobre nós",
      "Termos de uso",
      "Política de privacidade",
    ].filter((topic) => topic.toLowerCase().includes(search.toLowerCase()));
    setResults(simulatedResults);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  useEffect(() => {
    findSimilar();
  }, [search]);

  const clearSearch = () => {
    setSearch("");
    setResults([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full max-w-[400px] relative z-50">
      <div className="relative flex items-center shadow-md transition-all duration-500 ring-1 ring-blue-500 rounded-xl w-full h-10 px-2 hover:ring-blue-600">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="O que você procura?"
          value={search}
          className="flex-1 outline-none bg-transparent text-sm"
          onChange={handleSearchChange}
        />
        <button
          type="button"
          className="absolute right-0 flex items-center justify-center w-8 h-8 text-blue-500 hover:text-blue-600 focus:outline-none"
          aria-label="Search">
          <Search size={18} />
        </button>
        {search && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-10 flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-600 focus:outline-none"
            aria-label="Clear search">
            <X size={18} />
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute w-full mt-2 rounded-xl bg-slate-50 shadow-md max-h-40 overflow-y-auto z-40 p-1"
          style={{ top: "100%" }}>
          <ul className="space-y-2">
            {results.map((result) => (
              <li
                key={result}
                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                <a
                  href={`/search/${result.toLowerCase().replace(/ /g, "-")}`}
                  className="block">
                  {result}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
