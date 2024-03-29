import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import CreateGameListItem from "../CreateButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const penaltyCategories = [
    {
        title: "Космічний монстр!",
        color: "#45ad27",
        isPenalty: true
    },
    {
        title: "Корабель зламався!",
        color: "#f02211",
        isPenalty: true
    },
    {
        title: "Метеоритний дощ!",
        color: "#3498db",
        isPenalty: true
    }
]

const initialCategories = [
    ...penaltyCategories,
    { title: '', color: '#f9b23', isPenalty: false },
];

function GameCardCategoriesForm({ onSubmit }) {

    const [categories, setCategories] = useState(initialCategories);
    const [titleErrors, setTitleErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isFormValid = categories.every((category) => {
            return category.title.length >= 3 && category.title.length <= 50;
        });

        if (isFormValid) {
            onSubmit(categories);
            setCategories([]);
        }
    };

    const handleCategoryChange = (index, field, value) => {
        const updatedCategories = [...categories];
        updatedCategories[index][field] = value;
        setCategories(updatedCategories);

        const newTitleErrors = [...titleErrors];
        newTitleErrors[index] = value.length < 3 || value.length > 50;
        setTitleErrors(newTitleErrors);
    };

    const handleAddCategory = () => {
        setCategories([...categories, { title: '', color: '', isPenalty: false }]);
        setTitleErrors([...titleErrors, false]);
    };

    const handleRemoveCategory = (index) => {
        const updatedCategories = [...categories];
        updatedCategories.splice(index, 1);
        setCategories(updatedCategories);

        const newTitleErrors = [...titleErrors];
        newTitleErrors.splice(index, 1);
        setTitleErrors(newTitleErrors);
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
                    {titleErrors[index] && (
                        <p className="error-msg">Назва має бути від 3 до 50 символів</p>
                    )}
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