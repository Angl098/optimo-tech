/* eslint-disable react/prop-types */
//importo las dependencias o librerias
import { Link } from "react-router-dom";

//Importo los estilos
import styles from './card.module.css'
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/actions";

const Card = ({suplement}) => {
    const dispatch = useDispatch()
    const onAddProduct=(product)=>{

        dispatch(addToCart(product))
    }
    return (
        <div>

            <div className={styles.card}>
                <Link to={`/home/${suplement.id}`} className={styles.link} >
                    <p className={styles.heading}>
                        <img src={suplement.image} alt="" className={styles.cardImg}/>
                    </p>
                    <div className={styles.cardText1}>
                        <h4>{suplement.name}</h4>
                        <p>Precio: ${suplement.price}</p>
                    </div>
                    <div className={styles.genreList}>
                        {/* Verificamos si videogame.genres o videogame.genre están definidos */}
                        {(suplement.genres || suplement.genre) && (
                            <>
                                {/* Utilizamos map si videogame.genres existe (datos de la API) */}
                                {suplement.genres && suplement.genres.map((genre, index) => (
                                    <p key={index}>{genre}</p>
                                ))}
                                {/* Utilizamos map si videogame.genre existe (datos de la base de datos) */}
                                {suplement.genre && suplement.genre.map((genre, index) => (
                                    <p key={index}>{genre.name}</p>
                                ))}
                            </>
                        )}
                    </div>
                </Link>
                <button className={styles.btnAddToCart} onClick={() => onAddProduct(suplement)}>
                    Añadir al carrito
                </button>
            </div>
        </div>
    )
}

export default Card