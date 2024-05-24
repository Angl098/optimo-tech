import { useDispatch, useSelector } from 'react-redux'
import style from './Carousel.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getSuplement } from '../../Redux/actions'
import axios from 'axios'

const Carousel = () => {
    const [suplements,setSuplements]=useState([])
    useEffect(()=>{
        axios("/suplements").then(({data})=>{
            //modificar esto
            setSuplements([...data,...data,...data])})
    },[])
    const scroll = () => {
        window.scrollTo(0, 0);
    }
    function formatPesoArgentino(amount) {
        // Convertimos el número a un string con dos decimales
        let formattedAmount = (amount / 100).toFixed(2);
    
        // Insertamos el símbolo de peso argentino al inicio del string
        return `$arg ${formattedAmount}`;
    }
    return (
        <div className={style.slider}>
            {suplements.map((s)=>

            <Link to={'/detail/'} className={style.slide} onClick={scroll}>
                <img className={style.img} src={s.image} alt="" />
                <div className={style.info}>
                    <p className={style.p}>{s.name}</p>
                    <button className={style.button}>{formatPesoArgentino(s.price)}</button>
                </div>
            </Link>
            )}

        </div>
    )
}

export default Carousel;