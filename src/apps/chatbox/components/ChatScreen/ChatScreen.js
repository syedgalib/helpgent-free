import { useSelector, useDispatch } from "react-redux";

import Welcome from "../welcome/Welcome";

function ChatScreen() {
	const chatScreen = useSelector((state) => state.chatScreen);

	return <div>{chatScreen == "welcome" && <Welcome />}</div>;
}

export default ChatScreen;
