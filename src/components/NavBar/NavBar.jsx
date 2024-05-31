/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import style from './NavBar.module.css'
import logo from '../../assets/logo.png'
import { Link, useLocation, useNavigate } from "react-router-dom";
//import logo from '../../../public/logo.png'
import PATHROURES from '../../helpers/PathRoutes';
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { useDispatch, useSelector } from 'react-redux';
import { showShoppingCart } from "../../Redux/actions";

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
    const user = useSelector(state => state.user)
    const showShoppingCartState = useSelector((state) => state.showShoppingCart)
    useEffect(() => {
        const nameUsuario = JSON.parse(localStorage.getItem("user"));

        if (JSON.parse(localStorage.getItem("user"))) {
            console.log(JSON.parse(localStorage.getItem("user")).email);
            if (JSON.parse(localStorage.getItem("user")).userId) {
                
                setLogeado(true)
                console.log("setLogeado");
            }else{
                setLogeado(false)
                console.log("setNotLogeado");
                
            }
            
            
            if (JSON.parse(localStorage.getItem("user")).email==="admin@gmail.com") {
                console.log("navbar");
                console.log(JSON.parse(localStorage.getItem("user")).email);
                setAdmin(true)
            }else{
                
                setAdmin(false)
            }
        } else {
            setAdmin(false)
            setLogeado(false)
        }

    }, [user])
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

    const cerrarSesion=()=>{
        console.log("cerrado sesion");
        localStorage.clear();
        
        navigate("/")
    }

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
                    <Link to="/orders" className={style.linkDesk}>Orders</Link>

                    {
                        admin ?
                        <Link to={"/dashboard"} className={style.linkDesk} onClick={toggleNav}>Dashboard</Link>
                        :<></>
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
                    {!logeado ? <div className={style.buttonContainerDesk}>
                        <Link to={"/login"}>
                            <button className={style.buttonLog}>Iniciar Sesion</button>
                        </Link>
                        <Link to={"/registeruser"}>
                            <button className={style.buttonSign}>Registrar</button>
                        </Link>
                    </div>:
                            <button onClick={cerrarSesion} className={style.buttonSign}>Cerrar sesion</button>
                        
                    }

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