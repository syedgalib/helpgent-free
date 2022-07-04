import { useDispatch } from "react-redux";
import { useRef } from "react";
import { upateFormData } from "../../../../store/forms/messenger/actionCreator";
import { changeChatScreen } from "../../../../store/chatbox/actionCreator";
import screenTypes from "../../../../store/chatbox/screenTypes";
import messageTypes from "../../../../store/forms/messenger/messageTypes";

function Form() {
	const dispatch = useDispatch();
	const textRef  = useRef();

	function submitHandler(e) {
		e.preventDefault();

		const updatedFormData = {
			message_type: messageTypes.TEXT,
			message: textRef.current.value,
		};

		dispatch( upateFormData( updatedFormData ) );
		dispatch( changeChatScreen( screenTypes.CONTACT_FORM ) );
	}
	
	return (
		<form onSubmit={submitHandler} className="wpwax-vm-h-100pr">
			<div className="wpwax-vm-d-flex wpwax-vm-h-100pr wpwax-vm-flex-direction-column">
				<div className="wpwax-vm-body wpwax-vm-flex-grow-1">
					<div className="wpwax-vm-form-group wpwax-vm-h-100pr wpwax-vm-d-flex wpwax-vm-flex-direction-column">
						<textarea
							className="wpwax-vm-form__element wpwax-vm-transparent-form-control wpwax-vm-flex-grow-1 wpwax-vm-mb-20"
							required
							maxLength="1000"
							row="10"
							placeholder="Type your text..."
							ref={textRef}
						></textarea>
					</div>
				</div>

				<div className="wpwax-vm-footer">
					<button type="submit" className="wpwax-vm-btn wpwax-vm-w-f wpwax-vm-btn-block wpwax-vm-btn-lg wpwax-vm-btn-primary">
						Next
					</button>
				</div>
			</div>
		</form>
	);
}

export default Form;
