import { useSelector, useDispatch } from "react-redux";
import { chatBoxActions } from "../../store/chatbox-slice";

import classes from "./Welcome.scss";

function Welcome() {
	const showChatBox = useSelector((state) => state.chatBox.showChatBox);

	if (!showChatBox) {
		return null;
	}

	function videoHandler() {
		dispatch(chatBoxActions.chatType("video"));
		dispatch(chatBoxActions.chatStep("1"));
	}

	function screenRecordHandler() {}
	function voiceHandler() {}
	function textHandler() {}

	return (
		<div className={classes.welcome}>
			<div>
				Welcome to wpWax, Leave your question below and we'll get back
				to you asap.
			</div>
			<div>[Video Screen]</div>
			<div>How would you like to chat?</div>
			<div>
				<button onClick={videoHandler}>Video</button>
				<button onClick={screenRecordHandler}>Screen Record</button>
				<button onClick={voiceHandler}>Voice</button>
				<button onClick={textHandler}>Text</button>
			</div>
			<div>You can practise before sending</div>
			<div>Powered by wpWax</div>
		</div>
	);
}

export default Welcome;
