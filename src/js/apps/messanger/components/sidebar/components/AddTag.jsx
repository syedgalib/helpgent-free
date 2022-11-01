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

        if(allTags.length === 0){
            setTagState({
                ...tagState,
                tagLoader: true
            });
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
        if (tagInput !== '') {
            if (editableTermId !== '') {
                await updateTerm(editableTermId,termData)
                    .then((response) => {
                        
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
                    });
                    const pageLimit = {
                        limit: '15',
                        page: 1,
                        timezone: getTimezoneString(),
                    };
                    await getConversations(pageLimit)
                        .then(response =>{
                            setSessionState({
                                ...sessionState,
                                sessionList: response.data
                            });
                        })
                        .catch(error =>{
            
                        })
            }else{
                createTerm(termData)
                    .then(response => {
                        console.log(response)
                        setTagState({
                            ...tagState,
                            tagLoader: false,
                            allTags: [
                                ...allTags,
                                response.data
                            ]
                        });
                        setAddFormState({
                            ...addFormState,
                            tagInput: "",
                            addTagResponseStatus: "success",
                            addTagResponse: "Successfully Added",
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
                    });
            }
        } else {
            setAddFormState({
                ...addFormState,
                addTagResponseStatus: 'danger',
                addTagResponse: 'Please enter Tag',
            });
            setTagState({
                ...tagState,
                tagLoader: false,
            });
        }
    };

    const handleAssignList = (e)=>{
        if(e.target.checked){
            
            if (newAssigned.indexOf(e.target.id.replace('wpwax-vm-term-','')) === -1){
                setAddFormState({
                    ...addFormState,
                    newAssigned: [
                        ...addFormState.newAssigned,
                        e.target.id.replace('wpwax-vm-term-','')
                    ]
                });
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
                    })
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
            }
        }else{
            if (newUnAssinged.indexOf(e.target.id.replace('wpwax-vm-term-','')) === -1){
                setAddFormState({
                    ...addFormState,
                    newUnAssinged: [
                        ...addFormState.newUnAssinged,
                        e.target.id.replace('wpwax-vm-term-','')
                    ]
                });
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
                    })
                }
            }else{
                setAddFormState({
                    ...addFormState,
                    newUnAssinged: [
                        ...addFormState.newUnAssinged,
                        e.target.id.replace('wpwax-vm-term-','')
                    ]
                });
            }


            let ids = e.target.id.replace('wpwax-vm-term-','');
            let array = [...asignedTerms];

            if(array.indexOf(ids) !== -1){
                array.splice(array.indexOf(ids),1);
                setSessionState({
                    ...sessionState,
                    asignedTerms: [...array]
                });
            }

        }
    }

    const handleAssignTerm = async (e) =>{
        const updateTermData = {
            add_terms: newAssigned.join(','),
            remove_terms: newUnAssinged.join(',')
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
                    addTagResponse: "Successfully Updated",
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

        console.log(tagsPageNumber)

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
            for (let i = 0; i < users.length; i++) {
                images.push(users[i].avater);
                titleString.push(users[i].name);
            }
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
                                  } Tags of ${titleString}`
                                : `Edit Tag`}
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
                                {editableTermId !== '' ? 'Apply' : 'Apply'}
                            </button>
                        </div>
                    </form>
                    {taglistWithSession ? (
                        <div className='wpwax-vm-taglist-box'>
                            {tagLoader ? (
                                <span className='wpwax-vm-loading-spin'>
                                    <span className='wpwax-vm-spin-dot'></span>
                                    <span className='wpwax-vm-spin-dot'></span>
                                    <span className='wpwax-vm-spin-dot'></span>
                                    <span className='wpwax-vm-spin-dot'></span>
                                </span>
                            ) : (
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
                                                            value={
                                                                asignedTerms.indexOf(
                                                                    item.term_id
                                                                ) === -1
                                                                    ? false
                                                                    : true
                                                            }
                                                            checked={
                                                                asignedTerms.indexOf(
                                                                    item.term_id
                                                                ) === -1
                                                                    ? false
                                                                    : true
                                                            }
                                                            onChange={(e) =>
                                                                handleAssignList(
                                                                    e
                                                                )
                                                            }
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
                                    {allTags.length !== 0 ? (
                                        <a
                                            href='#'
                                            className='wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary wpwax-vm-btnlink'
                                            onClick={handleAssignTerm}
                                        >
                                            Update
                                        </a>
                                    ) : null}
                                </React.Fragment>
                            )}
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

                <div className='wpwax-vm-modal__footer'>
                    <a
                        href='#'
                        className='wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-white'
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </a>
                </div>
            </AddTagWrap>
        </React.Fragment>
    );
};

export default AddTag;
