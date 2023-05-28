import {useEffect, useState} from "react";
import './Game.css'
import axios from "axios";
import Card from "./Card";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";
import * as earth from "../../asset/image/Earth.jpg";
import * as moon from "../../asset/image/Moon.jpg";
import * as mars from "../../asset/image/Mars.jpg";
import * as saturn from "../../asset/image/Saturn.jpg";
import Rocket from "./Rocket"
import {PlayersProgress, TeamProgress} from "./PlayersProgress";
import Winner from "./Winner";

const Game = ({id}) => {

    const { user } = useContext(UserContext);

    const [card, setCard] = useState({});
    const [game, setGame] = useState({});
    const [moves, setMoves] = useState([]);
    const [players, setPlayers] = useState([]);
    const [winners, setWinners] = useState([]);
    const [teamRocketPosition, setTeamRocketPosition] = useState({});
    const [showWinnerPopup, setShowWinnerPopup] = useState(false);
    const [isTeam, setIsTeam] = useState(false);
    const [previousPlayer,  setPreviousPlayer] = useState({});

    const planets = [
        {
            title: 'Земля',
            pointsToGet: 0,
            src: earth.default
        },
        {
            title: 'Місяць',
            pointsToGet: game.goal/4,
            src: moon.default
        },
        {
            title: 'Марс',
            pointsToGet: 2*(game.goal/5),
            src: mars.default
        },
        {
            title: 'Сатурн',
            pointsToGet: game.goal,
            src: saturn.default
        },
    ]

    const levels = [
        {
            title: 'Астронавт Початківець',
            pointsToGet: 0,
            stars: 1
        },
        {
            title: 'Дослідник',
            pointsToGet: game.goal / 4,
            stars: 2
        },
        {
            title: 'Помічник Капітана',
            pointsToGet: game.goal / 2,
            stars: 3
        },
        {
            title: 'Капітан',
            pointsToGet: game.goal / 100 * 75,
            stars: 4
        },
        {
            title: 'Легенда',
            pointsToGet: game.goal / 100 * 90,
            stars: 5
        }
    ]

    useEffect(() => {
            axios.get(`http://localhost:8080/api/games/${id}/cards/next`, {})
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
        axios
            .get(`http://localhost:8080/api/games/game/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token.accessToken}`,
                },
            })
            .then((response) => {
                setGame(response.data);
                setIsTeam(response.data.isTeam);
            })
            .catch((error) => {
                console.log("Error retrieving game:", error);
            });

            axios
                .get(`http://localhost:8080/api/games/${id}/roles`, {
                    headers: {
                        Authorization: `Bearer ${user.token.accessToken}`,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    let totalPoints = 0
                    const updatedPlayers = response.data.map((p) => {
                        totalPoints += p.points;
                        let lastPlanet = planets[0];
                        let lastLevel = levels[0];

                        for (const level of levels) {
                            if (level.pointsToGet <= p.points) {
                                lastLevel = level;
                            } else {
                                break;
                            }
                        }

                        for (const planet of planets) {
                            if (planet.pointsToGet <= p.points) {
                                lastPlanet = planet;
                            } else {
                                break;
                            }
                        }
                        return {
                            ...p,
                            level: lastLevel,
                            planet: lastPlanet,
                            progress: p.points / game.goal * 100
                        };
                    });

                    setPlayers(updatedPlayers);
                    let progress = totalPoints / game.goal * 100
                    let teamPlanet = planets[0];

                    for (const planet of planets) {
                        if (planet.pointsToGet <= totalPoints) {
                            teamPlanet = planet;
                        } else {
                            break;
                        }
                    }
                    setTeamRocketPosition({progress: progress, points: totalPoints, planet: teamPlanet});
                })
                .catch((error) => {
                    console.log("Error retrieving roles:", error);
                });
    }, [id, user.token.accessToken]);

    const setPoints = () => {
        axios.post(`http://localhost:8080/api/games/${id}/roles/points`, {
            id: card.role.id,
            points: card.points
        }).catch((error) => {
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

    const finishMove = async (status) => {
        let player = players.find(p => p.id === card.role.id);

        if (status === 1) {
            player.points = player.points + card.points;
            player.progress = player.points / game.goal * 100;
        }

        let teamPoints = 0;
        let newPos = {
            points: teamPoints,
            progress: teamPoints / game.goal * 100,
            planet: planets[0]
        }

        // Calculating progress
        if (isTeam) {
            teamPoints = players.reduce((sum, player) => sum + player.points, 0);
            newPos.points = teamPoints;
            newPos.progress = teamPoints / game.goal * 100;
        }

        // Levels
        for (let i = levels.length - 1; i >= 1; i--) {
            if (levels[i].pointsToGet <= player.points) {
                player.level = levels[i]
                break;
            }
        }

        // Planets
        if (isTeam) {
            for (let i = planets.length - 1; i >= 1; i--) {
                if (planets[i].pointsToGet <= teamPoints) {
                    newPos.planet = planets[i];
                    break;
                }
            }
        } else {
            for (let i = planets.length - 1; i >= 1; i--) {
                if (planets[i].pointsToGet <= player.points) {
                    player.planet = planets[i]
                    break;
                }
            }
        }

        // Set winners
        if (isTeam) {
            if (teamPoints >= game.goal) {
                await setShowWinnerPopup(true);
                setWinners((prevWinners) => [...prevWinners, { player: "Team", place: 1 }]);
            }
        } else {
            if (player.points >= game.goal) {
                player.isWinner = true;
                await setShowWinnerPopup(true);
                setWinners((prevWinners) => [...prevWinners, { player: player.title, place: prevWinners.length + 1 }]);
            }
        }

        setTeamRocketPosition(newPos);

        // Update players
        setPlayers(prevPlayers => {
            return prevPlayers.map(p => {
                if (p.id === player.id) {
                    return {
                        ...p,
                        level: player.level,
                        planet: player.planet,
                        points: player.points,
                        progress: player.progress,
                        isWinner: player.isWinner,
                    };
                }
                return p;
            });
        });
    }

    const next = async () => {
        await setPoints();
        await setPreviousPlayer(players.find(p => p.id === card.role.id));
        await finishMove(1);

        await recordMove(1);
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

   const penalty = async () => {
       await setPreviousPlayer(players.find(p => p.id === card.role.id));
        await finishMove(2);

        await recordMove(3);
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

    if (Object.keys(teamRocketPosition).length === 0) {
        teamRocketPosition.progress = 0;
        teamRocketPosition.planet = planets[0]
    }

        return (
            <div>
                {showWinnerPopup && (
                    <Winner
                        player={previousPlayer.title}
                        moves={moves}
                        teamMode={isTeam}
                        winners = {winners}
                        onClose={() => setShowWinnerPopup(false)}
                    />
                )}

            <div className="game-container">
                <div className={"space"}>
                    <div className="rocket-container">
                        {isTeam ? (
                            <div className={`rocket-item team`}>
                                <Rocket progress={teamRocketPosition.progress} name={"Екіпаж"} />
                            </div>
                        ) : (
                            players.map((player) => (
                                <div className="rocket-item" key={player.id}>
                                      <Rocket progress={player.progress} name={player.title}/>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="planet-container">
                        {planets.map((planet, index) => (
                            <div className="planet-item" key={index}>
                                <img src={planet.src} alt={planet.title} />
                            </div>
                        ))}
                    </div>
                </div>
                {Object.keys(card).length > 0 ?
                    <div>
                        <h2>Твій хід {card.role.title}</h2>

                        <Card card={card} next={next} refresh={refresh} penalty={penalty}/>
                    </div>
                : null}

                {isTeam ?

                <TeamProgress team={teamRocketPosition} />
                    :
                <PlayersProgress players={players} />
                }
            </div>
          </div>
        );



}
export default Game;
