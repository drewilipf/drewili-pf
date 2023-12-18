const validation = (input) => {
    let errors = {};

    // validaciones del nombre

    if (!input.name) {
        errors.name = "Por favor ingrese su nombre"
    }
    const nameRegex = /^[a-zA-Z\s]{4,15}$/;
    if (!nameRegex.test(input.name)) {
        errors.name = "Por favor ingrese un nombre válido";
    }

    // validaciones del apellido
    if (!input.lastname) {
        errors.lastname = "Por favor ingrese su apellido"
    }
    const lastnameRegex = /^[a-zA-Z\s]{3,15}$/;
    if (!lastnameRegex.test(input.lastname)) {
        errors.lastname = "Por favor ingrese un apellido válido";
    }

    // validaciones del email
    if (!input.email) {
        errors.email = "Por favor ingrese su email"
    }

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regexEmail.test(input.email)) {
        errors.email = "Por favor ingrese un email válido";
    }
    // validaciones del telefono
    if (!input.phone) {
        errors.phone = "Por favor ingrese su teléfono"
    }
    const peruphoneregex = /^9\d{8}$/
    if (!peruphoneregex.test(input.phone)) {
        errors.phone = "Por favor ingrese un número de celular válido"
    }

    // validaciones del dni
    if (!input.DNI) {
        errors.DNI = "Por favor ingrese su numero de documento"
    }
    const regexDNI = /^[0-9]{8}-[0-9]$/;
    const regexCE = /^[A-Z0-9]{12}$/;
    if (input.dnitype== "dni" && !regexDNI.test(input.DNI)) {
        errors.DNI = "Por favor ingrese un DNI válido"
    }
    if (input.dnitype== "ce" && !regexCE.test(input.DNI)) {
        errors.DNI = "Por favor ingrese un CE válido"
    }
    // validaciones del tipo de dni

    if(input.dnitype == ""){
        errors.dnitype = "Por favor seleccione tipo de documento"
    }


  

    return errors;
};

export default validation;