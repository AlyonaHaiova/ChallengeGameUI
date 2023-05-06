
import "./Profile.css";
import Navbar from "../../Navbar/Navbar";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useUser} from "../../../hooks/useUser";
import {useAuth} from "../../../hooks/useAuth";
import {UserContext} from "../../../context/UserContext";

const ProfilePage = () => {
    const { user } = useContext(UserContext);

    console.log(user)
    const editUser = () => {}

    const deleteUser = () => {}

    return (
        <div>

        <div className="card p-3 py-4">
            <div className="text-center">


                    <h3 className="mt-2">{user.username}</h3>
                    <span className="mt-1 clearfix">{user.fullName}</span>
                    <span className="mt-1 clearfix">{user.email}</span>
            </div>
        </div>
        </div>
    );
}


export default ProfilePage;