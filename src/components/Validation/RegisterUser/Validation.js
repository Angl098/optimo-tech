export default function Validation(inputs){
    const errors = {};

    const regexLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i;
    const regex3 = /.{3,}/;
    //validacion name
    if (!regexLetras.test(inputs.name)) {
        errors.name = 'Debe ser un nombre'
    }
    if (!inputs.name) {
        errors.name = 'El nombre no puede estar vacio'}
    if (!regex3.test(inputs.name)) {
        errors.name = 'Debe tener mas de 3 caracteres'}

        //validacion sex
    if (!inputs.sex) {
        errors.sex = 'El sexo no puede estar vacio'}

            //validacion email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
        errors.email = 'Debe ser un Email'
    }
    if (!inputs.email) {
        errors.email = 'El Email no puede estar vacio'}


    //validacion cellphone
    const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    ;

    if (!phoneNumberRegex.test(inputs.cellphone)) {
        errors.cellphone = 'Debe ser un cellphone formato +xx xxx'
    }
    if (!inputs.cellphone) {
        errors.cellphone = 'El cellphone no puede estar vacio'}

            //validacion address
    if (!inputs.address) {
        errors.address = 'Addres vacio'}

     //validacion password
     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(inputs.password)) {
        errors.password = 'Debe se 6 caracteres, un numero una letra mayuscula y minuscula'}

             //validacion confirmPassword
     if (inputs.password!==inputs.confirmPassword) {
         errors.confirmPassword = 'Passwords no coinciden'}

    return errors;
}