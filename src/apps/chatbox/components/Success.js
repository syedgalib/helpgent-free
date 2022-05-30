import { useDispatch } from "react-redux";
import { chatBoxActions } from "Chatbox/store/chatbox-slice";

function Success() {
	const dispatch = useDispatch();

	function btnHandler(e) {
		e.preventDefault();
		dispatch(chatBoxActions.chatScreen("welcome"));
	}

	return (
		<div>
			<p>Submission Success</p>
			<button onClick={btnHandler}>Start a new chat</button>
		</div>
	);
}

export default Success;
