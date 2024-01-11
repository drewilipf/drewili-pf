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
                    <div className="shadow-xl grid grid-cols-4 border border-chiliRed rounded-md bg-white gap-4">
                        <div className="bg-white border border-chiliRed rounded-md p-4 mt-4 w-52 h-48 ">
                            <div className="bg- rounded-md p-4 mt-4 ">
                                <h2>Bird's Team</h2>
                                <p>Quizás, el mejor grupo al cual se puede pertenecer.</p>
                            </div>
                        </div>
                        <div className="border border-chiliRed bg-white rounded-md grid grid-col p-4 mt-4 w-48 h-48">
                            <h2>Sergio Vallenari</h2>
                            <img
                                src={menProgram}
                                alt="Descripción de la imagen"
                                className="w-24 h-24" // Ajusta el tamaño según tus necesidades usando clases de Tailwind
                            />
                        <div className="flex items-center mr-8 ml-4">
                            <IoLogoGithub className="w-8 h-8" />
                            <FaLinkedin className="w-8 h-8"/>
                        </div>
                        </div>
                        <div className="border border-chiliRed bg-white rounded-md p-4 mt-4 w-48 h-48">
                            <h2>Gabi</h2>
                            <img
                                src={womanProgram}
                                alt="Descripción de la imagen"
                                className="w-24 h-24" // Ajusta el tamaño según tus necesidades usando clases de Tailwind
                            />
                            <div className="flex items-center mr-8 ml-4">
                            <IoLogoGithub className="w-8 h-8" />
                            <FaLinkedin className="w-8 h-8"/>
                        </div>
                        </div>
                        <div className="border border-chiliRed bg-white rounded-md p-4 mt-4 w-48 h-48">
                            <h2>Flor</h2>
                            <img
                                src={womanProgram}
                                alt="Descripción de la imagen"
                                className="w-24 h-24" // Ajusta el tamaño según tus necesidades usando clases de Tailwind
                            />
                            <div className="flex items-center mr-8 ml-4">
                            <IoLogoGithub className="w-8 h-8" />
                            <FaLinkedin className="w-8 h-8"/>
                        </div>
                        </div>
                        <div className="border border-chiliRed bg-white rounded-md p-4 mt-4 w-48 h-48">
                            <h2>Juan</h2>
                            <img
                                src={menProgram}
                                alt="Descripción de la imagen"
                                className="w-24 h-24" // Ajusta el tamaño según tus necesidades usando clases de Tailwind
                            />
                           <div className="flex items-center mr-8 ml-4">
                            <IoLogoGithub className="w-8 h-8" />
                            <FaLinkedin className="w-8 h-8"/>
                        </div>
                        </div>
                        <div className="border border-chiliRed bg-white rounded-md p-4 mt-4 w-48 h-48">
                            <h2>Nico</h2>
                            <img
                                src={menProgram}
                                alt="Descripción de la imagen"
                                className="w-24 h-24" // Ajusta el tamaño según tus necesidades usando clases de Tailwind
                            />
                            <div className="flex items-center mr-8 ml-4">
                            <IoLogoGithub className="w-8 h-8" />
                            <FaLinkedin className="w-8 h-8"/>
                        </div>
                        </div>
                        <div className="border border-chiliRed bg-white rounded-2xl p-4 mt-4 w-48 h-48">
                            <h2>Mauri</h2>
                            <img
                                src={menProgram}
                                alt="Descripción de la imagen"
                                className="w-24 h-24" // Ajusta el tamaño según tus necesidades usando clases de Tailwind
                            />
                           <div className="flex items-center mr-8 ml-4">
                            <IoLogoGithub className="w-8 h-8" />
                            <FaLinkedin className="w-8 h-8"/>
                        </div>
                        </div>
                        <div className="border border-chiliRed bg-white rounded-2xl p-4 mt-4 w-48 h-48">
                            <h2>Juli</h2>
                            <img
                                src={womanProgram}
                                alt="Descripción de la imagen"
                                className="w-24 h-24" // Ajusta el tamaño según tus necesidades usando clases de Tailwind
                            />
                            <div className="flex items-center mr-8 ml-4">
                            <IoLogoGithub className="w-8 h-8" />
                            <FaLinkedin className="w-8 h-8"/>
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

