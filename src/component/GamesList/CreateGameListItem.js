import React from 'react';
import { useHistory } from 'react-router-dom';

const CreateButton = ({ to }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(to);
    };

    return (
        <button
            style={{
                width: '50px',
                height: '50px',
                borderRadius: '5px',
                backgroundColor: '#007bff',
                color: 'white',
                fontSize: '32px',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                border: 'none',
                outline: 'none',
            }}
            onClick={handleClick}
        >
            +
        </button>
    );
};

export default CreateButton;
