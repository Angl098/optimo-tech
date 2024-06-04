/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react'
import style from './ProductList.module.css'
import axios from 'axios'


import Card from '../card/card.component'
import { useSelector } from 'react-redux'

export default function ProductList({ search }) {
    const arrayCategory = useSelector((state) => state.categorias)
    const arrayProviders = useSelector((state) => state.provedores)
    const arrayTags = useSelector((state) => state.tags)

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
        name: "",
        tags: [], // Array de nombres de etiquetas
        provider: '',
        orderBy: "",
        orderDirection: "",
        page: 1,
        pageSize: 4
    });

    const buildQueryParams = (filter) => {
        if (search) filter.name = search
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
        console.log(queryParams);
        console.log(filter, "FIlter");
        return queryParams;
    };
    const fetchAlojamientos = async (queryParams) => {
        try {
            const { data } = await axios.get("/suplements/filter" + queryParams);
            // console.log(data);
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

            const changeFilter = { ...filter, category, page: 1 };
            setFilter(changeFilter);
            buildQueryParams();
            fetchAlojamientos();
        } else {
            const changeFilter = {
                category: "",
                provider: filter.provider,
                orderBy: filter.orderBy,
                orderDirection: filter.orderDirection,
                page: 1,
                pageSize: filter.pageSize,
                tags: filter.tags
            };
            setFilter(changeFilter);
            buildQueryParams();
            fetchAlojamientos();

        }
    }
    const handleProviderFilter = (provider) => {
        if (provider) {

            const changeFilter = { ...filter, provider, page: 1 };
            setFilter(changeFilter);
            buildQueryParams();
            fetchAlojamientos();
        } else {
            const changeFilter = {
                tags: filter.tags,
                provider: "",
                category: filter.category,
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
    const handleTagsFilter = (tag) => {
        if (tag && !filter.tags.includes(tag) && tag.trim() !== '') {

                const changeFilter = { ...filter, tags: [...filter.tags, tag], page: 1 };
                setFilter(changeFilter);
                buildQueryParams();
                fetchAlojamientos();

        } else {
            const changeFilter = {
                tags: [],
                provider: filter.provider,
                category: filter.category,
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
                <div>
                <h3>Categorias</h3>
                    <p className={style.category} onClick={() => handleCategoryFilter(category.id)} value=" ">Todos</p>
                    {arrayCategory.map((category) => {
                        return <p className={style.category} key={category.id} name="category" value={category.id} onClick={() => handleCategoryFilter(category.id)}>{category.name}</p>
                    })}

                </div>
                <div >
                <h3>Marcas</h3>
                    <p className={style.category} onClick={() => handleProviderFilter("")} value=" ">Todos</p>
                    {arrayProviders.map((provider) => {
                        return <p className={style.category} key={provider.id} name="provider" value={provider.id} onClick={() => handleProviderFilter(provider.id)}>{provider.name}</p>
                    })}

                </div>
                <div >
                <h3>Etiquetas</h3>
                    <p className={style.category} onClick={() => handleTagsFilter("")} value=" ">Todos</p>
                    {arrayTags.map((tag) => {
                        return <p className={style.category} key={tag.id} name="tags" value={tag.id} onClick={() => handleTagsFilter(tag.name)}>{tag.name}</p>
                    })}

                </div>
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
                <div className={style.newData}>

                    <div className={style.contenedorCards}>
                        {datas.map((suplement) => {
                            return (
                                <Card key={suplement.id} suplement={suplement} />
                            );
                        })}
                    </div>
                </div>
                <div className={style.buttonContainer}>
                <button onClick={prevPage} className={style.btnPages} disabled={filter.page === 1} >❮</button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => goToPage(index + 1)}
                        className={style.pageButton}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={nextPage} className={style.btnPages} disabled={filter.page === totalPages}>❯</button>
            </div>
            </div>

        </div>
    )
}