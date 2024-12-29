import * as Components from "./export.js";
import { Home } from "lucide-react";
import NotFoundImage from "./assets/not_found.svg";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Button from "./components/Button.jsx";

const App = () => {
  // if (!navigator.onLine) {
  //   const handleClick = () => (window.location.href = "/");

  //   return (
  //     <section className="h-screen w-screen flex flex-col items-center justify-center px-8 bg-gray-100">
  //       <div className="max-w-4xl w-full text-center flex flex-col items-center md:flex-row justify-between">
  //         <div className="flex flex-col items-center mb-8 text-center">
  //           <h1 className="text-5xl font-semibold text-blue-700 mb-4">
  //             Página indisponível
  //           </h1>
  //           <p className="text-lg text-gray-600 mb-6">
  //             A página que você está procurando não está disponível. Vamos
  //             levá-lo de volta à página inicial.
  //           </p>
  //           <Button
  //             label="Voltar à página inicial"
  //             click={handleClick}
  //             key="homePage"
  //             icon={<Home />}
  //           />
  //         </div>

  //         <div className="w-full md:w-1/2 flex justify-center md:justify-end">
  //           <img
  //             src={NotFoundImage}
  //             alt="Página não disponível"
  //             className="max-w-full h-auto object-contain"
  //           />
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <BrowserRouter>
      <div className="h-screen w-screen flex flex-col">
        <Components.Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Components.Home />} />
            <Route path="/profile" element={<Components.Profile />} />
            <Route path="/versiculo" element={<Components.DayVerse />} />
            <Route path="/login" element={<Components.LoginPage />} />
            <Route path="/register" element={<Components.RegisterPage />} />
            <Route path="/error-report" element={<Components.ErrorReport />} />
            <Route
              path="/forum"
              element={
                <Components.ProtectedRoute>
                  <Components.Forum />
                </Components.ProtectedRoute>
              }
            />
            <Route
              path="/policy-privacy"
              element={<Components.PolicyPrivacy />}
            />
            <Route path="/tos" element={<Components.ToS />} />
            <Route path="*" element={<Components.NotFound />} />
          </Routes>
        </main>
        <Components.Footer />
      </div>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
