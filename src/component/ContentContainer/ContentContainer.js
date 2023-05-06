import "./ContentContainer.css";

export const ContentContainer = ({children}) => {
    return (
        <div className="ContentContainer full-height">
            {children}
        </div>
    );
}

