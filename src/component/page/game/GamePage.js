import { useParams } from "react-router-dom";
import Game from "./Game";

const GamePage = () => {
    const { id } = useParams();

    return <Game id={id} />;
};

export default GamePage;