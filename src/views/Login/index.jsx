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

function Login(){
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
      axios.post('http://localhost:3001/users', userObject)
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

  return (
    <>
      <form className={style.form}>
        <h3 className={style.title}>Login</h3>
        <label>Email</label>
        <input
          type='text'
          name='email'
          value={login.email || ''}
          onChange={handleChange}
          className={style.form_style}
        />
        {errors.email !== '' && <p className={style.errors}>{errors.email}</p>}

        <label>Password</label>
        <div className={style.password_input_container}>
          <input
            name='password'
            type={passwordVisible ? 'text' : 'password'}
            value={login.password || ''}
            onChange={handleChange}
            className={style.form_style}
          />
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className={style.show_hide_btn}
          >
            {passwordVisible ? '👁️' : '🔒'}
          </button>
        </div>

        <button className={style.btn} type='submit'>
          Login
        </button>
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