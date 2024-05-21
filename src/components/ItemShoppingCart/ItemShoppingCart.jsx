import { useSelector } from "react-redux";
import style from "../ItemShoppingCart/ItemShoppingCart.module.css";
import { useEffect } from "react";
import { removeFromCart, addToCart, removeOneFromCart } from "../../Redux/actions";
import { useDispatch } from "react-redux";

const ItemShoppingCart = () => {
    const itemProduct = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('Cart updated:', itemProduct);
        window.localStorage.setItem('cart', JSON.stringify(itemProduct))
    },[itemProduct])

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id))
    };
    const handleIncrementProductInCart = (product) => {
        dispatch(addToCart(product))
    }
    const handleRemoveOneFromCart = (id) => {
        dispatch(removeOneFromCart(id))
    }

    return (
        <>
            <div className={style.containerItem}>
                <ul className={style.listUL}>
                    {itemProduct?.map((product) => {
                        console.log(product);
                        return (
                        <>
                            <li key={product.id} className={style.listLi}>
                                <div className={style.divProduct}>
                                    <div>
                                        <div className={style.mainContent}>
                                            <button className={style.removeProduct} onClick={() => handleRemoveFromCart(product.id)}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                    className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={style.divImageProduct}>
                                        <img className={style.imgProduct} src={product.image} alt="" />
                                    </div>
                                    <div className={style.detailProduct}>
                                        <span>{product.name}</span>
                                    </div>
                                    <div className={style.priceProduct}>
                                        <p>$ {product.price},00 USD</p>
                                        <div className={style.divCounterProduct}>
                                            <div>
                                                <button className={style.buttonNegative} onClick={() => handleRemoveOneFromCart(product.id)}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                        className={style.iconNegative}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M19.5 12h-15"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className={style.quantity}>
                                                <p className={style.counterProduct}>
                                                    {product.quantity}
                                                </p>
                                            </div>
                                            <div>
                                                <button className={style.buttonPlus} onClick={() => handleIncrementProductInCart(product)}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                        className={style.iconPlus}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 4.5v15m7.5-7.5h-15"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <hr />
                        </>
                    )})}
                </ul>
            </div>
        </>
    );
};
export default ItemShoppingCart;