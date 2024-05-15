import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validation from '..//Validation//CreateSuplements//Validation';
import { postSuplements } from "..//..//Redux/actions";
import style from './CreateSuplement.module.css';

function CreateSuplement() {
    const [disableSubmit, setDisableSubmit] = useState(true);
    const dispatch = useDispatch();
    //estado principal 
    const [newSuplements, setNewSuplements] = useState({
        images: []
    });
    //estado de errores
    const [errors, setErrors] = useState({ name: 'Completa todos los datos' });

    //manejador del estado principal new Driver
    function handleChange(event) {
        const { name, files, value, type, checked } = event.target;
        let newValue = value;
        if (name === "images") {
            newValue = [
                ...newSuplements.images,
                ...Array.from(files).slice(0, 3 - newSuplements.images.length),
            ];
        }
        event.preventDefault();
        setErrors(validation({
            ...newSuplements, [event.target.name]: event.target.value
        })
        );
        setNewSuplements({ ...newSuplements, [name]: newValue });
    }
    const handleImageRemove = (index) => {
        const updatedImages = [...newSuplements.images];
        updatedImages.splice(index, 1);
        setNewSuplements((prevData) => ({
            ...prevData,
            images: updatedImages,
        }));
    };

    //manejar la imagen
    const [imagenURL, setImagenURL] = useState('');

    // const handleImagen = (event) => {
    //     event.preventDefault();
    //     const image = event.target.value;
    //     setImagenURL(image);
    //     setNewSuplements({ ...newSuplements, image: image });
    //     setErrors(validation({ ...newSuplements, image: image }))
    // };

    //submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.entries(newSuplements).forEach(([key, value]) => {
            if (key === "images") {
                value.forEach((image) => formDataToSend.append("images", image));
            } else {
                formDataToSend.append(key, value);
            }
        });
        dispatch(postSuplements(formDataToSend));
    };

    // Manejar el cambio de las opciones seleccionadas category
    //array precargado
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
    ];

    const [opCategory, setOpCategory] = useState([]);

    const handleChangeCategory = (event) => {
        event.preventDefault();
        const option = Array.from(event.target.selectedOptions, (option) => option.value);
        setOpCategory(option);
        const atrCategory = option[0];
        setNewSuplements({ ...newSuplements, category: atrCategory });
        setErrors(validation({ ...newSuplements, category: atrCategory }))
    };

    return <>

        <form onSubmit={handleSubmit} className={style.form}>
            <h3 className={style.title}>Nuevo Suplemento</h3>
            <label>Nombre</label>
            <input type="text" className={style.form_style} name='name' value={newSuplements.name} onChange={handleChange} />
            {errors.name !== '' && <p className={style.errors}>{errors.name}</p>}

            <label>Categoria </label>
            <select className={style.form_style} value={opCategory} onChange={handleChangeCategory}>
                <option value='' disabled hidden>Selecciona una Opcion</option>
                {arrayCategory.map((objeto) => (
                    <option key={objeto.id} value={objeto.category}>
                        {objeto.category}
                    </option>
                ))}
            </select>
            {errors.category !== '' && <p className={style.errors}>{errors.category}</p>}

            <label>Descripcion</label>
            <textarea rows='4' cols='35' name="description" className={style.form_style}
                value={newSuplements.description} onChange={handleChange} />
            {errors.description !== '' && <p className={style.errors}>{errors.description}</p>}

            <label>Precio $</label>
            <input type="text" className={style.form_style} name='price' value={newSuplements.price} onChange={handleChange} />
            {errors.price !== '' && <p className={style.errors}>{errors.price}</p>}

            {/* <label>Imagen </label>
            <input type="text" className={style.form_style} name='image' onChange={handleImagen} />
            {imagenURL && <img src={imagenURL} alt="Vista previa de la imagen"
                style={{ maxWidth: '300px', maxHeight: '300px', padding: '20px' }} />}
            {errors.image !== '' && <p className={style.errors}>{errors.image}</p>} */}

            <label>Cantidad</label>
            <input type="text" className={style.form_style} name='amount' value={newSuplements.amount} onChange={handleChange} />
            {errors.amount !== '' && <p className={style.errors}>{errors.amount}</p>}

            {console.log('nuevo suplemento', newSuplements)}
            {Object.keys(errors).length <= 0 && <button className={style.btn} type="submit">Registrar</button>}

            <div>
                <input type="file" accept="image/*" name="images" id="images" onChange={handleChange} className="hidden" multiple />
                <label htmlFor="images">
                    <span className={style.subirfoto}>
                        Subir foto
                    </span>
                </label>
            </div>
            <div>

                {newSuplements.images.length > 0 && (
                    <div>
                        <p>
                            Previsualización de imágenes:
                        </p>
                        <div>
                            {newSuplements.images.map((image, index) => (
                                <div key={index}>
                                    <div>
                                        <img src={URL.createObjectURL(image)} alt={`Imagen ${index + 1}`} />
                                        <button type="button" onClick={() => handleImageRemove(index)}>
                                            X
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {[...Array(1 - newSuplements.images.length)].map((_, index) => (
                                <div key={index}>
                                    <span>
                                        Imagen {newSuplements.images.length + index + 1}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <button
                type="submit"
            >
                Enviar
            </button>
        </form>
    </>
}
export default CreateSuplement;