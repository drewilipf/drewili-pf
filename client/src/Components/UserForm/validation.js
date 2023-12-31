const validation = (input) => {
    let errors = {};

    // validaciones del userName

    if (!input.username) {
        errors.username = "Por favor ingrese su nombre de usuario"
    }
    const userNameRegex = /^[a-zA-Z0-9ñÑ]+$/;
    if (!userNameRegex.test(input.username)) {
        errors.username = "Por favor ingrese un nombre de usuario válido";
    }
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

    // validaciones de la constraseña
    if (!input.password) {
        errors.password = "Por favor ingrese una constraseña"
    }

    const regexPassword1 = /[a-z]/
    if (!regexPassword1.test(input.password)) {
        errors.password = "La constraseña debe tener al menos una letra minúscula ";
    }
    const regexPassword2 = /[A-Z]/
    if (!regexPassword2.test(input.password)) {
        errors.password = "La constraseña debe tener al menos una letra mayúscula ";
    }
    const regexPassword3 = /\d/
    if (!regexPassword3.test(input.password)) {
        errors.password = "La constraseña debe tener al menos un díjito ";
    }
    const regexPassword4 = /[!@#$%^&*()?¿¡\-_+=.,;:'"<>{}[\]\|\/\\`~]+/
    if (!regexPassword4.test(input.password)) {
        errors.password = "La constraseña debe tener al menos un carácter especial";
    }
    const longitud = 8
    if (input.password.length<longitud) {
        errors.password = "La constraseña debe tener una logintud mínima de 8";
    }

    


  

    return errors;
};

export default validation;