import { useSelector } from "react-redux";

import classes from "./Welcome.scss";

function Welcome() {
	const showChatBox = useSelector((state) => state.chatBox.showChatBox);

	if (!showChatBox) {
		return null;
	}

	return <div className={classes.welcome}>Welcome Box</div>;
}

export default Welcome;
