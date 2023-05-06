import { Route, Routes } from "react-router-dom";
import { pages } from "../../../meta/page";
import Navbar from "../../Navbar/Navbar";
import HomePage from "../../page/home";
import LoginPage from "../../page/login";
import ProfilePage from "../../page/profile/ProfilePage";

export const LayoutRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path={pages.home} element={<HomePage />} />
                <Route path={pages.login} element={<LoginPage />} />
                <Route path={pages.profile} element={<ProfilePage />} />
            </Routes>
        </>
    );
}

export default LayoutRoutes;
