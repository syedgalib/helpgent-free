import React from 'react';
import { useDispatch } from 'react-redux';
import Form from "./Form.jsx";
import ReactSVG from 'react-inlinesvg';
import arrowRight from 'Assets/svg/icons/arrow-small-right.svg';
import screenTypes from '../../../../store/chatbox/screenTypes';
import { changeChatScreen } from '../../../../store/chatbox/actionCreator';

function Text() {

	const dispatch = useDispatch();

	function handleBackScreen() {
		dispatch( changeChatScreen( screenTypes.HOME ) );
	}
	return (
		<div className="wpwax-vm-h-100pr wpwax-vm-chatbox-text">
			<a href="#" className="wpwax-vm-btn-back" onClick={handleBackScreen}><ReactSVG src={arrowRight} /></a>
			<Form />
		</div>
	);
}

export default Text;
