import React from 'react'
import { data } from '../../data'
import style from './ProductList.module.css'

export default function ProductList() {
    return (
        <div className="container-items">
            {data.map(product => (
                <div className={style.item} key={product.id}>
                    <figure>
                        <img className={style.image} src={product.image} alt={product.name} />
                    </figure>
                    <div className={style.info - product}>
                        <div className={style.info}>
                            <h4>{product.name}</h4>
                            <p className={style.price}>${product.price}</p>
                        </div>
                        <button className={style.btnAddToCart} onClick={() => onAddProduct(product)}>
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            ))
            }
        </div>
    )
}
