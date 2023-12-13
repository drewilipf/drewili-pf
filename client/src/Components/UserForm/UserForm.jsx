function UserForm() {
    return (
        <>
            <div>
                <h1>Form</h1>
                <div>
                    <form>
                        <label>Nombre:  </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ingrese su nombre"
                        />
                        <label>Apellido:  </label>
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Ingrese su apellido"
                        />
                        <label>Correo Electrónico:  </label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Ingrese su correo electrónico"
                        />
                        <label>Tipo de documento:</label>
                        <select
                            name="documento"
                        >
                            <option value="">Selecciona un documento</option>
                            <option value="dni">DNI</option>
                            <option value="ce">CE</option>
                            <option value="pasaporte">Pasaporte</option>
                        </select>

                        <label>Número de documento:  </label>
                        <input
                            type="text"
                            name="DNI"
                            placeholder="Ingrese su numero de documento"
                        />
                         <label>Teléfono:  </label>
                        <input
                            type="text"
                            name="DNI"
                            placeholder="Ingrese su teléfono de contacto"
                        />
                    </form>
                </div>
                <h1> o ingresa con</h1>
                <h1> sección para poner terceros</h1>
            </div>
        </>
    );
}

export default UserForm;