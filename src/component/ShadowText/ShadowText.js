import "./ShadowText.css";

export const ShadowText = ({
    children,
    className = "",
    textColor = null,
    shadowColor = "rgba(0, 0, 0, 0.25)",
}) => {
    const styles = {
        color: textColor == null ? undefined : textColor,
        textShadow: "0 4px 1px " + shadowColor
    };

    return (
        <span className={`ShadowText ${className}`} style={styles}>
            {children}
        </span>
    );
}

export default ShadowText;
