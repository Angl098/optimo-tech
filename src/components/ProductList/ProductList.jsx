/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import style from './ProductList.module.css';
import axios from 'axios';
import Card from '../card/card.component';
import { useSelector } from 'react-redux';

export default function ProductList({ search }) {
    const arrayCategory = useSelector((state) => state.categorias);
    const arrayProviders = useSelector((state) => state.provedores);
    const arrayTags = useSelector((state) => state.tags);

    const [category, setCategory] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [datas, setDatas] = useState([]);
    const [datasAux, setDatasAux] = useState([]);


    useEffect(() => {
        axios.get("/category/").then(({ data }) => {
            setCategory([...data]);
        });
    }, []);

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
        if (search) filter.name = search;
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
            setDatas(data.items);
            setTotalPages(data.totalPages);
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
        setNumberPage(1);
    }, []);

    const nextPage = () => {
        setFilter({ ...filter, page: filter.page + 1 });
    };

    const prevPage = () => {
        setFilter({ ...filter, page: filter.page - 1 });
    };

    const goToPage = (page) => {
        setFilter({ ...filter, page });
    };

    const handleFilterChange = async (e) => {
        const changeFilter = { ...filter, [e.target.name]: e.target.value };
        setFilter(changeFilter);
        const queryParams = buildQueryParams(changeFilter);
        fetchAlojamientos(queryParams);
    };

    const [selectCategory, setSelectCategory] = useState(null);
    const [selectProvider, setSelectProvider] = useState(null);
    const [selectTags, setSelectTags] = useState([]);

    const handleCategoryFilter = (category, index) => {
        setSelectCategory(index);
        const changeFilter = category
            ? { ...filter, category, page: 1 }
            : { ...filter, category: "", page: 1 };
        setFilter(changeFilter);
        const queryParams = buildQueryParams(changeFilter);
        fetchAlojamientos(queryParams);
    };

    const handleProviderFilter = (provider, index) => {
        setSelectProvider(index);
        const changeFilter = provider
            ? { ...filter, provider, page: 1 }
            : { ...filter, provider: "", page: 1 };
        setFilter(changeFilter);
        const queryParams = buildQueryParams(changeFilter);
        fetchAlojamientos(queryParams);
    };

    const handleTagsFilter = (tag, index) => {
        setSelectTags((prevSelectTags) => {
            let updatedTags;
            if (tag.trim() !== '') {
                if (!prevSelectTags.includes(index)) {
                    updatedTags = [...prevSelectTags, index];
                } else {
                    updatedTags = prevSelectTags.filter((i) => i !== index);
                }
            } else {
                updatedTags = [];
            }

            const selectedTagNames = updatedTags.map(i => arrayTags[i - 1].name);

            const changeFilter = { ...filter, tags: selectedTagNames, page: 1 };
            setFilter(changeFilter);
            const queryParams = buildQueryParams(changeFilter);
            fetchAlojamientos(queryParams);

            return updatedTags;
        });
    };

    return (
        <div className={style.productList}>
            <div className={style.categories}>
                <div>
                    <h3>Categorias</h3>
                    <p className={!selectCategory ? style.selectCategory : style.category} onClick={() => handleCategoryFilter(null, null)} value=" ">Todos</p>
                    {arrayCategory.map((category, index) => {
                        return <p className={selectCategory === index + 1 ? style.selectCategory : style.category} key={category.id} name="category" value={category.id} onClick={() => handleCategoryFilter(category.id, index + 1)}>{category.name}</p>
                    })}
                </div>
                <div>
                    <h3>Marcas</h3>
                    <p className={!selectProvider ? style.selectCategory : style.category} onClick={() => handleProviderFilter(null, null)} value=" ">Todos</p>
                    {arrayProviders.map((provider, index) => {
                        return <p className={selectProvider === index + 1 ? style.selectCategory : style.category} key={provider.id} name="provider" value={provider.id} onClick={() => handleProviderFilter(provider.id, index + 1)}>{provider.name}</p>
                    })}
                </div>
                <div>
                    <h3>Etiquetas</h3>
                    <p className={!selectTags.length ? style.selectCategory : style.category} onClick={() => handleTagsFilter("", null)} value=" ">Todos</p>
                    {arrayTags.map((tag, index) => {
                        return <p className={selectTags.includes(index + 1) ? style.selectCategory : style.category} key={tag.id} name="tags" value={tag.id} onClick={() => handleTagsFilter(tag.name, index + 1)}>{tag.name}</p>
                    })}
                </div>
            </div>
            <div className={style.catalogo}>

                <div className={style.selectContainer}>
                    <select
                        name="orderBy"
                        onChange={handleFilterChange}
                        className={style.selectElement}
                    >
                        <option className={style.optionElement} value="price">Por precio</option>
                        <option className={style.optionElement} value="name">Alfabéticamente</option>
                    </select>
                    <select
                        name="orderDirection"
                        onChange={handleFilterChange}
                        className={style.selectElement}
                    >
                        <option className={style.optionElement} value="ASC">Asc</option>
                        <option className={style.optionElement} value="DESC">Desc</option>
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
                    <button onClick={prevPage} className={style.btnPages} disabled={filter.page === 1}>❮</button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => goToPage(index + 1)}
                            className={style.btnPages}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={nextPage} className={style.btnPages} disabled={filter.page === totalPages}>❯</button>
                </div>
            </div>
        </div>
    );
}
