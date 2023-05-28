import GameList from "../../GamesList/GameList";
import {useContext} from "react";
import {UserContext} from "../../../context/UserContext";
import LoginPage from "../login/LoginPage";

const MyAccountPage = () => {

    const { user } = useContext(UserContext);

    if (!user) {
        return(
            <LoginPage />
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
