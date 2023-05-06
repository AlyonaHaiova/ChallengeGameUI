import {createContext, useEffect, useState} from 'react';
import {useAuth} from "../hooks/useAuth";

/*export const AuthContext = React.createContext();*/
export const AuthContext = createContext({user: {}});
/*const AuthProvider = () => {

    const [user, setUser] = useState(null)

        return (
            <AuthContext.Provider
                value={{user: this.user}}
            >
                {this.props.children}
            </AuthContext.Provider>
        )

}
const AuthConsumer = AuthContext.Consumer
export { AuthProvider, AuthConsumer }*/
/*export const AuthContext = createContext({
    user: null,
    setUser : () => {},

});*/
/*export const AuthContext = createContext({
    user: null
});*/
/*
export const AuthProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState({});

    const {isAuthenticated} = useAuth()

    useEffect(() => {
        const checkLoggedIn = async () => {
            let cuser = isAuthenticated();
            if (cuser === null) {
                localStorage.setItem('user', '');
                cuser = '';
            }

            setCurrentUser(cuser);
        };

        checkLoggedIn()

    }, []);


    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    );
};
*/
