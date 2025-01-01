import { useState, useEffect } from "react";
import { generateVerse } from "../auth";

const DayVerse = () => {
  const [verseData, setVerseData] = useState({
    reference: "",
    text: "",
  });

  const fetchVerse = async () => {
    try {
      const response = await generateVerse();

      const verse =
        response === null
          ? { text: "Não disponível", reference: "Não disponível" }
          : response;

      if (verse && verse.reference && verse.text) {
        setVerseData(verse);
        localStorage.setItem("verseData", JSON.stringify(verse));
        localStorage.setItem("lastFetched", new Date().toISOString());
      } else {
        throw new Error("Invalid verse data received");
      }
    } catch (error) {
      console.error("Error fetching verse:", error);
    }
  };

  const checkForNewDay = () => {
    const now = new Date();
    const lastFetched = new Date(localStorage.getItem("lastFetched"));
    const verseDataStored = JSON.parse(localStorage.getItem("verseData"));

    if (
      !lastFetched ||
      now.toDateString() !== lastFetched.toDateString() ||
      !verseDataStored
    ) {
      fetchVerse();
    } else {
      setVerseData(verseDataStored);
    }
  };

  const formatText = (text) => {
    return text ? String(text).trim() : "Não disponível";
  };

  useEffect(() => {
    fetchVerse();

    const interval = setInterval(() => {
      checkForNewDay();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-full w-full flex justify-center items-center p-2">
      <div className="h-[80%] w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] bg-white rounded-xl shadow-xl p-6 flex justify-center items-center flex-col text-center gap-4 max-sm:overflow-y-scroll">
        <h1 className="font-oswald text-2xl sm:text-3xl text-gray-800 font-bold">
          {"Versículo do Dia".toUpperCase()}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 italic">
          "{formatText(verseData.text)}"
        </p>
        <p className="text-md sm:text-lg text-gray-700 font-medium">
          - {formatText(verseData.reference)}
        </p>
        <div className="mt-4 text-sm text-gray-500">
          <p>Aviso: Este versículo é atualizado automaticamente a cada dia.</p>
        </div>
      </div>
    </section>
  );
};

export default DayVerse;
