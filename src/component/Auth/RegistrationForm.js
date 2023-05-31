import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {pages} from "../../meta/page";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";

export const RegistrationForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const {setUser} = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://13.51.85.16:8080/api/auth/register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            nickname: username,
            password: password
        }).then(res => {
            if(res) {
                alert("Акаунт успішно зареєстровано. Вітаю у Challenger!")
                setUser(res.data);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div>
            <h1>Створити акаунт</h1>
            <form className={"auth-form"} onSubmit={handleSubmit} action="src/component/Auth/RegistrationForm#">
                <input type="text" name="firstName" value={firstName} placeholder={"Ім'я"} onChange={e => setFirstName(e.target.value)} />
                <input type="text" name="lastName" value={lastName} placeholder={"Прізвище"} onChange={e => setLastName(e.target.value)} />
                <input type="text" name="username" value={username} placeholder={"Юзернейм"} onChange={e => setUsername(e.target.value)} />
                <input type="email" name="email" value={email} placeholder={"Електронна пошта"} onChange={e => setEmail(e.target.value)}/>
                <input type="password" name="password" value={password} placeholder={"Пароль"} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Створити</button>
            </form>
        </div>
    );
};
