import {useState} from "react";
import {LoginForm} from "../../Auth/Login/LoginForm/LoginForm";
import "./LoginPage.css";
import {RegistrationForm} from "../../Auth/Registration/RegistrationForm/RegistrationForm";

const LoginPage = () => {
    const [isRightSideActive, setIsRightSideActive] = useState(false);

    function SignInChange() {
        setIsRightSideActive(false);
    }

    function SignUpChange() {
        setIsRightSideActive(true);
    }

    return (
        <div className={isRightSideActive ? 'right-panel-active container' : 'container'} id="container">
            <div className="form-container sign-up-container">
                <RegistrationForm/>
            </div>
            <div className="form-container sign-in-container">
                <LoginForm/>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>Login and continue the game</p>
                        <button className="ghost" id="signIn" onClick={SignInChange}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp" onClick={SignUpChange}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
