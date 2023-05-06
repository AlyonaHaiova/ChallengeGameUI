import React, {useCallback, useContext, useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useAuth} from '../../../../hooks/useAuth';
import {redirect} from "react-router-dom";
import {pages} from "../../../../meta/page";
import {UserContext} from "../../../../context/UserContext";
import {type} from "@testing-library/user-event/dist/type";


export const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState({});

    const {setUser} = useContext(UserContext);
    const {user} = useContext(UserContext);



    const getUserInfo = async (email) => {
        return await axios.get(`http://localhost:8080/api/auth/info/${email}`)
            .then(response => response.data)
    }

    const logout = async () => {
        console.log(user)
        setUser(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/auth/login',
            {email, password}
        ).then(async function (response) {
            const token = response.data;
            if (token) {
                const userInfo = await getUserInfo(email).then(res => {
                    return res
                });
                await setUser({
                    fullName: `${userInfo.firstName} ${userInfo.lastName}`,
                    username: userInfo.nickname,
                    id: userInfo.id,
                    email: userInfo.email,
                    token: token
                })
                navigate("/profile");
        }}).catch(function (error) {
            // handle error
            console.log(error);
        });

    };

    return (
        <div>

        <h1>Sign in</h1>
        <form onSubmit={handleSubmit} action="#">
            <input type="email" value={email} placeholder={"Email"} onChange={e => setEmail(e.target.value)}/>
            <input type="password" value={password} placeholder={"Password"} onChange={e => setPassword(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>

            <button onClick={logout}>Logout</button>

        </div>
    );
};
