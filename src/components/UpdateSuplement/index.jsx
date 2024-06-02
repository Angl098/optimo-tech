import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import validation from '../Validation/CreateSuplements/Validation';
import { updateSuplement, fetchSuplementById } from "../../Redux/actions";
import style from './CreateSuplement.module.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import buildQueryParams from "../../Utils/QueryFilterPath";

function UpdateSuplement() {
    const [suplements, setSuplements] = useState([]);
    const [filter, setFilter] = useState({
        category: "",
        name: "",
        orderBy: "",
        orderDirection: "",
        page: 1,
        pageSize: 4
    });

    useEffect(() => {
        const query = buildQueryParams(filter);
        axios.get("/suplements/filter" + query).then(({ data }) => {
            setSuplements(data.items);
        });
    }, [filter]);

    const [suplemento, setSuplement] = useState({
        amount: 0,
        description: "",
        image: "",
        categories: "",
        price: 0
    });

    const [updatedSuplements, setUpdatedSuplements] = useState({
        images: []
    });

    const dispatch = useDispatch();
    const { id } = useParams();

    const [errors, setErrors] = useState({ name: 'Completa todos los datos' });

    const handleUpdate = (sup) => {
        setSuplement({ ...suplemento, sup });
        axios.get(`/suplements/${sup.id}`).then(({ data }) => {
            if (data.categories.length > 0) {
                setSuplement({ ...suplemento, ...data, categories: data.categories[0].name });
            } else {
                setSuplement({ ...suplemento, ...data, categories: "" });
            }
        });
        setUpdatedSuplements({
            ...updateSuplement,
            categories: []
        });
    };

    useEffect(() => {
        if (suplemento) {
            setUpdatedSuplements(suplemento);
        }
    }, [suplemento]);

    function handleChange(event) {
        const { name, files, value, type, checked } = event.target;
        let newValue = value;
        if (name === "images") {
            newValue = [
                ...updatedSuplements.images,
                ...Array.from(files).slice(0, 3 - updatedSuplements.images.length),
            ];
        }
        event.preventDefault();
        setUpdatedSuplements({ ...updatedSuplements, [name]: newValue });
    }

    const handleImageRemove = (index) => {
        const updatedImages = [...updatedSuplements.images];
        updatedImages.splice(index, 1);
        setUpdatedSuplements((prevData) => ({
            ...prevData,
            images: updatedImages,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.entries(updatedSuplements).forEach(([key, value]) => {
            if (key === "images") {
                value.forEach((image) => formDataToSend.append("images", image));
            } else {
                formDataToSend.append(key, value);
            }
        });
        dispatch(updateSuplement(id, formDataToSend));
    };

    const arrayCategory = [
        { id: 1, category: 'Vitaminas y Minerales' },
        { id: 2, category: 'Proteina' },
        { id: 3, category: 'Aminoacido' },
        { id: 4, category: 'Creatina' },
        { id: 5, category: 'Acidos Grasos Esenciales' },
        { id: 6, category: 'Antioxidante' },
        { id: 7, category: 'Probiotico y Prebiotico' },
        { id: 8, category: 'Herbales y Botanicos' },
        { id: 9, category: 'Rendimiento Deportivo' },
        { id: 10, category: 'Salud Articular y Ósea' },
        { id: 11, category: 'Salud Cardiovascular' },
        { id: 12, category: 'Salud Cerebral y Cognitiva' },
        { id: 13, category: 'Colageno' },
    ];

    const handlePageChange = (newPage) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            page: newPage
        }));
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
            <form onSubmit={handleSubmit} className={style.form}>
                <h3 className={style.title}>Actualizar Suplemento</h3>
                <label>Nombre</label>
                <input
                    type="text"
                    className={style.form_style}
                    name='name'
                    value={updatedSuplements.name}
                    onChange={handleChange}
                />
                {errors.name && <p className={style.errors}>{errors.name}</p>}

                <label>Categoria </label>
                <select
                    className={style.form_style}
                    name="categories"
                    value={suplemento.categories}
                    onChange={handleChange}
                >
                    <option value=''>Selecciona una Opcion</option>
                    {arrayCategory.map((objeto) => (
                        <option key={objeto.id} value={objeto.category}>
                            {objeto.category}
                        </option>
                    ))}
                </select>
                {errors.category && <p className={style.errors}>{errors.category}</p>}

                <label>Descripcion</label>
                <textarea
                    rows='4'
                    cols='35'
                    name="description"
                    className={style.form_style}
                    value={updatedSuplements.description}
                    onChange={handleChange}
                />
                {errors.description && <p className={style.errors}>{errors.description}</p>}

                <label>Precio $</label>
                <input
                    type="text"
                    className={style.form_style}
                    name='price'
                    value={updatedSuplements.price}
                    onChange={handleChange}
                />
                {errors.price && <p className={style.errors}>{errors.price}</p>}

                <label>Cantidad</label>
                <input
                    type="text"
                    className={style.form_style}
                    name='amount'
                    value={updatedSuplements.amount}
                    onChange={handleChange}
                />
                {errors.amount && <p className={style.errors}>{errors.amount}</p>}

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
                <img src={updatedSuplements.image} alt="" />
                <div>
                    {/* {updatedSuplements?.images.length > 0 && (
                        <div>
                            <p>Previsualización de imágenes:</p>
                            <div>
                                {updatedSuplements.images.map((image, index) => (
                                    <div key={index}>
                                        <div>
                                            <img src={URL.createObjectURL(image)} alt={`Imagen ${index + 1}`} />
                                            <button type="button" onClick={() => handleImageRemove(index)}>X</button>
                                        </div>
                                    </div>
                                ))}
                                {[...Array(3 - updatedSuplements.images.length)].map((_, index) => (
                                    <div key={index}>
                                        <span>Imagen {updatedSuplements.images.length + index + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )} */}
                </div>
                <button className={style.btn} type="submit">Actualizar</button>
            </form>
        </div>
    );
}

export default UpdateSuplement;
