/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react'
import style from './ProductList.module.css'
import axios from 'axios'


import Card from '../card/card.component'

export default function ProductList({ search }) {

    const [category, setCategory] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [datas, setDatas] = useState([])
    const [datasAux, setDatasAux] = useState([])
    useEffect(() => {
        axios.get("/suplements/").then(({ data }) => {
            setDatas([...datas, ...data])
            setDatasAux([...datas, ...data])
        })

        axios.get("/category/").then(({ data }) => {
            //console.log(data);
            setCategory([...data])
        })


    }, [])

    const [filter, setFilter] = useState({
        category: "",
        orderBy: "",
        orderDirection: "",
        page: 1,
        pageSize: 4
    });

    //merge con el back de royer

    const buildQueryParams = (filter) => {
        filter.name = search
        let queryParams = "?";
        console.log(filter)
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
            const { data } = await axios.get("/suplements/filter" + queryParams);
            console.log(data);
            setDatas(data.items)
            setTotalPages(data.totalPages)
            //   dispatch(getAllAlojamientos(data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const queryParams = buildQueryParams(filter);
        fetchAlojamientos(queryParams);
    }, [filter, search]);


    const [numberPage, setNumberPage] = useState(1);

    useEffect(() => {
        setNumberPage(1)
    }, [datas.length])


    const nextPage = () => {
        setNumberPage(numberPage + 1);
    }

    const prevPage = () => {
        setNumberPage(numberPage - 1);
    }

    const goToPage = (page) => {
        setFilter({...filter,page});
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
                    name="orderBy"
                    onChange={handleFilterChange}
                    className=" bg-transparent focus:outline-none text-chocolate-100 mb-1"
                >
                    <option value="price">Por precio</option>
                    <option value="name">Alfebeticamente</option>
                </select>
                <select
                    name="orderDirection"
                    onChange={handleFilterChange}
                    className=" bg-transparent focus:outline-none text-chocolate-100 mb-1"
                >
                    <option value="ASC">Asc</option>
                    <option value="DESC">Desc</option>
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

                <div className={style.contenedorCards}>
                    {datas.map((suplement) => {
                        return (
                            <Card key={suplement.id} suplement={suplement} />
                        );
                    })}
                </div>
            </div>

        </div>
    )
}