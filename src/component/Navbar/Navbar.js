import "./Navbar.css";
import {Logo} from "../Logo/Logo";
import {NavbarActions} from "./NavbarActions";

export const Navbar = () => {
    return (
        <div className="Navbar full-width">

                <div className="s-hflex full-height">
                    <Logo />
                    <div className="equal-flex" />
                    <NavbarActions />
                </div>
        </div>
    );
}

export default Navbar;
