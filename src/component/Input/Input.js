import './Input.css';

export const Input = ({
    name = "",
    placeholder = "",
    className = "",
    ...rest
}) => {
    return (
        <div>
            <input className={`input-text ${className}`} id={name} placeholder={placeholder} {...rest}></input>
        </div>
    );
}

export default Input;
