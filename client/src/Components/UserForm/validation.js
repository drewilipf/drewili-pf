const validation = (input) => {
    let errors = {};
    const nameRegex = /^[a-zA-Z\s]{4,20}$/;
  if (!nameRegex.test(input.name)) {
    errors.name = "Por favor ingrese un nombre válido sin números y no superior a 20 caracteres";
  }
    return errors;
};

export default validation;