import { BrowserRouter } from 'react-router-dom';
import {AppRoutes} from './component/AppRoutes/AppRoutes';
import './App.css';
import {AuthContext} from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import {UserContext} from "./context/UserContext";
import {useState} from "react";

function App() {
    //const { user, login, logout} = useAuth();
    //const [state, setState] = useState({ user: {} });
    /*function setUser() {
    }*/

    return (
     // <AuthContext.Provider value={{user}}>

        <div className="App">
         <AppRoutes />
        </div>

     // </AuthContext.Provider>

  );
}

export default App;
/*
<div className="App">
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
</div>*/
