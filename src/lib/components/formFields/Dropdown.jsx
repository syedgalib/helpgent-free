import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import apiService from 'apiService/Service.js';
import { handleReadSessions } from '../../../modules/messenger/apps/chatDashboard/store/sessions/actionCreator';
import { ReactSVG } from 'react-svg';
import { handleTagEdit, handleTagModal, handleSetSession, handleDeleteConfirmationModal } from 'MessengerApps/chatDashboard/store/tags/actionCreator';

const Dropdown = ({ selectable, dropdownText, dropdownSelectedText, textIcon, dropdownIconOpen, dropdownIconClose, dropdownList, outerState, setOuterState, sessionId, termId }) => {
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

    /* initialize Form Data */
	const { sessions } = useSelector(state => {
		// console.log(state)
        return {
            sessions: state.sessions.sessions,
        };
    });
    console.log(sessions);

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

    const handleDropdownTrigger = (event, btnName) => {
        event.preventDefault();
        const overlay = document.querySelector('.wpax-vm-overlay');
        setSelectedState({
            selectedItemText: event.target.text
        });

        switch (btnName) {
            case 'mark-read':
                const markRead = async ()=>{
                    const response = await apiService.markRead(`/sessions/${sessionId}/mark-as-read`);
                    console.log(response)
                    return response;
                }
                markRead().then( resposne =>{
                    
                    
                })
                .catch(error=>{})

                const getSessions = async ()  =>{
                    const sessionResponse = await apiService.getAll('/sessions');
                    return sessionResponse;
                }

                getSessions()
                .then( sessionResponse => {
                    console.log(sessionResponse)
                    dispatch(handleReadSessions(sessionResponse.data.data))
                })
                .catch(error => {})
                
                break;
            case 'mark-unread':
                const markUnRead = async ()=>{
                    const response = await apiService.markRead(`/sessions/${sessionId}/mark-as-unread`);
                    console.log(response)
                    return response;
                }
                markUnRead().then( resposne =>{
                    
                    
                })
                .catch(error=>{})

                const getUnreadSessions = async ()  =>{
                    const sessionResponse = await apiService.getAll('/sessions');
                    return sessionResponse;
                }

                getUnreadSessions()
                .then( sessionResponse => {
                    console.log(sessionResponse)
                    dispatch(handleReadSessions(sessionResponse.data.data))
                })
                .catch(error => {})
                break;
            case 'add-tags':
                overlay.classList.add('wpwax-vm-show');
                const currentSession = sessions.filter(singleSession => singleSession.session_id === sessionId);
                let asignedTerms = [];
                if(currentSession.length !==0){
                    for(let i =0; i< currentSession[0].terms.length; i++){
                        asignedTerms = [
                            ...asignedTerms,
                            currentSession[0].terms[i].term_id
                        ]
                    }
                }
                console.log(currentSession[0].terms.length,asignedTerms);
                setOuterState({
                    ...outerState,
                    activeSessionId: sessionId,
                    asignedTerms: [...asignedTerms],
                    tagListModalOpen: true,
                    // addTagModalOpen: false
                });
                // dispatch(handleSetSession(sessionId));
                // dispatch(handleTagModal(true));
                break;
            case 'delete-conv':
                overlay.classList.add('wpwax-vm-show');
                setOuterState({
                    ...outerState,
                    activeSessionId: sessionId,
                    deleteModalOpen: true
                });
                // dispatch(handleDeleteConfirmationModal(true));
                break;
            case 'term-edit':
                setOuterState({
                    ...outerState,
                    activeTermId: termId,
                    tagListModalOpen: false,
                    addTagModalOpen: true
                });
                break;
            case 'term-delete':
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

            if (openDropdown && ref.current && !ref.current.contains(e.target)) {
                setState({
                    openDropdown: false
                });
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [openDropdown]);


    return (
        <div className={selectable ? `${openDropdown ? 'wpwax-vm-dropdown wpwax-vm-dropdown-selectable wpwax-vm-dropdown-open' : 'wpwax-vm-dropdown wpwax-vm-dropdown-selectable'}` : `${openDropdown ? 'wpwax-vm-dropdown wpwax-vm-dropdown-open' : 'wpwax-vm-dropdown'}`} ref={ref}>
            <a href="#" className={dropdownText ? "wpwax-vm-dropdown__toggle" : `${selectable ? "wpwax-vm-dropdown__toggle" : "wpwax-vm-dropdown__toggle wpwax-vm-dropdown__toggle-icon-only"}`} onClick={handleDropdown}>
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