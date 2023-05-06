import Dropdown from "react-dropdown";
import Item from "./Item/Item";
import "./LanguageDropdown.css";
import * as uaLabel from "./ua.png";
import * as enLabel from "./en.png";

const LanguageDropdown = () => {
    const options = [
        {
            value: 'uk',
            label: <Item label="Ukrainian" imageSource={uaLabel.default} />
        },
        {
            value: 'en',
            label: <Item label="English" imageSource={enLabel.default} />
        }
    ];

    return (
        <div className="s-vflex-center">
            <Dropdown menuClassName="LanguageDropdownMenu" className="LanguageDropdown s-vflex clickable" options={options} value={options[0]} />
        </div>
    );
}

export default LanguageDropdown;
