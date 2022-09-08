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
		tagInput: "",
	});
    
    const { sessionState, setSessionState, tagState, setTagState } = props;
    // console.log(sessionState);
    const { asignedTerms, activeSessionId, editableTermId, addTagModalOpen, taglistWithSession } = sessionState;
    const { allTags, assignedTags, tagLoader } = tagState;

    const { tagInput } = state;

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();
    
    useEffect(() => {
        
        
        if(editableTermId !== ""){
            let termName = tagInput;
            termName = allTags.filter(item=> item.term_id === editableTermId)[0].name;
            // console.log(allTags.filter(item=> item.term_id === editableTermId)[0].name);
            setState({
                ...tagState,
                tagInput: termName,
            });
        }else{
            setState({
                ...tagState,
                tagInput: "",
            });
        }
        
        // const fetchTerms = async ()=>{
        //     const termResponse = await apiService.getAll('/messages/terms');
        //     return termResponse;
        // }
		// fetchTerms()
        //     .then( termResponse => {
        //         let termName = "";
                
        //     })
		// 	.catch((error) => {
		// 		console.log(error);
		// 	})
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
            })
        }
        const fetchSessionTermCreation = await apiService.getAll('/sessions');
        setSessionState({
            ...sessionState,
            sessionList: fetchSessionTermCreation
        });
    }

    const handleAssignList = (e)=>{
        if(e.target.checked){
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
            let ids = e.target.id.replace('wpwax-vm-term-','');
            let array = [...asignedTerms];
            let index = array.indexOf(ids);
            
            if(index !== -1){
                array.splice(index,1);
                setSessionState({
                    ...sessionState,
                    asignedTerms: [...array]
                });
            }
        }
    }

    const handleAddTerm = async (e) =>{
        const updateTermData = {
            session_id: activeSessionId,
            term_id: asignedTerms.join(',')
        }
        setTagState({
            ...tagState,
            tagLoader: true,
        });
        await apiService.dataAdd('/sessions/add-terms',updateTermData)
        .then(response => {
            setTagState({
                ...tagState,
                assignedTags: [
                    ...tagState.assignedTags,
                    response.data.data.success
                ],
                tagLoader: false,
            });
        });

        const fetchSessionTermAdd = await apiService.getAll('/sessions');
        setSessionState({
            ...sessionState,
            sessionList: fetchSessionTermAdd
        });
    }

    console.log(tagState,sessionState);

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
                                        <a href="#" className="wpwax-vm-btnlink" onClick={handleAddTerm}>Update</a>
                                        {/* <a href="#" className="wpwax-vm-btnlink wpwax-vm-btn-danger">Remove</a> */}
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