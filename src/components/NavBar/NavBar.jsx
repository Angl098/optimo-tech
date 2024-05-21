/* eslint-disable react/prop-types */
import { useState, useEffect  } from 'react';
import style from './NavBar.module.css'
import logo from '../../assets/logo.png'
import { Link, useLocation } from "react-router-dom";
import PATHROURES from '../../helpers/PathRoutes';
import { useDispatch, useSelector } from 'react-redux';
// import SearchBar from '../SearchBar/SearchBar';
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { showShoppingCart } from "../../Redux/actions";

const NavBar = (props) => {

    const { handleSearch, handleSubmit } = props

    const [showNav, setShowNav] = useState(null);
    const [quantityProductsCart, setQuantityProductsCart] = useState(0)
    const location = useLocation()
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.user)
    const showShoppingCartState = useSelector((state) => state.showShoppingCart)


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
                    <Link to={"createsuplements"} className={style.linkDesk} >Crear Suplements</Link>
                </div>

                <div className={style.searchDeskContent}>
                    <form onChange={handleSearch} action="" className={style.form1}>
                        <div className={style.group}>
                            <input required type="text" className={style.input} />
                            <span className={style.highlight}></span>
                            <span className={style.bar}></span>
                            <label>Tu Suplemento</label>
                        </div>
                        <div className={style.groupButton}>
                            <button type="submit" onClick={handleSubmit} className={style.cssbuttonsIo}>
                                
                                    Buscar
                                
                            </button>
                        </div>
                    </form>
                </div>

                <div className={style.cartContainer}>
                    <div className={style.buttonContainerDesk}>
                        <Link to={"/login"}>
                        <button className={style.buttonLog}>Log In</button>
                        </Link>
                        <Link to={"registeruser"}>
                        <button className={style.buttonSign}>Sign Up</button>
                        </Link>
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
                </div>
            </div>
        </nav>
    )
}

export default NavBar