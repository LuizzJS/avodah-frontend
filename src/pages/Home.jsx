import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import * as Images from "../slider_images/export.images";

const Home = () => {
  const [image, setImage] = useState("");
  const [shown, setShown] = useState(false);

  const slider_images = [
    Images.aniversario,
    Images.batismo,
    Images.culto,
    Images.another1,
    Images.another2,
    Images.another3,
    Images.another4,
    Images.another5,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (e) => {
    setImage(e.target.src);
    setShown(true);
  };

  const handleNext = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slider_images.length);
  const handlePrev = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slider_images.length - 1 : prevIndex - 1
    );

  return (
    <section
      className={`h-full w-full bg-blue-500 p-3 flex justify-evenly items-center max-md:flex-col z-1 ${
        shown ? "backdrop-blur" : ""
      } transition-all duration-500`}>
      {shown && (
        <div
          className="absolute inset-0 flex items-center justify-center z-50 bg-black/50"
          onClick={() => setShown(false)}>
          <div
            className="relative h-[60%] w-auto bg-white shadow-xl flex items-center justify-center rounded-xl"
            onClick={(e) => e.stopPropagation()}>
            <img
              src={image}
              alt="Imagem aumentada"
              className="rounded-md cursor-pointer object-contain max-h-full max-w-full"
              onClick={() => setShown(false)}
            />
          </div>
        </div>
      )}

      <div className="flex justify-center items-center gap-4">
        <div className="relative w-[400px] h-[400px] max-sm:w-[200px] max-sm:h-[200px] bg-white shadow-md rounded-xl flex justify-center items-center overflow-hidden">
          <button
            onClick={handlePrev}
            className="absolute left-2 z-10 bg-gray-200 p-2 rounded-full hover:bg-gray-400 shadow-md hover:scale-105 duration-300 transition-all">
            <ChevronLeft />
          </button>
          <img
            src={slider_images[currentIndex]}
            alt={`Imagem ${currentIndex + 1}`}
            className="cursor-pointer rounded-md object-contain min-h-full min-w-full"
            onClick={handleImageClick}
          />
          <button
            onClick={handleNext}
            className="absolute right-2 z-10 bg-gray-200 p-2 rounded-full hover:bg-gray-400 shadow-md hover:scale-105 duration-300 transition-all">
            <ChevronRight />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {[Images.culto, Images.batismo].map((img, idx) => (
            <div
              key={idx}
              className="w-[200px] h-[200px] max-sm:w-[100px] max-sm:h-[100px] bg-white shadow-md rounded-xl flex justify-center items-center overflow-hidden cursor-pointer"
              onClick={handleImageClick}>
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="rounded-md object-contain min-h-full min-w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center max-w-3xl  ">
        <h1 className="text-5xl font-bold leading-none text-white mb-4">
          SOBRE A AVODAH
        </h1>
        <p className="text-lg text-gray-200 break-words ">
          Somos a Assembleia de Deus Ministério Avodah, uma igreja que vive para
          glorificar a Deus por meio da adoração, da proclamação da Palavra e do
          serviço ao próximo. Aqui, você encontrará um ambiente acolhedor para
          fortalecer sua fé e crescer espiritualmente. Seja bem-vindo à nossa
          família!
        </p>
      </div>
    </section>
  );
};

export default Home;
