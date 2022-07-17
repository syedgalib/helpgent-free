import { useState } from "react";
import { ReactSVG } from 'react-svg';
const Dropdown = ({ dropdownText, textIcon, dropdownIcon, dropdownList, dropdownWidth }) => {
    const [state, setState] = useState({
        openDropdown: false,
    });
    const { openDropdown } = state;
    const handleDropdown = (event) =>{
        setState({
            openDropdown: !openDropdown
        });
    }
    return (
        <div className={ dropdownWidth === "full" ? "wpwax-vm-dropdown wpwax-vm-dropdown-full" : "wpwax-vm-dropdown wpwax-vm-dropdown-fixed"}> 
            <a href="#" className={ dropdownText? "wpwax-vm-dropdown__toggle": "wpwax-vm-dropdown__toggle wpwax-vm-dropdown__toggle-icon-only" } onClick={ handleDropdown }>
                {
                    dropdownText ? 
                    <span className="wpwax-vm-dropdown__toggle--text">
                        {
                            textIcon? <ReactSVG src={ textIcon } />:''
                        }
                        <span className="wpwax-vm-dropdown__toggle--text-content">Filter by <span className="wpwax-vm-selected">unread</span></span>
                    </span>: ""
                }
                
                {
                    dropdownIcon ? <ReactSVG src={ dropdownIcon } /> : ''
                }
                
            </a>
            <ul className={openDropdown ? "wpwax-vm-dropdown__content wpwax-vm-show": "wpwax-vm-dropdown__content"}> 
                {
                    dropdownList.map((item, i) => {
                        console.log(item);
                        return(
                            <li key={i}>
                                <a href="#">{item.icon?<div className="wpwax-vm-dropdown-item-icon"><ReactSVG src={ item.icon } /></div>:'' }{item.text}</a>
                            </li>
                        ); 
                    })
                }
            </ul>
        </div>
    );
};

export default Dropdown;