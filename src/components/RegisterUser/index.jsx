import {React, useState} from 'react';
import { useDispatch } from 'react-redux';
import { postRegisterUser } from '../../Redux/actions';
import validation from '../Validation/RegisterUser/Validation';
import style from './RegisterUser.module.css';

function RegisterUser () {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState({});

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

    const [opSex,setOpSex] = useState([]);

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

//submit
const handleSubmit= (event)=>{
    event.preventDefault();
    dispatch(postRegisterUser(user));

};


    return <>
    <form onSubmit={handleSubmit} className={style.form}>
    <h3 className={style.title}>Registro</h3>
    <label>Nombre</label>
        <input type='text' name='name' value={user.name} onChange={handleChange} className={style.form_style} />
        {errors.name!==''&&<p className={style.errors}>{errors.name}</p>}

        <label>Sexo </label> 
    <select className={style.form_style} value={opSex} onChange={handleChangeSex}>
    <option value = '' disabled hidden>Selecciona una Opcion</option>
    {arraySex.map((objeto) => (
          <option key={objeto.id} value={objeto.sex}>
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
                    {passwordVisible ? '👁️' : '🔒'}
                </button>
            </div>
        {errors.password!==''&&<p className={style.errors}>{errors.password}</p>}

        <label>Confirm Password</label>
            <div className={style.password_input_container}>
                <input name='confirmPassword' type='password' value={user.confirmPassword || ''} onChange={handleChange} className={style.form_style} />
            </div>
        {errors.confirmPassword!==''&&<p className={style.errors}>{errors.confirmPassword}</p>}

        <button className={style.btn} type="submit">Registrar</button>

        {console.log(user)}
</form>
    </>
}

export default RegisterUser;