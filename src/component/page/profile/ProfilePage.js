import "./Profile.css";
import React, {useContext} from "react";
import {UserContext} from "../../../context/UserContext";

const ProfilePage = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-card-header">
                    <h3>{user.username}</h3>
                </div>
                <div className="profile-card-body">
                    <div className="profile-info">
                        {user.firstName && user.lastName && (
                            <p className="full-name">{user.firstName} {user.lastName}</p>
                        )}
                        <p className="email">{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;