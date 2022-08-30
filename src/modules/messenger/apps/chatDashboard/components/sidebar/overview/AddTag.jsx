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

function AddTag() {

    /* Initialize State */
	const [tagState, setTagState] = useState({
        tagInput: "",
		allTags: [],
        loading: true
	});

    const { tagInput, allTags, loading } = tagState;

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    /* initialize Form Data */
    const { modalOpen } = useSelector(state => {
        return {
            // activeAuthorId: state.tags.activeAuthorId,
            // allTags: state.tags.allTags,
            modalOpen: state.tags.tagFormModal,
        };
    });

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
        dispatch(handleTagFormModal(false));
    }

    const handleTagInput = (e)=>{
        console.log(e);
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
        apiService.dataAdd('/messages/terms',termData)
        .then(response => {
            setTagState({
                ...tagState,
                allTags: [
                    ...allTags,
                    response.data
                ]
            });
            console.log(response);
        })
    }

    console.log(allTags)

    return (
        <AddTagWrap className={modalOpen ? "wpwax-vm-modal wpwax-vm-show" : "wpwax-vm-modal"}>
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
                                            <Checkbox id={`wpwax-vm${item.term_id}`} label={item.name} isSelected={false} />
                                        </div>
                                        )
                                        
                                    })
                                }
                            </div>
                            <a href="#" className="wpwax-vm-btnlink">Save</a>
                        </React.Fragment>
                    }
                </div>
                
            </div>

            <div className="wpwax-vm-modal__footer">
                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-white" onClick={handleCloseModal}>Cancel</a>
            </div>
        </AddTagWrap>
    );
}

export default AddTag;