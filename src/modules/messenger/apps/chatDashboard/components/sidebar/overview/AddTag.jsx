import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddTagWrap } from "./Style";
import { ReactSVG } from 'react-svg';
import { handleTagModal, handleTagFormModal } from '../../../store/tags/actionCreator';
import userImg from "Assets/img/chatdashboard/user.png";
import Dropdown from "Components/formFields/Dropdown.jsx";
import ellipsisH from "Assets/svg/icons/ellipsis-h.svg";

function AddTag() {

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    /* initialize Form Data */
    const { modalOpen } = useSelector(state => {
        return {
            activeAuthorId: state.tags.activeAuthorId,
            modalOpen: state.tags.tagFormModal,
        };
    });

    const handleCloseModal = (event) => {
        event.preventDefault();
        dispatch(handleTagFormModal(false));
    }

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
                            <input type="text" className="wpwax-vm-form__element" placeholder="Ex. Travel" />
                        </div>
                        <button className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary">Add</button>
                    </div>
                </form>
            </div>
            <div className="wpwax-vm-modal__footer">
                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-white" onClick={handleCloseModal}>Cancel</a>
            </div>
        </AddTagWrap>
    );
}

export default AddTag;