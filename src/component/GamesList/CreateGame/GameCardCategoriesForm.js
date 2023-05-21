import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import CreateGameListItem from "../CreateButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const MIN_TITLE_LENGTH = 3;
const MAX_TITLE_LENGTH = 20;

function GameCardCategoriesForm({ onSubmit }) {
    const [categories, setCategories] = useState([{ title: '', color: '' }]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const isFormValid = categories.every((category) => {
            return category.title.length >= MIN_TITLE_LENGTH && category.title.length <= MAX_TITLE_LENGTH;
        });

        if (isFormValid) {
            onSubmit(categories);
            setCategories([]);
        } else {
            alert(`Будь ласка, переконайтесь що всі назви категорій знаходяться в межах від ${MIN_TITLE_LENGTH} до ${MAX_TITLE_LENGTH} символів.`);
        }
    };

    const handleCategoryChange = (index, field, value) => {
        const updatedCategories = [...categories];
        updatedCategories[index][field] = value;
        setCategories(updatedCategories);
    };

    const handleAddCategory = () => {
        setCategories([...categories, { title: '', color: '' }]);
    };

    const handleRemoveCategory = (index) => {
        const updatedCategories = [...categories];
        updatedCategories.splice(index, 1);
        setCategories(updatedCategories);
    };

    return (
        <div>
        <form onSubmit={handleSubmit} className={"w-50 centered category-form"}>
            {categories.map((category, index) => (
                <div key={index} className={"add-category-card add-item"}>
                    <div><label htmlFor={`categoryTitle${index}`}>Назва</label></div>
                    <input
                        id={`categoryTitle${index}`}
                        type="text"
                        value={category.title}
                        onChange={(event) => handleCategoryChange(index, 'title', event.target.value)}
                        required
                        className={"w-50 centered category-title"}
                    />
                    <div className={"colorpicker-container"}>
                        <label htmlFor={`categoryColor${index}`}>Колір</label>
                        <ChromePicker
                            color={category.color}
                            onChangeComplete={(color) => handleCategoryChange(index, 'color', color.hex)}
                            required
                            className={"w-50 centered"}
                        />

                    </div>
                    <button type="button" onClick={() => handleRemoveCategory(index)} className={"remove-item"}>
                        <FontAwesomeIcon icon={faTrash} color={"black"}/>
                    </button>
                </div>
            ))}

            <CreateGameListItem onSubmit={handleAddCategory}/>

            {categories.length > 0 ? (
                <>
                    <h2>Додані категорії</h2>
                    <ul className="categories-added-items">
                        {categories.map((category, index) => (
                            category.title.length > 0 ? (
                                <li key={index} className="category-card">
                                    <div className="game-card-bg" style={{ backgroundColor: category.color }}></div>
                                    <div>
                                        <div className="card-title category-card-title">{category.title}</div>
                                    </div>
                                    <button onClick={() => handleRemoveCategory(index)} className={"remove-item-on-card"}>
                                        <FontAwesomeIcon icon={faTrash} color={"black"}/>
                                    </button>
                                </li>
                            ) : null
                        ))}
                    </ul>
                </>
            ) : null}

            <button type="submit">Продовжити</button>

        </form>

        </div>
    );
}

export default GameCardCategoriesForm;