import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { postRegisterUser } from '../../Redux/actions';
import validation from '../Validation/RegisterUser/Validation';
import style from './RegisterUser.module.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function RegisterUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [user, setUser] = useState({
        name: '',
        email: '',
        cellphone: '',
        address: '',
        password: '',
        confirmPassword: '',
        sex: ''
    });
    
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);

    // manejador del estado principal user
    const handleChange = (event) => {
        const { name, value } = event.target;
        const newUser = { ...user, [name]: value };
        setUser(newUser);
        setErrors(validation(newUser));
    };

    // Manejar el cambio de las opciones seleccionadas category
    const arraySex = [
        { id: 1, sex: 'Masculino' },
        { id: 2, sex: 'Femenino' }
    ];

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

    useEffect(() => {
        Swal.fire({
            icon: "info",
            title: "Completa los datos correctamente para el registro!",
            text: "",
            timer: 5000
        });
    }, []);

    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <h3 className={style.title}>Registro</h3>
            <label>Nombre</label>
            <input
                type='text'
                name='name'
                value={user.name}
                onChange={handleChange}
                className={style.form_style}
            />
            {errors.name && <p className={style.errors}>{errors.name}</p>}

            <label>Sexo</label>
            <select
                className={style.form_style}
                value={user.sex}
                onChange={handleChangeSex}
            >
                <option value='' disabled hidden>Selecciona una Opcion</option>
                {arraySex.map((objeto) => (
                    <option key={objeto.id} value={objeto.sex}>
                        {objeto.sex}
                    </option>
                ))}
            </select>
            {errors.sex && <p className={style.errors}>{errors.sex}</p>}

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

            <button className={style.btn} type="submit" disabled={Object.keys(errors).length > 0}>Registrar</button>
        </form>
    );
}

export default RegisterUser;