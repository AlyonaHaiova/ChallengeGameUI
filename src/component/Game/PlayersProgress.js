import './Game.css'
import React from "react";

const Stars = ({ stars }) => {
    const starStyle = {
        width: "16px",
        height: "16px",
        marginRight: "2px",
        display: "inline-block",
    };

    return (
        <div>
            {[...Array(stars)].map((_, index) => (
                <span key={index} className="star" style={starStyle}>
          <svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
                fillRule="nonzero"
            />
          </svg>
        </span>
            ))}
        </div>
    );
};

const ProgressBar = ({ progress }) => {
    const progressStyle = {
        backgroundColor: 'green',
        height: '100%',
        width: `${progress}%`,
        maxWidth: '100%',
        borderRadius: '10px',
        position: 'absolute',
        top: 0,
        left: 0,
    };

    return (
        <div className={"progress-bar"}>
          <div style={progressStyle}></div>
        </div>
    );
};

const PlayersProgress = ({ players }) => {
    return (
        <table className="centered progress">
            <thead>
            <tr>
                <th>Астронавт</th>
                <th>Остання планета</th>
                <th>Рівень</th>
                <th>Місія завершена</th>
            </tr>
            </thead>
            <tbody>
            {players.map((player, index) => (
                <tr key={index}>
                    <td>{player?.title}</td>
                    <td>{player?.planet?.title}</td>
                    <td><Stars stars={player?.level?.stars} /></td>
                    <td><ProgressBar progress={player?.progress} /></td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

const TeamProgress = ({team}) => {
    return (
    <div className={"centered progress"}>
        <h2>Планета - {team.planet.title}</h2>
        <div><ProgressBar progress={team.progress}/></div>
    </div>
    );
}

export {
    PlayersProgress,
    TeamProgress
};
