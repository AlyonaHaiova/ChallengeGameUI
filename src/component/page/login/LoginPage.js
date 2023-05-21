import React, {useState} from "react";
import {LoginForm} from "../../Auth/LoginForm";
import "./LoginPage.css";
import {RegistrationForm} from "../../Auth/RegistrationForm";

const LoginPage = () => {
    const [isRightSideActive, setIsRightSideActive] = useState(false);

    function SignInChange() {
        setIsRightSideActive(false);
    }

    function SignUpChange() {
        setIsRightSideActive(true);
    }

    return (
        <div>
        <div className={isRightSideActive ? 'right-panel-active container centered' : 'container centered'} id="container">
            <div className="form-container sign-up-container">
                <RegistrationForm />
            </div>
            <div className="form-container sign-in-container">
                <LoginForm />
                <p>alenag2602@gmail.com</p>
                <p>QwErTy1@3$5</p>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Вітаю знову!</h1>
                        <p>Вже маєш акаунт?</p>
                        <button className="ghost" id="signIn" onClick={SignInChange}>Увійти</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Привіт, друже!</h1>
                        <p>Ще не маєш акаунту?</p>
                        <button className="ghost" id="signUp" onClick={SignUpChange}>Зареєструватись</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default LoginPage;
