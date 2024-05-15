import React, { useEffect, useState } from 'react'
import { data } from '../../data'
import style from './ProductList.module.css'
import axios from 'axios'

export default function ProductList() {
    const [datas,setDatas]=useState([...data]) 
    const [datasAux,setDatasAux]=useState([...data]) 
    useEffect(()=>{
        axios.get("http://localhost:3001/suplements/").then(({data})=>{
            console.log(data);
            setDatas([...datas,...data])
            setDatasAux([...datas,...data])
        })
    },[])


    const arrayCategory = [
        { id: 1, category: 'Vitaminas y Minerales' },
        { id: 2, category: 'Proteinas y Aminoacidos' },
        { id: 3, category: 'Acidos Grasos Esenciales' },
        { id: 4, category: 'Antioxidantes' },
        { id: 5, category: 'Probioticos y Prebioticos' },
        { id: 6, category: 'Herbales y Botanicos' },
        { id: 7, category: 'Rendimiento Deportivo' },
        { id: 8, category: 'Salud Articular y Ósea' },
        { id: 9, category: 'Salud Cardiovascular' },
        { id: 10, category: 'Salud Cerebral y Cognitiva' },
        { id: 11, category: 'Creatina' },
    ];


    const [numberPage, setNumberPage] = useState(1);

    useEffect(() => {
        setNumberPage(1)
    }, [datas.length])

    const NumAlojamientosPage = 6;
    const lastIndex = numberPage * NumAlojamientosPage;
    const firstIndex = lastIndex - NumAlojamientosPage;
    const newData = datas.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(datas.length / NumAlojamientosPage);

    const nextPage = () => {
        setNumberPage(numberPage + 1);
    }

    const prevPage = () => {
        setNumberPage(numberPage - 1);
    }

    const goToPage = (page) => {
        setNumberPage(page);
    };
    const filterCateory=(e)=>{
        const {value}=e.target
        if (value==="all") {
            setDatas(datasAux)
            return
        }
        const newdatas=datasAux.filter((data)=>{
            return value===data.category
        })
        
        setDatas(newdatas)
    }
    return (
        <div>
            <div>

            <select onChange={filterCateory} name="" id="">
                <option value="all"  >Todos</option>
                {arrayCategory.map((category)=>{
                return <option key={category.id} value={category.category}>{category.category}</option>
                })}
            </select>
            </div>
            <div >
                <button onClick={prevPage} disabled={numberPage === 1} >❮</button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => goToPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={nextPage} disabled={numberPage === totalPages}>❯</button>
            </div>
            <div className={style.newData}>

                {newData.map(product => (
                    <div className={style.item} key={product.id} onClick={()=>{console.log(product);}}>
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
        </div>
    )
}
