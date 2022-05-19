import { useDispatch } from "react-redux";
import { useRef } from "react";
import { chatBoxActions } from "Chatbox/store/chatbox-slice";

function ContactForm() {
	const dispatch = useDispatch();
	const nameRef = useRef();
	const emailRef = useRef();

	function submitHandler(e) {
		e.preventDefault();
		const name = textRef.current.value;
		const email = emailRef.current.value;

		dispatch(chatBoxActions.sendData(name, email));
	}
	console.log('ok')
	return (
		<div>
			<p>
				Before you go, please leave your contact details so that we can get back to you...
			</p>
			<form onSubmit={submitHandler}>
				<input type="text" ref={nameRef} required />
				<input type="email" ref={emailRef} required />
				<button>Send</button>
			</form>
		</div>
	);
}

export default ContactForm;
