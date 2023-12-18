import React, { useState, useEffect } from 'react';
import validation from './validation';

function UserForm() {
  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
   dnitype: "",
    DNI: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
   dnitype: "",
    DNI: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }))
    setErrors(validation({
      ...input,
      [name]: value
    }));
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Regístrate</h1>
        <form className="border border-orange-500 rounded p-6 text-arial text-base">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-orange-500 mb-2">Nombre:</label>
              <input
                type="text"
                name="name"
                placeholder="Ingrese su nombre"
                value={input.name}
                onChange={handleInputChange}
                className="border rounded p-3 w-full bg-white focus:outline-none"
              />
            </div>
            <span>{errors?.name}</span>
            <div className="w-1/2">
              <label className="block text-orange-500 mb-2">Apellido:</label>
              <input
                type="text"
                name="lastname"
                placeholder="Ingrese su apellido"
                value={input.lastname}
                onChange={handleInputChange}
                className="border rounded p-3 w-full bg-white focus:outline-none"
              />
            </div>
            <span>{errors?.lastname}</span>
          </div>
          <div className="mt-4">
            <label className="block text-orange-500 mb-2">Correo Electrónico:</label>
            <input
              type="text"
              name="email"
              placeholder="Ingrese su correo electrónico"
              value={input.email}
              onChange={handleInputChange}
              className="border rounded p-3 w-full bg-white focus:outline-none"
            />
          </div>
          <span>{errors?.email}</span>
          <div className="mt-4">
            <label className="block text-orange-500 mb-2">Teléfono:</label>
            <input
              type="text"
              name="phone"
              placeholder="Ingrese su teléfono de contacto"
              value={input.phone}
              onChange={handleInputChange}
               className="border rounded p-3 w-full bg-white focus:outline-none"
            />
          </div>
          <span>{errors?.phone}</span>
          <div className="flex space-x-4 mt-4">
            <div className="w-2/5">
              <label className="block text-orange-500 mb-2">Tipo de documento:</label>
              <select
                name="dnitype"
                className="border rounded p-3 bg-white focus:outline-none w-full"
              >
                <option value="">Selecciona un documento</option>
                <option value="dni">DNI</option>
                <option value="ce">CE</option>
                <option value="pasaporte">Pasaporte</option>
              </select>
            </div>
            <div className="w-3/5">
              <label className="block text-orange-500 mb-2">Número de documento:</label>
              <input
                type="text"
                name="DNI"
                placeholder="Ingrese su documento"
                value={input.DNI}
                onChange={handleInputChange}
                className="border rounded p-3 bg-white focus:outline-none w-full"
              />
            </div> 
            <span>{errors?.DNI}</span>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-orange-500 text-white py-3 px-6 rounded-full w-full"
            >
              Registrate
            </button>
          </div>
        </form>
        <div className="my-4">
          <h1 className="text-lg font-semibold mb-2">O ingresa con</h1>
          <h1 className="text-lg">Sección para poner terceros</h1>
        </div>
      </div>
    </>
  );
}

export default UserForm;
