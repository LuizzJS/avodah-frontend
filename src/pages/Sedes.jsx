const Sedes = () => {
  const address =
    "R. Itaporanga, 106 - Parque Pirajussara, Embu das Artes - SP, 06815-260, Brasil";

  const handleOpenMap = () => {
    const query = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className=" bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full overflow-hidden">
        <div className="bg-blue-600 p-4">
          <h1 className="text-white text-2xl font-bold text-center">Sedes</h1>
        </div>
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Endereço:</h2>
          <p className="text-gray-900 text-base bg-gray-50 p-4 rounded-md border border-gray-200">
            {address}
          </p>
        </div>
        <div className="p-4 bg-gray-50 text-center">
          <button
            onClick={handleOpenMap}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition duration-200">
            Ver no mapa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sedes;
