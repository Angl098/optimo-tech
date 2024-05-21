export default function Validation(inputs){
    const errors = {};
    
    const regex3 = /.{3,}/;
    //validacion name
    if (!inputs.name) {
        errors.name = 'El nombre no puede estar vacio'}
    if (!regex3.test(inputs.name)) {
        errors.name = 'Debe tener mas de 3 caracteres'}


    //validation description
    const regexMasDeTresPalabras = /^\s*(\S+\s+){3,}\S+\s*$/;
    if(!regexMasDeTresPalabras.test(inputs.description))
        {errors.description = 'La descripcion debe ser mas de tres palabras';}

    //validation price
    if(isNaN(inputs.price))
    {errors.price = 'Deber ser un numero';}
    if(inputs.price <= 0)
    {errors.price = 'Debe ser mayor a 0';}

//validacion category
    if (!inputs.category) {
        errors.category = 'la categoria no puede estar vacio'}

    //validacion amount
    var numEntero = /^[0-9]+$/;
    if (!numEntero.test(inputs.amount)) {
        errors.amount = 'Cantidad incorrecta'
    }
    if (!inputs.amount) {
        errors.amount = 'la cantidad no puede estar vacia'}

return errors;
}