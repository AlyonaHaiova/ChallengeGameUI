import {useState} from "react";
import {UserContext} from "./context/UserContext";
import App from "./App";

export default function AppWrapper() {

    const [user, setUser] = useState(null);

/*    const dispatchUserEvent = (actionType, new_user) => {
        switch (actionType) {
            case 'ADD_USER':
                setUser(new_user);
                return;
            case 'REMOVE_USER':
                setUser(null);
                return;
            default:
                return;
        }
    };*/


    return (
        <UserContext.Provider value={{ user, setUser }}>
            <App />
        </UserContext.Provider>
    );
}