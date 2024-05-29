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
        axios.get("/category/").then(({ data }) => {
            setCategory([...data])
        })
    }, [])

    const [filter, setFilter] = useState({
        category: "",
        name:search,
        tags: [], // Array de nombres de etiquetas
        provider: '',
        orderBy: "",
        orderDirection: "",
        page: 1,
        pageSize: 4
    });
    const params = {
        category: 'aaad4ed5-17d5-47a4-8698-93abaa6a8a76', // ID de la categoría
        tags: ['Proteina', '5kg'], // Array de nombres de etiquetas
        provider: 'Mass Gainer', // Nombre del proveedor
        orderBy: 'price',
        orderDirection: 'DESC',
        name: 'Mass',
        page: 1,
        pageSize: 10
    };
    //merge con el back de royer

    const buildQueryParams = (filter) => {
        filter.name = search
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
    }, [])


    const nextPage = () => {
        setFilter({ ...filter, page: filter.page + 1 });
    }

    const prevPage = () => {
        setFilter({ ...filter, page: filter.page - 1 });
    }

    const goToPage = (page) => {
        setFilter({ ...filter, page });
    };


    const handleFilterChange = async (e) => {
        const changeFilter = { ...filter, [e.target.name]: e.target.value };
        setFilter(changeFilter);
        buildQueryParams();
        fetchAlojamientos();
    }

    const handleCategoryFilter = (category) => {
        if (category) {

            const changeFilter = { ...filter, category ,page:1};
            setFilter(changeFilter);
            buildQueryParams();
            fetchAlojamientos();
        } else {
            const changeFilter = {
                category: "",
                orderBy: filter.orderBy,
                orderDirection: filter.orderDirection,
                page: 1,
                pageSize: filter.pageSize
            };
            setFilter(changeFilter);
            buildQueryParams();
            fetchAlojamientos();

        }
    }

    return (
        <div className={style.productList}>
            <div className={style.categories}>

                <p className={style.category} key={category.id} onClick={() => handleCategoryFilter(category.id)} value=" ">Todos</p>
                {category.map((category) => {
                    return <p className={style.category} key={category.id} name="category" value={category.id} onClick={() => handleCategoryFilter(category.id)}>{category.name}</p>
                })}

            </div>
            <div className={style.catalogo}>

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

                    {/* <select onChange={handleFilterChange} name="category" id="">
                        <option value="">Todos</option>
                        {category.map((category) => {
                            return <option key={category.id} value={category.id}>{category.name}</option>
                        })}
                    </select> */}
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
                <div >
                    <button onClick={prevPage} disabled={filter.page === 1} >❮</button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => goToPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={nextPage} disabled={filter.page === totalPages}>❯</button>
                </div>
            </div>

        </div>
    )
}