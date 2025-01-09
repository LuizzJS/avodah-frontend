import { Instagram, Youtube } from "lucide-react";
import AvodahLogo from "/avodah-transparent.png";
import Link from "./Link";

const links = [
  { label: "Reportar um erro", href: "/error-report" },
  { label: "Versículo do dia", href: "/versiculo" },
  { label: "Política de Privacidade", href: "/policy-privacy" },
];

const Footer = () => {
  return (
    <footer className="min-sm:h-[20vh] h-auto w-full flex justify-between items-center px-4 max-md:flex-col bg-slate-50 py-4">
      <a href="/" className="flex justify-center mb-4 max-md:mb-2">
        <img src={AvodahLogo} alt="Avodah Logo" className="h-24" />
      </a>

      <div className="flex justify-between items-center gap-8 text-center mb-4 max-md:w-full max-md:gap-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href} label={link.label} />
        ))}
      </div>

      <span className="flex gap-4 text-center justify-center">
        <a
          href="https://www.instagram.com/ad_avodah/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-500 flex items-center justify-center hover:scale-105 hover:bg-blue-600 duration-500 transition-all ease-in-out">
          <Instagram size={24} color="white" />
        </a>
        <a
          href="https://www.youtube.com/@AdMinisterioAvodah"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-500 flex items-center justify-center hover:scale-105 hover:bg-blue-600 duration-500 transition-all ease-in-out">
          <Youtube size={24} color="white" />
        </a>
      </span>
    </footer>
  );
};

export default Footer;
