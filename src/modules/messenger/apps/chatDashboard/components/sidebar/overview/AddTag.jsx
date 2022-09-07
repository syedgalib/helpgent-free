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
		// console.log(state)
        return {
            sessions: state.sessions.sessions,
        };
    });
    
    const { sessionState, setSessionState, tagState, setTagState } = props;
    // console.log(sessionState);
    const { asignedTerms, activeSessionId, editableTermId, addTagModalOpen, taglistWithSession } = sessionState;
    const { tagInput, allTags, tagLoader } = tagState;

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchTerms = async ()=>{
            const termResponse = await apiService.getAll('/messages/terms');
            return termResponse;
        }
		fetchTerms()
            .then( termResponse => {
                let termName = "";
                console.log(editableTermId);
                if(editableTermId !== ""){
                    termName = termResponse.data.data.filter(item=> item.term_id === editableTermId)[0].name;
                    // console.log(termName[0].name);
                }
                
                setTagState({
                    ...tagState,
                    allTags: termResponse.data.data,
                    tagInput: termName,
                    tagLoader: false
                });
            })
			.catch((error) => {
				console.log(error);
			})
	}, [addTagModalOpen]);

    /* Handle Modal Close */
    const handleCloseModal = (event) => {
        event.preventDefault();
        setSessionState({
            ...sessionState,
            tagListModalOpen: true,
            addTagModalOpen: false,
            taglistWithSession: true
        });
        // dispatch(handleTagFormModal(false));
    }

    const handleTagInput = (e)=>{
        const tagName = e.target.value;
        
        setTagState({
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
                        response.data
                    ]
                });
                console.log(allTags)
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
                console.log(array, index);
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
            tagLoader: true
        });
        await apiService.dataAdd('/sessions/add-terms',updateTermData)
        .then(response => {
            console.log(response)
            setTagState({
                ...tagState,
                tagLoader: false,
            });
            sessions = {
                ...sessions,
                terms:{
                    ...sessions.terms,
                    ...response.data.data.success
                }
            }
        });
    }

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
                    </div>
                    
                </div>

                <div className="wpwax-vm-modal__footer">
                    <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-white" onClick={handleCloseModal}>Cancel</a>
                </div>
            </AddTagWrap>
        </React.Fragment>
    );
}

export default AddTag;