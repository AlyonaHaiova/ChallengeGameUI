import { Link } from "react-router-dom";
import { pages } from "../../meta/page";
import LanguageDropdown from "../LanguageDropdown";
import ShadowText from "../ShadowText/ShadowText";
import "./NavbarActions.css";

export const NavbarActions = () => {
    return (
        <div className="NavbarActions s-vflex-center">
            <div className="s-hflex">
                <ShadowText className="text s-vflex-center">
                    <Link to={pages.login} className="link">
                        Login
                    </Link>
                </ShadowText>
                {/*<ShadowText className="text s-vflex-center">
                    <Link to={pages.registration} className="link">
                        Register
                    </Link>
                </ShadowText>*/}
                <ShadowText className="s-vflex-center">
                    <Link to={pages.help} className="link">
                        <span className="material-icons s-vflex-center">?</span>    
                    </Link>
                </ShadowText>
                <LanguageDropdown />
            </div>
        </div>
    );
}

export default NavbarActions;
