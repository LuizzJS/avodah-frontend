import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Link from "./Link";
import { User2, Menu, X } from "lucide-react";
import AvodahLogo from "/avodah-transparent.png";
import { checkIfLoggedIn } from "../auth";
import axios from "axios";

axios.defaults.withCredentials = true;

const cargos = {
  0: "Desenvolvedor",
  1: "Pastor Presidente",
  2: "Pastor Vice-Presidente",
  4: "Secretário/a",
  4: "Líder de Departamento",
  5: "Líder",
  6: "Influenciador",
  7: "Membro",
};

const Header = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);
  const [buttonText, setButtonText] = useState("Carregando...");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await checkIfLoggedIn();
        if (!data.ok || !data.user) {
          setLogged(false);
          setUser(null);
          setButtonText("Entre ou cadastre-se");
          return;
        }
        setUser(data.user);
        setLogged(true);
        setButtonText(
          `${
            data.user.username?.charAt(0).toUpperCase() +
            data.user.username?.slice(1)
          } | ${cargos[data.user?.rolePosition] || "Membro"}`
        );
      } catch {
        setLogged(false);
        setUser(null);
        setButtonText("Entre ou cadastre-se");
      }
    };

    fetchUser();
  }, []);

  const handleButtonClick = () => {
    navigate(logged ? "/profile" : "/login");
    setIsMenuShown(false);
  };

  const toggleMenu = () => setIsMenuShown((prev) => !prev);

  return (
    <header className="w-full">
      <div className="flex justify-between items-center h-[15vh] w-full p-3 max-md:hidden">
        <a onClick={() => navigate("/")}>
          <img
            src={AvodahLogo}
            alt="Ministério Avodah"
            className="h-20 cursor-pointer"
          />
        </a>
        <Button click={handleButtonClick} label={buttonText} profile />
      </div>

      <div className="hidden max-md:flex items-center justify-between absolute z-20 w-full p-3">
        <Menu onClick={toggleMenu} className="cursor-pointer m-4" />
        {isMenuShown && (
          <div className="absolute top-0 left-0 h-screen w-full bg-blue-500 flex flex-col items-start p-6 overflow-y-auto z-20">
            <X
              onClick={toggleMenu}
              className="cursor-pointer mb-6 text-white"
            />
            <div className="w-full bg-white rounded-xl shadow-lg p-4 flex flex-col gap-4">
              <Button click={handleButtonClick} label={buttonText} profile />
              <div className="flex flex-col gap-2 font-semibold text-white">
                <Link href="/" label="Início" />
                <Link href="/versiculo" label="Versículo do dia" />
                <Link href="/policy-privacy" label="Política de Privacidade" />
                <Link href="/tos" label="Termos de Uso" />
                <Link href="/" label="Sobre nós" />
                <Link href="/cultos" label="Dias e horários de culto" />
                <Link href="/sedes" label="Sedes" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
