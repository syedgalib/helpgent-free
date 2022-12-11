import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddTagWrap } from './Style';
import ReactSVG from 'react-inlinesvg';
import Checkbox from 'Components/form-fields/Checkbox.jsx';
import {
    handleTagModal,
    handleTagFormModal,
} from '../../../store/tags/actionCreator';
import apiService from 'apiService/Service.js';
import useTermAPI from 'API/useTermAPI.js';
import useConversationAPI from 'API/useConversationAPI.js';
import userIcon from 'Assets/svg/icons/users.svg';
import userImg from 'Assets/img/chatdashboard/user.png';
import loadingSpin from 'Assets/svg/loaders/loading-spin.svg';
import { getTimezoneString } from 'Helper/utils.js';

const AddTag = (props) => {
    const { createItem: createTerm, getItems: getTerms, updateItem: updateTerm } = useTermAPI();
    const { getItems: getConversations, updateTerms: updateConversationTerm } = useConversationAPI();
    
    const overlay = document.querySelector('.wpax-vm-overlay');
    /* initialize Form Data */
    const { sessions } = useSelector((state) => {
        return {
            sessions: state.sessions.sessions,
        };
    });

    const [currentCheckbox, setCurrentCheckbox] = useState("");

    const [state, setState] = useState({
        tagsPageNumber: 2,
        totalTags: 0,
        pageLoader: false
	});

    const [addFormState, setAddFormState] = useState({
        newAssigned: [],
        newUnAssinged: [],
        addTagResponse: '',
        addTagResponseStatus: '',
        tagInput: '',
    });

    const {tagsPageNumber, totalTags, pageLoader} = state;

    const { sessionState, setSessionState, tagState, setTagState } = props;

    const {
        sessionList,
        serverAssigned,
        asignedTerms,
        unAsignedTerms,
        activeSessionId,
        editableTermId,
        addTagModalOpen,
        taglistWithSession,
    } = sessionState;
    const { allTags, assignedTags, tagLoader } = tagState;

    const {
        addTagResponseStatus,
        addTagResponse,
        tagInput,
        newAssigned,
        newUnAssinged,
    } = addFormState;

    const currentSession = sessionList.filter(
        (singleSession) => singleSession.id === activeSessionId
    );

    useEffect(() => {
        if (editableTermId !== '' && addTagModalOpen) {
            let termName = tagInput;
            termName = allTags.filter(
                (item) => item.term_id === editableTermId
            )[0].name;
            setAddFormState({
                ...addFormState,
                newAssigned: [],
                tagInput: termName,
                addTagResponse: '',
            });
        } else {
            setAddFormState({
                ...addFormState,
                tagInput: '',
                addTagResponse: '',
            });
        }

        if(addTagModalOpen){
            if(allTags.length === 0){
                setTagState({
                    ...tagState,
                    tagLoader: true
                });
            }
            
            const fetchTags = async () =>{
                
                const tagsResponse = await getTerms({limit:12});
                return tagsResponse;
            }
            fetchTags()
                .then((tagsResponse) => {
                    setTagState({
                        ...tagState,
                        tagLoader: false,
                        allTags: tagsResponse.data,
                    });
                    setState({
                        ...state,
                        totalTags: tagsResponse.headers["x-wp-total"]
                    });
                })
                .catch((error) => {
                    setTagState({
                        ...tagState,
                        tagLoader: false,
                    });
                    console.log(error);
                });
        }

    }, [addTagModalOpen]);

    useEffect(() => {
        
            const pageLimit = {
                limit: '15',
                page: 1,
                timezone: getTimezoneString(),
            };

            const fetchUpdatedSessions =  async () =>{

                const updatedSessionResponse = await getConversations(pageLimit);
                return updatedSessionResponse;
            }
            fetchUpdatedSessions()
                .then(updatedSessionResponse =>{
                    setSessionState({
                        ...sessionState,
                        sessionList: updatedSessionResponse.data
                    });
                })
        
	}, [addTagResponse]);

    /* Handle Modal Close */
    const handleCloseModal = (event) => {
        event.preventDefault();
        if(taglistWithSession){
            overlay.classList.remove('wpwax-vm-show');
            setSessionState({
                ...sessionState,
                tagListModalOpen: false,
                addTagModalOpen: false,
                editableTermId: '',
                taglistWithSession: taglistWithSession,
            });

        }else{
            setSessionState({
                ...sessionState,
                tagListModalOpen: true,
                addTagModalOpen: false,
                editableTermId: '',
                taglistWithSession: taglistWithSession,
            });
        }
        setAddFormState({
            ...addFormState,
            tagInput: '',
        });
    };

    const handleTagInput = (e) => {
        setAddFormState({
            ...addFormState,
            tagInput: e.target.value,
        });
    };

    function onlySpaces(str) {
        return str.trim().length === 0;
    }
    
    const handleCreateTerm = async (e) => {
        e.preventDefault();
        const termData = {
            taxonomy: 'tag',
            name: tagInput,
        };
        setTagState({
            ...tagState,
            tagLoader: true,
        });
        if (!onlySpaces(tagInput)) {
            if (editableTermId !== '') {
                await updateTerm(editableTermId,termData)
                    .then((response) => {

                        if(response.statusCode === 200){
                            let termIndex = allTags.findIndex(
                                (obj) => obj.term_id === editableTermId
                            );
    
                            allTags[termIndex].name = tagInput;
                            setTagState({
                                ...tagState,
                                tagLoader: false,
                                allTags: [...allTags],
                            });
                            setAddFormState({
                                ...addFormState,
                                addTagResponseStatus: 'success',
                                addTagResponse: 'Successfully Edited',
                            });
                        }else{
                            setAddFormState({
                                ...addFormState,
                                addTagResponseStatus: 'danger',
                                addTagResponse: response.message,
                            });
                            setTagState({
                                ...tagState,
                                tagLoader: false,
                            });
                        }
                        
                    });
                    
            }else{
                const addTermData = {
                    taxonomy: 'tag',
                    name: tagInput,
                    conversation_id: currentSession[0].id
                };
                createTerm(addTermData)
                    .then(response => {
                        if(response.statusCode === 200){
                            setTagState({
                                ...tagState,
                                tagLoader: false,
                                allTags: [
                                    ...allTags,
                                    response.data
                                ]
                            });
                            setSessionState({
                                ...sessionState,
                                asignedTerms: [
                                    ...asignedTerms,
                                    response.data.term_id
                                ],
                            });
                            setAddFormState({
                                ...addFormState,
                                tagInput: "",
                                addTagResponseStatus: "success",
                                addTagResponse: `'${response.data.name}' successfully added`,
                            });
                        }else{
                            setAddFormState({
                                ...addFormState,
                                addTagResponseStatus: 'danger',
                                addTagResponse: response.message,
                            });
                            setTagState({
                                ...tagState,
                                tagLoader: false,
                            });
                        }
                    });
                    
            }
        } else {
            setAddFormState({
                ...addFormState,
                addTagResponseStatus: 'danger',
                addTagResponse: 'Please enter tag name',
            });
            setTagState({
                ...tagState,
                tagLoader: false,
            });
        }
    };

    const handleAssignList = (e,name)=>{
        setCurrentCheckbox(e.target.id);
        let newAssignedTag = newAssigned;
        let newUnAssignedTag = newUnAssinged;
        let assignedTags = asignedTerms;
        let checkStatus = '';
        if(e.target.checked){
            checkStatus = "assigned";
            if (newAssigned.indexOf(e.target.id.replace('wpwax-vm-term-','')) === -1){
                setAddFormState({
                    ...addFormState,
                    newAssigned: [
                        ...addFormState.newAssigned,
                        e.target.id.replace('wpwax-vm-term-','')
                    ]
                });
                newAssignedTag = [
                    ...newAssignedTag,
                    e.target.id.replace('wpwax-vm-term-','')
                ]
                if(newUnAssinged.indexOf(e.target.id.replace('wpwax-vm-term-','')) !== -1){
                    let virtualArray = [...newUnAssinged];
                    virtualArray.splice(virtualArray.indexOf(e.target.id.replace('wpwax-vm-term-','')),1);
                    setAddFormState({
                        ...addFormState,
                        newAssigned: [
                            ...addFormState.newAssigned,
                            e.target.id.replace('wpwax-vm-term-','')
                        ],
                        newUnAssinged: virtualArray
                    });
                    newAssignedTag = [
                        ...newAssignedTag,
                        e.target.id.replace('wpwax-vm-term-','')
                    ]
                    newUnAssignedTag = virtualArray
                }
            }

            if(asignedTerms.indexOf(e.target.id) === -1){
                let ids = e.target.id.replace('wpwax-vm-term-','')
                setSessionState({
                    ...sessionState,
                    asignedTerms: [
                        ...asignedTerms,
                        ids
                    ],
                });

                assignedTags = [
                    ...assignedTags,
                    ids
                ];
            }
        }else{
            checkStatus = "unassigned"
            if (newUnAssinged.indexOf(e.target.id.replace('wpwax-vm-term-','')) === -1){
                setAddFormState({
                    ...addFormState,
                    newUnAssinged: [
                        ...addFormState.newUnAssinged,
                        e.target.id.replace('wpwax-vm-term-','')
                    ]
                });
                newUnAssignedTag = [
                    ...newUnAssignedTag,
                    e.target.id.replace('wpwax-vm-term-','')
                ]
                if(newAssigned.indexOf(e.target.id.replace('wpwax-vm-term-','')) !== -1){
                    let virtualArrayT = [...newAssigned];
                    virtualArrayT.splice(virtualArrayT.indexOf(e.target.id.replace('wpwax-vm-term-','')),1);
                    setAddFormState({
                        ...addFormState,
                        newUnAssinged: [
                            ...addFormState.newUnAssinged,
                            e.target.id.replace('wpwax-vm-term-','')
                        ],
                        newAssigned: virtualArrayT
                    });
                    // newUnAssignedTag = [
                    //     ...newUnAssignedTag,
                    //     e.target.id.replace('wpwax-vm-term-','')
                    // ]
                    newAssignedTag = virtualArrayT
                }
            }else{
                setAddFormState({
                    ...addFormState,
                    newUnAssinged: [
                        ...addFormState.newUnAssinged,
                        e.target.id.replace('wpwax-vm-term-','')
                    ]
                });

                newUnAssignedTag = [
                    ...newUnAssignedTag,
                    e.target.id.replace('wpwax-vm-term-','')
                ]
            }


            let ids = e.target.id.replace('wpwax-vm-term-','');
            let array = [...asignedTerms];

            if(array.indexOf(ids) !== -1){
                array.splice(array.indexOf(ids),1);
                setSessionState({
                    ...sessionState,
                    asignedTerms: [...array]
                });
                assignedTags = [...array];
            }
        }

        handleAssignTerm( newAssignedTag, newUnAssignedTag, assignedTags, name, checkStatus );
    }


    const handleAssignTerm = async ( newAssignedTag, newUnAssignedTag, assignedTags, name, checkStatus ) =>{
        const updateTermData = {
            add_terms: newAssignedTag.join(','),
            remove_terms: newUnAssignedTag.join(',')
        }
        setTagState({
            ...tagState,
            tagLoader: true,
        });

        
        await updateConversationTerm(activeSessionId,updateTermData)
            .then(response => {
                setTagState({
                    ...tagState,
                    assignedTags: [
                        ...tagState.assignedTags,
                        response.success
                    ],
                    tagLoader: false,
                });
                setAddFormState({
                    ...addFormState,
                    addTagResponseStatus: 'success',
                    addTagResponse: `"${name}" tag has been ${checkStatus}`,
                    newAssigned: [],
                    newUnAssinged: []
                });
            })
            .catch(error =>{
                if(error.statusCode === 403){
                    setAddFormState({
                        ...addFormState,
                        addTagResponseStatus: 'danger',
                        addTagResponse: error.message,
                    });
                }
                setTagState({
                    ...tagState,
                    tagLoader: false,
                });
            })

        const pageLimit = {
            limit: '15',
            page: 1,
            timezone: getTimezoneString(),
        };
        await getConversations(pageLimit)
            .then(response =>{
                setSessionState({
                    ...sessionState,
                    asignedTerms: assignedTags,
                    sessionList: response.data
                });
            })
            .catch(error =>{

            })
    }

    const handleLoadMore = e =>{
        e.preventDefault();
        const pageArg = {
            limit: '12',
            page: tagsPageNumber,
        };

        const fetchNextTags = async () => {
            const nextTagResponse = await getTerms(pageArg);
            return nextTagResponse;
        };

        setState({
            ...state,
            pageLoader: true,
        });

        fetchNextTags()
            .then((nextTagResponse) => {
                setState({
                    ...state,
                    pageLoader: false,
                    tagsPageNumber: tagsPageNumber +1
                });
                setTagState({
                    ...tagState,
                    tagLoader: false,
                    allTags: allTags.concat(nextTagResponse.data)
                });
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const currentUser = wpWaxCustomerSupportApp_CoreScriptData.current_user;
    let users = [];
    if (currentSession.length !== 0) {
        users = currentSession[0].users.filter(
            (p) => currentUser && p.id !== parseInt(currentUser.ID)
        );
    }
    let images = [];
    let titleString = [];
    let multiImg = false;
    if (currentSession.length !== 0) {
        if (currentSession[0].users.length === 1) {
            images.push(currentSession[0].users[0].avater);
            titleString.push(currentSession[0].users[0].name);
        } else {
            const getuser = users.filter(item=> !item.is_admin);
            titleString.push(getuser[0].name)
        }
    }

    if (images.length > 1) {
        multiImg = true;
    }

    return (
        <React.Fragment>
            <AddTagWrap
                className={
                    addTagModalOpen
                        ? 'wpwax-vm-modal wpwax-vm-show'
                        : 'wpwax-vm-modal'
                }
            >
                <div className='wpwax-vm-modal__header'>
                    <div className='wpwax-vm-taglist-author'>
                        {taglistWithSession ? (
                            <div className='wpwax-vm-taglist-author__img'>
                                {images.map((src, index) => {
                                    if (index === 0) {
                                        if (src !== '') {
                                            return (
                                                <img
                                                    src={src}
                                                    alt=''
                                                    key={index}
                                                />
                                            );
                                        } else {
                                            return (
                                                <img
                                                    src={userImg}
                                                    alt=''
                                                    key={index}
                                                />
                                            );
                                        }
                                    }
                                })}
                                {multiImg ? (
                                    <div className='wpwax-vm-more-img'>
                                        <ReactSVG src={userIcon} />
                                    </div>
                                ) : null}
                            </div>
                        ) : null}

                        <span className='wpwax-vm-taglist-author__name'>
                            {taglistWithSession
                                ? `${
                                      editableTermId !== '' ? 'Edit' : 'Add'
                                  } tags to ${titleString.length > 2 ? `${titleString[0]} , ${titleString[1]} and others` : `${titleString[0]} ${titleString.length == 1 ? '' : `and ${titleString[1]}`}` }`
                                : `Edit tag`}
                        </span>
                    </div>
                    <a
                        href='#'
                        className='wpwax-vm-modal__close'
                        onClick={handleCloseModal}
                    >
                        <span className='dashicons dashicons-no-alt'></span>
                    </a>
                </div>

                <div className='wpwax-vm-modal__body'>
                    {addTagResponse !== '' ? (
                        <div
                            className={`wpwax-vm-notice wpwax-vm-notice-${addTagResponseStatus}`}
                        >
                            <p>{addTagResponse}</p>
                        </div>
                    ) : null}
                    <form action=''>
                        <div className='wpwax-vm-addtag-form'>
                            <div className='wpwax-vm-form-group'>
                                <input
                                    type='text'
                                    className='wpwax-vm-form__element'
                                    placeholder='Ex. Travel'
                                    value={tagInput}
                                    onChange={(e) => handleTagInput(e)}
                                />
                            </div>
                            <button
                                className='wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary'
                                onClick={(e) => handleCreateTerm(e)}
                            >
                                {editableTermId !== '' ? 'Edit' : 'Add new'}
                            </button>
                        </div>
                    </form>
                    {taglistWithSession ? (
                        <div className='wpwax-vm-taglist-box'>
                            <React.Fragment>
                                <div className='wpwax-vm-taglist'>
                                    {allTags.length !== 0 ? (
                                        allTags.map((item, index) => {
                                            return (
                                                <div
                                                    className='wpwax-vm-tag__check'
                                                    key={index}
                                                >
                                                    <Checkbox
                                                        id={`wpwax-vm-term-${item.term_id}`}
                                                        label={item.name}
                                                        checked={
                                                            asignedTerms.indexOf(
                                                                item.term_id
                                                            ) === -1
                                                                ? false
                                                                : true
                                                        }
                                                        onChange={(e) =>
                                                            handleAssignList(
                                                                e,
                                                                item.name
                                                            )
                                                        }
                                                        currentCheckboxId={currentCheckbox}
                                                        loader={tagLoader}
                                                    />
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className='wpwax-vm-empty'>
                                            {
                                                <p>
                                                    Please add tags before
                                                    assign
                                                </p>
                                            }
                                        </div>
                                    )}
                                </div>
                                {
                                    totalTags > allTags.length ? <a href="#" className="wpwax-vm-loadmore" onClick={e=>handleLoadMore(e)}> Load more {pageLoader ? <ReactSVG src={loadingSpin} /> : null } </a> : null
                                }
                            </React.Fragment>
                        </div>
                    ) : (
                        <ul className='wpwax-vm-tags-readable-list'>
                            {allTags.map((item, index) => {
                                return (
                                    <li key={index}>
                                        {item.name}
                                        {index !== allTags.length - 1
                                            ? ' , '
                                            : ''}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </AddTagWrap>
        </React.Fragment>
    );
};

export default AddTag;
