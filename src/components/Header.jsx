import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Link from "./Link";
import { Menu, X } from "lucide-react";
import AvodahLogo from "/avodah-transparent.png";
import axios from "axios";

axios.defaults.withCredentials = true;

const Header = () => {
  const cargos = {
    0: "Desenvolvedor",
    1: "Pastor Presidente",
    2: "Pastor Vice-Presidente",
    3: "Secretário/a",
    4: "Líder de Departamento",
    5: "Líder",
    6: "Influenciador",
    7: "Membro",
  };
  const [member, setMember] = useState(null);
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [buttonText, setButtonText] = useState("Entre ou cadastre-se");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("/api/auth/isLogged", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.success && response.data.data) {
            const user = response.data.data;
            setMember(user);
            const username =
              String(user.username)[0].toUpperCase() +
              String(user.username).slice(1);
            setButtonText(`${username} | ${cargos[user.rolePosition]}`);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleButtonClick = () => {
    setMember((prevMember) => {
      navigate(prevMember === null ? "/login" : "/profile");
      return prevMember;
    });
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
              <div className="flex flex-col font-medium text-white">
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
