//Importo las librerias o dependencias
import { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
//para autorizacion de terceros
import { GoogleLogin } from '@react-oauth/google';
//para decodificar el token
import { jwtDecode } from "jwt-decode";


//Importo las Validaciones
import validation from '../../components/Validation/Login/Validation';
//Importo los estilos
import style from './Login.module.css';

import { postLogin, setUser, postRegisterUser } from '..//..//Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Login() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({});
  const [errors, setErrors] = useState({});
  const userState = useSelector(state => state.user);
  const navigate = useNavigate();

  //manejador del estado principal login
  function handleChange(event) {
    event.preventDefault();
    setErrors(validation({
      ...login, [event.target.name]: event.target.value
    })
    );
    setLogin({ ...login, [event.target.name]: event.target.value });
  }

  // Función para alternar la visibilidad de la contraseña
  const [passwordVisible, setPasswordVisible] = useState(false);
  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  //submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await dispatch(postLogin(login));
    console.log(response.payload);

    if (!response.payload.dataUser) {
      Swal.fire({
        icon: "error",
        title: response.payload.message,
        text: "",
        timer: 3000
      }).then(() => {
        // Redirigir después de que la alerta se cierre
        navigate("/login"); // Cambia la URL al destino 
      });
    }

    //Guardar en el storage
    if (response.payload.dataUser) {
      console.log(response.payload.dataUser);
      window.localStorage.setItem('User', JSON.stringify(response.payload.dataUser));
      const userDispatch = response.payload.dataUser
      dispatch(setUser(userDispatch));
      Swal.fire({
        icon: "success",
        title: response.payload.message,
        text: "",
        timer: 3000
      }).then(() => {
        // Redirigir después de que la alerta se cierre
        navigate("/"); // Cambia la URL al destino 
        window.location.reload();
      });
    }
  };

  // Manejador del éxito en el inicio de sesión con Google
  const handleGoogleSuccess = async (credentialResponse) => {
    //console.log(credentialResponse); // credencial encryptada
    try {
      const credentialResponseDecode = jwtDecode(credentialResponse.credential);
      //console.log(credentialResponseDecode); // datos decodificados

      // Crear el objeto de usuario
      const userObject = {
        name: credentialResponseDecode.name,
        sex: credentialResponseDecode.gender || '', // Ajustar según disponibilidad
        email: credentialResponseDecode.email,
        password: credentialResponse.credential.substring(0, 200), // Usar los primeros 200 caracteres de credentialResponse.credential
        cellphone: credentialResponseDecode.phone_number
          ? parseInt(credentialResponseDecode.phone_number, 10)
          : 0, // Si no hay número de teléfono, establecer en 0000
        address: credentialResponseDecode.address || 'Dirección no disponible', // Ajustar según disponibilidad
      };

      console.log('usuario creado con google', userObject); // Verificar el objeto antes de enviarlo

      //intento de inicio de sesion
      const { email, password } = userObject;
      let login = { email, password };
      const responseAuth = await dispatch(postLogin(login));
      console.log('responseAuth', responseAuth.payload);
      //Guardar en el storage
      if (responseAuth.payload.dataUser) {
        window.localStorage.setItem('User', JSON.stringify(responseAuth.payload.dataUser));
        Swal.fire({
      icon: "success",
      title: responseAuth.payload.message,
      text: "",
      timer: 3000
    }).then(() => {
      // Redirigir después de que la alerta se cierre
      navigate("/"); // Cambia la URL al destino 
      window.location.reload();
    });
    
  }else{
    //registro con google
    const resAuth =  await dispatch(postRegisterUser(userObject));

          //inicio de sesion despues del registro con google
          const {email, password} = userObject;
          let login = {email, password};
              const resAuthLogin = await dispatch(postLogin(login));
              console.log('responseAuth',responseAuth.payload);
    //guardar en storage
    window.localStorage.setItem('User', JSON.stringify(resAuthLogin.payload.dataUser));
    console.log('usuario registrado con Auth', resAuthLogin.payload);
    Swal.fire({
      icon: "success",
      title: resAuthLogin.payload.message,
      text: "",
      timer: 3000
    }).then(() => {
      // Redirigir después de que la alerta se cierre
      navigate("/"); // Cambia la URL al destino 
      window.location.reload();
    });
  }


      // Enviar el objeto al backend usando axios
      /*       axios.post('/users', userObject)
              .then((response) => {
                console.log('Usuario creado:', response.data);
              })
              .catch((error) => {
                console.error('Error al crear el usuario:', error);
              }); */



    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  };
  /*   const onSubmit=(e)=>{
      e.preventDefault()
      axios.post("/login",login ).then(({data})=>{
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        Swal.fire({
          icon: "success",
          title: "¡Usuario registrado!",
          text: "",
        });
        navigate("/")
      })
    }
   */
  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <h3 className={style.title}>Login</h3>

        <label>Email</label>
        <input type='text' name='email' value={login.email} onChange={handleChange} className={style.form_style} />
        {errors.email !== '' && <p className={style.errors}>{errors.email}</p>}

        <label>Password</label>
        <div className={style.password_input_container}>
          <input name='password' type={passwordVisible ? 'text' : 'password'} value={login.password || ''} onChange={handleChange} className={style.form_style} />
          <button type="button" onClick={togglePasswordVisibility} className={style.show_hide_btn}>
            {passwordVisible ? <img className={style.eye} src='https://cdn.icon-icons.com/icons2/1659/PNG/512/3844441-eye-see-show-view-watch_110305.png' /> : <img className={style.eye} src='https://cdn.icon-icons.com/icons2/2065/PNG/512/view_hide_icon_124813.png' />}
          </button>
        </div>
        {errors.password !== '' && <p className={style.errors}>{errors.password}</p>}
        <button className={style.btn} type="submit">Login</button>
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