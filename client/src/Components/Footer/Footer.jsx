import React from "react";
import LegalesLink from "./LinkLegales";
import instagramIcon from "../../icons/instagram.png";
import linkedinIcon from "../../icons/linkedin.png";
import whatsappIcon from "../../icons/whatsapp.png";

const Footer = () => {
  return (
    <footer className="bg-white shadow-xl text-black p-4 text-center ">
      <div className="flex items-center justify-between">
        <div className="w-20 h-20 rounded ml-10 mt-8">
          <img src="\logoOriginal.png" alt="drewili" />
        </div>

        <div className="flex flex-col items-center mt-8">
          <p>Síguenos</p>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/dropshipping.peru/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={instagramIcon}
                alt="Instagram icon"
                className="mt-2 w-6 h-6"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/drewili/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedinIcon}
                alt="Linkedin icon"
                className="mt-2 w-6 h-6"
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center mt-8">
          <p className="font-bold">Envíanos tu consulta</p>
          <p>drewili.empresa@gmail.com</p>
        </div>

        <div className="flex flex-col items-center mt-8 ">
          <p className="font-bold">Contacto</p>
          <div className="flex items-center flex-col space-y-2">
            <div className="flex items-center">
              <a
                href="https://wa.me/51971985484"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={whatsappIcon}
                  alt="Whatsapp icon"
                  className="mr-2 w-4 h-4"
                />
              </a>
              <a
                href="https://wa.me/51971985484"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>971 985 484</p>
              </a>
            </div>
            <div className="flex items-center">
              <a
                href="https://wa.me/51959386167"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={whatsappIcon}
                  alt="Whatsapp icon"
                  className="mr-2 w-4 h-4"
                />
              </a>
              <a
                href="https://wa.me/51959386167"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>959 386 167</p>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8 mr-10 ">
          <LegalesLink
            text="Política de contratación"
            url="https://docs.google.com/document/d/1LyWMuTLWuKwGzpHI-WsoCLXb8mTev0cA/edit#heading=h.gjdgxs"
          />
          <LegalesLink
            text="Términos y Condiciones"
            url="https://docs.google.com/document/d/1K0Ppm40WRu-t4nbMoyNki7sNyCfR2_rv/edit"
          />
          <LegalesLink
            text="Política de Privacidad"
            url="https://docs.google.com/document/d/1YameiO7oNAqdk3-kx0JC0VjjP2rTYWCz/edit"
          />
        </div>
      </div>

      <p className="mt-6">© 2024 DREWILI Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
