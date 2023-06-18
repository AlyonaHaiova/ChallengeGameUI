import React, { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import CreateGameListItem from "../CreateButton";

function GameRolesForm({ onSubmit }) {

    const [newRoles, setNewRoles] = useState([{ title: '' }]);
    const [titleErrors, setTitleErrors] = useState([]);

    const handleAddRole = () => {
        setNewRoles([...newRoles, { title: '' }]);
        setTitleErrors([...titleErrors, false]);
    };

    const handleRemoveRole = (index) => {
        const updatedRoles = [...newRoles];
        updatedRoles.splice(index, 1);
        setNewRoles(updatedRoles);

        const newTitleErrors = [...titleErrors];
        newTitleErrors.splice(index, 1);
        setTitleErrors(newTitleErrors);
    };

    const handleRoleChange = (index, value) => {
        const updatedRoles = [...newRoles];
        updatedRoles[index].title = value;
        setNewRoles(updatedRoles);

        const newTitleErrors = [...titleErrors];
        newTitleErrors[index] = value.length < 3 || value.length > 20;
        setTitleErrors(newTitleErrors);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isFormValid = newRoles.every((role) => {
            return role.title.length >= 3 && role.title.length <= 20;
        });
        if (isFormValid) {
            onSubmit(newRoles);
            setNewRoles([]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={"w-50 centered roles-form"}>
            {newRoles.map((role, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={role.title}
                        onChange={(event) => handleRoleChange(index, event.target.value)}
                        className={"centered role-title"}
                    />

                    {titleErrors[index] && (
                        <p className="error-msg">Роль має бути від 3 до 20 символів</p>
                    )}

                </div>
            ))}

            <CreateGameListItem onSubmit={handleAddRole}/>

            {newRoles.length > 1 ? (
                <>
                    <h2 className={"added-items-heading"}>Додані ролі</h2>
                    <ul className="roles-added-items">
                        {newRoles.map((role, index) => (
                            role.title.length > 0 ? (
                                <li key={index} className={"role-card"}>
                                    {role.title}
                                    <button type="button" onClick={() => handleRemoveRole(index)} className={"remove-item-on-card"}>
                                        <FontAwesomeIcon icon={faTrash} color={"black"}/>
                                    </button>
                                </li>
                            ) : null
                        ))}
                    </ul>
                </>
            ) : null}

            <button type="submit">Продовжити</button>
        </form>
    );
}

export default GameRolesForm;