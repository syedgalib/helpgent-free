import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { handleTagModal } from '../../../modules/messenger/js/apps/chatDashboard/store/tags/actionCreator';
import angleDown from '../../../modules/messenger/assets/svg/icons/angle-down.svg';
import angleUp from '../../../modules/messenger/assets/svg/icons/angle-up.svg';
const Dropdown = ({ dropdownText, textIcon, dropdownIconOpen, dropdownIconClose, dropdownList, dropdownWidth }) => {

    const [state, setState] = useState({
        openDropdown: false,
    });

    /* State Distructuring */
    const { openDropdown } = state;

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    /* Handle Dropdown active inactive */
    const handleDropdown = (event) => {
        event.preventDefault();

        setState({
            openDropdown: !openDropdown
        });

        if (!openDropdown) {
            event.target.closest('.wpwax-vm-usermedia') ? event.target.closest('.wpwax-vm-usermedia').classList.add('wpwax-vm-active') : '';
        } else {
            event.target.closest('.wpwax-vm-usermedia') ? event.target.closest('.wpwax-vm-usermedia').classList.remove('wpwax-vm-active') : '';
        }
    }
    const handleDropdownTrigger = (event, btnName) => {
        event.preventDefault();
        console.log(btnName);
        switch (btnName) {
            case 'mark-read':
                console.log("mark As Read");
                break;
            case 'tags':
                dispatch(handleTagModal(true));
            case 'delete-conv':
                console.log("Delete Conv");
                break;
            case 'edit':
                console.log("Edit");
                break;
            case 'delete':
                console.log("delete");
                break;
            default:
                break;
        }
    }

    /* Handle the open close dropdown icon */
    const renderDropdownIcon = () => {
        if (openDropdown) {
            return dropdownIconOpen ? <ReactSVG src={dropdownIconOpen} /> : ''

        } else {
            return dropdownIconClose ? <ReactSVG src={dropdownIconClose} /> : ''
        }
    }

    return (
        <div className={dropdownWidth === "full" ? `${openDropdown ? 'wpwax-vm-dropdown wpwax-vm-dropdown-full wpwax-vm-dropdown-open' :
            'wpwax-vm-dropdown wpwax-vm-dropdown-full'}` :
            `${openDropdown ? 'wpwax-vm-dropdown wpwax-vm-dropdown-fixed wpwax-vm-dropdown-open' :
                'wpwax-vm-dropdown wpwax-vm-dropdown-fixed'}`}>
            <a href="#" className={dropdownText ? "wpwax-vm-dropdown__toggle" : "wpwax-vm-dropdown__toggle wpwax-vm-dropdown__toggle-icon-only"} onClick={handleDropdown}>
                {
                    dropdownText ?
                        <span className="wpwax-vm-dropdown__toggle--text">
                            {
                                textIcon ? <ReactSVG src={textIcon} /> : ''
                            }
                            <span className="wpwax-vm-dropdown__toggle--text-content">Filter by <span className="wpwax-vm-selected">unread</span></span>
                        </span> : ""
                }

                {
                    renderDropdownIcon()
                }

            </a>
            <ul className={openDropdown ? "wpwax-vm-dropdown__content wpwax-vm-show" : "wpwax-vm-dropdown__content"}>
                {
                    dropdownList.map((item, i) => {
                        return (
                            <li key={i}>
                                <a href="#" onClick={(e) => handleDropdownTrigger(e, item.name)}>{item.icon ? <div className="wpwax-vm-dropdown-item-icon"><ReactSVG src={item.icon} /></div> : ''}{item.text}</a>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default Dropdown;