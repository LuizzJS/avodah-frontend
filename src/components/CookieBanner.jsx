import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const cookieConsent = Cookies.get("cookieConsent");
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 });
    Cookies.set("analytics", "true", { expires: 365 });
    Cookies.set("marketing", "true", { expires: 365 });
    setShowBanner(false);
  };

  const rejectAll = () => {
    Cookies.set("cookieConsent", "false", { expires: 365 });
    Cookies.set("analytics", "false", { expires: 365 });
    Cookies.set("marketing", "false", { expires: 365 });
    setShowBanner(false);
  };

  const savePreferences = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 });
    Cookies.set("analytics", preferences.analytics.toString(), {
      expires: 365,
    });
    Cookies.set("marketing", preferences.marketing.toString(), {
      expires: 365,
    });
    setShowBanner(false);
  };

  return (
    showBanner && (
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-6 rounded-t-lg shadow-lg transition-transform transform translate-y-full animate-slide-in">
        <p className="text-sm mb-4">
          Usamos cookies para melhorar sua experiência. Você pode aceitar todos
          os cookies ou personalizar suas preferências.
        </p>
        <div className="flex justify-between mb-4">
          <button
            onClick={acceptAll}
            className="bg-green-600 hover:bg-green-700 transition duration-200 px-4 py-2 rounded-lg">
            Aceitar Todos
          </button>
          <button
            onClick={rejectAll}
            className="bg-red-600 hover:bg-red-700 transition duration-200 px-4 py-2 rounded-lg">
            Recusar Todos
          </button>
          <button
            onClick={() => setShowBanner(false)}
            className="bg-blue-600 hover:bg-blue-700 transition duration-200 px-4 py-2 rounded-lg">
            Personalizar
          </button>
        </div>
        <div className="flex flex-col">
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  analytics: !prev.analytics,
                }))
              }
              className="mr-2"
            />
            Cookies de Análise
          </label>
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  marketing: !prev.marketing,
                }))
              }
              className="mr-2"
            />
            Cookies de Marketing
          </label>
          <button
            onClick={savePreferences}
            className="bg-yellow-500 hover:bg-yellow-600 transition duration-200 px-4 py-2 rounded-lg mt-2">
            Salvar Preferências
          </button>
        </div>
      </div>
    )
  );
};

export default CookieBanner;
