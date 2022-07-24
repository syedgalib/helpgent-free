import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TaglistWrap } from "./Style";
import { ReactSVG } from 'react-svg';
import AddTag from "./AddTag.jsx";
import { handleTagModal, handleTagFormModal } from '../../../store/tags/actionCreator';
import userImg from "../../../../../../assets/img/chatdashboard/user.png";
import Dropdown from "../../../../../../../../lib/components/formFields/Dropdown.jsx";
import ellipsisH from "../../../../../../assets/svg/icons/ellipsis-h.svg";

function Taglist() {

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    /* initialize Form Data */
    const { allTags, modalOpen } = useSelector(state => {
        return {
            activeAuthorId: state.tags.activeAuthorId,
            modalOpen: state.tags.tagsModal,
            allTags: state.tags,
        };
    });

    /* Dropdown Array Item Declaration */
    const moreDropdown = [
        {
            naem: "edit",
            text: "Edit"
        },
        {
            name: "delete",
            text: "Delete"
        }
    ];

    const handleCloseModal = (event) => {
        event.preventDefault();
        dispatch(handleTagModal(false));
    }

    const handleAddTagModal = (event) => {
        event.preventDefault();
        dispatch(handleTagFormModal(true));
    }

    return (
        <TaglistWrap className={modalOpen ? "wpwax-vm-modal wpwax-vm-show" : "wpwax-vm-modal"}>
            <div className="wpwax-vm-modal__header">
                <div className="wpwax-vm-taglist-author">
                    <img src={userImg} alt="Wpwax-vm-Tag Author" />
                    <span className="wpwax-vm-taglist-author__name">Tags Adnan</span>
                </div>
                <a href="#" className="wpwax-vm-modal__close" onClick={handleCloseModal}><span className="dashicons dashicons-no-alt"></span></a>
            </div>
            <div className="wpwax-vm-modal__body">
                <div className="wpawax-vm-taglist-search">
                    <span className="dashicons dashicons-search"></span>
                    <input type="text" placeholder="Search" />
                </div>
                <div className="wpawax-vm-taglist-inner">
                    <ul>
                        <li>
                            <span className="wpwax-vm-taglist-label">Food</span>
                            <Dropdown dropdownText={false} dropdownIconOpen={ellipsisH} dropdownIconClose={ellipsisH} dropdownList={moreDropdown} dropdownWidth="fixed" />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="wpwax-vm-modal__footer">
                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-white" onClick={handleAddTagModal}>
                    <span className="wpwax-vm-btn-icon dashicons dashicons-plus"></span>
                    <span className="wpwax-vm-btn-text">New Tag</span>
                </a>
                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary">Done</a>
            </div>
            <AddTag />
        </TaglistWrap>
    );
}

export default Taglist;