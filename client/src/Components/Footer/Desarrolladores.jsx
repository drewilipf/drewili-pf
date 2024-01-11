import React from "react";
import { LuBird } from "react-icons/lu";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import menProgram from "../../icons/menProgram.avif"
import womanProgram from "../../icons/womanProgram.avif"

const Creators = () => {
    // Número de repeticiones en la cuadrícula
    const numRepeticiones = 72;

    return (
        <div className="relative">
            <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                    background: `url(${LuBird}) repeat`,
                }}
            ></div>
            <div className="grid grid-cols-12 gap-20 p-4 h-screen relative z-10">
                {[...Array(numRepeticiones)].map((_, index) => (
                    <div
                        key={index}
                        className="col-span-1 flex items-center justify-center"
                    >
                        <LuBird className="text-onyx" />
                    </div>
                ))}
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                    <div className="shadow-xl grid grid-cols-4 border border-chiliRed rounded-2xl bg-white gap-4">
                        <div className=" shadow-2xl border border-chiliRed bg-whiteSmoke rounded-2xl flex items-center flex-col p-2 mb-4 mt-4 ml-4 w-48 h-48">
                            <div className="bg- rounded-md p-4 mt-4 flex  flex-col">
                                <h2 className="font-bold text-center">Bird's Team</h2>
                                <p className="text-center">Quizás, el mejor equipo al cual se pueda pertenecer.</p>
                            </div>
                        </div>
                        <div className="shadow-2xl border border-chiliRed bg-whiteSmoke rounded-2xl flex items-center flex-col p-2 mb-4 mt-4 w-48 h-48">
                            <h2 className="font-bold">Sergio Vallenari</h2>
                            <img
                                src={menProgram}
                                alt="Descripción de la imagen"
                                className="w-24 h-24" // Ajusta el tamaño según tus necesidades usando clases de Tailwind
                            />
                            <div className="flex items-center ">.
                                <a href="https://github.com/SergioFVallenari" target="_blank" rel="noopener noreferrer">
                                    <IoLogoGithub className="w-8 h-8 mr-4 hover:scale-125 transition-transform duration-300 ease-in-out" />
                                </a>
                                <a href="https://www.linkedin.com/in/sergio-vallenari-45737b20a/" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="w-8 h-8 hover:scale-125 transition-transform duration-300 ease-in-out" />
                                </a>
                            </div>
                        </div>
                        <div className="shadow-2xl border border-chiliRed bg-whiteSmoke rounded-2xl flex items-center flex-col p-2 mb-4 mt-4 w-48 h-48">
                            <h2 className="font-bold">Gabriela de Freitas</h2>
                            <img
                                src={womanProgram}
                                alt="Descripción de la imagen"
                                className="w-24 h-24" // Ajusta el tamaño según tus necesidades usando clases de Tailwind
                            />
                            <div className="flex items-center ">
                            <a href="https://github.com/gabrielaDF" target="_blank" rel="noopener noreferrer">
                                    <IoLogoGithub className="w-8 h-8 mr-4 hover:scale-125 transition-transform duration-300 ease-in-out" />
                                </a>
                                <a href="https://www.linkedin.com/in/gabriela-de-freitas-90529b121/" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="w-8 h-8 hover:scale-125 transition-transform duration-300 ease-in-out" />
                                </a>
                            </div>
                        </div>
                        <div className="shadow-2xl border border-chiliRed bg-whiteSmoke rounded-2xl flex items-center flex-col p-2 mb-4 mt-4 w-48 h-48">
                            <h2 className="font-bold">Florencia Arévalo</h2>
                            <img
                                src={womanProgram}
                                alt="Descripción de la imagen"
                                className="w-24 h-24" // Ajusta el tamaño según tus necesidades usando clases de Tailwind
                            />
                            <div className="flex items-center ">
                            <a href="https://github.com/MFArevaloCordoba" target="_blank" rel="noopener noreferrer">
                                    <IoLogoGithub className="w-8 h-8 mr-4 hover:scale-125 transition-transform duration-300 ease-in-out" />
                                </a>
                                <a href="https://www.linkedin.com/in/florencia-ar%C3%A9valo-148271275/" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="w-8 h-8 hover:scale-125 transition-transform duration-300 ease-in-out" />
                                </a>
                            </div>
                        </div>
                        <div className="shadow-2xl border border-chiliRed bg-whiteSmoke rounded-2xl flex items-center flex-col p-2 mb-4 ml-4 w-48 h-48">
                            <h2 className="font-bold">Juan Ruiz</h2>
                            <img
                                src={menProgram}
                                alt="Descripción de la imagen"
                                className="w-24 h-24" 
                            />
                            <div className="flex items-center ">
                            <a href="https://github.com/juanruize" target="_blank" rel="noopener noreferrer">
                                    <IoLogoGithub className="w-8 h-8 mr-4 hover:scale-125 transition-transform duration-300 ease-in-out" />
                                </a>
                                <a href="https://www.linkedin.com/in/juan-guillermo-ruiz-32b76513a/" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="w-8 h-8 hover:scale-125 transition-transform duration-300 ease-in-out" />
                                </a>
                            </div>
                        </div>
                        <div className="shadow-2xl border border-chiliRed bg-whiteSmoke rounded-2xl flex items-center flex-col p-2 mb-4  w-48 h-48">
                            <h2 className="font-bold">Nicolás Diez</h2>
                            <img
                                src={menProgram}
                                alt="Descripción de la imagen"
                                className="w-24 h-24" // Ajusta el tamaño según tus necesidades usando clases de Tailwind
                            />
                            <div className="flex items-center ">
                            <a href="https://github.com/NicolasSDiez" target="_blank" rel="noopener noreferrer">
                                    <IoLogoGithub className="w-8 h-8 mr-4 hover:scale-125 transition-transform duration-300 ease-in-out" />
                                </a>
                                <a href="https://www.linkedin.com/in/nicolas-sdiez/" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="w-8 h-8 hover:scale-125 transition-transform duration-300 ease-in-out" />
                                </a>
                            </div>
                        </div>
                        <div className="shadow-2xl border border-chiliRed bg-whiteSmoke rounded-2xl flex items-center flex-col p-2 mb-4  w-48 h-48">
                            <h2 className="font-bold">Mauricio Collado</h2>
                            <img
                                src={menProgram}
                                alt="Descripción de la imagen"
                                className="w-24 h-24" // Ajusta el tamaño según tus necesidades usando clases de Tailwind
                            />
                            <div className="flex items-center ">
                            <a href="https://github.com/Elranas5000" target="_blank" rel="noopener noreferrer">
                                    <IoLogoGithub className="w-8 h-8 mr-4 hover:scale-125 transition-transform duration-300 ease-in-out" />
                                </a>
                                <a href="https://www.linkedin.com/in/mauricio-collado-455835241/" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="w-8 h-8 hover:scale-125 transition-transform duration-300 ease-in-out" />
                                </a>
                            </div>
                        </div>
                        <div className="shadow-2xl border border-chiliRed bg-whiteSmoke rounded-2xl flex items-center flex-col p-2 mb-4  w-48 h-48">
                            <h2 className="font-bold">Juliana FLorez</h2>
                            <img
                                src={womanProgram}
                                alt="Descripción de la imagen"
                                className="w-24 h-24 flex items-center" // Ajusta el tamaño según tus necesidades usando clases de Tailwind
                            />
                            <div className="flex items-center">
                            <a href="https://github.com/JFlorezQ" target="_blank" rel="noopener noreferrer">
                                    <IoLogoGithub className="w-8 h-8 mr-4 hover:scale-125 transition-transform duration-300 ease-in-out" />
                                </a>
                                <a href="https://www.linkedin.com/in/juliana-florez-quiros-483801229/" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="w-8 h-8 hover:scale-125 transition-transform duration-300 ease-in-out" />
                                </a>
                            </div>
                        </div>

                        {/* Agrega más divs con información según sea necesario */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Creators;

