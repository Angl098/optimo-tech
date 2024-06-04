/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import style from './NavBar.module.css'
import logo from '../../assets/logo.png'
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
//import logo from '../../../public/logo.png'
import PATHROURES from '../../helpers/PathRoutes';
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { useDispatch, useSelector } from 'react-redux';
import { showShoppingCart, setUser } from "../../Redux/actions";
import Swal from "sweetalert2";

const NavBar = (props) => {
    const navigate = useNavigate();

    const { handleSearch } = props
    const [search, setSearch] = useState("")
    const [logeado, setLogeado] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [showNav, setShowNav] = useState(null);
    const [quantityProductsCart, setQuantityProductsCart] = useState(0)
    const location = useLocation()
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const userState = useSelector(state => state.user)
    const showShoppingCartState = useSelector((state) => state.showShoppingCart)
    const { id } = useParams()
    useEffect(() => {
        const nameUsuario = JSON.parse(localStorage.getItem("User"));
        console.log(nameUsuario);
        if (nameUsuario) {
            if (nameUsuario.userId) {

                setLogeado(true)
                console.log("setLogeado");
            } else {
                setLogeado(false)
                console.log("setNotLogeado");

            }

            ///Condicion de admin
            if (nameUsuario.email === "admin@gmail.com") {
                setAdmin(true)
            } else {

                setAdmin(false)
            }
        } else {
            setAdmin(false)
            setLogeado(false)
        }

    }, [userState, location])
    useEffect(() => {
        if (cart.length > 0) {
            const quantityProducts = cart.reduce((total, product) => (
                total + product.quantity
            ), 0)
            setQuantityProductsCart(quantityProducts);
        } else {
            setQuantityProductsCart(0);
        }
    }, [cart])

    const shoppingCart = () => {
        dispatch(showShoppingCart(true));
    };

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    const handleChange = (e) => {
        setSearch(e.target.value);

    };

    const cerrarSesion = () => {
        localStorage.clear();
        setAdmin(false)
        setLogeado(false)
        navigate("/")
        Swal.fire({
            icon: "success",
            title: "Cerrando sesion...",
            text: "",
            timer: 3000
        }).then(() => {
            // Redirigir después de que la alerta se cierre
            navigate("/"); // Cambia la URL al destino 
            window.location.reload();
        });
    }
    //user
    useEffect(() => {
        const dataUserJSON = window.localStorage.getItem('User');
        console.log('dataUserJSON', dataUserJSON);
        if (dataUserJSON) {
            const dataUser = JSON.parse(dataUserJSON);
            dispatch(setUser(dataUser));

            if (dataUser.email === "admin@gmail.com") {
                setAdmin(true);
            }
        }

    }, []);


    return (
        <nav className={style.nav}>
            <div className={style.mainContent}>
                <div className={style.linkContainer}>
                    <Link to={PATHROURES.LANDING}>
                        <img src={logo} alt="" className={style.img} />
                    </Link>
                    <Link to={PATHROURES.LANDING} className={style.title}>ÓPTIMO</Link>
                    <Link to={PATHROURES.LANDING} className={style.linkDesk} onClick={toggleNav}>Home</Link>
                    <Link to={PATHROURES.HOME} className={style.linkDesk} onClick={toggleNav}>Products</Link>

                    {
                        admin ?
                            <Link to={"/dashboard"} className={style.linkDesk} onClick={toggleNav}>Dashboard</Link>
                            : <></>
                    }
                </div>

                <div className={style.searchDeskContent}>
                    <div className={style.group}>
                        <input required type="text" className={style.input} value={search} onChange={handleChange} />
                        <span className={style.highlight}></span>
                        <span className={style.bar}></span>
                        <label>Tu Suplemento</label>
                    </div>
                    <div className={style.groupButton}>
                        <button type="submit" className={style.cssbuttonsIo} onClick={() => handleSearch(search)}>

                            Buscar

                        </button>
                    </div>
                </div>

                <div className={style.cartContainer}>
                    {userState === null
                        ?
                        <div className={style.buttonContainerDesk}>
                            <Link to={"/login"}>
                                <button className={style.buttonLog}>Log In</button>
                            </Link>
                            <Link to={"/registeruser"}>
                                <button className={style.buttonSign}>Register</button>
                            </Link>
                        </div>
                        : <></>

                    }
                </div>



                <div className={style.cartContainer}>
                    {userState !== null && <>
                        <img className={style.iconPerfil} src='https://cdn.icon-icons.com/icons2/3298/PNG/96/ui_user_profile_avatar_person_icon_208734.png' />
                        <p>{userState.name}</p></>}

                    {userState !== null && <button onClick={cerrarSesion} className={style.buttonSign}>Cerrar sesion</button>}
                    <button className={style.cartButton} onClick={() => shoppingCart()}>
                        <svg
                            className={style.cartSvg}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <g>
                                <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
                            </g>
                        </svg>
                        <div className={style.countProducts}>
                            <span className={style.span}>{quantityProductsCart}</span>
                        </div>
                    </button>
                    {showShoppingCartState && <ShoppingCart />}


                </div>
            </div>
        </nav>
    )
}

export default NavBar;