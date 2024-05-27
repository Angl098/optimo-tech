//Importo las librerias o dependencias
import {useState} from 'react';
import axios from 'axios';

//para autorizacion de terceros
import { GoogleLogin } from '@react-oauth/google';
//para decodificar el token
import { jwtDecode}  from "jwt-decode";


//Importo las Validaciones
import validation from '../../components/Validation/Login/Validation';
//Importo los estilos
import style from './Login.module.css';

import { postLogin, user } from '..//..//Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
//const userLogin = useSelector(state => state.user);

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
  //Guardar en el storage
  window.localStorage.setItem('Optimo', JSON.stringify(response.payload.dataUser));
  console.log(response.payload);
  //const userDispatch = response.payload.dataUser
  //dispatch(userLogin(userDispatch));
  alert('Respuesta del servidor: ' + response.payload.message);
};

    // Manejador del éxito en el inicio de sesión con Google
    const handleGoogleSuccess = (credentialResponse) => {
        //console.log(credentialResponse); // credencial encryptada
    try {
      const credentialResponseDecode = jwtDecode(credentialResponse.credential);
      //console.log(credentialResponseDecode); // datos decodificados

      // Crear el objeto de usuario
      const userObject = {
        name: credentialResponseDecode.name,
        sex: credentialResponseDecode.gender || 'No especificado', // Ajustar según disponibilidad
        email: credentialResponseDecode.email,
        password: credentialResponse.credential.substring(0, 200), // Usar los primeros 200 caracteres de credentialResponse.credential
        cellphone: credentialResponseDecode.phone_number
          ? parseInt(credentialResponseDecode.phone_number, 10)
          : 0, // Si no hay número de teléfono, establecer en 0000
        address: credentialResponseDecode.address || 'Dirección no disponible', // Ajustar según disponibilidad
      };

      console.log(userObject); // Verificar el objeto antes de enviarlo

      // Enviar el objeto al backend usando axios
      axios.post('/users', userObject)
        .then((response) => {
          console.log('Usuario creado:', response.data);
        })
        .catch((error) => {
          console.error('Error al crear el usuario:', error);
        });
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  };
  const onSubmit=(e)=>{
    e.preventDefault()
    axios.post("/login",login ).then(({data})=>{
      console.log(data);
    })
  }

  return (
    <>
      <form className={style.form} onSubmit={onSubmit}>
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
{/* auth terceros */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </form>
    </>
  );
}

export default Login;