import * as Components from "./export.js";
import { Home } from "lucide-react";
import NotFoundImage from "./assets/not_found.svg";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Button from "./components/Button.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <div className="h-screen w-screen flex flex-col">
        <Components.Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Components.Home />} />
            <Route path="/profile" element={<Components.Profile />} />
            <Route
              path="/versiculo"
              element={
                <Components.NetworkProtection>
                  <Components.DayVerse />
                </Components.NetworkProtection>
              }
            />
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
