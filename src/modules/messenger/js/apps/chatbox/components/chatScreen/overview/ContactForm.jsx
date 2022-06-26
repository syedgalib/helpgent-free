import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { chatBoxActions, sendMessage } from "../../../store/chatbox-slice";

function ContactForm() {
	const dispatch = useDispatch();
	const nameRef = useRef();
	const emailRef = useRef();

	const name = useSelector((state) => state.name);
	const email = useSelector((state) => state.email);

	function submitHandler(e) {
		e.preventDefault();

		const name = nameRef.current.value;
		const email = emailRef.current.value;

		dispatch(chatBoxActions.setContactInfo({ name, email }));
		dispatch(sendMessage());
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
					defaultValue={name}
					ref={nameRef}
					required
				/>
				<input
					placeholder="Your email*"
					type="email"
					defaultValue={email}
					ref={emailRef}
					required
				/>
				<button>Send</button>
			</form>
		</div>
	);
}

export default ContactForm;
