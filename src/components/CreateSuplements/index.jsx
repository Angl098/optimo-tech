import { useState } from "react";
import { useDispatch } from "react-redux";
import validation from '../Validation/CreateSuplements/Validation';
import { postSuplements } from "../../Redux/actions";
import styles from './CreateSuplement.module.css';

function CreateSuplement() {
    const [disableSubmit, setDisableSubmit] = useState(true);
    const dispatch = useDispatch();
    
    // Estado principal 
    const [newSuplements, setNewSuplements] = useState({
        images: [],
        tags: []
    });

    // Estado de errores
    const [errors, setErrors] = useState({ name: 'Completa todos los datos' });

    // Manejador del estado principal
    function handleChange(event) {
        const { name, files, value, type, checked } = event.target;
        let newValue = value;

        if (name === "images") {
            newValue = [
                ...newSuplements.images,
                ...Array.from(files).slice(0, 3 - newSuplements.images.length),
            ];
        }

        if (name === "tags") {
            newValue = value.split(',').map(tag => tag.trim());
        }

        event.preventDefault();
        setErrors(validation({
            ...newSuplements, [event.target.name]: newValue
        }));

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

    // Manejar la imagen
    const [imagenURL, setImagenURL] = useState('');

    // Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.entries(newSuplements).forEach(([key, value]) => {
            if (key === "images") {
                value.forEach((image) => formDataToSend.append("images", image));
            } else if (key === "tags") {
                formDataToSend.append(key, JSON.stringify(value));
            } else {
                formDataToSend.append(key, value);
            }
        });
        dispatch(postSuplements(formDataToSend));
    };

    // Array precargado de categorías
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

    const [opCategory, setOpCategory] = useState('');

    const handleChangeCategory = (event) => {
        event.preventDefault();
        const category = event.target.value;
        setOpCategory(category);
        setNewSuplements({ ...newSuplements, category });
        setErrors(validation({ ...newSuplements, category }));
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.title}>Nuevo Suplemento</h3>
            <div className={styles.field}>
                <label>Nombre</label>
                <input
                    type="text"
                    className={styles.form_style}
                    name='name'
                    value={newSuplements.name}
                    onChange={handleChange}
                />
                {errors.name && <p className={styles.errors}>{errors.name}</p>}
            </div>

            <div className={styles.field}>
                <label>Categoria</label>
                <select
                    className={styles.form_style}
                    value={opCategory}
                    onChange={handleChangeCategory}
                >
                    <option value='' disabled hidden>Selecciona una Opción</option>
                    {arrayCategory.map((objeto) => (
                        <option key={objeto.id} value={objeto.category}>
                            {objeto.category}
                        </option>
                    ))}
                </select>
                {errors.category && <p className={styles.errors}>{errors.category}</p>}
            </div>

            <div className={styles.field}>
                <label>Descripcion</label>
                <textarea
                    rows='4'
                    cols='35'
                    name="description"
                    className={styles.form_style}
                    value={newSuplements.description}
                    onChange={handleChange}
                />
                {errors.description && <p className={styles.errors}>{errors.description}</p>}
            </div>

            <div className={styles.field}>
                <label>Precio $</label>
                <input
                    type="number"
                    className={styles.form_style}
                    name='price'
                    value={newSuplements.price}
                    onChange={handleChange}
                    min="0"
                />
                {errors.price && <p className={styles.errors}>{errors.price}</p>}
            </div>

            <div className={styles.field}>
                <label>Cantidad</label>
                <input
                    type="number"
                    className={styles.form_style}
                    name='amount'
                    value={newSuplements.amount}
                    onChange={handleChange}
                    min="0"
                />
                {errors.amount && <p className={styles.errors}>{errors.amount}</p>}
            </div>

            <div className={styles.field}>
                <label>Proveedor</label>
                <input
                    type="text"
                    className={styles.form_style}
                    name='provider'
                    value={newSuplements.provider}
                    onChange={handleChange}
                />
                {errors.provider && <p className={styles.errors}>{errors.provider}</p>}
            </div>

            <div className={styles.field}>
                <label>Etiquetas (separadas por comas)</label>
                <input
                    type="text"
                    className={styles.form_style}
                    name='tags'
                    value={newSuplements.tags.join(', ')}
                    onChange={handleChange}
                />
                {errors.tags && <p className={styles.errors}>{errors.tags}</p>}
            </div>

            <div className={styles.field}>
                <input
                    type="file"
                    accept="image/*"
                    name="images"
                    id="images"
                    onChange={handleChange}
                    multiple
                />
                <label htmlFor="images" className={styles.file_label}>
                    <span>Subir fotos</span>
                </label>
            </div>

            <div>
                {newSuplements.images.length > 0 && (
                    <div>
                        <p>Previsualización de imágenes:</p>
                        <div className={styles.image_preview}>
                            {newSuplements.images.map((image, index) => (
                                <div key={index} className={styles.image_item}>
                                    <img
                                        className={styles.image}
                                        src={URL.createObjectURL(image)}
                                        alt={`Imagen ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleImageRemove(index)}
                                        className={styles.image_remove_btn}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                            {[...Array(1 - newSuplements.images.length)].map((_, index) => (
                                <div key={index} className={styles.image_placeholder}>
                                    <span>Imagen {newSuplements.images.length + index + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {Object.keys(errors).length <= 0 && <button className={styles.btn} type="submit">Registrar</button>}
        </form>
    );
}

export default CreateSuplement;
