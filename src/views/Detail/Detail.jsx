import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSuplement, cleanProductById, addToCart, showShoppingCart } from "../../Redux/actions";
import styles from "./Detail.module.css";

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const getSuplementById = useSelector((state) => state.getSuplementById);

    const [productData, setProductData] = useState({
        image: "default-image-url.jpg",
        name: "Nombre del Suplemento",
        description: "Descripción del suplemento",
        category: [{ name: "Categoría 1" }, { name: "Categoría 2" }],
        price: 100,
    });

    useEffect(() => {
        dispatch(getSuplement(id));
        return () => {
            dispatch(cleanProductById());
        };
    }, [dispatch, id]);

    useEffect(() => {
        if (getSuplementById) {
            setProductData(getSuplementById);
        }
    }, [getSuplementById]);

    const handleAddToCart = () => {
        if (productData && productData.id) {
            dispatch(addToCart(productData));
            dispatch(showShoppingCart(true));
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={productData.image} alt={productData.name} />
                </div>
                <div className={styles.details}>
                    <h2 className={styles.title}>{productData.name}</h2>
                    <p className={styles.description}>{productData.description}</p>
                    {/* <p className={styles.category}>Categoria: {getSuplementById.category ? getSuplementById.category.map(genre => genre.name).join(", ") : ""}</p> */}
                    <p className={styles.price}>Precio: ${productData.price}</p>
                    <button className={styles.btnAddToCart} onClick={handleAddToCart}>
                        Añadir al carrito
                    </button>
                    <Link to="/home">
                        <button className={styles.btnBack}>Volver</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Detail;
