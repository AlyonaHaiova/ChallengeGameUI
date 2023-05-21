import {useState} from "react";
import {UserContext} from "./context/UserContext";
import App from "./App";

export default function AppWrapper() {

    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            <App />
        </UserContext.Provider>
    );
}