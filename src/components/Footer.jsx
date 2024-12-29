import { Instagram, Youtube, Facebook } from "lucide-react";
import AvodahLogo from "/avodah-transparent.png";
import Link from "./Link";
const links = [
  { label: "Reportar um erro", href: "/error-report" },
  { label: "Versículo do dia", href: "/versiculo" },
  { label: "Política de Privacidade", href: "/policy-privacy" },
];
const Footer = () => {
  return (
    <footer className="min-sm:h-[20vh] h-auto  w-full gap-2 flex justify-between items-center px-4 max-md:flex-col bg-slate-50  ">
      <a href="/">
        <img src={AvodahLogo} alt="Avodah Logo" className="h-24" />
      </a>
      <div className="flex justify-between items-center gap-8 text-center">
        {links.map((link) => (
          <p key={link.href}>
            <Link href={link.href} label={link.label} />
          </p>
        ))}
      </div>

      <span className="flex gap-4 text-center">
        <a
          href="https://www.instagram.com/ad_avodah/"
          target="_blank"
          className="p-2 rounded-full bg-blue-500 flex items-center justify-center hover:scale-105 hover:bg-blue-600 duration-500 transition-all ease-in-out"
          rel="noopener noreferrer">
          <Instagram size={24} color="white" />
        </a>
        <a
          href="https://www.youtube.com/@AdMinisterioAvodah"
          target="_blank"
          className="p-2 rounded-full text-center bg-blue-500 flex items-center justify-center hover:scale-105 hover:bg-blue-600 duration-500 transition-all ease-in-out"
          rel="noopener noreferrer">
          <Youtube size={24} color="white" />
        </a>
        {/* <a
          href="#"
          target="_blank"
          className="p-2 rounded-full bg-blue-500 flex items-center justify-center hover:scale-105 hover:bg-blue-600 duration-500 transition-all ease-in-out"
          rel="noopener noreferrer">
          <Facebook size={24} color="white" />
        </a> */}
      </span>
    </footer>
  );
};

export default Footer;
