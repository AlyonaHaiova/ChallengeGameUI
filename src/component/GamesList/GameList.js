import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";
import CreateButton from "./CreateButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faEraser, faToggleOn} from "@fortawesome/free-solid-svg-icons";

import "./../Game/Game.css";

const GameList = () => {

    const [games, setGames] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState("");
    const [selectedGameId, setSelectedGameId] = useState("");
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/games/${user.id}`, {
            headers: {
                Authorization: `Bearer ${user.token.accessToken}`
            }
        })
            .then(response => setGames(response.data))
            .catch(error => console.log(error));
    }, [user.id, user.token.accessToken]);

    const navigateToCreateGame = () => {
        navigate("/my-account/new-game")
    }

    const handleRemoveGame = (gameId) => {
        setSelectedGameId(gameId);
        setConfirmationAction("видалити");
        setShowConfirmation(true);
    }

    const handleReset = (gameId) => {
        setSelectedGameId(gameId);
        setConfirmationAction("стерти");
        setShowConfirmation(true);
    };

    const handleChangeMode = (gameId) => {
        setSelectedGameId(gameId);
        setConfirmationAction("перемкнути на інший режим");
        setShowConfirmation(true);
    };

    const confirmAction = () => {
        switch (confirmationAction) {
            case "видалити":
                removeGame(selectedGameId);
                break;
            case "стерти":
                resetGame(selectedGameId);
                break;
            case "перемкнути на інший режим":
                changeGameMode(selectedGameId);
                break;
            default:
                break;
        }
        setShowConfirmation(false);
    }

    const removeGame = (gameId) => {
        axios.delete(`http://localhost:8080/api/games/${gameId}`)
            .then(response => {
                setGames(prevGames => prevGames.filter(game => game.id !== gameId));
            })
            .catch(error => console.log(error));
    }

    const resetGame = (gameId) => {
        axios.get(`http://localhost:8080/api/games/game/${gameId}/reset`)
            .catch(error => console.log(error));
    };

    const changeGameMode = (gameId) => {
        axios.get(`http://localhost:8080/api/games/game/${gameId}/mode`)
            .catch(error => console.log(error));
    };

    return (
        <div>
            <CreateButton onSubmit={navigateToCreateGame} />

            <div className={"games-added-items centered"}>
                {games.map(game => (
                    <div className={"game-card"}>
                        <Link to={`/my-account/game/${game.id}`} >
                            <div className={game.isTeam ? "game-card-bg" : "game-card-bg green"}></div>
                            <h3 className={"card-title"}>{game.title}</h3>
                            <p className={"game-card-description"}>{game.description}</p>
                        </Link>
                        <div className={"game-buttons"}>
                        <button onClick={() => handleRemoveGame(game.id)} className={"remove-item-on-card"}>
                            <FontAwesomeIcon icon={faTrash} color={"black"}/>
                        </button>
                        <button onClick={() => handleReset(game.id)} className={"settings-on-card"}>
                            <FontAwesomeIcon icon={faEraser} color={"black"}/>
                        </button>
                        <button onClick={() => handleChangeMode(game.id)} className={"settings-on-card"}>
                            <FontAwesomeIcon icon={faToggleOn} color={"black"}/>
                        </button>
                        </div>
                    </div>
                ))}
            </div>

            {showConfirmation && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Увага!</h2>
                        <p>Ви впевнені що хочете {confirmationAction} цю гру?</p>
                        <div className="popup-buttons">
                            <button onClick={confirmAction} className="popup-confirm">Так</button>
                            <button onClick={() => setShowConfirmation(false)} className="popup-cancel">Ні</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GameList;