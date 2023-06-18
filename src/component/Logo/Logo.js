import { Link } from "react-router-dom";
import { app } from "../../meta/app";
import { pages } from "../../meta/page";
import "./Logo.css";
import * as logo from "../../asset/image/logo.png";
import {useMediaQuery} from "react-responsive";

export const Logo = () => {

    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <Link to={pages.home} className="Logo s-hflex">
            <img src={logo.default} alt="logo" />
            {!isMobile && <span className="s-vflex-center app-name">
                {app.name}
            </span>}
        </Link>
    );
};

export default Logo;
