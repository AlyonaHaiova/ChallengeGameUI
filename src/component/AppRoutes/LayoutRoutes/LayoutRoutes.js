import { Route, Routes } from "react-router-dom";
import { pages } from "../../../meta/page";
import Navbar from "../../Navbar/Navbar";
import HomePage from "../../page/home/HomePage";
import LoginPage from "../../page/login/LoginPage";
import ProfilePage from "../../page/profile/ProfilePage";
import MyAccountPage from "../../page/myAccount/MyAccount";
import NewGame from "../../page/newGame/NewGame";
import HelpPage from "../../page/help/Help";
import GamePage from "../../page/game/GamePage";
import ContactUs from "../../ContactUs/ContactUs";

export const LayoutRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path={pages.home} element={<HomePage />} />
                <Route path={pages.login} element={<LoginPage />} />
                <Route path={pages.profile} element={<ProfilePage />} />
                <Route path={pages.myAccount} element={<MyAccountPage />} />
                <Route path={pages.newGame} element={<NewGame />} />
                <Route path={"/my-account/game/:id"} element={<GamePage />} />
                <Route path={pages.help} element={<HelpPage />} />
            </Routes>
            <ContactUs />
            <footer className={"fixed-footer"} />
        </>
    );
}

export default LayoutRoutes;
