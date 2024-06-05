const regexLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
const regex3 = /.{3,}/;

function validation(inputs) {
    const errors = {};

    // Validacion name
    if (!inputs.name) {
        errors.name = 'El nombre no puede estar vacio';
    } else if (!regexLetras.test(inputs.name)) {
        errors.name = 'Debe ser un nombre válido';
    } else if (!regex3.test(inputs.name)) {
        errors.name = 'Debe tener más de 3 caracteres';
    }

    // Validacion email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputs.email) {
        errors.email = 'El email no puede estar vacio';
    } else if (!emailRegex.test(inputs.email)) {
        errors.email = 'Debe ser un email válido';
    }

    // Validacion cellphone
    const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (!inputs.cellphone) {
        errors.cellphone = 'El celular no puede estar vacio';
    } else if (!phoneNumberRegex.test(inputs.cellphone)) {
        errors.cellphone = 'Debe ser un número de teléfono válido (formato: +xx xxx...)';
    }

    // Validacion address
    if (!inputs.address) {
        errors.address = 'La dirección no puede estar vacía';
    }

    // Validacion password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!inputs.password) {
        errors.password = 'La contraseña no puede estar vacia';
    } else if (!passwordRegex.test(inputs.password)) {
        errors.password = 'Debe tener al menos 6 caracteres, un número, una letra mayúscula y una letra minúscula';
    }

    // Validacion confirmPassword
    if (!inputs.confirmPassword) {
        errors.confirmPassword = 'Debe confirmar su contraseña';
    } else if (inputs.password !== inputs.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validacion sex
    if (!inputs.sex) {
        errors.sex = 'Debe seleccionar un sexo';
    }

    return errors;
}

export default validation;