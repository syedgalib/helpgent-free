import { useSelector, useDispatch } from "react-redux";
import AddTag from "./AddTag.jsx";
import { TaglistWrap } from "./Style";
import userImg from "Assets/img/chatdashboard/user.png";
import Dropdown from "Components/formFields/Dropdown.jsx";
import ellipsisH from "Assets/svg/icons/ellipsis-h.svg";

import { handleTagModal, handleTagFormModal } from '../../../store/tags/actionCreator';

/* Dropdown Array Item Declaration */
const moreDropdown = [
    {
        name: "edit",
        text: "Edit"
    },
    {
        name: "delete",
        text: "Delete"
    }
];

function Taglist() {

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    /* initialize Form Data */
    const { allTags, activeAuthorId, modalOpen } = useSelector(state => {
        return {
            activeAuthorId: state.tags.activeAuthorId,
            allTags: state.tags.allTags,
            modalOpen: state.tags.tagsModal
        };
    });

    /* Handle Modal Close */
    const handleCloseModal = (event) => {
        event.preventDefault();
        dispatch(handleTagModal(false));
    }

    /* Handle Add Tag */
    const handleAddTagModal = (event) => {
        event.preventDefault();
        dispatch(handleTagFormModal(true));
    }

    const userTag = allTags.filter(tag => tag.authorId === activeAuthorId);

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
                        {
                            userTag.map(tag => {
                                <li>
                                    <span className="wpwax-vm-taglist-label">{tag.label}</span>
                                    <Dropdown dropdownText={false} dropdownIconOpen={ellipsisH} dropdownIconClose={ellipsisH} dropdownList={moreDropdown} dropdownWidth="fixed" />
                                </li>
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
                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary">Done</a>
            </div>

            <AddTag />
        </TaglistWrap>
    );
}

export default Taglist;