import Button from "../components/Button.jsx";
import { Download } from "lucide-react";

const Horarios = () => {
  const schedules = [
    { day: "Segunda", event: "Escola Dominical", time: "19:00" },
    { day: "Terça", event: "Culto", time: "19:00" },
    { day: "Sexta", event: "Culto", time: "19:00" },
    { day: "Domingo", event: "Culto", time: "18:00" },
  ];

  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = "/cronograma_eventos.xlsx";
    link.download = "cronograma_eventos.xlsx";
    link.click();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Cronograma de Eventos
      </h2>
      <ul className="space-y-5 w-full max-w-lg">
        {schedules.map((schedule, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-200 p-4 rounded-lg shadow-lg hover:scale-105 transition transform">
            <div className="flex flex-col">
              <span className="font-medium text-gray-800 text-lg">
                {schedule.event}
              </span>
              <span className="text-gray-600">{schedule.day}</span>
            </div>
            <span className="font-bold text-indigo-800">{schedule.time}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center w-full max-w-lg">
        <Button
          label={"Baixar Cronograma"}
          click={downloadFile}
          icon={<Download />}
        />
      </div>
    </div>
  );
};

export default Horarios;
