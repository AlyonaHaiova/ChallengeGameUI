import './Game.css'
import './Popup.css'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const Statistic = ({ moves, winners}) => {
    if (!winners) {
        return <div>Загрузка...</div>;
    }
    return (
        <div>
        <h2>Переможці</h2>
        <table className="centered moves">
            <thead>
            <tr>
                <th>Місце</th>
                <th>Гравець</th>
            </tr>
            </thead>
            <tbody>
            {winners.map((winner, index) => (
                <tr key={index}>
                    <td>{winner.place}</td>
                    <td>{winner.player}</td>
                </tr>
            ))}
            </tbody>
        </table>
    <h2>Ходи</h2>
        <table className="centered moves">
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
    );
};

const Winner = ({ player, moves, winners, teamMode, onClose }) => {
    const [showStatistic, setShowStatistic] = useState(false);

    if (!winners) {
        return <div>Загрузка...</div>;
    }

    const generateFileName = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const timestamp = date.getTime();
        return `game_${year}-${month}-${day}_${timestamp}.csv`;
    };

    const handleShowStatistic = () => {
        setShowStatistic(true);
    };

    const handleDownloadStatistic = () => {
        let winnersSection = '';
        if (!teamMode) {
            const winnersList = winners.map((winner, index) => `${index + 1} - ${winner.player}`).join('\n');
            winnersSection = `Переможці\n${'_'.repeat(30)}\n${winnersList}\n\n`;
        }

        const movesSection = moves.map((move, index) => {
            return `\n${'_'.repeat(32)}\nЗавдання: ${move.description}\nРоль: ${move.role}\nСтатус: ${move.status}\nБали: ${move.points}\nБали всього: ${move.totalPoints}`;
        }).join('\n\n');

        const textReport = `${winnersSection}Ходи\n${'_'.repeat(32)}\n${movesSection}`;

        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([textReport], { type: 'text/plain;charset=utf-8;' }));
        downloadLink.download = generateFileName().replace('.csv', '.txt');
        downloadLink.click();
    };

    return (
        <div className="popup">
            <div className="popup-content">
                {teamMode ? (
                        <div>
                            <h2>Вітаю, командо</h2>
                            <h2>Ви досягли своєї мети! Вашу подорож завершено!</h2>
                        </div>

                ) : (
                    <div>
                        <h2>Вітаю, {player}</h2>
                        <h2>Ти досяг своєї мети! Твою подорож завершено!</h2>
                    </div>
                )}
                <div className={"button-container"}>
                <button className="popup-button" onClick={onClose}>
                    Продовжити
                </button>

                <Link to="/my-account" className="popup-button">
                    Завершити гру
                </Link>
                <button className="popup-button" onClick={handleDownloadStatistic}>
                    Завантажити результати
                </button>
                <button className="popup-button" onClick={handleShowStatistic}>
                    Показати результати
                </button>
                </div>

                {showStatistic && <Statistic moves={moves} winners={winners} />}
            </div>
        </div>
    );
};

export default Winner;