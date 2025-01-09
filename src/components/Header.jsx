import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Link from "./Link";
import { User2, Menu, X } from "lucide-react";
import AvodahLogo from "/avodah-transparent.png";
import { checkIfLoggedIn } from "../auth";
import axios from "axios";
axios.defaults.withCredentials = true;

const Header = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await checkIfLoggedIn();
        if (!data.ok) return setLogged(false);
        setUser(data.user);
        setLogged(true);
      } catch {
        setLogged(false);
      }
    };
    fetchUser();
  }, []);

  const handleButtonClick = () => {
    navigate(logged ? "/profile" : "/login");
    setIsMenuShown(false);
  };

  const toggleMenu = () => setIsMenuShown((prev) => !prev);

  const buttonText = logged
    ? `${user?.username} | ${
        user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)
      }`
    : "Entre ou cadastre-se";

  return (
    <header className="">
      <div className="flex justify-between items-center h-[15vh] w-full max-md:hidden p-3">
        <a href="/">
          <img src={AvodahLogo} alt="Ministério Avodah" className="h-60" />
        </a>

        <Button click={handleButtonClick} label={buttonText} icon={<User2 />} />
      </div>

      <div className="hidden max-md:flex items-center justify-between absolute z-auto">
        <Menu onClick={toggleMenu} className="cursor-pointer m-4" />
        {isMenuShown && (
          <div className="absolute top-0 left-0 h-screen w-screen bg-blue-500 flex flex-col items-start p-4 overflow-hidden z-20">
            <X onClick={toggleMenu} className="cursor-pointer mb-4" />
            <div className="w-full bg-white rounded-xl shadow-lg p-4">
              <Button
                click={handleButtonClick}
                label={buttonText}
                icon={<User2 />}
              />
              <div className="flex flex-col justify-center items-start font-semibold max-md:text-sm">
                <Link href="/" label="Início" />
                <Link href="/versiculo" label="Versículo do dia" />
                <Link href="/policy-privacy" label="Política de Privacidade" />
                <Link href="/tos" label="Termos de Uso" />
                <Link href="/" label="Sobre nós" />
                <Link href="/horarios" label="Dias e horários de culto" />
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
