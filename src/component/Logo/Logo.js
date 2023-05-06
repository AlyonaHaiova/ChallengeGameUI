import { Link } from "react-router-dom";
import { app } from "../../meta/app";
import { pages } from "../../meta/page";
import "./Logo.css";
import * as logo from "../../asset/image/logo.png";

export const Logo = () => {
    return (
        <Link to={pages.home} className="Logo s-hflex full-height">
            <img src={logo.default} alt="logo" />
            <span className="s-vflex-center app-name">
                {app.name}
            </span>
        </Link>
    );
};

export default Logo;
