import React from "react";

const Horarios = () => {
  const schedules = [
    { day: "Segundas", event: "Escola Dominical", time: "19:00" },
    { day: "Terças", event: "Culto", time: "19:00" },
    { day: "Sextas", event: "Culto", time: "19:00" },
    { day: "Domingos", event: "Culto", time: "18:00" },
  ];

  return (
    <div className="p-4">
      <ul className="space-y-3">
        {schedules.map((schedule, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white p-4 rounded-lg">
            <span className="font-medium text-gray-700">
              {schedule.event}{" "}
              <span className="text-gray-500">({schedule.day})</span>
            </span>
            <span className="font-bold text-gray-900">{schedule.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Horarios;
