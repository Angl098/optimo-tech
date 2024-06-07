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
        if (nameUsuario) {
            if (nameUsuario.userId) {

                setLogeado(true)
            } else {
                setLogeado(false)

            }

            ///Condicion de admin
            if (nameUsuario.role === "admin") {
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


    return (
        <nav className={style.navbar}>
            <div className={style.navbarLeft}>
                <Link to={PATHROURES.LANDING}>
                    <img src={logo} alt="Logo" className={style.navbarLogo} />
                </Link>
                <Link to={PATHROURES.LANDING} className={style.navbarTitle}>
                    ÓPTIMO
                </Link>
            </div>
            <div className={style.navbarLinks}>
                <Link to={PATHROURES.LANDING} className={style.navbarLink}>
                    Home
                </Link>
                <Link to={PATHROURES.HOME} className={style.navbarLink}>
                    Products
                </Link>
                {userState && userState.role === 'admin' && (
                    <Link to="/dashboard" className={style.navbarLink}>
                        Dashboard
                    </Link>
                )}
            </div>
            <div className={style.navbarSearch}>
                <input
                    type="text"
                    className={style.navbarSearchInput}
                    placeholder="Search..."
                    value={search}
                    onChange={handleChange}
                />
                <button className={style.navbarSearchButton} onClick={() => handleSearch(search)}>Buscar</button>
            </div>
            <div className={style.navbarProfile}>
                {userState ? (
                    <>
                        <Link to="/userperfil" className={style.navbarLink}>
                            <div className={style.navbarProfile}>
                                <img
                                    src="https://cdn.icon-icons.com/icons2/3298/PNG/96/ui_user_profile_avatar_person_icon_208734.png"
                                    alt="Profile"
                                    className={style.navbarProfileImg}
                                />
                                <p className={style.navbarProfileName}>{userState.name}</p>
                            </div>
                        </Link>
                        <button className={style.navbarLogout} onClick={cerrarSesion}>
                            Cerrar sesion
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={style.navbarLink}>
                            Iniciar sesion
                        </Link>
                        <Link to="/registeruser" className={style.navbarLink}>
                            Registrar
                        </Link>
                    </>
                )}
            </div>
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
        </nav>
    );
}

export default NavBar;