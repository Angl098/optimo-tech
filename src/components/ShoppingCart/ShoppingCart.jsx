import style from "../ShoppingCart/ShoppingCart.module.css";
import ItemShoppingCart from "../ItemShoppingCart/ItemShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { showShoppingCart, createCart, addSuplementsToCart, getCartContents } from '../../Redux/actions'
import axios from "axios";
import swal from 'sweetalert';


const ShoppingCart = () => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector(state => state.user)
    const showShoppingCartState = useSelector((state) => state.showShoppingCart);
    const dispatch = useDispatch();
    

    const createPreference = async () => {
        try {
            const items = cart.map((prod) => ({
                title: prod.name,
                price: parseFloat(prod.price),
                quantity: parseInt(prod.quantity),
                productId: prod.id,
            }));
            // console.log(items);
            const total = cart.map((prod) => prod.total)
            let totalPrice = 0;

            for (let i = 0; i < total.length; i++) {
                totalPrice += total[i];
            }

            const response = await axios.post("/payment/create_preference", {
                items: items,
                total: totalPrice,
            })

            const { point } = response.data;

            window.location.href = point;
            window.localStorage.removeItem('cart')
        } catch (error) {
            console.log('error obteniendo la orden de pago', error);
        }
    }

    const handleCreateCart = async () => {
        // const userId = localStorage.getItem('userId');
        const { userId } = user; // traigo userId del estado de Redux yaq del localstor no me lo traee 
        if (userId) {
            const response = dispatch(createCart(userId));
            if (response && response.data) {
                localStorage.setItem('cartId', response.data.id);
            }
        }
    };


    const handleAddSuplementsToCart = async () => {
        let cartId = localStorage.getItem('cart');
        if (!cartId) {
            await handleCreateCart();
            cartId = localStorage.getItem('cart');
        }

        const suplements = cart.map((prod) => ({
            suplementId: prod.id,
            quantity: prod.quantity,
        }));

        if (cartId && suplements.length > 0) {
            dispatch(addSuplementsToCart(cartId, suplements));
        } 
    };

    const handleCheckout = async () => {
        // const userId = localStorage.getItem('userId');
        const { userId } = user;
        console.log(userId)
        if (!userId) {
            swal("Login first", "To make a purchase you need to register", "error");
            return;
        }

        await handleAddSuplementsToCart();
        console.log(handleAddSuplementsToCart);

        if (cart.length > 0) {
            createPreference();  
        }
    };

    useEffect(() => {
        if (cart) {
            window.localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart])

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
                                        <span>$ {cart.reduce((total, product) => total + product.total, 0)} ARS</span>
                                    </div>
                                    <hr />
                                </div>
                                <button className={style.buttonCleanCart} onClick={handleCheckout}>
                                    Proceed to Checkout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default ShoppingCart;