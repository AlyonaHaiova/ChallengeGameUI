import { Link } from "react-router-dom";
import { pages } from "../../meta/page";
import "./Navbar.css";
import {useContext} from "react";
import Logout from "../Auth/Logout";
import {UserContext} from "../../context/UserContext";

export const NavbarActions = () => {

    const {user} = useContext(UserContext);

    return (
        <div className="NavbarActions">
            <div className="s-hflex">
                <div className="text s-hflex s-vflex-center">
                    {user ? (
                        <div className="text s-hflex">
                            <Link to={pages.myAccount} className={"navbar-link s-vflex-center"}>Мої ігри</Link>
                            <Link to={pages.profile} className={"navbar-link s-vflex-center"}>Профіль</Link>
                            <div className={"navbar-link"} id={"navbar-logout"}><Logout /></div>
                        </div>
                    ) : (
                        <Link to={pages.login} className={"navbar-link s-vflex-center"}>Вхід</Link>
                    )}
                </div>
                <div className="s-vflex-center">
                    <Link to={pages.help} className={"navbar-link s-vflex-center"} id={"help-page-link"}>
                        <span className="material-icons s-vflex-center">?</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NavbarActions;
