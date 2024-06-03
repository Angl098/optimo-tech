import React, { useState } from 'react';
import style from '../FormCategories.module.css';

function Update({ categories, onCategoryUpdate, onCategoryCreate }) {
    const [categoryName, setCategoryName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCategory) {
            onCategoryUpdate(selectedCategory.id, categoryName);
        } else {
            onCategoryCreate(categoryName);
        }
        setCategoryName('');
        setSelectedCategory(null);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCategoryName(category.name);
    };

    const handleClear = () => {
        setCategoryName('');
        setSelectedCategory(null);
    };

    return (
        <div className={style.UpdateCategorias}>
            <form onSubmit={handleSubmit} className={style.form}>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className={style.input}
                    placeholder="Category name"
                />
                <button type="submit" className={style.button}>
                    {selectedCategory ? 'Update Category' : 'Create Category'}
                </button>
            </form>
            <div className={style.categoryList}>
                <div className={style.categoryItem} onClick={handleClear}>Crear</div>
                {categories.map((category) => (
                    <div key={category.id} className={style.categoryItem} onClick={() => handleCategoryClick(category)}>
                        {category.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Update;