import React, { useState } from 'react';
import  "./CreateGame.css"

function GameBaseInfoForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ title, description});
    };

    return (
        <form onSubmit={handleSubmit} className={"base-info-form"}>
            <label htmlFor="title">Назва</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                className="title-input centered"
            />

            <label htmlFor="description">Опис</label>
            <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                className="description-input centered"
            />

            <button type="submit" className="form-continue-button">Продовжити</button>
        </form>
    );
}

export default GameBaseInfoForm;