import './Card.css'
import { FaCheck, FaSync, FaTimes } from 'react-icons/fa';

const Card = ({card, next, refresh, penalty}) => {

    const style = {
        backgroundColor: card.type.color,
        backgroundImage: 'none',
        boxShadow: card.type.isPenalty ? '0 0 0 1rem red' : 'none'
    };

    const penaltyStyle = {
        boxShadow: card.type.isPenalty ? '0 0 0 1rem red' : 'none'
    }

    return (
    <div className={"card-wrapper"}>

        <div className="card">

            <div className={"card__side card__side--back"} style={penaltyStyle}>
                <div className={"card__cover"} style={style}>
                    <h4 className={"card__heading"}>
                        <span className={"card__heading-span"}>{card.type.title}</span>
                    </h4>
                </div>
                <div className={"card__details"}>
                    <p>{card.description}</p>

                    <p>{card.points} points</p>

                    <div className="buttons-row">
                        <button className="icon-button" onClick={next}>
                            <FaCheck className="icon" color={"green"} />
                        </button>
                        <button className="icon-button" onClick={refresh}>
                            <FaSync className="icon" color={"#3498DB"}/>
                        </button>
                        <button className="icon-button" onClick={penalty}>
                            <FaTimes className="icon" color={"#CB4335"}/>
                        </button>
                    </div>
                </div>
            </div>

            <div className={"card__side card__side--front"} style={style}>
                <div className={"card__theme"}>
                    <div className={"card__theme-box"}>
                        <p className={"card__title"}>{card.type.title}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
    );
};

export default Card;