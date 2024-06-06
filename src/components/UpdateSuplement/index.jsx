import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSuplement } from "../../Redux/actions";
import style from './CreateSuplement.module.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import buildQueryParams from "../../Utils/QueryFilterPath";
function UpdateSuplement() {
    const arrayCategory = useSelector((state) => state.categorias)
    const arrayProviders = useSelector((state) => state.provedores)
    const arrayTags = useSelector((state) => state.tags)
    const [suplements, setSuplements] = useState([]);
    const [filter, setFilter] = useState({
        category: "",
        name: "",
        orderBy: "",
        orderDirection: "",
        page: 1,
        pageSize: 4
    });

    const [suplemento, setSuplement] = useState({
        amount: 0,
        description: "",
        images: [],
        image: "",
        category: "",
        price: 0,
        provider: ""
    });
    useEffect(() => {
        const query = buildQueryParams(filter);
        axios.get("/suplements/filter" + query).then(({ data }) => {
            setSuplements(data.items);
        });
    }, [filter]);
    const [actualización, setActualizacion] = useState(false)
    useEffect(() => {
        if (suplemento.name) {

            setActualizacion(true)
        }
    }, [suplemento])
    // const [updatedSuplements, setUpdatedSuplements] = useState({
    //     images: []
    // });

    const dispatch = useDispatch();
    const { id } = useParams();

    const [errors, setErrors] = useState({ name: 'Completa todos los datos' });
    const [opCategory, setOpCategory] = useState(suplemento.category);

    const handleUpdate = (sup) => {
        setSuplement({ ...suplemento, sup });
        axios.get(`/suplements/${sup.id}`).then(({ data }) => {
            setSuplement({
                ...suplemento,
                ...data,
                category: data.category.name,
                provider: data.Provider.name,
                tags: data.Tags.map((tag) => tag.name)
            });
            setOpCategory(data.category.name)

        });

    };

    function handleChange(event) {
        const { name, files, value, type, checked } = event.target;
        let newValue = value;
        event.preventDefault();
        if (name === "images") {
            newValue = [
                // ...suplemento.images,
                ...Array.from(files).slice(0, 3 - suplemento.images.length),
            ];
        }
        if (name === "tags") {
            newValue = value.split(',').map(tag => tag.trim());
        }
        if (name === "provider") {
            setSuplement({ ...suplemento, provider: newValue });
            return
        }
        if (name === "category") {
            setSuplement({ ...suplemento, category: newValue });
            return
        }
        setSuplement({ ...suplemento, [name]: newValue });
    }

    const handleChangeCategory = (event) => {
        const category = event.target.value;
        setOpCategory(category);
        setSuplement({ ...suplemento, category });
    };
    const handleImageRemove = (index) => {
        const updatedImages = [...updatedSuplements.images];
        updatedImages.splice(index, 1);
        setUpdatedSuplements((prevData) => ({
            ...prevData,
            images: updatedImages,
        }));
    };

    const handleSubmit = (e) => {
        const formDataToSend = new FormData();
        Object.entries(suplemento).forEach(([key, value]) => {
            if (key === "images") {
                value.forEach((image) => formDataToSend.append("images", image));
            } else {
                formDataToSend.append(key, value);
            }
        });
        dispatch(updateSuplement(formDataToSend)).then(() => {
            // Después de la actualización, obtener de nuevo la lista de suplementos
            axios.get("/suplements/filter" + buildQueryParams(filter)).then(({ data }) => {
                setSuplements(data.items);
            });
        });
    };

    const handlePageChange = (newPage) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            page: newPage
        }));
    };
    const handleTagClick = (tagName) => {
        if (!suplemento.tags.includes(tagName) && tagName.trim() !== '') {
            setSuplement((prevState) => ({
                ...prevState,
                tags: [...prevState.tags, tagName]
            }));
        }
    };
    return (
        <div className={style.container}>
            <div className={style.list}>
                {suplements.map((s) => (
                    <span className={style.item} onClick={() => handleUpdate(s)} key={s.id}>
                        {s.name}
                    </span>
                ))}
                <div className={style.pagination}>
                    <button onClick={() => handlePageChange(filter.page - 1)} disabled={filter.page === 1}>
                        Anterior
                    </button>
                    <span>Página {filter.page}</span>
                    <button onClick={() => handlePageChange(filter.page + 1)}>
                        Siguiente
                    </button>
                </div>
            </div>
            {actualización && <form onSubmit={handleSubmit} className={style.form}>
                <h3 className={style.title}>Actualizar Suplemento</h3>
                <label>Nombre</label>
                <input
                    type="text"
                    className={style.form_style}
                    name='name'
                    value={suplemento.name}
                    onChange={handleChange}
                />
                {errors.name && <p className={style.errors}>{errors.name}</p>}

                <label>Categoria</label>
                <select
                    className={style.form_style}
                    value={suplemento.category}
                    name="category"
                    onChange={handleChange}
                >
                    <option value='' disabled>Selecciona una Opción</option>
                    {arrayCategory.map((objeto) => (
                        <option key={objeto.id} value={objeto.name}>
                            {objeto.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    className={style.form_style}
                    name="category"
                    value={suplemento.category}
                    onChange={handleChange}
                    placeholder="O escribe una nueva categoría"
                />
                {errors.category && <p className={style.errors}>{errors.category}</p>}

                <label>Descripcion</label>
                <textarea
                    rows='4'
                    cols='35'
                    name="description"
                    className={style.form_style}
                    value={suplemento.description}
                    onChange={handleChange}
                />
                {errors.description && <p className={style.errors}>{errors.description}</p>}

                <label>Precio $</label>
                <input
                    type="text"
                    className={style.form_style}
                    name='price'
                    value={suplemento.price}
                    onChange={handleChange}
                />
                {errors.price && <p className={style.errors}>{errors.price}</p>}

                <label>Cantidad</label>
                <input
                    type="text"
                    className={style.form_style}
                    name='amount'
                    value={suplemento.amount}
                    onChange={handleChange}
                />
                {errors.amount && <p className={style.errors}>{errors.amount}</p>}

                <label>Provedor </label>
                <select
                    className={style.form_style}
                    value={suplemento.provider}
                    name="provider"
                    onChange={handleChange}
                >
                    <option value='' disabled>Selecciona una Opción</option>
                    {arrayProviders.map((objeto) => (
                        <option key={objeto.id} value={objeto.name}>
                            {objeto.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    className={style.form_style}
                    name="provider"
                    value={suplemento.provider}
                    onChange={handleChange}
                />
                {errors.provider && <p className={style.errors}>{errors.provider}</p>}


                <option value='' disabled hidden>Selecciona una Opción</option>
                {arrayTags.map((objeto) => (
                    <span key={objeto.id} value={objeto.name} onClick={() => handleTagClick(objeto.name)}>
                        {objeto.name}
                    </span>
                ))}

                <label>Etiquetas</label>
                <input
                    type="text"
                    className={style.form_style}
                    name='tags'
                    value={suplemento.tags && suplemento.tags.join(", ")}
                    onChange={handleChange}
                />
                {errors.tags && <p className={style.errors}>{errors.tags}</p>}

                <div>
                    <input
                        type="file"
                        accept="image/*"
                        name="images"
                        id="images"
                        onChange={handleChange}
                        multiple
                    />
                    <label htmlFor="images">
                        <span className={style.subirfoto}>Subir foto</span>
                    </label>
                </div>
                {
                    suplemento.images && suplemento.images.length > 0
                        ?
                        suplemento.images.map((image, index) => (
                            <div key={index} className={style.image_item}>
                                <img
                                    className={style.image}
                                    src={URL.createObjectURL(image)}
                                    alt={`Imagen ${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleImageRemove(index)}
                                    className={style.image_remove_btn}
                                >
                                    X
                                </button>
                            </div>
                        ))
                        :
                        <img src={suplemento.image} alt="" />
                }
                <button className={style.btn} type="submit">Actualizar</button>
            </form>}
        </div>
    );
}

export default UpdateSuplement;
