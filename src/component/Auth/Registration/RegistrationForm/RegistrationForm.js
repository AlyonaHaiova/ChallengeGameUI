import React, {useState} from 'react';
import axios from 'axios';

export const RegistrationForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/auth/register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            nickname: username,
            password: password
        })
            .then(res => {
                if(res) {
                    alert("You are successfully registered. Welcome to Challenger!")
                }
                console.log(res);
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }

    return (
        <div>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit} action="#">
                <input type="text" name="firstName" value={firstName} placeholder={"First Name"} onChange={e => setFirstName(e.target.value)} />
                <input type="text" name="lastName" value={lastName} placeholder={"Last Name"} onChange={e => setLastName(e.target.value)} />
                <input type="text" name="username" value={username} placeholder={"Username"} onChange={e => setUsername(e.target.value)} />
                <input type="email" name="email" value={email} placeholder={"Email"} onChange={e => setEmail(e.target.value)}/>
                <input type="password" name="password" value={password} placeholder={"Password"} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
