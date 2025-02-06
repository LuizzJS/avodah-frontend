import { Instagram, MapPin, Youtube } from "lucide-react";
import AvodahLogo from "/avodah-transparent.png";
import Link from "./Link";

const links = [
  { label: "Reportar um erro", href: "/error-report" },
  { label: "Versículo do dia", href: "/versiculo" },
  { label: "Política de Privacidade", href: "/policy-privacy" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 px-6 py-6 flex flex-col items-center">
      <div className="w-full  flex flex-col md:flex-row items-center justify-between mb-6">
        <a href="/" className="mb-4 md:mb-0">
          <img src={AvodahLogo} alt="Avodah Logo" className="h-16" />
        </a>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {links.map((link) => (
            <Link key={link.href} href={link.href} label={link.label} />
          ))}
        </div>
      </div>
      <div className="flex gap-4 mb-6">
        <a
          href="https://www.instagram.com/ad_avodah/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-500 flex items-center justify-center hover:scale-105 hover:bg-blue-600 transition-all duration-500">
          <Instagram size={20} color="white" />
        </a>
        <a
          href="https://www.youtube.com/@AdMinisterioAvodah"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-500 flex items-center justify-center hover:scale-105 hover:bg-blue-600 transition-all duration-500">
          <Youtube size={20} color="white" />
        </a>
        <a
          href="https://www.google.com/maps/search/?api=1&query=R.%20Itaporanga%2C%20106%20-%20Parque%20Pirajussara%2C%20Embu%20das%20Artes%20-%20SP%2C%2006815-260%2C%20Brasil"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-500 flex items-center justify-center hover:scale-105 hover:bg-blue-600 transition-all duration-500">
          <MapPin size={20} color="white" />
        </a>
      </div>
      <div className="text-sm text-gray-600 text-center">
        <p>
          CNPJ: <strong>51.883.038/0001-90</strong>
        </p>
        <p>Igreja Assembleia de Deus Ministério Avodah</p>
      </div>
    </footer>
  );
};

export default Footer;
