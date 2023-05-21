import {UserContext} from "../../context/UserContext";
import {useContext} from "react";
import { useNavigate } from "react-router-dom";
import {pages} from "../../meta/page";

const LogoutButton = () => {

    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);

    const logout = () => {
        setUser(null)
        navigate(pages.home)
    }
    return <button onClick={logout}>Вихід</button>;
};

export default LogoutButton;