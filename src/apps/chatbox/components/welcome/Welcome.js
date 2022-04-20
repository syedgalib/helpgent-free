import { useSelector } from "react-redux";

import classes from "./Welcome.scss";

function Welcome() {
	const showChatBox = useSelector((state) => state.chatBox.showChatBox);

	if (!showChatBox) {
		return null;
	}

	return (
		<div className={classes.welcome}>
			<div>
				Welcome to wpWax, Leave your question below and we'll get back
				to you asap.
			</div>
			<div>[Video Screen]</div>
			<div>How would you like to chat?</div>
			<div>
				<button>Video</button>
				<button>Screen Record</button>
				<button>Voice</button>
				<button>Text</button>
			</div>
			<div>You can practise before sending</div>
			<div>Powered by wpWax</div>
		</div>
	);
}

export default Welcome;
