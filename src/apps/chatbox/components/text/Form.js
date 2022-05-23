import { useDispatch } from "react-redux";
import { useRef } from "react";
import { chatBoxActions } from "Chatbox/store/chatbox-slice";

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
		<form onSubmit={submitHandler}>
			<textarea
				required
				maxLength="1000"
				row="5"
				placeholder="Type your text..."
				ref={textRef}
			></textarea>
			<button>Send</button>
		</form>
	);
}

export default Form;
