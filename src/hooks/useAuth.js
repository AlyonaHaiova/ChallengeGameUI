/*
import { useEffect } from 'react';
import { useUser } from './useUser';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
    const {user, addUser, removeUser} = useUser();
    const {getItem} = useLocalStorage();

    useEffect(() => {
        const user = getItem('user');
        if (user) {
            addUser(JSON.parse(user));
        }
    });

    const login = (user) => {
        addUser(user);
    };

    const logout = () => {
        removeUser();
    };

    const isAuthenticated = () => {
        const user = localStorage.getItem('user');
        if (!user) {
            return {}
        }
        return JSON.parse(user);
    };

    return {user, login, logout, isAuthenticated};
};
*/
