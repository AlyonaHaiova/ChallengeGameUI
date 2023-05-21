import GameList from "../../GamesList/GameList";
import {useContext} from "react";
import {UserContext} from "../../../context/UserContext";
import {Link} from "react-router-dom";
import {pages} from "../../../meta/page";

const MyAccountPage = () => {

    const { user } = useContext(UserContext);

    if (user.id <= 0) {
        return(
            <Link to={pages.login} className="link">
                Login
            </Link>
        )
    } else {
        return (
            <div>
                <div className={"my-games-container"}>
                    <h2>Мої ігри</h2>
                    <GameList />
                </div>
            </div>
        );
    }
}

export default MyAccountPage;
