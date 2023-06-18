import React, { useState } from 'react';
import  "./CreateGame.css"

function GameBaseInfoForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState(0);
    const [teamMode, setTeamMode] = useState(false);

    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [goalError, setGoalError] = useState('');

    const handleCheckboxChange = () => {
        setTeamMode(!teamMode);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let isValid = true;

        if (title.length < 3 || title.length > 20) {
            setTitleError('Назва гри має бути між 3 та 20 символами');
            isValid = false;
        } else {
            setTitleError('');
        }

        if (description.length < 5 || description.length > 1000) {
            setDescriptionError('Опис гри має бути між 5 та 1000 символами');
            isValid = false;
        } else {
            setDescriptionError('');
        }

        if (goal <= 0) {
            setGoalError('Мета має бути більше нуля');
            isValid = false;
        } else {
            setGoalError('');
        }

        if (isValid) {
            onSubmit({ title, description, goal, teamMode});
        }
    };

    return (
        <form onSubmit={handleSubmit} className={"base-info-form"}>
            <label htmlFor="title">Назва</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className={"title-input centered" + titleError && 'invalid-input'}
            />
            {titleError && <p className="error-msg">{titleError}</p>}

            <label htmlFor="description">Опис</label>
            <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className={"description-input centered" + descriptionError && 'invalid-input'}
            />
            {descriptionError && <p className="error-msg">{descriptionError}</p>}

            <label htmlFor="title">Фініш гри</label>
            <input
                id="goal"
                type="number"
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                defaultValue={100}
                className={"title-input centered" + goalError && 'invalid-input'}
            />
            {goalError && <p className="error-msg">{goalError}</p>}

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