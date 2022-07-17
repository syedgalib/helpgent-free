import React, { useState, useEffect, useRef } from "react";
import Select from 'react-select';
import { ReactSVG } from 'react-svg';
import PropTypes from 'prop-types';
import filter from '../../../modules/messenger/assets/svg/icons/filter.svg';

const Dropdown = ({ label, icon, options }) => {
    const ref = useRef()
    const [state, setDropDownOpen] = useState({
        dropDownOpen: false
    });
    /* To Handle Template Change */
    const handleDropdownToggle = () => {
        setDropDownOpen({
            dropDownOpen: !state.dropDownOpen
        });
    };
    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (state.dropDownOpen && ref.current && !ref.current.contains(e.target)) {
                setDropDownOpen({
                    dropDownOpen: false
                });
            }
        }
        document.addEventListener("click", checkIfClickedOutside)
        return () => {
            // Cleanup the event listener
            document.removeEventListener("click", checkIfClickedOutside)
        }
    }, [setDropDownOpen])
    console.log(state.dropDownOpen)
    return (
        <div className={state.dropDownOpen ? "wpwax-vm-dropdown wpwax-vm-dropdown-show" : "wpwax-vm-dropdown"}>
            <a href="#" className="wpwax-vm-dropdown__toggle wpwax-vm-dropdown-has" onClick={handleDropdownToggle} ref={ref}>
                <ReactSVG src={icon} />
                <span>{label}</span>
            </a>
            <ul className="wpwax-vm-dropdown__content">
                <li><a href="#" className="wpwax-vm-active">Read</a></li>
                <li><a href="#">Unread</a></li>
                <li><a href="#">Latest</a></li>
                <li><a href="#">Oldest</a></li>
            </ul>
        </div>
    );
};

Dropdown.defaultProps = {
    label: "Wpwax Dropdown",
    icon: filter,
    options: [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ],
}

Dropdown.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    options: PropTypes.array,
};

export default Dropdown;