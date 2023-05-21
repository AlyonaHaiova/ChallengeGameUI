import {useEffect, useState} from "react";
import './Game.css'
import axios from "axios";
import Card from "./Card";

const Game = ({id}) => {

    const [card, setCard] = useState({});
    const [moves, setMoves] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/games/${id}/cards/next`, {
            })
            .then((response) => {
                const updatedData = {
                    ...response.data,
                    gameId: id
                };
                setCard(updatedData);
            })
            .catch((error) => {
                console.log("Error retrieving card:", error);
            });
    }, [id]);

    const setPoints = () => {
        console.log(card)
        axios.post(`http://localhost:8080/api/games/${id}/roles/points`, {
            id: card.role.id,
            points: card.points
        })
            .then((response) => {
                console.log(response.status)
            })
            .catch((error) => {
                console.log("Error updating points:", error);
            });
    }

    const recordMove = (action) => {
        let newMove  = {
            description: card.description,
            role: card.role.title
        }

        if (action === 1) {
            newMove.status = "Виконано"
            newMove.points = card.points
            newMove.totalPoints = card.role.points + card.points
        } else if (action === 2) {
            newMove.status = "Замінено"
        } else if (action === 3) {
            newMove.status = "Не виконано"
        }
        setMoves([...moves, newMove])
    }

    const next = async () => {
        await setPoints()
        recordMove(1)
        axios.get(`http://localhost:8080/api/games/${id}/cards/next`, {
        })
            .then((response) => {
                const updatedData = {
                    ...response.data,
                    gameId: id
                };
                setCard(updatedData);
            })
            .catch((error) => {
                console.log("Error retrieving card:", error);
            });
    }

    const refresh = () => {
        recordMove(2)
        axios.get(`http://localhost:8080/api/games/${id}/cards/refresh`, {
        })
            .then((response) => {
                const updatedData = {
                    ...response.data,
                    gameId: id
                };
                setCard(updatedData);
            })
            .catch((error) => {
                console.log("Error retrieving card:", error);
            });
    }

    const penalty = () => {
        recordMove(3)
        axios.get(`http://localhost:8080/api/games/${id}/cards/penalty`, {
        })
            .then((response) => {
                const updatedData = {
                    ...response.data,
                    gameId: id
                };
                setCard(updatedData);
            })
            .catch((error) => {
                console.log("Error retrieving card:", error);
            });
    }

        return (
            <div>
                {Object.keys(card).length > 0 ?
                    <div>
                        <h2>Твій хід {card.role.title}</h2>

                        <Card card={card} next={next} refresh={refresh} penalty={penalty}/>

                        <table className={"centered moves"}>
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>Завдання</th>
                                <th>Роль</th>
                                <th>Статус</th>
                                <th>Результат</th>
                                <th>Бали</th>
                            </tr>
                            </thead>
                            <tbody>
                            {moves.map((move, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{move.description}</td>
                                    <td>{move.role}</td>
                                    <td>{move.status}</td>
                                    <td>{move.points}</td>
                                    <td>{move.totalPoints}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    : null}

            </div>
        );
}

export default Game;
