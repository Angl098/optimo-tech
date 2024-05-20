import React, { useEffect, useState } from 'react'
import { data } from '../../data'
import style from './ProductList.module.css'
import axios from 'axios'

export default function ProductList() {

    const [category,setCategory]=useState([])

    const initialState = {
        category: "Proteina",
        orderBy: "price",
        orderDirection: "",
    };



    const [datas, setDatas] = useState([])
    const [datasAux, setDatasAux] = useState([])
    useEffect(() => {
        axios.get("/suplements/").then(({ data }) => {
            setDatas([...datas, ...data])
            setDatasAux([...datas, ...data])
        })
        
        axios.get("/category/").then(({ data }) => {
            console.log(data);
            setCategory([ ...data])
        })


    }, [])

    const [filter, setFilter] = useState({
        category: "",
        orderBy: "price",
        orderDirection: "",
    });

    const buildQueryParams = (filter) => {
        let queryParams = "?";
        
        for (const [key, value] of Object.entries(filter)) {
            if (value !== null && value !== "") {
                if (Array.isArray(value) && value.length > 0) {
                    queryParams += `${key}=${value.join(",")}&`;
                } else {
                    queryParams += `${key}=${value}&`;
                }
            }
        }
        return queryParams;
    };
    const fetchAlojamientos = async (queryParams) => {
        try {
            const { data } = await axios.get("/suplements/filter/" + queryParams);
            setDatas(data)
            //   dispatch(getAllAlojamientos(data));
        } catch (error) {
            console.log(error); 
        }
    };

    useEffect(() => {
        const queryParams = buildQueryParams(filter);
        fetchAlojamientos(queryParams);
    }, [filter]);

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
    const filterCateory = (e) => {
        const { value } = e.target
        if (value === "all") {
            setDatas(datasAux)
            return
        }
        const newdatas = datasAux.filter((data) => {
            return value === data.category
        })

        setDatas(newdatas)
    }

    const handleFilterChange = async (e) => {
        const changeFilter = { ...filter, [e.target.name]: e.target.value };
        setFilter(changeFilter);
        buildQueryParams();
        fetchAlojamientos();
    }


    return (
        <div>
            <div>
                <select
                    name="orderDirection"
                    onChange={handleFilterChange}
                    className=" bg-transparent focus:outline-none text-chocolate-100 mb-1"
                >
                    <option value="" className="">
                        Más relevantes
                    </option>
                    <option value="ASC">Menor precio</option>
                    <option value="DESC">Mayor precio</option>
                </select>
            </div>
            <div>

                <select onChange={handleFilterChange} name="category" id="">
                    <option value="">Todos</option>
                    {category.map((category) => {
                        return <option key={category.id} value={category.id}>{category.name}</option>
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
                    <div className={style.item} key={product.id} onClick={() => { console.log(product); }}>
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
