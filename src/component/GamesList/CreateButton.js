import React from 'react';

const CreateButton = ({ onSubmit}) => {

    const handleClick = () => {
        onSubmit()
    };

    return (
        <button className={"centered"}
            style={{
                width: '50px',
                height: '50px',
                borderRadius: '5px',
                backgroundColor: '#937DC2',
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
