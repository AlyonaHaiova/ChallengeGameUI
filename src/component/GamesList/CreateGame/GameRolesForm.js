import React, { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import CreateGameListItem from "../CreateButton";

const MIN_TITLE_LENGTH = 3;
const MAX_TITLE_LENGTH = 20;

function GameRolesForm({ onSubmit }) {
    const [newRoles, setNewRoles] = useState([{ title: '' }]);

    const handleAddRole = () => {
        setNewRoles([...newRoles, { title: '' }]);
    };

    const handleRemoveRole = (index) => {
        const updatedRoles = [...newRoles];
        updatedRoles.splice(index, 1);
        setNewRoles(updatedRoles);
    };

    const handleRoleChange = (index, value) => {
        const updatedRoles = [...newRoles];
        updatedRoles[index].title = value;
        setNewRoles(updatedRoles);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isFormValid = newRoles.every((role) => {
            return role.title.length >= MIN_TITLE_LENGTH && role.title.length <= MAX_TITLE_LENGTH;
        });

        if (isFormValid) {

            onSubmit(newRoles);
        } else {
            alert(`Please make sure all category titles are between ${MIN_TITLE_LENGTH} and ${MAX_TITLE_LENGTH} characters long.`);
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
                        required
                        className={"centered role-title"}
                    />

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