import { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { handleTagEdit, handleTagModal, handleDeleteConfirmationModal } from 'MessengerApps/chatDashboard/store/tags/actionCreator';

const Dropdown = ({ dropdownText, dropdownSelectedText, textIcon, dropdownIconOpen, dropdownIconClose, dropdownList, dropdownWidth }) => {
    const ref = useRef(null);
    const [state, setState] = useState({
        openDropdown: false,
    });

    /* State Distructuring */
    const { openDropdown } = state;

    const [selectedState, setSelectedState] = useState({
        selectedItemText: dropdownList[0].text,
    });

    const { selectedItemText } = selectedState;

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    /* Handle Dropdown active inactive */
    const handleDropdown = (event) => {
        event.preventDefault();
        const allUserMedia = document.querySelectorAll(".wpwax-vm-usermedia");

        setState({
            openDropdown: !openDropdown
        });



        allUserMedia.forEach(medaiItem => {
            medaiItem.classList.remove(".wpwax-vm-active");
        });

        if (!openDropdown) {
            event.target.closest('.wpwax-vm-usermedia') ? event.target.closest('.wpwax-vm-usermedia').classList.add('wpwax-vm-active') : '';
        } else {
            event.target.closest('.wpwax-vm-usermedia') ? event.target.closest('.wpwax-vm-usermedia').classList.remove('wpwax-vm-active') : '';
        }
    }

    /* Handle Dropdown Trigger */
    const handleDropdownTrigger = (event, btnName) => {
        event.preventDefault();
        setSelectedState({
            selectedItemText: event.target.text
        });
        switch (btnName) {
            case 'mark-read':
                break;
            case 'tags':
                dispatch(handleTagModal(true));
                break;
            case 'delete-conv':
                dispatch(handleDeleteConfirmationModal(true));
                break;
            case 'edit':
                dispatch(handleTagEdit(true, {}));
                break;
            case 'delete':
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

    /* Focus Input field when search inopen */
    useEffect(() => {
        const checkIfClickedOutside = e => {
            const modalDoms = document.querySelectorAll('.wpwax-vm-modal.wpwax-vm-show');
            const overlay = document.querySelector('.wpax-vm-overlay');
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu

            if (openDropdown && ref.current && !ref.current.contains(e.target) && !overlay.contains(e.target)) {
                setState({
                    openDropdown: false
                });
            }

            modalDoms.forEach(modalDom => {
                if (!modalDom.contains(e.target)) {
                    setState({
                        openDropdown: false
                    });
                }
            });

        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [openDropdown]);


    return (
        <div className={dropdownWidth === "full" ? `${openDropdown ? 'wpwax-vm-dropdown wpwax-vm-dropdown-full wpwax-vm-dropdown-open' :
            'wpwax-vm-dropdown wpwax-vm-dropdown-full'}`
            : dropdownSelectedText
                ? `${openDropdown ? 'wpwax-vm-dropdown wpwax-vm-dropdown-select wpwax-vm-dropdown-fixed wpwax-vm-dropdown-open' :
                    'wpwax-vm-dropdown wpwax-vm-dropdown-select wpwax-vm-dropdown-fixed'}`
                : `${openDropdown ? 'wpwax-vm-dropdown wpwax-vm-dropdown-fixed wpwax-vm-dropdown-open' :
                    'wpwax-vm-dropdown wpwax-vm-dropdown-fixed'}`} ref={ref}>
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
                    dropdownSelectedText ?
                        <span className="wpwax-vm-dropdown__toggle--text">
                            {
                                textIcon ? <ReactSVG src={textIcon} /> : ''
                            }
                            <span className="wpwax-vm-dropdown__toggle--text-content">{selectedItemText}</span>
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