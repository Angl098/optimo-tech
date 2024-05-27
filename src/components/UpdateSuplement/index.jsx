import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import validation from '../Validation/CreateSuplements/Validation';
import { updateSuplement, fetchSuplementById } from "../../Redux/actions";
import style from './CreateSuplement.module.css';
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateSuplement() {

    const [suplemento, setSuplement] = useState({
        amount: 0,
        description: "",
        image: "",
        categorie: "",
        price: 0
    })
    const { id } = useParams();
    const [opCategory, setOpCategory] = useState([]);

    const [updatedSuplements, setUpdatedSuplements] = useState({
        images: []
    });

    useEffect(() => {
        axios.get(`/suplements/${id}`).then(({ data }) => {
            if (data.categories.length > 0) {
                console.log(data);
                
                setSuplement({ ...suplemento, ...data ,categories:data.categories[0].name })
                
            } else {
                console.log("hola");

                setSuplement({ ...suplemento, ...data, categories: "" })
            }

            console.log(data);
        })
        setOpCategory([])
        setUpdatedSuplements({
            ...updateSuplement,
            categories: []
        })
    }, [id])

    const dispatch = useDispatch();
    // const suplemento = useSelector(state => state.suplemento);


    const [errors, setErrors] = useState({ name: 'Completa todos los datos' });


    useEffect(() => {

        if (suplemento) {
            console.log(opCategory);
            setUpdatedSuplements(suplemento);
            if (suplemento.categories?.length > 0) {

                setOpCategory(suplemento.categories[0])
            }

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
        // setErrors(validation({
        //     ...updatedSuplements, [event.target.name]: event.target.value
        // }));
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


    // const handleChangeCategory = (event) => {
    //     event.preventDefault();
    //     const option = Array.from(event.target.selectedOptions, (option) => option.value);
    //     setOpCategory(option);
    //     const atrCategory = option[0];
    //     setUpdatedSuplements({ ...updatedSuplements, category: atrCategory });
    //     setErrors(validation({ ...updatedSuplements, category: atrCategory }));
    // };

    return (
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
                value={suplemento.categories}
                onChange={handleChange}
                defaultValue={[]}
            >
                <option value='' >Selecciona una Opcion</option>
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
                {updatedSuplements.images > 0 && (
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
                            {[...Array(1 - updatedSuplements.images.length)].map((_, index) => (
                                <div key={index}>
                                    <span>Imagen {updatedSuplements.images.length + index + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <button className={style.btn} type="submit">Actualizar</button>
        </form>
    );
}

export default UpdateSuplement;
