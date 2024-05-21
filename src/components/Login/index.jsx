import {React, useState} from 'react';
import { postLogin } from '../../Redux/actions';
import { useDispatch } from 'react-redux';
import validation from '../Validation/Login/Validation';
import GoogleAuth from '../GoogleAuth';
import style from './Login.module.css';

function Login(){
    const dispatch = useDispatch();
    const [login, setLogin] = useState({});
    const [errors, setErrors] = useState({});

    //manejador del estado principal login
    function handleChange(event){
        event.preventDefault();
        setErrors(validation({...login,[event.target.name] : event.target.value
            })
        );
    setLogin({...login,[event.target.name]:event.target.value});
    }

        // Función para alternar la visibilidad de la contraseña
        const [passwordVisible, setPasswordVisible] = useState(false);
     function togglePasswordVisibility() {
        setPasswordVisible(!passwordVisible);
    }

    //submit
const handleSubmit = async (event)=>{
    event.preventDefault();
    console.log('submit');
    const response = await dispatch(postLogin(login));
    console.log(response.payload);
    alert('Respuesta del servidor: ' + response.payload.message);
};

    return <>
    <form onSubmit={handleSubmit} className={style.form}>
        <h3 className={style.title}>Login</h3>

        <label>Email</label>
        <input type='text' name='email' value={login.email} onChange={handleChange} className={style.form_style} />
        {errors.email!==''&&<p className={style.errors}>{errors.email}</p>}

        <label>Password</label>
            <div className={style.password_input_container}>
                <input name='password' type={passwordVisible ? 'text' : 'password'} value={login.password || ''} onChange={handleChange} className={style.form_style} />
                <button type="button" onClick={togglePasswordVisibility} className={style.show_hide_btn}>
                    {passwordVisible ? '👁️' : '🔒'}
                </button>
            </div>
        {errors.password!==''&&<p className={style.errors}>{errors.password}</p>}

        <button className={style.btn} type="submit">Login</button>
        {console.log(login)}
    </form>
    </>
}
 
export default Login;