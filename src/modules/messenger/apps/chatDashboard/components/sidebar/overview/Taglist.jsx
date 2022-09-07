import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import apiService from 'apiService/Service.js';
import { TaglistWrap } from "./Style";
import userImg from "Assets/img/chatdashboard/user.png";
import Dropdown from "Components/formFields/Dropdown.jsx";
import ellipsisH from "Assets/svg/icons/ellipsis-h.svg";

import { handleTagModal, handleTagFormModal } from '../../../store/tags/actionCreator';

/* Dropdown Array Item Declaration */
const moreDropdown = [
    {
        name: "term-edit",
        text: "Edit"
    },
    {
        name: "term-delete",
        text: "Delete"
    }
];

const Taglist= props =>  {
    const overlay = document.querySelector('.wpax-vm-overlay');
    const { sessionState, setSessionState, tagState, setTagState } = props;
    const { editableTerm, allTags, addTagModalOpen, tagLoader } = tagState;
    const { activeSessionId, tagListModalOpen, taglistWithSession, loader } = sessionState;
    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    /* initialize Form Data */
    const { sessions } = useSelector(state => {
        return {
            sessions: state.sessions.sessions
        };
    });

    const currentSession = sessions.filter(singleSession => singleSession.session_id === activeSessionId);
    useEffect(() => {
        console.log(taglistWithSession)
        if(taglistWithSession){
            if(sessions.length !== 0){
                
                console.log(currentSession)
                currentSession.length !== 0 ?
                setTagState({
                    ...tagState,
                    allTags: currentSession[0].terms,
                    tagLoader: false
                }) : null;
            }
        }else{
            setTagState({
                ...tagState,
                tagLoader: true
            });
            const fetchTerms = async ()=>{
                const termResponse = await apiService.getAll('/messages/terms');
                return termResponse;
            }
            fetchTerms()
                .then( termResponse => {
                    setTagState({
                        ...tagState,
                        allTags: termResponse.data.data,
                        tagLoader: false
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
        }
	}, [tagListModalOpen, taglistWithSession]);

    /* Handle Add Tag */
    const handleAddTagModal = (event) => {
        event.preventDefault();
        setSessionState({
            ...sessionState,
            editableTermId: "",
            tagListModalOpen: false,
            addTagModalOpen: true
        });
        // dispatch(handleTagFormModal(true));
    }

    const handleCloseAllTagModal = (event)=>{
        event.preventDefault();
        overlay.classList.remove('wpwax-vm-show');
        setSessionState({
            ...sessionState,
            tagListModalOpen: false,
            addTagModalOpen: false
        });
    }

    const currentUser = wpWaxCustomerSupportApp_CoreScriptData.current_user;
    let users = [];
    if(currentSession.length !== 0){
        users = currentSession[0].users.filter(p => p.id !== parseInt(currentUser.ID));
    }
    let images = [];
    let titleString = [];
    let multiImg = false;
    for (let i = 0; i < users.length; i++) {
        images.push(users[i].avater);
        titleString.push(users[i].name)
    }

    if(images.length > 1){
        multiImg = true;
    }
    console.log(allTags);
    return (
        <TaglistWrap className={tagListModalOpen ? "wpwax-vm-modal wpwax-vm-show" : "wpwax-vm-modal"}>
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
                    
                    <span className="wpwax-vm-taglist-author__name"> {taglistWithSession ? `Tags ${titleString}` : "All Tags" } </span>
                </div>
                <a href="#" className="wpwax-vm-modal__close" onClick={handleCloseAllTagModal}><span className="dashicons dashicons-no-alt"></span></a>
            </div>

            <div className="wpwax-vm-modal__body">
                <div className="wpawax-vm-taglist-search">
                    <span className="dashicons dashicons-search"></span>
                    <input type="text" placeholder="Search" />
                </div>
                <div className="wpawax-vm-taglist-inner">
                    {
                        tagLoader ? 
                        <span className="wpwax-vm-loading-spin">
                            <span className="wpwax-vm-spin-dot"></span>
                            <span className="wpwax-vm-spin-dot"></span>
                            <span className="wpwax-vm-spin-dot"></span>
                            <span className="wpwax-vm-spin-dot"></span>
                        </span>
                        : 
                        <ul>
                            {
                                allTags.map( ( term,index ) => {
                                    return(
                                        <li key={index}>
                                            <span className="wpwax-vm-taglist-label">{term.name}</span>
                                            <Dropdown dropdownText={false} dropdownIconOpen={ellipsisH} dropdownIconClose={ellipsisH} dropdownList={moreDropdown} outerState={sessionState} setOuterState={setSessionState} sessionId={activeSessionId} termId={term.term_id}/>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }
                </div>
            </div>
            {
                taglistWithSession ? 
                    <div className="wpwax-vm-modal__footer">
                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-white" onClick={handleAddTagModal}>
                            <span className="wpwax-vm-btn-icon dashicons dashicons-plus"></span>
                            <span className="wpwax-vm-btn-text">New Tag</span>
                        </a>
                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary" onClick={handleCloseAllTagModal}>Done</a>
                    </div>: null
            }
            
        </TaglistWrap>
    );
}

export default Taglist;