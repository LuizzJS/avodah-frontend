import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkIfLoggedIn } from "../auth.js";
import PostImage from "../assets/post.svg";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyAuthentication = async () => {
      const response = await checkIfLoggedIn();
      setIsAuthenticated(response.ok);
    };

    verifyAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return (
      <section className="h-screen w-full flex flex-col items-center justify-center px-8 bg-gray-100">
        <div className="max-w-4xl w-full text-center flex flex-col items-center md:flex-row justify-between">
          <div className="flex flex-col items-center mb-8 text-center mx-4">
            <h1 className="text-5xl font-semibold text-blue-700 mb-4">
              Carregando a página
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              A breve você será redirecionado para a página solicitada. <br />
              Caso você não seja redirecionado, verifique a sua conexão.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={PostImage}
              alt="Página não encontrada"
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
