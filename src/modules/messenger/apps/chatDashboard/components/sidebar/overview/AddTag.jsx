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
    
    const { sessionState, setSessionState } = props;
    // console.log(sessionState);
    const { asignedTerms, activeSessionId, activeTermId, addTagModalOpen } = sessionState;

    /* Initialize State */
	const [tagState, setTagState] = useState({
        tagInput: "",
		allTerms: [],
        loading: true
	});

    const { tagInput, allTerms, loading } = tagState;

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchTerms = async ()=>{
            const response = await apiService.getAll('/messages/terms');
            setTagState({
                ...tagState,
                allTerms: response.data.data,
                loading: false
            });
        }
		fetchTerms()
			.catch((error) => {
				console.log(error);
			})
        
	}, [sessionState]);

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
    const handleCreateTerm = (e)=>{
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
                allTerms: [
                    ...allTerms,
                    response.data
                ]
            });
        })
    }

    console.log(sessionState);

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
            loading: true
        });
        await apiService.dataAdd('/sessions/add-terms',updateTermData)
        .then(response => {
            console.log(response)
            setTagState({
                ...tagState,
                loading: false,
            });
            sessions = {
                ...sessions,
                terms:{
                    ...sessions.terms,
                    ...response.data.data.success
                }
            }
        });
        console.log(sessions);
    }

    console.log(asignedTerms);

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
                            <button className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary" onClick={e=>handleCreateTerm(e)}>Add</button>
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
                                        allTerms.map((item,index)=>{
                                            
                                            return(
                                                <div className="wpwax-vm-tag__check" key={index}>
                                                    <Checkbox id={`wpwax-vm-term-${item.term_id}`} label={item.name} value={asignedTerms.indexOf(item.term_id) === -1 ? false : true} onChange={e=>handleAssignList(e)}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <a href="#" className="wpwax-vm-btnlink" onClick={handleAddTerm}>Add</a>
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