import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import useTermAPI from 'API/useTermAPI.js';
import useConversationAPI from 'API/useConversationAPI.js';
import apiService from 'apiService/Service.js';
import ReactSVG from 'react-inlinesvg';
import { getTimezoneString } from 'Helper/utils.js';

const Dropdown = ({ selectable, dropdownText, dropdownSelectedText, textIcon, dropdownIconOpen, dropdownIconClose, dropdownList, outerState, setOuterState, termState, setTermState, sessionId, termId }) => {
    const { createItem: createTerm, getItems: getTerms, deleteItem: deleteTermById } = useTermAPI();
    const { getItems: getConversations, markAsRead: conversationRead, markAsUnread: conversationUnread, updateItem: updateConversation } = useConversationAPI();
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
        const currentSession = outerState.sessionList.filter(singleSession => singleSession.id === sessionId);
        const overlay = document.querySelector('.wpax-vm-overlay');
        setSelectedState({
            selectedItemText: event.target.text
        });
        setState({
            ...state,
            openDropdown: false,
            filterText: event.target.text
        });
        let orderByArg = {};
        switch (btnName) {
            case 'mark-read':
                const markRead = async ()=>{
                    
                    const response = await conversationRead(sessionId)
                    return response;
                }
                markRead()
                    .then( resposne =>{
                        const sessionWithMarkRread = outerState.sessionList.map((item,index)=>{
                            if ( item.id === sessionId ){
                                return {
									...item,
									read: true
								}
                            }

                            return item;
                        });

                        setOuterState({
                            ...outerState,
                            sessionList: sessionWithMarkRread,
                        });

                    })
                    .catch(error=>{console.log(error)})
                break;
            case 'mark-unread':
                const markUnRead = async ()=>{
                    
                    const response = await conversationUnread(sessionId);
                    return response;
                }
                markUnRead()
                    .then( resposne =>{
                        const sessionWithMarkUnread = outerState.sessionList.map((item,index)=>{
                            if ( item.id === sessionId ) {
                                return {
									...item,
									read: false
								}
                            }
                            return item;
                        });

                        setOuterState({
                            ...outerState,
                            sessionList: sessionWithMarkUnread,
                        });
                    })
                    .catch(error=>{console.log(error)})
                break;
                case 'archive-conversation':
                    const archiveConversation = async ()=>{
                        
                        const response = await updateConversation(sessionId,{status: "archive"});
                        return response;
                    }
                    archiveConversation()
                        .then( resposne =>{
                            const sessionWithArchive = outerState.sessionList.map((item,index)=>{
                                if ( item.id === sessionId ) {
                                    return {
                                        ...item,
                                        status: "archive"
                                    }
                                }
                                return item;
                            });
    
                            setOuterState({
                                ...outerState,
                                sessionList: sessionWithArchive,
                            });
                        })
                        .catch(error=>{console.log(error)})
                    break;
                    case 'active-conversation':
                        const activeConversation = async ()=>{
                            
                            const response = await updateConversation(sessionId,{status: "active"});
                            return response;
                        }
                        activeConversation()
                            .then( resposne =>{
                                const sessionWithActive = outerState.sessionList.map((item,index)=>{
                                    if ( item.id === sessionId ) {
                                        return {
                                            ...item,
                                            status: "active"
                                        }
                                    }
                                    return item;
                                });
        
                                setOuterState({
                                    ...outerState,
                                    sessionList: sessionWithActive,
                                });
                            })
                            .catch(error=>{console.log(error)})
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
                    serverAssigned: [...asignedTerms],
                    asignedTerms: [...asignedTerms],
                    tagListModalOpen: false,
                    taglistWithSession: true,
                    addTagModalOpen: true
                });
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
                const pageLimit = {
                    limit: '15',
                    page: 1,
                    timezone: getTimezoneString(),
                };
                setTermState({
                    ...termState,
                    tagLoader: true
                });
                const deleteTerm = async () => {
                    
                    const deleteResponse = await deleteTermById(termId);
                    return deleteResponse;
                }
                deleteTerm()
                    .then( deleteResponse => {
                        let filteredTerms = [];
                        filteredTerms = termState.allTags.filter(item => item.term_id !== termId);

                        setTermState({
                            ...termState,
                            allTags: filteredTerms,
                            filteredTagList: filteredTerms,
                            tagLoader: false
                        });
                        const syncConversation = async () =>{
                            const syncResponse = await getConversations(pageLimit)
                            return syncResponse;
                        }
                        syncConversation()
                            .then(response =>{
                                setOuterState({
                                    ...outerState,
                                    sessionList: response.data,
                                    filteredSessions: response.data
                                });
                            })
                            .catch(error => {console.log(error)})
                    })
                    .catch(error => {console.log(error)});
                break;
            case 'filter-read':
                const fetchReadSeassion = async ()=>{
                    
                    const readSession = await getConversations({order_by: "read"});
                    return readSession;
                }
                fetchReadSeassion()
                    .then( readResponse => {
                        setOuterState({
                            ...outerState,
                            sessionList: readResponse.data,
                            filteredSessions: readResponse.data
                        });
                    })
                    .catch(error => {})
                break;
            case 'filter-unread':
                const fetchUnReadSeassion = async ()=>{
                    
                    const readSession = await getConversations({order_by: "unread"});
                    return readSession;
                }
                fetchUnReadSeassion()
                    .then( unReadResponse => {
                        setOuterState({
                            ...outerState,
                            sessionList: unReadResponse.data,
                            filteredSessions: unReadResponse.data
                        });
                    })
                    .catch(error => {})
                break;
            case 'filter-latest':
                const fetchLatestSeassion = async ()=>{
                    const pageLimit = {
                        limit: '15',
                        page: 1,
                        timezone: getTimezoneString(),
                    };
                    const latestSession = await getConversations(pageLimit);
                    return latestSession;
                }
                fetchLatestSeassion()
                    .then( latestResponse => {
                        setOuterState({
                            ...outerState,
                            sessionList: latestResponse.data,
                            filteredSessions: latestResponse.data
                        });
                    })
                    .catch(error => {})
                break;
                case 'filter-oldest':
                    const fetchOldestSeassion = async ()=>{
                        const oldestSession = await getConversations({order_by: "oldest"});
                        return oldestSession;
                    }
                    fetchOldestSeassion()
                        .then( oldestResponse => {
                            setOuterState({
                                ...outerState,
                                sessionList: oldestResponse.data,
                                filteredSessions: oldestResponse.data
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
                    ...state,
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

                <div>{renderDropdownIcon()}</div>
            </a>
            <ul className={openDropdown ? "wpwax-vm-dropdown__content wpwax-vm-show" : "wpwax-vm-dropdown__content"}>
                {
                    dropdownList.map((item, i) => {
                        return (
                            <li key={i}>
                                <a href="#" onClick={(e) => handleDropdownTrigger(e, item.name)}>{item.icon ? <span className="wpwax-vm-dropdown-item-icon"><ReactSVG src={item.icon} /></span> : ''}{item.text}</a>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default Dropdown;