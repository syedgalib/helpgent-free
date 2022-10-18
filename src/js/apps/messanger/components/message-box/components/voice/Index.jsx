import React from 'react';
import { useDispatch } from "react-redux";
import Record from './components/Record.jsx';
import { handleReplyModeChange } from '../../../../store/messages/actionCreator';

function App() {

    /* Dispasth is used for passing the actions to redux store  */
	const dispatch = useDispatch();

    /* Handle Close */
	const handleClose = (e) => {
		e.preventDefault();
		dispatch(handleReplyModeChange(false));
	}
    return (
        <div className='wpwax-vm-record-home wpwax-vm-h-100pr wpwax-vm-d-flex wpwax-vm-flex-direction-column wpwax-vm-justify-content-center'>
            <a href="#" className="wpwax-vm-record-home__close" onClick={handleClose}><span className="dashicons dashicons-no-alt"></span></a>
            <Record />
        </div>
    );
}

export default App;
