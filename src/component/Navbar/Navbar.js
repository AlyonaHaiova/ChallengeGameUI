import "./Navbar.css";
import {ContentContainer} from "../ContentContainer/ContentContainer";
import {Logo} from "../Logo/Logo";
import {NavbarActions} from "./NavbarActions";

export const Navbar = () => {
    return (
        <div className="Navbar full-width">
            <ContentContainer>
                <div className="s-hflex full-height">
                    <Logo />
                    <div className="equal-flex" />
                    <NavbarActions />
                </div>
            </ContentContainer>
        </div>
    );
}

export default Navbar;
