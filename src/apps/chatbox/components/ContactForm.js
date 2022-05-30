import { useDispatch } from "react-redux";
import { useRef } from "react";
import { sendMessage } from "Chatbox/store/chatbox-slice";

function ContactForm() {
	const dispatch = useDispatch();
	const nameRef = useRef();
	const emailRef = useRef();

	function submitHandler(e) {
		e.preventDefault();

		const name = nameRef.current.value;
		const email = emailRef.current.value;

		dispatch(sendMessage({ name, email }));
	}

	return (
		<div>
			<p>
				Before you go, please leave your contact details so that we can
				get back to you...
			</p>
			<form onSubmit={submitHandler}>
				<input
					placeholder="Your name*"
					type="text"
					ref={nameRef}
					required
				/>
				<input
					placeholder="Your email*"
					type="email"
					ref={emailRef}
					required
				/>
				<button>Send</button>
			</form>
		</div>
	);
}

export default ContactForm;
