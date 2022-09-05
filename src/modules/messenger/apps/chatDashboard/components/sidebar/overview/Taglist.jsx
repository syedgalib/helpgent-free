import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
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
    const { sessionState, setSessionState } = props;
    const { activeSessionId, tagListModalOpen } = sessionState;
    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    /* initialize Form Data */
    const { allTags, modalOpen, sessions } = useSelector(state => {
        return {
            // activeSession: state.tags.activeSessionId,
            // modalOpen: state.tags.tagsModal,
            sessions: state.sessions.sessions
        };
    });

    // setSessionState({
    //     ...sessionState,
        
    // });

    /* Initialize State */
	const [tagState, setTagState] = useState({
        editableTerm: "",
        // allTagModalOpen: allTagModal,
		addTagModalOpen: false,
	});

    const { addTagModalOpen, allTagModalOpen } = tagState;

    let currentSession = []
    let allTerms = [];
    if(sessions.length !== 0){
        currentSession = sessions.filter(singleSession => singleSession.session_id === activeSessionId);
        // console.log(currentSession)
        currentSession.length !== 0 ? allTerms = currentSession[0].terms : null;
    }

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
    return (
        <TaglistWrap className={tagListModalOpen ? "wpwax-vm-modal wpwax-vm-show" : "wpwax-vm-modal"}>
            <div className="wpwax-vm-modal__header">
                <div className="wpwax-vm-taglist-author">
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
                    </div>
                    <span className="wpwax-vm-taglist-author__name">Tags {titleString}</span>
                </div>
                <a href="#" className="wpwax-vm-modal__close" onClick={handleCloseAllTagModal}><span className="dashicons dashicons-no-alt"></span></a>
            </div>

            <div className="wpwax-vm-modal__body">
                <div className="wpawax-vm-taglist-search">
                    <span className="dashicons dashicons-search"></span>
                    <input type="text" placeholder="Search" />
                </div>
                <div className="wpawax-vm-taglist-inner">
                    <ul>
                        {
                            allTerms.map( ( term,index ) => {
                                return(
                                    <li key={index}>
                                        <span className="wpwax-vm-taglist-label">{term.name}</span>
                                        <Dropdown dropdownText={false} dropdownIconOpen={ellipsisH} dropdownIconClose={ellipsisH} dropdownList={moreDropdown} outerState={sessionState} setOuterState={setSessionState} termId={term.term_id}/>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

            <div className="wpwax-vm-modal__footer">
                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-white" onClick={handleAddTagModal}>
                    <span className="wpwax-vm-btn-icon dashicons dashicons-plus"></span>
                    <span className="wpwax-vm-btn-text">New Tag</span>
                </a>
                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary" onClick={handleCloseAllTagModal}>Done</a>
            </div>
        </TaglistWrap>
    );
}

export default Taglist;