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
        filterText: "latest"
    });

    /* State Distructuring */
    const { openDropdown, filterText } = state;

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

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    /* Handle Dropdown active inactive */
    const handleDropdown = (event) => {
        event.preventDefault();
        const allUserMedia = document.querySelectorAll(".wpwax-vm-usermedia");

        setState({
            ...state,
            openDropdown: !openDropdown
        });

        allUserMedia.forEach(medaiItem => {
            medaiItem.classList.remove("wpwax-vm-active");
        });

        if (!openDropdown) {
            event.target.closest('.wpwax-vm-usermedia') ? event.target.closest('.wpwax-vm-usermedia').classList.add('wpwax-vm-active') : '';
        } else {
            event.target.closest('.wpwax-vm-usermedia') ? event.target.closest('.wpwax-vm-usermedia').classList.remove('wpwax-vm-active') : '';
        }
    }

    const handleDropdownTrigger = (event, btnName) => {
        event.preventDefault();
        const currentSession = sessions.filter(singleSession => singleSession.session_id === sessionId);
        console.log(currentSession)
        const overlay = document.querySelector('.wpax-vm-overlay');
        setSelectedState({
            selectedItemText: event.target.text
        });
        setState({
            openDropdown: false,
            filterText: event.target.text
        });
        let orderByArg = {};
        switch (btnName) {
            case 'mark-read':
                const markRead = async ()=>{
                    setOuterState({
                        ...outerState,
                        loder: true
                    });
                    const response = await apiService.markRead(`/sessions/${sessionId}/mark-as-read`);
                    console.log(response)
                    return response;
                }
                markRead().then( resposne =>{
                    const getSessions = async ()  =>{
                        const sessionResponse = await apiService.getAll('/sessions');
                        return sessionResponse;
                    }
    
                    getSessions()
                    .then( sessionResponse => {
                        console.log(sessionResponse)
                        setOuterState({
                            ...outerState,
                            loder: false
                        });
                        dispatch(handleReadSessions(sessionResponse.data.data))
                    })
                    .catch(error => {})
                })
                .catch(error=>{})
                break;
            case 'mark-unread':
                const markUnRead = async ()=>{
                    setOuterState({
                        ...outerState,
                        loder: true
                    });
                    const response = await apiService.markRead(`/sessions/${sessionId}/mark-as-unread`);
                    console.log(response)
                    return response;
                }
                markUnRead().then( resposne =>{
                    const getUnreadSessions = async ()  =>{
                        const sessionResponse = await apiService.getAll('/sessions');
                        return sessionResponse;
                    }
    
                    getUnreadSessions()
                    .then( sessionResponse => {
                        setOuterState({
                            ...outerState,
                            loder: false
                        });
                        console.log(sessionResponse)
                        dispatch(handleReadSessions(sessionResponse.data.data))
                    })
                    .catch(error => {})
                })
                .catch(error=>{})
                break;
            case 'add-tags':
                overlay.classList.add('wpwax-vm-show');
                
                let asignedTerms = [];
                if(currentSession.length !==0){
                    for(let i =0; i< currentSession[0].terms.length; i++){
                        asignedTerms = [
                            ...asignedTerms,
                            currentSession[0].terms[i].term_id
                        ]
                    }
                }
                setOuterState({
                    ...outerState,
                    activeSessionId: sessionId,
                    asignedTerms: [...asignedTerms],
                    tagListModalOpen: true,
                    taglistWithSession: true,
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
                    editableTermId: termId,
                    tagListModalOpen: false,
                    addTagModalOpen: true
                });
                break;
            case 'term-delete':
                setOuterState({
                    ...outerState,
                    loder: true
                });
                const deleteTerm = async () => {
                    const deleteResponse = await apiService.datadelete(`messages/terms/${termId}`);
                    return deleteResponse;
                }
                deleteTerm()
                    .then( deleteResponse => {
                        let filteredTerms = [];
                        if(currentSession.length !==0){
                            filteredTerms = currentSession[0].terms.filter(item => item.term_id !== termId);
                            console.log(currentSession[0].terms.filter(item => item.term_id !== termId));
                        }

                        const sessionIndex = sessions.findIndex(sessionObj => sessionObj.session_id === sessionId);

                        sessions[sessionIndex].terms = filteredTerms;
                        
                        setOuterState({
                            ...outerState,
                            deleteTerm: "Successfully Deleted",
                            loder: false
                        });
                        
                        dispatch(handleReadSessions(sessions))
                    })
                    .catch(error => {})
                break;
            case 'filter-read':
                const fetchReadSeassion = async ()=>{
                    const readSession = await apiService.getAllByArg(`/sessions`,{order_by: "read"});
                    return readSession;
                }
                fetchReadSeassion()
                    .then( readResponse => {
                        setOuterState({
                            ...outerState,
                            filteredSessions: readResponse.data.data
                        });
                    })
                    .catch(error => {})
                break;
            case 'filter-unread':
                const fetchUnReadSeassion = async ()=>{
                    const readSession = await apiService.getAllByArg(`/sessions`,{order_by: "unread"});
                    return readSession;
                }
                fetchUnReadSeassion()
                    .then( unReadResponse => {
                        setOuterState({
                            ...outerState,
                            filteredSessions: unReadResponse.data.data
                        });
                    })
                    .catch(error => {})
            case 'filter-latest':
                const fetchLatestSeassion = async ()=>{
                    const latestSession = await apiService.getAll(`/sessions`);
                    return latestSession;
                }
                fetchLatestSeassion()
                    .then( latestResponse => {
                        setOuterState({
                            ...outerState,
                            filteredSessions: latestResponse.data.data
                        });
                    })
                    .catch(error => {})
                break;
                case 'filter-oldest':
                    const fetchOldestSeassion = async ()=>{
                        const oldestSession = await apiService.getAllByArg(`/sessions`,{order_by: "oldest"});
                        return oldestSession;
                    }
                    fetchOldestSeassion()
                        .then( oldestResponse => {
                            setOuterState({
                                ...outerState,
                                filteredSessions: oldestResponse.data.data
                            });
                        })
                        .catch(error => {})
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
                            <span className="wpwax-vm-dropdown__toggle--text-content">Order by <span className="wpwax-vm-selected">{filterText}</span></span>
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