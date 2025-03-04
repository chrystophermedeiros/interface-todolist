

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [hasConsented, setHasConsented] = useState<boolean>(false);

  useEffect(() => {
    const consentStatus = Cookies.get("cookieConsent");
    if (consentStatus === "true") {
      setHasConsented(true);
    } else {
      setShowBanner(true);
    }
  }, []);

  
  if (hasConsented) return null;


   const acceptCookies = () => {
    Cookies.set("cookieConsent", "true", { expires: 30 });
    toast.success("Você aceitou os cookies!");
    setHasConsented(true);
    setShowBanner(false); 
  };

  const declineCookies = () => {
    toast.info("Você recusou os cookies.");
    setShowBanner(false); 
    setTimeout(() => {
      window.location.href = "/";
    }, 2500);
  };

  return (
    <>
      {showBanner && (
        <div className="fixed flex-col bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="">
            <p>
              Este site utiliza cookies para melhorar a sua experiência. Ao
              continuar, você concorda com o uso de cookies.
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={acceptCookies}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Aceitar
            </button>
            <button
              onClick={declineCookies}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Recusar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
