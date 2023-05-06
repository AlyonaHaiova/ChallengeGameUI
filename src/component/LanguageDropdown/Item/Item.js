import "./Item.css";

const Item = ({label, imageSource}) => {
    return (
        <div className="Item s-hflex">
            <img src={imageSource} alt={label} />
            <span className="label s-vflex-center">{label}</span>
        </div>
    );
}

export default Item;
