import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateGameListItem from "./CreateGameListItem";

function GameList({ userId }) {
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get(`/api/games/${userId}`)
            .then(response => setGames(response.data))
            .catch(error => console.log(error));
    }, [userId]);

    return (
        <div>
            <div>
                {games.map(game => (
                    <Link key={game.id} to={`/games/${game.id}`}>
                        <h3>{game.title}</h3>
                        <p>{game.description}</p>
                    </Link>
                ))}
            </div>
            <CreateGameListItem to={"/games/new"} />
        </div>

    );
}

export default GameList;