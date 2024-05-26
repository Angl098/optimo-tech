import style from "../ShoppingCart/ShoppingCart.module.css";
import ItemShoppingCart from "../ItemShoppingCart/ItemShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
// import { IoMdCart } from "react-icons/io";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { paymentGateway, showShoppingCart } from '../../Redux/actions'
import axios from "axios";
//import swal from 'sweetalert';


const ShoppingCart = () => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector(state => state.user)
    const showShoppingCartState = useSelector((state) => state.showShoppingCart);
    const [preferenceId, setPreferenceId] = useState(null)

    
    // useEffect(() => {
        initMercadoPago('TEST-61fad3db-d8b0-4542-98a8-7efab456c656', {
        locale: "es-AR",
    });
    // }, [])

    // NO USAR 
    // const createPreference = async () => {
    //     try {
    //         // const response = await axios.post("/payment/create_preference", {
    //         //     title: 'Suplemento',
    //         //     price: 100,
    //         //     quantity: 1,
    //         // })
    //         const response = await axios.post('/payment/create_preference', {
    //             items: cart.map((prod) => ({
    //                 title: prod.name,
    //                 price: parseFloat(prod.price),
    //                 quantity: parseInt(prod.quantity)
    //             }))
    //         });

    //         const { id } = response.data
    //         return id;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const dispatch = useDispatch();

    console.log(cart)
    useEffect(() => { }, [showShoppingCartState]);

    useEffect(() => {
        if (cart) {
            window.localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart])

    const paymentID = useSelector(state => state.paymentID)

    const handleBuy = async () => {
        //NO USAR
        //     const id = await createPreference();

        //     if (id) {
        //         setPreferenceId(id)
        //     }


        // if (user === null) swal("Login first", "To make a purchase you need to register", "error");
        dispatch(paymentGateway(
            cart,

        ))
    }

    const notShowShopping = () => {
        dispatch(showShoppingCart(false))
    }

    return (
        <>
            <div className={style.cartContainer}>
                <div className={style.buyCart}>
                    <div className={style.firstSection}>
                        <p className={style.tittleCart}>Mi carrito</p>
                        <button
                            className={style.buttonX}
                            onClick={() => notShowShopping()}
                        >
                            <div className={style.divContainerFirstSection}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    className={`${style.icon} ${style.transition} ${style.hover}`}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div className={style.secondSection}>
                        {cart.length === 0 ? (
                            <>
                                <div className={style.cartEmpty}>

                                    <h2>El carrito está vacio</h2>
                                </div>
                            </>
                        ) : (
                            <>
                                <ItemShoppingCart />
                                <div className={style.containerTotal}>
                                    <div className={style.totalPrice}>
                                        <p>Total</p>
                                        <span>$ {cart?.reduce((total, product) => total + product.total, 0)},00 USD</span>
                                    </div>
                                    <hr />
                                </div>
                                <button className={style.buttonCleanCart} onClick={handleBuy}>
                                    Proceed to Checkout
                                </button>
                                {/* {preferenceId && <Wallet initialization={{ preferenceId}} />} */}
                                {paymentID && <Wallet initialization={{ preferenceId: paymentID }} />}
                                {/* <Wallet initialization={{preferenceId: paymentID}}/> */}
                                
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default ShoppingCart;