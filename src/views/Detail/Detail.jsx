import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from './Detail.module.css'
import { useParams } from "react-router-dom";
import { getSuplement, cleanProductById } from "../../Redux//actions";

const Detail = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const suplementById = useSelector((state) => state.getSuplementById);
    const [data, setData] = useState(suplementById)
    useEffect(() => {
        dispatch(getSuplement(id));

        return () => {
            dispatch(cleanProductById());
        };
    }, [id]);

    let productoFiltrado = suplementById;
    console.log(productoFiltrado);
    if (suplementById) {
        productoFiltrado = Object.fromEntries(
            Object.entries(suplementById).filter(
                ([key, value]) =>
                    value !== null &&
                    key !== "" &&
                    key !== "" &&
                    key !== ""
            )
        );
    }

    useEffect(() => {
        console.log(suplementById);
        console.log(data);
        if (suplementById && suplementById.image && Array.isArray(suplementById.image)) {
            const imagenes = suplementById.image;
            const data = imagenes.map((img) => ({
                original: img,
                thumbnail: img,
            }));
            if (data.length > 0) {
                console.log(suplementById);
                setImages(data);
            }
        }
    }, [suplementById]);

    return (
        <>
            {productoFiltrado && (
                <div className={styles.contenedor}>
                    <div className={styles.detailContainer}>
                        <div className={styles.productInfo}>
                            <h1 className={styles.productTittle}>{productoFiltrado.model}</h1>
                            <button className={styles.productPrice}>
                                ${productoFiltrado.price}
                            </button>
                            <hr />
                            <p className={styles.productDescription}>
                                {productoFiltrado.description}
                            </p>
                            <hr />
                            <div className={styles.containerSpecs}>
                                <ul className={`${styles.productSpecs} ${styles.circleList}`}>
                                    {Object.entries(productoFiltrado).map(
                                        ([key, value]) =>
                                            key !== "id" &&
                                            key !== "image" &&
                                            key !== "category" &&
                                            key !== "price" &&
                                            key !== "description" && (
                                                <li className={styles.productSpec} key={key}>
                                                    <strong>
                                                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                                                    </strong>{" "}
                                                    {value}
                                                </li>
                                            )
                                    )}
                                </ul>
                            </div>
                            <div className={styles.divButtonCart}>
                                <button className={styles.buttonCart}>
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Detail