import React, { useState, useContext } from 'react';
import GameBaseInfoForm from './../../GamesList/CreateGame/GameBaseInfoForm';
import GameCardCategoriesForm from './../../GamesList/CreateGame/GameCardCategoriesForm';
import GameRolesForm from './../../GamesList/CreateGame/GameRolesForm';
import {UserContext} from "../../../context/UserContext";
import "./../../GamesList/CreateGame/CreateGame.css"
import CardsForm from "../../GamesList/CreateGame/CardsForm";
import LoginPage from "../login/LoginPage";

function NewGame() {
    const [gameData, setGameData] = useState({});
    const [gameId, setGameId] = useState(null);
    const [step, setStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState(null);
    const {user} = useContext(UserContext);

    const handleBaseInfoSubmit = async (baseInfo) => {
        try {
            const response = await fetch('http://localhost:8080/api/games', {
                method: 'POST',
                body: JSON.stringify({
                    userId: user.id,
                    title: baseInfo.title,
                    description: baseInfo.description,
                    goal: baseInfo.goal,
                    isTeam: baseInfo.teamMode
                }),
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${user.token.accessToken}`
                },
            });
            if (!response.ok) {
                throw new Error('Не можу створити гру');
            }
            const data = await response.json();
            setGameId(data.id);
            setGameData({...gameData, ...baseInfo});
            setStep(2);
        } catch (error) {
            setErrorMessage(error.message);
            console.log(errorMessage);
        }
    };

    const handleCardCategoriesSubmit = async (categories) => {
        try {
            const cardTypePromises = categories.map((category) =>
                fetch('http://localhost:8080/api/card-types', {
                    method: 'POST',
                    body: JSON.stringify({
                        gameId: gameId,
                        title: category.title,
                        color: category.color,
                        isPlayable: !category.isPenalty,
                        isPenalty: category.isPenalty
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token.accessToken}`
                    },
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(`Не можу додати категорію ${category.title}`);
                    }
                })
            );
            await Promise.all(cardTypePromises);
            setGameData({...gameData, ...categories});
            setStep(3);
        } catch (error) {
            setErrorMessage(error.message);
            console.log(errorMessage);
        }
    };

    const handleRolesSubmit = async (roles) => {
        try {
            const rolePromises = roles.map((role) =>
                fetch(`http://localhost:8080/api/games/${gameId}/roles`, {
                    method: 'POST',
                    body: JSON.stringify({
                        gameId: gameId,
                        title: role.title,
                        points: 0
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token.accessToken}`
                    },
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(`Не можу додати роль ${role.title}`);
                    }
                })
            );
            await Promise.all(rolePromises);
            setGameData({...gameData, roles});
            setStep(4);
        } catch (error) {
            setErrorMessage(error.message);
            console.log(errorMessage);
        }
    };

    const handleCardsSubmit = async (cards) => {
        try {
            const cardPromises = cards.map((card) =>
                fetch(`http://localhost:8080/api/games/${gameId}/cards`, {
                    method: 'POST',
                    body: JSON.stringify({
                        description: card.description,
                        points: card.points,
                        typeId: card.typeId,
                        roleIds: card.roleIds
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token.accessToken}`
                    },

                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(`Не можу створити картку ${card.title}`);
                    }
                })
            );
            await Promise.all(cardPromises);
            setGameData({...gameData, cards});
            setStep(5);
        } catch (error) {
            setErrorMessage(error.message);
            console.log(errorMessage);
        }
    };

    const renderForm = () => {
        switch (step) {
            case 1:
                return <GameBaseInfoForm onSubmit={handleBaseInfoSubmit}/>;
            case 2:
                return <div>
                            <h2>Ігрові категорії</h2>
                            <GameCardCategoriesForm key="cardCategories" onSubmit={handleCardCategoriesSubmit}/>
                        </div>;
            case 3:
                return <div>
                        <h2>Ролі</h2>
                        <GameRolesForm onSubmit={handleRolesSubmit}/>
                    </div>;
            case 4:
                return <div>
                            <h2>Завдання</h2>
                            <CardsForm onSubmit={handleCardsSubmit} gameId={gameId}/>
                        </div>;
            default:
                return <div className={"game-created"}>Гра успішно створена!</div>;
        }
    };

    if (!user) {
        return(
            <LoginPage />
        )
    }  else {
        return (
            <div>
                <div className={"new-game-container centered"}>
                    {renderForm()}
                </div>

            </div>
        );
    }
}
export default NewGame;
