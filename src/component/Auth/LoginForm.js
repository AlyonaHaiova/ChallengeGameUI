import React, {useContext, useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {pages} from "../../meta/page";
import {UserContext} from "../../context/UserContext";

export const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {setUser} = useContext(UserContext);

    const getUserInfo = async (email) => {
        return await axios.get(`http://13.51.85.16:8080/api/auth/info/${email}`)
            .then(response => response.data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post('http://13.51.85.16:8080/api/auth/login',
            {email, password}
        ).then(async function (response) {
            const token = response.data;
            if (token) {
                const userInfo = await getUserInfo(email).then(res => {
                    return res
                });
                await setUser({
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    username: userInfo.nickname,
                    id: userInfo.id,
                    email: userInfo.email,
                    token: token
                })
                navigate(pages.myAccount);
        }}).catch(function (error) {
            setError('Логін чи пароль не є правильними. Будь ласка, спробуйте ще раз');
            console.log(error);
        });
    };

    return (
        <div>
            <h1>Увійти до акаунту</h1>

            {error && <p className="error-msg">{error}</p>}

            <form className={"auth-form"} onSubmit={handleSubmit} action="src/component/Auth/LoginForm#">
                <input type="email" value={email} placeholder={"Електронна пошта"} onChange={e => setEmail(e.target.value)}/>
                <input type="password" value={password} placeholder={"Пароль"} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Увійти</button>
            </form>
        </div>
    );
};
