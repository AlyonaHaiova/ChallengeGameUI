import React, {useContext, useEffect, useState} from "react";
import CreateGameListItem from "../CreateButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {UserContext} from "../../../context/UserContext";
import axios from "axios";

function CardsForm({ onSubmit, gameId }) {

    const [cards, setCards] = useState([{ description: "", points: 0, typeId: 0, roleIds: []}]);
    const [errors, setErrors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [roles, setRoles] = useState([]);

    const [titleErrors, setTitleErrors] = useState([]);
    const [categoryErrors, setCategoryErrors] = useState([]);

    const { user } = useContext(UserContext);

    useEffect(() => {
        axios
            .get(`http://13.51.85.16:8080/api/card-types/${gameId}`, {
                headers: {
                    Authorization: `Bearer ${user.token.accessToken}`,
                },
            })
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log("Error retrieving categories:", error);
            });

        axios
            .get(`http://13.51.85.16:8080/api/games/${gameId}/roles`, {
                headers: {
                    Authorization: `Bearer ${user.token.accessToken}`,
                },
            })
            .then((response) => {
                setRoles(response.data.map((r) => r.id));
            })
            .catch((error) => {
                console.log("Error retrieving roles:", error);
            });
    }, [gameId, user.token.accessToken]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const isFormValid = cards.every((card, index) => {
            const cardErrors = {};

            if (card.description.trim() === "") {
                setTitleErrors((prevErrors) => [...prevErrors.slice(0, index), true, ...prevErrors.slice(index + 1)]);
            } else {
                setTitleErrors((prevErrors) => [...prevErrors.slice(0, index), false, ...prevErrors.slice(index + 1)]);
            }

            if (card.typeId === 0) {
                setCategoryErrors((prevErrors) => [...prevErrors.slice(0, index), true, ...prevErrors.slice(index + 1)]);
            } else {
                setCategoryErrors((prevErrors) => [...prevErrors.slice(0, index), false, ...prevErrors.slice(index + 1)]);
            }

            setErrors((prevErrors) => [...prevErrors.slice(0, index), cardErrors, ...prevErrors.slice(index + 1)]);
            return Object.keys(cardErrors).length === 0;
        });

        if (isFormValid) {
            cards.forEach((card) => (card.roleIds = roles));
            onSubmit(cards);
            setCards([]);
        }
    };

    const handleChange = (index, field, value) => {
        const updatedCards = [...cards];
        updatedCards[index][field] = value;
        setCards(updatedCards);
    };

    const handleAddCard = () => {
        setCards([...cards, { description: '', points: 0, typeId: '', roleIds: [] }]);
        setTitleErrors([...titleErrors, false]);
        setCategoryErrors([...categoryErrors, false]);
    };

    const handleRemoveCard = (index) => {
        const updatedCards = [...cards];
        updatedCards.splice(index, 1);
        setCards(updatedCards);

        const newTitleErrors = [...titleErrors];
        newTitleErrors.splice(index, 1);
        setTitleErrors(newTitleErrors);

        const newCategoryErrors = [...categoryErrors];
        newCategoryErrors.splice(index, 1);
        setCategoryErrors(newCategoryErrors);
    };

    return (
        <div className={"add-cards-page"}>
            <form onSubmit={handleSubmit} className={"w-50 centered card-form"}>
                {cards.map((card, index) => (
                    <div key={index} className={"add-card add-item"}>
                        <div className="form-field">
                            <label htmlFor={`description-${index}`} className="label">Завдання</label>
                            <textarea
                                id={`description-${index}`}
                                value={card.description}
                                onChange={(e) => handleChange(index, 'description', e.target.value)}
                                className={"card-input"}
                            />
                        </div>

                        {errors[index] && errors[index].description &&
                            <div><p className="error-msg">Завдання має бути від 3 до 50 символів</p></div>}

                        <div className="form-field">
                            <label htmlFor={`points-${index}`} className="label">Бали</label>
                            <input
                                type="number"
                                id={`points-${index}`}
                                value={card.points}
                                onChange={(e) => handleChange(index, 'points', e.target.value)}
                                className={"card-input"}
                            />

                        </div>
                        <div className="select-wrapper form-field">
                            <label htmlFor={`category-${index}`} className="label">Категорія</label>
                            <select
                                id={`category-${index}`}
                                value={card.typeId}
                                onChange={(e) => handleChange(index, 'typeId', e.target.value)}
                                className="select-category card-input"
                            >
                                <option key="zero" value="">Оберіть категорію</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {errors[index] && errors[index].typeId &&
                            <div><p className="error-msg">Оберіть категорію</p></div>}

                        <button type="button" onClick={() => handleRemoveCard(index)} className={"remove-item"}>
                            <FontAwesomeIcon icon={faTrash} color={"black"}/>
                        </button>
                    </div>
                ))}

                <CreateGameListItem onSubmit={handleAddCard}/>

                {cards.length > 0 ? (
                    <>
                        <h2>Додані картки</h2>
                        <ul className="cards-added-items">
                            {cards.map((card, index) => (
                                card.description.length > 0 ? (
                                    <li key={index} className="card-added" >
                                        <div>
                                            <div>{card.description}</div>
                                        </div>
                                        <div>{card.points} балів</div>
                                        <button onClick={() => handleRemoveCard(index)} className={"remove-item-on-card"}>
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

export default CardsForm;