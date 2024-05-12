export default function Validation(inputs){
    const errors = {};
    //validacion email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
        errors.email = 'Debe ser un Email'
    }
    if (!inputs.email) {
        errors.email = 'El Email no puede estar vacio'}

    return errors;
}