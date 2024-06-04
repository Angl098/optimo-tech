import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../FormCategories.module.css';
import Update from '../Update/Update';

const Users=()=> {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Función para obtener categorías del backend
        axios.get("/tags").then(({data})=>{
            setCategories(data);
        })
        
    }, []);
    
    const handleCategoryUpdate = async (id, name) => {
        // Lógica para actualizar la categoría en el backend
        const body={id,name}
        axios.put(`/tags`,body).then(({data})=>{
        })
        // Actualizar el estado local
        setCategories(categories.map(cat => (cat.id === id ? { ...cat, name } : cat)));
    };

    const handleCategoryCreate = async (name) => {
        const body={name}
        // Lógica para crear una nueva categoría en el backend
        const newCategory = axios.post("/category",body)


        // Actualizar el estado local
        setCategories([...categories, newCategory]);
    };

    return (
        <div className={style.FormCategories}>
            <h1>Provedores</h1>
            <Update
                categories={categories}
                onCategoryUpdate={handleCategoryUpdate}
                onCategoryCreate={handleCategoryCreate}
            />
        </div>
    );
}

export default Users