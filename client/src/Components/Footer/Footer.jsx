import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-black p-4 text-center">
            <div className="flex items-center justify-between">

                <div className="w-40 h-40 rounded ml-10 mt-8">
                    <img src="\logoOriginal.png" alt="drewili" />
                </div>

                <div className="flex flex-col items-center mt-8">
                    <p>Nuestras redes</p>
                    <div className="flex items-center space-x-2">
                        <img
                            src="/src/icons/facebook-svgrepo-com 1.png"
                            alt="Facebook icon"
                            className="w-6 h-6"
                        />
                        <img
                            src="/src/icons/instagram-svgrepo-com 1.png"
                            alt="Instagram icon"
                            className="w-6 h-6"
                        />
                        <img
                            src="/src/icons/linkedin-svgrepo-com 1.png"
                            alt="Linkedin icon"
                            className="w-6 h-6"
                        />
                    </div>
                </div>

                <div className="border-l-2 border-white h-16"></div> {/* DIV SEPARATION */}

                <div className="flex flex-col items-center mt-8">
                    <p className="font-bold">Contacto</p>
                    <div className="flex items-center flex-col">
                        <img
                            src="/src/icons/whatsapp-svgrepo-com 1.png"
                            alt="Whatsapp icon"
                            className="w-4 h-4"
                        />
                        <p>971 985 484</p>

                        <img
                            src="/src/icons/whatsapp-svgrepo-com 1.png"
                            alt="Whatsapp icon"
                            className="w-4 h-4"
                        />
                        <p>959 386 167</p>
                    </div>
                </div>

            </div>

            <p className="mt-8">© 2024 DREWILI Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;
