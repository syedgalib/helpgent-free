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
    const { editableTerm, assignedTags, allTags, filteredTagList, addTagModalOpen, tagLoader } = tagState;
    const { sessionList, activeSessionId, tagListModalOpen, taglistWithSession, loader } = sessionState;
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
        setTagState({
            ...tagState,
            tagLoader: true
        });
        const fetchTerms = async ()=>{
			const termsResponse = await apiService.getAll('/messages/terms')
			return termsResponse;
		}
        fetchTerms()
			.then( termsResponse => {
				
				setTagState({
					...tagState,
					allTags: termsResponse.data.data,
					filteredTagList: termsResponse.data.data,
					tagLoader: false
				});
				const currentSession = sessionList.filter(singleSession => singleSession.session_id === activeSessionId);
				if(taglistWithSession){
					if(sessionList.length !== 0){
                        if(currentSession.length !== 0){
                            setTagState({
                                ...tagState,
                                assignedTags: currentSession[0].terms,
                                filteredTagList: currentSession[0].terms,
                                tagLoader: false
                            });
                        }
					}
				}
			})
			.catch((error) => {
				console.log(error);
			})
	}, [tagListModalOpen]);

    /* Handle Add Tag */
    const handleAddTagModal = (event) => {
        event.preventDefault();
        setSessionState({
            ...sessionState,
            editableTermId: "",
            tagListModalOpen: false,
            addTagModalOpen: true,
            taglistWithSession: true
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

    const handleTagFilter = event =>{
        let keyword = event.target.value;
        const filteredTags = taglistWithSession ? assignedTags.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(keyword))) : allTags.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(keyword)));
        
        setTagState({
            ...tagState,
            filteredTagList: filteredTags
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
                    <span className="wpwax-vm-taglist-author__name"> {taglistWithSession ? `Tags of ${titleString}` : "All Tags" } </span>
                </div>
                <a href="#" className="wpwax-vm-modal__close" onClick={handleCloseAllTagModal}><span className="dashicons dashicons-no-alt"></span></a>
            </div>

            <div className="wpwax-vm-modal__body">
                <div className="wpawax-vm-taglist-search">
                    <span className="dashicons dashicons-search"></span>
                    <input type="text" placeholder="Search" id="wpwax-vm-filter-taglist" onChange={handleTagFilter}/>
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
                        filteredTagList.length > 0 ? 
                        <ul>
                            {
                                taglistWithSession ? 
                                filteredTagList.map( ( term,index ) => {
                                        return(
                                            <li key={index}>
                                                <span className="wpwax-vm-taglist-label">{term.name}</span>
                                                <Dropdown dropdownText={false} dropdownIconOpen={ellipsisH} dropdownIconClose={ellipsisH} dropdownList={moreDropdown} outerState={sessionState} setOuterState={setSessionState} termState={tagState} setTermState={setTagState} sessionId={activeSessionId} termId={term.term_id}/>
                                            </li>
                                        )
                                    })
                                :
                                filteredTagList.map( ( term,index ) => {
                                    return(
                                        <li key={index}>
                                            <span className="wpwax-vm-taglist-label">{term.name}</span>
                                            <Dropdown dropdownText={false} dropdownIconOpen={ellipsisH} dropdownIconClose={ellipsisH} dropdownList={moreDropdown} outerState={sessionState} setOuterState={setSessionState} termState={tagState} setTermState={setTagState} sessionId={activeSessionId} termId={term.term_id}/>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        :
                        <div className="wpwax-vm-empty">
                            {
                                taglistWithSession ?<p>Sorry!! No Assigned Tags Found</p> : <p>Sorry!! No Tags Found</p>
                            }
                        </div>
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