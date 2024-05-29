import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSuplement } from "../../Redux/actions";
import style from './CreateSuplement.module.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import buildQueryParams from "../../Utils/QueryFilterPath";
function UpdateSuplement() {
    const listCategorias=useSelector((state)=>state.categorias)
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
            console.log(data);
            setSuplement(data);
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
        dispatch(updateSuplement(id, formDataToSend)).then(() => {
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
                    value={suplemento.name}
                    onChange={handleChange}
                />
                {errors.name && <p className={style.errors}>{errors.name}</p>}

                <label>Categoria </label>
                <input
                    type="text"
                    className={style.form_style}
                    name="category"
                    value={suplemento.category}
                    onChange={handleChange}
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
                <img src={suplemento.image} alt="" />
                <button className={style.btn} type="submit">Actualizar</button>
            </form>
        </div>
    );
}

export default UpdateSuplement;
