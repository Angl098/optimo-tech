import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from './Detail.module.css'
import { useParams } from "react-router-dom";
import { getSuplement, cleanProductById } from "../../Redux//actions";
import axios from "axios";

//MercadoPago import
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

const Detail = () => {
    const { id } = useParams();
    const [preferenceId, setPreferenceId] = useState(null)

    initMercadoPago('TEST-6dbf75c0-2c45-479d-bb78-b5cf38079c81');

    const dispatch = useDispatch();
    const suplementById = useSelector((state) => state.getSuplementById);
    const [data, setData] = useState(suplementById)

    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:3001/create-order", {
                description: '',
                price: 100,
                quantity: 1,
                currency_id: "ARS"
            })

            const {id} = response.data
            return id;
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        dispatch(getSuplement(id));

        return () => {
            dispatch(cleanProductById());
        };
    }, [id]);

    let productoFiltrado = suplementById;
    // console.log(productoFiltrado);
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

    const handleBuy = async () => {
        const id = await createPreference();

        if(id){
            setPreferenceId(id)
        }
    };

    useEffect(() => {
        // console.log(suplementById);
        // console.log(data);
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
                            <h1 className={styles.productTittle}>{productoFiltrado.name}</h1>
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
                                <button className={styles.buttonCart} onClick={handleBuy}>
                                    Buy
                                </button>
                                {preferenceId && <Wallet initialization={{ preferenceId }} />}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Detail