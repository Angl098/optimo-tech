

//importo las dependencias o librerias
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

//importo las actions
import { getSuplement, cleanProductById,addToCart, showShoppingCart } from "../../Redux/actions"

//importo los estilos
import styles from "./Detail.module.css"

const Detail = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const getSuplementById = useSelector((state) => state.getSuplementById)

    useEffect(() => {
        dispatch(getSuplement(id))
        return () => {
            dispatch(cleanProductById())
        }
    }, [dispatch, id])

    const handleAddToCart = () => {
         if (getSuplementById && getSuplementById.id) {
             dispatch(addToCart(getSuplementById));
             dispatch(showShoppingCart(true))
         }
     };

    return (
        <div className={styles.body1}>
            <div className={styles.card}>
                <div className={styles.content}>
                    <div className={styles.content1}>
                        <div>
                            <img className={styles.imagen} src={getSuplementById.image} alt="" />
                        </div>
                        <div>
                            <h2 className={styles.title}>{getSuplementById.name}</h2>
                            
                            {/* <p>Plataformas: {videogame.platforms ? videogame.platforms.join(", ") : ""}</p> */}
                            <div className={styles.content2}>
                                {typeof getSuplementById.description === 'string' ? (
                                    <p>{getSuplementById.description}</p>
                                ) : null}
                                <p>Categoria: {getSuplementById.category ? getSuplementById.category.map(genre => genre.name).join(", ") : ""}</p>
                                <p>Precio: ${getSuplementById.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
                    <button className={styles.btnAddToCart} onClick={handleAddToCart}>
                        Añadir al carrito
                    </button>
                <Link to="/home">
                    <button>Volver</button>
                </Link>
            </div>
        </div>
    )
}

export default Detail

//codigo Angeles
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import styles from './Detail.module.css'
// import { useParams } from "react-router-dom";
// import { getSuplement, cleanProductById, addToCart, showShoppingCart } from "../../Redux//actions";
// import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";

// //MercadoPago import
// // import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

// const Detail = () => {
//     const { id } = useParams();
//     const [images, setImages] = useState("");
//     const [preferenceId, setPreferenceId] = useState(null)
//     const [showCart, setShowCart] = useState(false);
//     // const [data, setData] = useState(suplementById)
//     const cart = useSelector((state) => state.cart)
//     const suplementById = useSelector((state) => state.getSuplementById);
//     const dispatch = useDispatch();

//     // initMercadoPago('TEST-6dbf75c0-2c45-479d-bb78-b5cf38079c81');

//         // SE MUEVE PARA SHOPPING CART
//     // const createPreference = async () => {
//     //     try {
//     //         const response = await axios.post("/payment/create-order", {
//     //             description: '',
//     //             price: 100,
//     //             quantity: 1,
//     //             currency_id: "ARS"
//     //         })

//     //         const { id } = response.data
//     //         return id;
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // };

//     useEffect(() => {
//         dispatch(getSuplement(id));

//         return () => {
//             dispatch(cleanProductById());
//         };
//     }, [id]);

//     let productoFiltrado = suplementById;
//     // console.log(productoFiltrado);
//     if (suplementById) {
//         productoFiltrado = Object.fromEntries(
//             Object.entries(suplementById).filter(
//                 ([key, value]) =>
//                     value !== null &&
//                     key !== "" &&
//                     key !== "" &&
//                     key !== ""
//             )
//         );
//     }

//     // SE MUEVE PARA SHOPPING CART
//     // const handleBuy = async () => {
//     //     const id = await createPreference();

//     //     if (id) {
//     //         setPreferenceId(id)
//     //     }
//     // };

//     useEffect(() => {
//         // console.log(suplementById);
//         // console.log(data);
//         if (suplementById && suplementById.image && Array.isArray(suplementById.image)) {
//             const imagenes = suplementById.image;
//             const data = imagenes.map((img) => ({
//                 original: img,
//                 thumbnail: img,
//             }));
//             if (data.length > 0) {
//                 console.log(suplementById);
//                 setImages(data);
//             }
//         }
//     }, [suplementById]);


//     const handleAddToCart = () => {
//         if (suplementById && suplementById.id) {
//             dispatch(addToCart(suplementById));
//             dispatch(showShoppingCart(true))
//         }
//     };

//     const scroll = () => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     };

//     return (
//         <>
//             {productoFiltrado && (
//                 <div className={styles.contenedor}>
//                     <div className={styles.detailContainer}>
//                         <div className={styles.productInfo}>
//                             <h1 className={styles.productTittle}>{productoFiltrado.name}</h1>
//                             <button className={styles.productPrice}>
//                                 ${productoFiltrado.price}
//                             </button>
//                             <hr />
//                             <p className={styles.productDescription}>
//                                 {productoFiltrado.description}
//                             </p>
//                             <hr />
//                             <div className={styles.containerSpecs}>
//                                 <ul className={`${styles.productSpecs} ${styles.circleList}`}>
//                                     {Object.entries(productoFiltrado).map(
//                                         ([key, value]) =>
//                                             key !== "id" &&
//                                             key !== "image" &&
//                                             key !== "amount" &&
//                                             key !== "price" &&
//                                             key !== "description" && (
//                                                 <li className={styles.productSpec} key={key}>
//                                                     <strong>
//                                                         {key.charAt(0).toUpperCase() + key.slice(1)}:
//                                                     </strong>{" "}
//                                                     {value}
//                                                 </li>
//                                             )
//                                     )}
//                                 </ul>
//                             </div>
//                             <div className={styles.divButtonCart} onClick={scroll}>
//                                 <button className={styles.buttonCart} onClick={handleAddToCart}>
//                                     Add To Cart
//                                 </button>
//                                 {showCart && <ShoppingCart />}
//                                 {/* <button className={styles.buttonCart} onClick={handleBuy}>
//                                     Buy
//                                 </button> */}
//                                 {/* {preferenceId && <Wallet initialization={{ preferenceId }} />} */}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

// export default Detail