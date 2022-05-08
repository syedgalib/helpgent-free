import { useDispatch } from "react-redux";

import { chatBoxActions } from "Chatbox/store/chatbox-slice";

function Welcome() {
	const dispatch = useDispatch();

	function btnHandler(type) {
		dispatch(chatBoxActions.chatScreen(type));
		dispatch(chatBoxActions.chatStep(1));
	}

	return (
		<div>
			<div>
				Welcome to wpWax, Leave your question below and we'll get back
				to you asap.
			</div>
			<div>[Video Screen]</div>
			<div>How would you like to chat?</div>
			<div>
				<button onClick={() => btnHandler("video")}>Video</button>
				<button onClick={() => btnHandler("screenRecord")}>
					Screen Record
				</button>
				<button onClick={() => btnHandler("audio")}>Voice</button>
				<button onClick={() => btnHandler("text")}>Text</button>
			</div>
			<div>You can practise before sending</div>
			<div>Powered by wpWax</div>
		</div>
	);
}

export default Welcome;
