import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './ProductList.module.css'
import axios from 'axios'

import Card from '../card/card.component'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getSuplementsByName, getSuplementsFilter } from '../../Redux/actions'

export default function ProductList({ allSuplements }) {
    const datas = useSelector((state) => state.allSuplements);
    const dispatch =useDispatch()
    const [category, setCategory] = useState([])

    // const [datas, setDatas] = useState([])
    const [datasAux, setDatasAux] = useState([])
    useEffect(() => {
        // axios.get("/suplements/").then(({ data }) => {
        //         dispatch(getSuplementsByName())
        //     // setDatas([...datas, ...data])
        //     setDatasAux([...datas, ...data])
        // })

        axios.get("/category/").then(({ data }) => {
            console.log(data);
            setCategory([...data])
        })


    }, [])

    const [filter, setFilter] = useState({
        category: "",
        orderBy: "price",
        orderDirection: "",
        name: ""
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
            dispatch(getSuplementsFilter(queryParams))
            // const { data } = await axios.get("/suplements/filter/" + queryParams);
            // setDatas(data)
            //   dispatch(getAllAlojamientos(data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const queryParams = buildQueryParams(filter);
        fetchAlojamientos(queryParams);
    }, [filter]);

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
            {/* <div className={style.newData}>

                {newData.map(product => (
                    <div className={style.item} key={product.id} onClick={() => { console.log(product); }}>
                        <figure>
                            <img className={style.image} src={product.image} alt={product.name} />
                        </figure>
                        <div className={style.info}>
                            <div className={style.info}>
                                <h4>{product.name}</h4>
                                <p>${product.price}</p>
                            </div>
                            <button className={style.btnAddToCart} onClick={() => { console.log(product); }}>
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                ))
                }
            </div> */}

            <div className={style.contenedorCards}>
                {allSuplements.map((suplement) => {
                    //console.log(videogame);
                    return (
                        <Card key={suplement.id} suplement={suplement} />
                    );
                })}
            </div>
        </div>
    )
}