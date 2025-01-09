import { Home } from "lucide-react";
import Button from "./Button.jsx";
import NotFoundImage from "../assets/not_found.svg";

const NetworkProtection = ({ children }) => {
  if (!navigator.onLine) {
    const handleClick = () => (window.location.href = "/");

    return (
      <section className="h-screen w-screen flex flex-col items-center justify-center px-8 bg-gray-100">
        <div className="max-w-4xl w-full text-center flex flex-col items-center md:flex-row justify-between">
          <div className="flex flex-col items-center mb-8 text-center">
            <h1 className="text-5xl font-semibold text-blue-700 mb-4">
              Página indisponível
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              A página que você está procurando não está disponível. Vamos
              levá-lo de volta à página inicial.
            </p>
            <Button
              label="Voltar à página inicial"
              click={handleClick}
              icon={<Home />}
            />
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={NotFoundImage}
              alt="Página não disponível"
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
    );
  }

  return children;
};

export default NetworkProtection;
