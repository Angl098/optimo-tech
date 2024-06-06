import {React, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postRegisterUser, updateUser } from '../../Redux/actions';
import validation from '../Validation/RegisterUser/Validation';
import style from './RegisterUser.module.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function RegisterUser() {
    const dispatch = useDispatch();
    let [user, setUser] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const userState = useSelector(state=>state.user);
    console.log('userState', userState);

    useEffect(()=>{
      
  if(userState!==null)
    {
         setUser(userState); 
         //setErrors(userState);
    }
    
    }, [userState]);

    console.log('user', user);

        //manejador del estado principal user
        function handleChange(event){
            event.preventDefault();
            setErrors(validation({...user,[event.target.name] : event.target.value
                })
            );
        setUser({...user,[event.target.name]:event.target.value});
        }

    // Manejar el cambio de las opciones seleccionadas category
    const arraySex = [
        { id: 1, sex: 'Masculino' },
        { id: 2, sex: 'Femenino' }
    ];

    const [opSex,setOpSex] = useState("");

    const handleChangeSex = (event) => {
        const option = event.target.value;
        const newUser = { ...user, sex: option };
        setUser(newUser);
        setErrors(validation(newUser));
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const togglePasswordConfirmVisibility = () => {
        setPasswordConfirmVisible(!passwordConfirmVisible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Realiza una validación completa antes de enviar
        const validationErrors = validation(user);
        setErrors(validationErrors);

        // Si hay errores, muestra una alerta y no envíes el formulario
        if (Object.keys(validationErrors).length > 0) {
            Swal.fire({
                icon: "error",
                title: "Completa los datos correctamente",
                text: "",
                timer: 3000
            });
            return;
        }

        // Si no hay errores, procede con el envío del formulario
        const response = await dispatch(postRegisterUser(user));
        if (response.payload.dataUser) {
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
        } else {
            Swal.fire({
                icon: "error",
                title: response.payload.message,
                text: "",
                timer: 3000
            });
        }
    };

useEffect(()=>{
    Swal.fire({
    icon: "info",
    title: "Completa los datos correctamente!",
    text: "",
    timer: 5000
  })  

}, []);

async function postEdit(event){
event.preventDefault();
console.log("edit en proceso");
console.log('errors', errors);
if(Object.keys(errors).length > 1 )
    {
        Swal.fire({
            icon: "error",
            title: "Completa los datos",
            text: "",
            timer: 3000
          })
    }else{
        const response = await dispatch(updateUser(user));
        if(response.payload.dataUser)
            {
                  //guardar en storage
            window.localStorage.setItem('User', JSON.stringify(response.payload.dataUser));
            console.log('usuario datos actualizados', response.payload);
            navigate("/userperfil");
          Swal.fire({
            icon: "success",
            title: response.payload.message,
            text: "",
            timer: 3000
          }).then(() => {
            window.location.reload(); 
            })}else{
                Swal.fire({
                    icon: "error",
                    title: response.payload.message,
                    text: "",
                    timer: 3000
                  })   
            }
    }
}

    return <>
    <form className={style.form}>
    {user.id?<h3 className={style.title}>Editar Perfil</h3>:<h3 className={style.title}>Registro</h3>}
    {user.id&&<label className={style.id}>ID: {user.id}</label>}
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
            <input
                type='text'
                name='email'
                value={user.email}
                onChange={handleChange}
                className={style.form_style}
            />
            {errors.email && <p className={style.errors}>{errors.email}</p>}

            <label>Celular</label>
            <input
                type='text'
                name='cellphone'
                value={user.cellphone}
                onChange={handleChange}
                className={style.form_style}
            />
            {errors.cellphone && <p className={style.errors}>{errors.cellphone}</p>}

            <label>Direccion</label>
            <input
                type='text'
                name='address'
                value={user.address}
                onChange={handleChange}
                className={style.form_style}
            />
            {errors.address && <p className={style.errors}>{errors.address}</p>}


{user.id?<button onClick={postEdit}  className={style.btn} >Guardar Cambios</button>:<>
        <label>Password</label>
            <div className={style.password_input_container}>
                <input
                    name='password'
                    type={passwordVisible ? 'text' : 'password'}
                    value={user.password}
                    onChange={handleChange}
                    className={style.form_style}
                />
                <button type="button" onClick={togglePasswordVisibility} className={style.show_hide_btn}>
                    {passwordVisible ? (
                        <img className={style.eye} src='https://cdn.icon-icons.com/icons2/1659/PNG/512/3844441-eye-see-show-view-watch_110305.png' />
                    ) : (
                        <img className={style.eye} src='https://cdn.icon-icons.com/icons2/2065/PNG/512/view_hide_icon_124813.png' />
                    )}
                </button>
            </div>
            {errors.password && <p className={style.errors}>{errors.password}</p>}

            <label>Confirm Password</label>
            <div className={style.password_input_container}>
                <input
                    name='confirmPassword'
                    type={passwordConfirmVisible ? 'text' : 'password'}
                    value={user.confirmPassword}
                    onChange={handleChange}
                    className={style.form_style}
                />
                <button type="button" onClick={togglePasswordConfirmVisibility} className={style.show_hide_btn}>
                    {passwordConfirmVisible ? (
                        <img className={style.eye} src='https://cdn.icon-icons.com/icons2/1659/PNG/512/3844441-eye-see-show-view-watch_110305.png' />
                    ) : (
                        <img className={style.eye} src='https://cdn.icon-icons.com/icons2/2065/PNG/512/view_hide_icon_124813.png' />
                    )}
                </button>
            </div>
            {errors.confirmPassword && <p className={style.errors}>{errors.confirmPassword}</p>}

        {Object.keys(errors).length <= 0 && <button onClick={handleSubmit}  className={style.btn} >Registrar</button>}
        </>
}


</form>
    </>
}

export default RegisterUser;