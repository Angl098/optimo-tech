import {React, useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { postRegisterUser } from '../../Redux/actions';
import validation from '../Validation/RegisterUser/Validation';
import style from './RegisterUser.module.css';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";


function RegisterUser () {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

        //manejador del estado principal user
        function handleChange(event){
            event.preventDefault();
            setErrors(validation({...user,[event.target.name] : event.target.value
                })
            );
        setUser({...user,[event.target.name]:event.target.value});
        }

            // Manejar el cambio de las opciones seleccionadas category
        //array precargado
    const arraySex = [
        {id:1, sex:'Masculino'},
        {id:2, sex:'Femenino'}
    ];

    const [opSex,setOpSex] = useState("");

    const handleChangeSex = (event) => {
        event.preventDefault();
        const option = Array.from(event.target.selectedOptions, (option) => option.value);
        setOpSex(option);
        const atrSex = option[0];
       setUser({...user, sex:atrSex});
       setErrors(validation({...user ,sex: atrSex}))
      };

    // Función para alternar la visibilidad de la contraseña
    const [passwordVisible, setPasswordVisible] = useState(false);
    function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
     }

         // Función para alternar la visibilidad de la contraseña confimada
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
    function togglePasswordConfirmVisibility() {
    setPasswordConfirmVisible(!passwordConfirmVisible);
     }

//submit
const handleSubmit= async (event)=>{
    event.preventDefault();
    const response = await dispatch(postRegisterUser(user));
    if(response.payload.dataUser)
        {
       Swal.fire({
        icon: "success",
        title: response.payload.message,
        text: "",
        timer: 3000
      }).then(() => {
        // Redirigir después de que la alerta se cierre
        navigate("/login"); // Cambia la URL al destino 
        window.location.reload();
      });         
        }else{
            Swal.fire({
                icon: "error",
                title: response.payload.message,
                text: "",
                timer: 3000
              })   
        }

};

useEffect(()=>{
    Swal.fire({
    icon: "info",
    title: "Completa los datos correctamente para el registro!",
    text: "",
    timer: 5000
  })  

}, []);

    return <>
    <form onSubmit={handleSubmit} className={style.form}>
    <h3 className={style.title}>Registro</h3>
    <label>Nombre</label>
        <input type='text' name='name' value={user.name} onChange={handleChange} className={style.form_style} />
        {errors.name!==''&&<p className={style.errors}>{errors.name}</p>}

        <label>Sexo </label> 
    <select className={style.form_style} value={opSex} onChange={handleChangeSex}>
    <option value = '' disabled hidden>Selecciona una Opcion</option>
    {arraySex.map((objeto,index) => (
          <option key={index} value={objeto.sex}>
            {objeto.sex}
          </option>
        ))}
    </select>
    {errors.sex!==''&&<p className={style.errors}>{errors.sex}</p>}

    <label>Email</label>
        <input type='text' name='email' value={user.email} onChange={handleChange} className={style.form_style} />
        {errors.email!==''&&<p className={style.errors}>{errors.email}</p>}

    <label>Celular</label>
        <input type='text' name='cellphone' value={user.cellphone} onChange={handleChange} className={style.form_style} />
        {errors.cellphone!==''&&<p className={style.errors}>{errors.cellphone}</p>}

    <label>Direccion</label>
        <input type='text' name='address' value={user.address} onChange={handleChange} className={style.form_style} />
        {errors.address!==''&&<p className={style.errors}>{errors.address}</p>}

        <label>Password</label>
            <div className={style.password_input_container}>
                <input name='password' type={passwordVisible ? 'text' : 'password'} value={user.password || ''} onChange={handleChange} className={style.form_style} />
                <button type="button" onClick={togglePasswordVisibility} className={style.show_hide_btn}>
                {passwordVisible ? <img className={style.eye} src='https://cdn.icon-icons.com/icons2/1659/PNG/512/3844441-eye-see-show-view-watch_110305.png'/>:<img className={style.eye} src='https://cdn.icon-icons.com/icons2/2065/PNG/512/view_hide_icon_124813.png'/> }
                </button>
            </div>
        {errors.password!==''&&<p className={style.errors}>{errors.password}</p>}

        <label>Confirm Password</label>
            <div className={style.password_input_container}>
                <input name='confirmPassword' type={passwordConfirmVisible ? 'text' : 'password'} value={user.confirmPassword || ''} onChange={handleChange} className={style.form_style} />
                <button type="button" onClick={togglePasswordConfirmVisibility} className={style.show_hide_btn}>
                    {passwordConfirmVisible ? <img className={style.eye} src='https://cdn.icon-icons.com/icons2/1659/PNG/512/3844441-eye-see-show-view-watch_110305.png'/>:<img className={style.eye} src='https://cdn.icon-icons.com/icons2/2065/PNG/512/view_hide_icon_124813.png'/> }
                </button>
            </div>
        {errors.confirmPassword!==''&&<p className={style.errors}>{errors.confirmPassword}</p>}

        {Object.keys(errors).length <= 0 && <button className={style.btn} type="submit">Registrar</button>}

</form>
    </>
}

export default RegisterUser;