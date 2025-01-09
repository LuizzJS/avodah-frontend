import NotFoundImage from "../assets/not_found.svg";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate("/");

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center px-8 bg-gray-100">
      <div className="max-w-4xl w-full text-center flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center mb-8 md:mb-0 text-center">
          <h1 className="text-5xl font-semibold text-blue-700 mb-4">
            Página desconhecida
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            A página que você está procurando não está disponível. Vamos levá-lo
            de volta à página inicial.
          </p>
          <button
            onClick={handleClick}
            className="px-6 py-3 text-sm bg-blue-700 text-white rounded-xl shadow-md transition-all duration-300 hover:scale-105 focus:outline-none">
            Voltar à Página Inicial
          </button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src={NotFoundImage}
            alt="Página não encontrada"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
