import React from "react";

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
      [name]: value,
    }));
    setErrors(
      validation({
        ...input,
        [name]: value,
      })
    );
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Regístrate</h1>
        <form className="border border-text-chiliRed rounded p-6 text-arial text-base">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-chiliRed mb-2">Nombre:</label>
              <input
                type="text"
                name="name"
                placeholder="Ingrese su nombre"
                className="border rounded p-3 w-full bg-white focus:outline-none"
              />
              <span className="text-orange-500">{errors?.name}</span>
            </div>

            <div className="w-1/2">
              <label className="block text-chiliRed mb-2">Apellido:</label>
              <input
                type="text"
                name="lastname"
                placeholder="Ingrese su apellido"
                className="border rounded p-3 w-full bg-white focus:outline-none"
              />
              <span className="text-orange-500">{errors?.lastname}</span>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-chiliRed mb-2">
              Correo Electrónico:
            </label>
            <input
              type="text"
              name="email"
              placeholder="Ingrese su correo electrónico"
              className="border rounded p-3 w-full bg-white focus:outline-none"
            />
          </div>
          <span className="text-orange-500">{errors?.email}</span>
          <div className="mt-4">
            <label className="block text-chiliRed mb-2">Teléfono:</label>
            <input
              type="text"
              name="phone"
              placeholder="Ingrese su teléfono de contacto"
              className="border rounded p-3 w-full bg-white focus:outline-none"
            />
          </div>
          <span className="text-orange-500">{errors?.phone}</span>
          <div className="flex space-x-4 mt-4">
            <div className="w-2/5">
              <label className="block text-chiliRed mb-2">
                Tipo de documento:
              </label>
              <select
                name="documento"
                className="border rounded p-3 bg-white focus:outline-none w-full"
              >
                <option value="">Selecciona un documento</option>
                <option value="dni">DNI</option>
                <option value="ce">CE</option>
                <option value="pasaporte">Pasaporte</option>
              </select>
              <span className="text-orange-500">{errors?.dnitype}</span>
            </div>
            <div className="w-3/5">
              <label className="block text-chiliRed mb-2">
                Número de documento:
              </label>
              <input
                type="text"
                name="DNI"
                placeholder="Ingrese su documento"
                className="border rounded p-3 bg-white focus:outline-none w-full"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-chiliRed text-whiteSmoke py-3 px-6 rounded-full w-full"
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
