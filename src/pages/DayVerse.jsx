import { useState, useEffect } from "react";
import { generateVerse } from "../auth";

const DayVerse = () => {
  const [verseData, setVerseData] = useState({
    reference: "Não disponível",
    text: "Não disponível",
  });

  const fetchVerse = async () => {
    try {
      const response = await generateVerse();
      console.log(response);
      const verse = response || {
        text: "Não disponível",
        reference: "Não disponível",
      };

      if (verse?.text && verse?.reference) {
        setVerseData(verse);
        localStorage.setItem("verseData", JSON.stringify(verse));
        localStorage.setItem("lastFetched", new Date().toISOString());
      } else {
        throw new Error("Invalid verse data received");
      }
    } catch (error) {
      console.error("Error fetching verse:", error.message);
    }
  };

  const checkForNewDay = () => {
    const now = new Date();
    const lastFetched = new Date(localStorage.getItem("lastFetched"));
    const storedVerse = JSON.parse(localStorage.getItem("verseData"));

    if (
      !lastFetched ||
      now.toDateString() !== lastFetched.toDateString() ||
      !storedVerse
    ) {
      fetchVerse();
    } else {
      setVerseData(storedVerse);
    }
  };

  useEffect(() => {
    checkForNewDay();
    const interval = setInterval(checkForNewDay, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-full w-full flex justify-center items-center p-2">
      <div className="h-[80%] w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] bg-white rounded-xl shadow-xl p-6 flex flex-col justify-center items-center text-center gap-4 max-sm:overflow-y-scroll">
        <h1 className="font-oswald text-2xl sm:text-3xl text-gray-800 font-bold">
          {"Versículo do Dia".toUpperCase()}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 italic">
          "{verseData.text.trim()}"
        </p>
        <p className="text-md sm:text-lg text-gray-700 font-medium">
          - {verseData.reference.trim()}
        </p>
        <div className="mt-4 text-sm text-gray-500">
          <p>Aviso: Este versículo é atualizado automaticamente a cada dia.</p>
        </div>
      </div>
    </section>
  );
};

export default DayVerse;
