// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import styles from './Detail.module.css'
// import { useParams } from "react-router-dom";
// import { getSuplement, cleanProductById } from "../../Redux//actions";

// const Detail = () => {
//     const { id } = useParams();

//     const dispatch = useDispatch();
//     const suplementById = useSelector((state) => state.getSuplementById);
//     const [data, setData] = useState(suplementById)
//     useEffect(() => {
//         dispatch(getSuplement(id));

//         return () => {
//             dispatch(cleanProductById());
//         };
//     }, [id]);

//     let productoFiltrado = suplementById;
//     console.log(productoFiltrado);
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

//     useEffect(() => {
//         console.log(suplementById);
//         console.log(data);
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

//     return (
//         <>
//             {productoFiltrado && (
//                 <div className={styles.contenedor}>
//                     <div className={styles.detailContainer}>
//                         <div className={styles.productInfo}>
//                             <h1 className={styles.productTittle}>{productoFiltrado.model}</h1>
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
//                                             key !== "category" &&
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
//                             <div className={styles.divButtonCart}>
//                                 <button className={styles.buttonCart}>
//                                     Add To Cart
//                                 </button>
//                                 <button><a href="/home">Volver</a></button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

// export default Detail

//importo las dependencias o librerias
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

//importo las actions
import { getSuplement, cleanProductById } from "../../Redux/actions"

//importo los estilos
import styles from "./detail.module.css"

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
                    <button className={styles.btnAddToCart}>
                        Añadir al carrito
                    </button>
                <button><a href="/home">Volver</a></button>
            </div>
        </div>
    )
}

export default Detail