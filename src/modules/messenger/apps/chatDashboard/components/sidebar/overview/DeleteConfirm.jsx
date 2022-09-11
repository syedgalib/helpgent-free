import { useSelector, useDispatch } from "react-redux";
import apiService from 'apiService/Service.js';
import { DeleteConfirmWrap } from "./Style";
import { handleReadSessions } from '../../../store/sessions/actionCreator';

const DeleteConfirm = props => {
    const { deleteBy, modalOpen,  outerState, setOuterState } = props;

    /* initialize Form Data */
	 const { sessions, loading } = useSelector(state => {
		// console.log(state)
        return {
            sessions: state.sessions.sessions,
            loading: state.sessions.loading,
        };
    });
    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    /* Handle Modal Close */
    const handleCloseModal = (event) => {
        event.preventDefault();
        
        setOuterState({
            ...outerState,
            deleteModalOpen: !modalOpen
        });
        const overlay = document.querySelector('.wpax-vm-overlay');
        overlay.classList.remove('wpwax-vm-show');
    }

    const handledelete = async (event) =>{
        event.preventDefault();
        
        await apiService.datadelete(`/sessions/${deleteBy}`)
        .then(response => {
            const newSessionlist = sessions.filter(item=> item.session_id !== deleteBy);
            dispatch(handleReadSessions(newSessionlist));
            setOuterState({
                ...outerState,
                sessionList: newSessionlist,
                successMessage: `Session Successfully Deleted`,
                rejectMessage: "",
                deleteModalOpen: !modalOpen
            });
        })
        .catch(error => {
            console.log(error)
            if(error.code === 403){
                setOuterState({
                    ...outerState,
                    successMessage: "",
                    rejectMessage: "Wrong Resource Provided",
                    deleteModalOpen: !modalOpen
                });
                
            }else{
                setOuterState({
                    ...outerState,
                    successMessage: "",
                    rejectMessage: "Server Not exist",
                    deleteModalOpen: !modalOpen
                });
                
            }
        })
        const overlay = document.querySelector('.wpax-vm-overlay');
        overlay.classList.remove('wpwax-vm-show');

    }

    return (
        <DeleteConfirmWrap className={modalOpen ? "wpax-vm-delete-conf-modal wpwax-vm-modal wpwax-vm-show" : "wpax-vm-delete-conf-modal wpwax-vm-modal"}>
            <div className="wpwax-vm-modal__body">
                <div className="wpwax-vm-delete-icon">
                    <span className="dashicons dashicons-trash"></span>
                </div>
                <p>Are you sure you want to delete this conversation?</p>
            </div>

            <div className="wpwax-vm-modal__footer">
                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-gray" onClick={handleCloseModal}>Cancel</a>
                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-danger" onClick={handledelete}>Delete</a>
            </div>
        </DeleteConfirmWrap>
    );
}

export default DeleteConfirm;