import * as Components from "./export.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <div className="h-screen w-screen flex flex-col m-0 p-0 overflow-x-hidden">
        <Components.Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Components.Home />} />
            <Route path="/login" element={<Components.LoginPage />} />
            <Route path="/register" element={<Components.RegisterPage />} />
            <Route path="/tos" element={<Components.ToS />} />
            <Route path="/error-report" element={<Components.ErrorReport />} />
            <Route path="/profile" element={<Components.Profile />} />
            <Route path="/sedes" element={<Components.Sedes />} />
            <Route path="/cultos" element={<Components.Cultos />} />
            <Route
              path="/policy-privacy"
              element={<Components.PolicyPrivacy />}
            />
            <Route
              path="/versiculo"
              element={
                <Components.NetworkProtection>
                  <Components.DayVerse />
                </Components.NetworkProtection>
              }
            />
            <Route path="/forum" element={<Components.Forum />} />
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
