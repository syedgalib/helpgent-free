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
    const { sessionState, setSessionState } = props;
    // console.log(sessionState);
    const { activeSessionId, activeTermId, addTagModalOpen } = sessionState;

    /* Initialize State */
	const [tagState, setTagState] = useState({
        tagInput: "",
		allTags: [],
        assignedTags: {},
        loading: true
	});

    const { tagInput, allTags, assignedTags, loading } = tagState;

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();


    useEffect(() => {
		apiService.getAll('/messages/terms')
			.then(response => {
				setTagState({
                    ...tagState,
                    allTags: response.data.data,
                    loading: false
                });
			})
			.catch((error) => {
				console.log(error);
			})
	}, []);

    /* Handle Modal Close */
    const handleCloseModal = (event) => {
        event.preventDefault();
        setSessionState({
            ...sessionState,
            tagListModalOpen: true,
            addTagModalOpen: false
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
    const handleAddTag = (e)=>{
        e.preventDefault();
        const termData = {
            taxonomy: "tag",
            name: tagInput
        }
        setTagState({
            ...tagState,
            loading: true
        });
        apiService.dataAdd('/messages/terms',termData)
        .then(response => {
            setTagState({
                ...tagState,
                loading: false,
                allTags: [
                    ...allTags,
                    response.data
                ]
            });
        })
    }

    const handleAssignList = (e)=>{
        console.log(e.target.checked)
        const id = e.target.id
        let tId = [];
        tId.push(id);
        const newlyAssigned = {
            sessssion_id: activeSessionId,
            term_id: tId
        }
        
        console.log(newlyAssigned)
        // setTagState({
        //     ...tagState,
        //     tagInput: e.target.value
        // });
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
                            <button className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary" onClick={e=>handleAddTag(e)}>Add</button>
                        </div>
                    </form>
                    <div className="wpwax-vm-taglist-box">
                        {
                            loading ? 
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
                                                <Checkbox id={`wpwax-vm-term-${item.term_id}`} label={item.name} isSelected={false} onChange={e=>handleAssignList(e)}/>
                                            </div>
                                            )
                                            
                                        })
                                    }
                                </div>
                                <a href="#" className="wpwax-vm-btnlink">Add</a>
                                <a href="#" className="wpwax-vm-btnlink wpwax-vm-btn-danger">Remove</a>
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