import React, { useState } from 'react';
import  "./CreateGame.css"

function GameBaseInfoForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState(0);
    const [teamMode, setTeamMode] = useState(false);

    const handleCheckboxChange = () => {
        setTeamMode(!teamMode);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (goal === 0) {
            setGoal(100);
        }
        onSubmit({ title, description, goal, teamMode});
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

            <label htmlFor="title">Фініш гри</label>
            <input
                id="goal"
                type="number"
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                defaultValue={100}
                className="title-input centered"
            />

            <div>
                <input
                    type="checkbox"
                    checked={teamMode}
                    onChange={handleCheckboxChange}
                    id="mode"
                />
                <label htmlFor="mode">Ввімкнути командний режим</label>
            </div>

            <button type="submit" className="form-continue-button">Продовжити</button>
        </form>
    );
}

export default GameBaseInfoForm;