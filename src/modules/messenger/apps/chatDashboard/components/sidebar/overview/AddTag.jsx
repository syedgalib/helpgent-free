import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddTagWrap } from "./Style";
import { ReactSVG } from 'react-svg';
import Checkbox from "Components/formFields/Checkbox.jsx";
import { handleTagModal, handleTagFormModal } from '../../../store/tags/actionCreator';
import apiService from 'apiService/Service.js';
import userImg from "Assets/img/chatdashboard/user.png";
import Dropdown from "Components/formFields/Dropdown.jsx";
import ellipsisH from "Assets/svg/icons/ellipsis-h.svg";
import Taglist from "./Taglist.jsx";

const AddTag = props => {
    
    /* initialize Form Data */
	const { sessions } = useSelector(state => {
        return {
            sessions: state.sessions.sessions,
        };
    });

    const [state, setState] = useState({
        newAssigned: [],
        newUnAssinged: [],
        addTagResponse: "",
        addTagResponseStatus: "",
		tagInput: "",
	});
    
    const { sessionState, setSessionState, tagState, setTagState } = props;
    // console.log(sessionState);
    const { serverAssigned, asignedTerms, unAsignedTerms, activeSessionId, editableTermId, addTagModalOpen, taglistWithSession } = sessionState;
    const { allTags, assignedTags, tagLoader } = tagState;

    const { addTagResponseStatus, addTagResponse, tagInput, newAssigned, newUnAssinged } = state;

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();
    
    useEffect(() => {
        
        if(editableTermId !== ""){
            let termName = tagInput;
            termName = allTags.filter(item=> item.term_id === editableTermId)[0].name;
            // console.log(allTags.filter(item=> item.term_id === editableTermId)[0].name);
            setState({
                ...state,
                tagInput: termName,
            });
        }else{
            setState({
                ...state,
                tagInput: "",
            });
        }
        setState({
            ...state,
            addTagResponse: "",
        });
	}, [addTagModalOpen]);

    /* Handle Modal Close */
    const handleCloseModal = (event) => {
        event.preventDefault();
        setSessionState({
            ...sessionState,
            tagListModalOpen: true,
            addTagModalOpen: false,
            taglistWithSession: taglistWithSession
        });
        // dispatch(handleTagFormModal(false));
    }

    const handleTagInput = (e)=>{
        const tagName = e.target.value;
        setState({
            ...tagState,
            tagInput: e.target.value
        });
    }
    const handleCreateTerm = async (e)=>{
        e.preventDefault();
        const termData = {
            taxonomy: "tag",
            name: tagInput
        }
        setTagState({
            ...tagState,
            tagLoader: true
        });
        if(tagInput !==""){
            if(editableTermId !==''){
                let termIndex = allTags.findIndex(obj => obj.term_id === editableTermId);
                allTags[termIndex].name = tagInput;
                await apiService.dataAdd(`/messages/terms/${editableTermId}`,termData)
                .then(response => {
                    setTagState({
                        ...tagState,
                        tagLoader: false,
                        allTags: [
                            ...allTags,
                        ]
                    });
                    setState({
                        ...state,
                        addTagResponseStatus: "success",
                        addTagResponse: "Successfully Edited",
                    });
                })
            }else{
                apiService.dataAdd('/messages/terms',termData)
                .then(response => {
                    setTagState({
                        ...tagState,
                        tagLoader: false,
                        allTags: [
                            ...allTags,
                            response.data
                        ]
                    });
                    setState({
                        ...state,
                        addTagResponseStatus: "success",
                        addTagResponse: "Successfully Added",
                    });
                })
            }
        }else{
            setState({
                ...state,
                addTagResponseStatus: "danger",
                addTagResponse: "Please enter Tag",
            });
            setTagState({
                ...tagState,
                tagLoader: false
            });
        }
        
        const fetchSessionTermCreation = await apiService.getAll('/sessions');
        setSessionState({
            ...sessionState,
            sessionList: fetchSessionTermCreation
        });
    }
    
    const handleAssignList = (e)=>{
        if(e.target.checked){
            if(serverAssigned.indexOf(e.target.id.replace('wpwax-vm-term-','')) === -1){
                /* nai */
                if (newAssigned.indexOf(e.target.id.replace('wpwax-vm-term-','')) === -1){
                    /* nai */
                    setState({
                        ...state,
                        newAssigned: [
                            ...state.newAssigned,
                            e.target.id.replace('wpwax-vm-term-','')
                        ]
                    });
                    if(newUnAssinged.indexOf(e.target.id.replace('wpwax-vm-term-','')) !== -1){
                        /* achhe */
                        let virtualArray = [...newUnAssinged];
                        virtualArray.splice(virtualArray.indexOf(e.target.id.replace('wpwax-vm-term-','')),1);
                        setState({
                            ...state,
                            newUnAssinged: virtualArray
                        })
                    }
                }
            }else{
                if(newUnAssinged.indexOf(e.target.id.replace('wpwax-vm-term-','')) !== -1){
                    /* achhe */
                    let virtualArray = [...newUnAssinged];
                    virtualArray.splice(virtualArray.indexOf(e.target.id.replace('wpwax-vm-term-','')),1);
                    setState({
                        ...state,
                        newUnAssinged: virtualArray
                    })
                } 
            }
            
            // if(newUnAssinged.indexOf(e.target.id.replace('wpwax-vm-term-','')) !== -1){
            //     let virtualArray = [...newUnAssinged];
            //     virtualArray.splice(virtualArray.indexOf(e.target.id.replace('wpwax-vm-term-','')),2);
            //     setState({
            //         ...state,
            //         newUnAssinged: virtualArray
            //     })
            // }
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
            if(serverAssigned.indexOf(e.target.id.replace('wpwax-vm-term-','')) !== -1){
                /* achhe */
                if (newUnAssinged.indexOf(e.target.id.replace('wpwax-vm-term-','')) === -1){
                    /* nai */
                    setState({
                        ...state,
                        newUnAssinged: [
                            ...state.newUnAssinged,
                            e.target.id.replace('wpwax-vm-term-','')
                        ]
                    });
                    if(newAssigned.indexOf(e.target.id.replace('wpwax-vm-term-','')) !== -1){
                        /* achhe */
                        let virtualArrayT = [...newAssigned];
                        virtualArrayT.splice(virtualArrayT.indexOf(e.target.id.replace('wpwax-vm-term-','')),1);
                        setState({
                            ...state,
                            newAssigned: virtualArrayT
                        })
                    }
                }
            }else{
                if(newAssigned.indexOf(e.target.id.replace('wpwax-vm-term-','')) !== -1){
                    /* achhe */
                    let virtualArrayT = [...newAssigned];
                    virtualArrayT.splice(virtualArrayT.indexOf(e.target.id.replace('wpwax-vm-term-','')),1);
                    setState({
                        ...state,
                        newAssigned: virtualArrayT
                    })
                }
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
            add_term_ids: newAssigned.join(','),
            remove_term_ids: newUnAssinged.join(',')
        }
        setTagState({
            ...tagState,
            tagLoader: true,
        });
        await apiService.dataAdd(`/sessions/${activeSessionId}/update-terms`,updateTermData)
        .then(response => {
            setTagState({
                ...tagState,
                assignedTags: [
                    ...tagState.assignedTags,
                    response.data.data.success
                ],
                tagLoader: false,
            });
            setState({
                ...state,
                newAssigned: [],
                newUnAssinged: []
            });
        });

        const fetchSessionTermAdd = await apiService.getAll('/sessions');
        console.log(fetchSessionTermAdd)
        setSessionState({
            ...sessionState,
            sessionList: fetchSessionTermAdd.data.data
        });
    }

    console.log(asignedTerms, serverAssigned,newAssigned,newUnAssinged);

    return (
        <React.Fragment>
            <AddTagWrap className={addTagModalOpen ? "wpwax-vm-modal wpwax-vm-show" : "wpwax-vm-modal"}>
                <div className="wpwax-vm-modal__header">
                    <div className="wpwax-vm-taglist-author">
                        <img src={userImg} alt="Wpwax-vm-Tag Author" />
                        <span className="wpwax-vm-taglist-author__name">Tags Adnan</span>
                    </div>
                    <a href="#" className="wpwax-vm-modal__close" onClick={handleCloseModal}><span className="dashicons dashicons-no-alt"></span></a>
                </div>

                <div className="wpwax-vm-modal__body">
                    {
                        addTagResponse !== '' ? 
                        <div className={`wpwax-vm-notice wpwax-vm-notice-${addTagResponseStatus}`}>
                            <p>{addTagResponse}</p>
                        </div> : null
                    }
                    <form action="">
                        <div className="wpwax-vm-addtag-form">
                            <div className="wpwax-vm-form-group">
                                <input type="text" className="wpwax-vm-form__element" placeholder="Ex. Travel" value={tagInput} onChange={e=>handleTagInput(e)}/>
                            </div>
                            <button className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary" onClick={e=>handleCreateTerm(e)}>{editableTermId !=='' ? "Edit": "Add"}</button>
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
                                                allTags.map((item,index)=>{
                                                    
                                                    return(
                                                        <div className="wpwax-vm-tag__check" key={index}>
                                                            <Checkbox id={`wpwax-vm-term-${item.term_id}`} label={item.name} value={asignedTerms.indexOf(item.term_id) === -1 ? false : true} onChange={e=>handleAssignList(e)}/>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <a href="#" className="wpwax-vm-btnlink" onClick={handleAssignTerm}>Update</a>
                                    </React.Fragment>
                                }
                            </div> : 
                            <ul className="wpwax-vm-tags-readable-list">
                                {
                                    allTags.map((item,index)=>{
                                        return(
                                            <li key={index}>{index ? ', ': ''}{item.name}</li>
                                        )
                                    })
                                }
                                
                            </ul>
                    }
                </div>

                <div className="wpwax-vm-modal__footer">
                    <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-white" onClick={handleCloseModal}>Cancel</a>
                </div>
            </AddTagWrap>
        </React.Fragment>
    );
}

export default AddTag;