const regularValidation = (input) => {
    let errors = {};
  
    if (!input.name) {
        errors.name = "Por favor ingrese su nombre"
    }
    const nameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúüÜ\s]{4,15}$/;
    if (!nameRegex.test(input.name)) {
        errors.name = "Por favor ingrese un nombre válido";
    }

    
    if (!input.lastname) {
        errors.lastname = "Por favor ingrese su apellido"
    }
    const lastnameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúüÜ\s]{3,15}$/;
    if (!lastnameRegex.test(input.lastname)) {
        errors.lastname = "Por favor ingrese un apellido válido";
    }

    
    if (!input.email) {
        errors.email = "Por favor ingrese su email"
    }

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regexEmail.test(input.email)) {
        errors.email = "Por favor ingrese un email válido";
    }

    const regexDni= /^\d{8}$/
    if (!regexDni.test(input.dni)) {
        errors.dni= "ingrese un DNI valido"
    }

    const regexPhone= /^(9\d|9)\d{8}$/
    if (!regexPhone.test(input.phone)) {
        errors.phone= "ingrese un número de celular valido"
    }
    

  
    return errors;
  };
  
  const dropshippingValidation = (input) => {
    let errors = {};
  
    if (!input.name) {
        errors.name = "Por favor ingrese su nombre"
    }
    const nameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúüÜ\s]{4,15}$/;
    if (!nameRegex.test(input.name)) {
        errors.name = "Por favor ingrese un nombre válido";
    }
    const regexDni= /^\d{8}$/
    if (!regexDni.test(input.dni)) {
        errors.dni= "ingrese un DNI valido"
    }

    const regexPhone= /^(9\d|9)\d{8}$/
    if (!regexPhone.test(input.phone)) {
        errors.phone= "ingrese un número de celular valido"
    }
    

  
    return errors;
  };
  
  export { regularValidation, dropshippingValidation };