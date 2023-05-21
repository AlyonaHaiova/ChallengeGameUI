import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";
import CreateButton from "./CreateButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const GameList = () => {

    const [games, setGames] = useState([]);
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
        axios.delete(`http://localhost:8080/api/games/${gameId}`)
            .then(response => {
                console.log(response.status);
                setGames(prevGames => prevGames.filter(game => game.id !== gameId));
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <CreateButton onSubmit={navigateToCreateGame} />

            <div className={"games-added-items centered"}>
                {games.map(game => (
                    <div className={"game-card"}>

                        <Link to={`/my-account/game/${game.id}`} >
                            <div className="game-card-bg"></div>
                            <h3 className={"card-title"}>{game.title}</h3>
                            <p className={"game-card-description"}>{game.description}</p>
                        </Link>
                        <button onClick={() => handleRemoveGame(game.id)} className={"remove-item-on-card"}>
                            <FontAwesomeIcon icon={faTrash} color={"black"}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameList;