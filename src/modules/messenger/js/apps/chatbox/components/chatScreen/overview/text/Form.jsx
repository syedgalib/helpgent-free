import { useDispatch } from "react-redux";
import { useRef } from "react";
import { chatBoxActions } from "../../../../store/chatbox-slice";

function Form() {
	const dispatch = useDispatch();
	const textRef = useRef();

	function submitHandler(e) {
		e.preventDefault();
		const text = textRef.current.value;

		const data = {
			type: "text",
			text: text,
		};

		dispatch(chatBoxActions.setData(data));
		dispatch(chatBoxActions.chatScreen('contactForm'));
	}
	
	return (
		<form onSubmit={submitHandler} className="wpwax-vm-h-100pr">
			<div className="wpwax-vm-d-flex wpwax-vm-h-100pr wpwax-vm-flex-direction-column">
				<div className="wpwax-vm-body wpwax-vm-d-flex-grow-1">
					<div className="wpwax-vm-form-group">
						<textarea
							className="wpwax-vm-form__element wpwax-vm-transparent-form-control"
							required
							maxLength="1000"
							row="10"
							placeholder="Type your text..."
							ref={textRef}
						></textarea>
					</div>
				</div>

				<div className="wpwax-vm-footer">
					<button className="wpwax-vm-btn wpwax-vm-w-f wpwax-vm-d-block wpwax-vm-btn-lg wpwax-vm-btn-primary">
						Send
					</button>
				</div>
			</div>
		</form>
	);
}

export default Form;
