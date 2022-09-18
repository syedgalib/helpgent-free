import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddTagWrap } from './Style';
import { ReactSVG } from 'react-svg';
import Checkbox from 'Components/formFields/Checkbox.jsx';
import {
    handleTagModal,
    handleTagFormModal,
} from '../../../store/tags/actionCreator';
import apiService from 'apiService/Service.js';
<<<<<<< HEAD
import userImg from 'Assets/img/chatdashboard/user.png';
import Dropdown from 'Components/formFields/Dropdown.jsx';
import ellipsisH from 'Assets/svg/icons/ellipsis-h.svg';
import Taglist from './Taglist.jsx';
=======
import userIcon from "Assets/svg/icons/users.svg";
import userImg from "Assets/img/chatdashboard/user.png";
import ellipsisH from "Assets/svg/icons/ellipsis-h.svg";
import Taglist from "./Taglist.jsx";
>>>>>>> 83fb9b3e9eb81171751d4dc95c08ec97971b3350

const AddTag = (props) => {
    /* initialize Form Data */
    const { sessions } = useSelector((state) => {
        return {
            sessions: state.sessions.sessions,
        };
    });

    const [addFormState, setAddFormState] = useState({
        newAssigned: [],
        newUnAssinged: [],
        addTagResponse: '',
        addTagResponseStatus: '',
        tagInput: '',
    });

    const { sessionState, setSessionState, tagState, setTagState } = props;
<<<<<<< HEAD
    // console.log(sessionState);
    const {
        serverAssigned,
        asignedTerms,
        unAsignedTerms,
        activeSessionId,
        editableTermId,
        addTagModalOpen,
        taglistWithSession,
    } = sessionState;
=======
    
    const { sessionList, serverAssigned, asignedTerms, unAsignedTerms, activeSessionId, editableTermId, addTagModalOpen, taglistWithSession } = sessionState;
>>>>>>> 83fb9b3e9eb81171751d4dc95c08ec97971b3350
    const { allTags, assignedTags, tagLoader } = tagState;

    const {
        addTagResponseStatus,
        addTagResponse,
        tagInput,
        newAssigned,
        newUnAssinged,
    } = addFormState;

<<<<<<< HEAD
    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

=======
    const currentSession = sessionList.filter(singleSession => singleSession.session_id === activeSessionId);
    
>>>>>>> 83fb9b3e9eb81171751d4dc95c08ec97971b3350
    useEffect(() => {
        if (editableTermId !== '') {
            let termName = tagInput;
<<<<<<< HEAD
            termName = allTags.filter(
                (item) => item.term_id === editableTermId
            )[0].name;
            // console.log(
            //     allTags.filter((item) => item.term_id === editableTermId)[0]
            //         .name
            // );
=======
            termName = allTags.filter(item=> item.term_id === editableTermId)[0].name;
>>>>>>> 83fb9b3e9eb81171751d4dc95c08ec97971b3350
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
    }, [addTagModalOpen]);

<<<<<<< HEAD
    // console.log(addFormState);

=======
>>>>>>> 83fb9b3e9eb81171751d4dc95c08ec97971b3350
    /* Handle Modal Close */
    const handleCloseModal = (event) => {
        event.preventDefault();
        setSessionState({
            ...sessionState,
            tagListModalOpen: true,
            addTagModalOpen: false,
            taglistWithSession: taglistWithSession,
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
                let termIndex = allTags.findIndex(
                    (obj) => obj.term_id === editableTermId
                );
                allTags[termIndex].name = tagInput;
                await apiService
                    .dataAdd(`/messages/terms/${editableTermId}`, termData)
                    .then((response) => {
                        setTagState({
                            ...tagState,
                            tagLoader: false,
                            allTags: [...allTags],
                        });
                        setAddFormState({
                            ...addFormState,
                            tagInput: '',
                            addTagResponseStatus: 'success',
                            addTagResponse: 'Successfully Edited',
                        });
                    });
<<<<<<< HEAD
            } else {
                apiService
                    .dataAdd('/messages/terms', termData)
                    .then((response) => {
                        setTagState({
                            ...tagState,
                            tagLoader: false,
                            allTags: [...allTags, response.data],
                        });
                        setAddFormState({
                            ...addFormState,
                            tagInput: '',
                            addTagResponseStatus: 'success',
                            addTagResponse: 'Successfully Added',
                        });
=======
                    setAddFormState({
                        ...addFormState,
                        addTagResponseStatus: "success",
                        addTagResponse: "Successfully Edited",
>>>>>>> 83fb9b3e9eb81171751d4dc95c08ec97971b3350
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

        const fetchSessionTermCreation = await apiService.getAll('/sessions');
        setSessionState({
            ...sessionState,
            sessionList: fetchSessionTermCreation.data.data,
        });
    };

    const handleAssignList = (e) => {
        if (e.target.checked) {
            if (
                serverAssigned.indexOf(
                    e.target.id.replace('wpwax-vm-term-', '')
                ) === -1
            ) {
                /* nai */
                if (
                    newAssigned.indexOf(
                        e.target.id.replace('wpwax-vm-term-', '')
                    ) === -1
                ) {
                    /* nai */
                    setAddFormState({
                        ...addFormState,
                        newAssigned: [
                            ...addFormState.newAssigned,
                            e.target.id.replace('wpwax-vm-term-', ''),
                        ],
                    });
                    if (
                        newUnAssinged.indexOf(
                            e.target.id.replace('wpwax-vm-term-', '')
                        ) !== -1
                    ) {
                        /* achhe */
                        let virtualArray = [...newUnAssinged];
                        virtualArray.splice(
                            virtualArray.indexOf(
                                e.target.id.replace('wpwax-vm-term-', '')
                            ),
                            1
                        );
                        setAddFormState({
                            ...addFormState,
                            newUnAssinged: virtualArray,
                        });
                    }
                }
            } else {
                if (
                    newUnAssinged.indexOf(
                        e.target.id.replace('wpwax-vm-term-', '')
                    ) !== -1
                ) {
                    /* achhe */
                    let virtualArray = [...newUnAssinged];
                    virtualArray.splice(
                        virtualArray.indexOf(
                            e.target.id.replace('wpwax-vm-term-', '')
                        ),
                        1
                    );
                    setAddFormState({
                        ...addFormState,
                        newUnAssinged: virtualArray,
                    });
                }
            }
<<<<<<< HEAD

            // if(newUnAssinged.indexOf(e.target.id.replace('wpwax-vm-term-','')) !== -1){
            //     let virtualArray = [...newUnAssinged];
            //     virtualArray.splice(virtualArray.indexOf(e.target.id.replace('wpwax-vm-term-','')),2);
            //     setAddFormState({
            //         ...addFormState,
            //         newUnAssinged: virtualArray
            //     })
            // }
            if (asignedTerms.indexOf(e.target.id) === -1) {
                let ids = e.target.id.replace('wpwax-vm-term-', '');
=======
            
            if(asignedTerms.indexOf(e.target.id) === -1){
                let ids = e.target.id.replace('wpwax-vm-term-','')
>>>>>>> 83fb9b3e9eb81171751d4dc95c08ec97971b3350
                setSessionState({
                    ...sessionState,
                    asignedTerms: [...asignedTerms, ids],
                });
            }
        } else {
            if (
                serverAssigned.indexOf(
                    e.target.id.replace('wpwax-vm-term-', '')
                ) !== -1
            ) {
                /* achhe */
                if (
                    newUnAssinged.indexOf(
                        e.target.id.replace('wpwax-vm-term-', '')
                    ) === -1
                ) {
                    /* nai */
                    setAddFormState({
                        ...addFormState,
                        newUnAssinged: [
                            ...addFormState.newUnAssinged,
                            e.target.id.replace('wpwax-vm-term-', ''),
                        ],
                    });
                    if (
                        newAssigned.indexOf(
                            e.target.id.replace('wpwax-vm-term-', '')
                        ) !== -1
                    ) {
                        /* achhe */
                        let virtualArrayT = [...newAssigned];
                        virtualArrayT.splice(
                            virtualArrayT.indexOf(
                                e.target.id.replace('wpwax-vm-term-', '')
                            ),
                            1
                        );
                        setAddFormState({
                            ...addFormState,
                            newAssigned: virtualArrayT,
                        });
                    }
                }
            } else {
                if (
                    newAssigned.indexOf(
                        e.target.id.replace('wpwax-vm-term-', '')
                    ) !== -1
                ) {
                    /* achhe */
                    let virtualArrayT = [...newAssigned];
                    virtualArrayT.splice(
                        virtualArrayT.indexOf(
                            e.target.id.replace('wpwax-vm-term-', '')
                        ),
                        1
                    );
                    setAddFormState({
                        ...addFormState,
                        newAssigned: virtualArrayT,
                    });
                }
            }

            let ids = e.target.id.replace('wpwax-vm-term-', '');
            let array = [...asignedTerms];

            if (array.indexOf(ids) !== -1) {
                array.splice(array.indexOf(ids), 1);
                setSessionState({
                    ...sessionState,
                    asignedTerms: [...array],
                });
            }
        }
    };

    const handleAssignTerm = async (e) => {
        const updateTermData = {
            add_term_ids: newAssigned.join(','),
            remove_term_ids: newUnAssinged.join(','),
        };
        setTagState({
            ...tagState,
            tagLoader: true,
        });
        await apiService
            .dataAdd(
                `/sessions/${activeSessionId}/update-terms`,
                updateTermData
            )
            .then((response) => {
                setTagState({
                    ...tagState,
                    assignedTags: [
                        ...tagState.assignedTags,
                        response.data.data.success,
                    ],
                    tagLoader: false,
                });
                setAddFormState({
                    ...addFormState,
                    newAssigned: [],
                    newUnAssinged: [],
                });
            });

        const fetchSessionTermAdd = await apiService.getAll('/sessions');
<<<<<<< HEAD
        // console.log(fetchSessionTermAdd);
=======
        
>>>>>>> 83fb9b3e9eb81171751d4dc95c08ec97971b3350
        setSessionState({
            ...sessionState,
            sessionList: fetchSessionTermAdd.data.data,
        });
    };

<<<<<<< HEAD
    // console.log(asignedTerms, serverAssigned, newAssigned, newUnAssinged);

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
                        <img src={userImg} alt='Wpwax-vm-Tag Author' />
                        <span className='wpwax-vm-taglist-author__name'>
                            Tags Adnan
                        </span>
=======
    const currentUser = wpWaxCustomerSupportApp_CoreScriptData.current_user;
    let users = [];
    if(currentSession.length !== 0){
        users = currentSession[0].users.filter(p => p.id !== parseInt(currentUser.ID));
    }
    let images = [];
    let titleString = [];
    let multiImg = false;
    if(currentSession.length !== 0){
        if(currentSession[0].users.length === 1){
            images.push(currentSession[0].users[0].avater);
            titleString.push(currentSession[0].users[0].name)
        }else{
            for (let i = 0; i < users.length; i++) {
                images.push(users[i].avater);
                titleString.push(users[i].name)
            }
        }
    }

    if(images.length > 1){
        multiImg = true;
    }

    return (
        <React.Fragment>
            <AddTagWrap className={addTagModalOpen ? "wpwax-vm-modal wpwax-vm-show" : "wpwax-vm-modal"}>
                <div className="wpwax-vm-modal__header">
                    <div className="wpwax-vm-taglist-author">
                        {
                            taglistWithSession ? 
                            <div className="wpwax-vm-taglist-author__img">
                                {
                                    images.map((src, index) => {
                                        if(index === 0){
                                            if (src !== '') {
                                                return (
                                                    <img src={src} alt="" key={index} />
                                                )
                                            } else {
                                                return (
                                                    <img src={userImg} alt="" key={index} />
                                                )
                                            }
                                        }
                                        
                                    })
                                }
                                {
                                    multiImg ? <div className="wpwax-vm-more-img"><ReactSVG src={userIcon}/></div>:null
                                }
                            </div> : null
                        }
                        
                        <span className="wpwax-vm-taglist-author__name">{taglistWithSession ? `${editableTermId !=='' ? "Edit": "Add"} Tags of ${titleString}` : `Edit Tag`}</span>
>>>>>>> 83fb9b3e9eb81171751d4dc95c08ec97971b3350
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
<<<<<<< HEAD
                            <button
                                className='wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary'
                                onClick={(e) => handleCreateTerm(e)}
                            >
                                {editableTermId !== '' ? 'Edit' : 'Apply'}
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
                                    {allTags.length !== 0 ? (
                                        <a
                                            href='#'
                                            className='wpwax-vm-btnlink'
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
                                        {index ? ', ' : ''}
                                        {item.name}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
=======
                            <button className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary" onClick={e=>handleCreateTerm(e)}>{editableTermId !=='' ? "Apply": "Apply"}</button>
                        </div>
                    </form>
                    {
                        taglistWithSession ? 
                            <div className="wpwax-vm-taglist-box">
                                {
                                    tagLoader ?
                                    <span className="wpwax-vm-loading-spin">
                                        <span className="wpwax-vm-spin-dot"></span>
                                        <span className="wpwax-vm-spin-dot"></span>
                                        <span className="wpwax-vm-spin-dot"></span>
                                        <span className="wpwax-vm-spin-dot"></span>
                                    </span>: 
                                    <React.Fragment>
                                        <div className="wpwax-vm-taglist">
                                            {
                                                allTags.length !== 0 ?
                                                allTags.map((item,index)=>{
                                                    return(
                                                        <div className="wpwax-vm-tag__check" key={index}>
                                                            <Checkbox id={`wpwax-vm-term-${item.term_id}`} label={item.name} value={asignedTerms.indexOf(item.term_id) === -1 ? false : true} onChange={e=>handleAssignList(e)}/>
                                                        </div>
                                                    )
                                                })
                                                :
                                                <div className="wpwax-vm-empty">
                                                    {
                                                        <p>Please add tags before assign</p>
                                                    }
                                                </div>
                                            }
                                        </div>
                                        {
                                            allTags.length !== 0 ? <a href="#" className="wpwax-vm-btnlink" onClick={handleAssignTerm}>Update</a> : null
                                        }
                                    </React.Fragment>
                                }
                            </div> : 
                            <ul className="wpwax-vm-tags-readable-list">
                                {
                                    allTags.map((item,index)=>{
                                        return(
                                            <li key={index}>{item.name}{index !== allTags.length -1 ? ' , ': ''}</li>
                                        )
                                    })
                                }
                                
                            </ul>
                    }
>>>>>>> 83fb9b3e9eb81171751d4dc95c08ec97971b3350
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
