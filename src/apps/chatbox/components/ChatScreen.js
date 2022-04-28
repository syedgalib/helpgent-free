import { useSelector, useDispatch } from "react-redux";

import Welcome from "Chatbox/components/Welcome";

function ChatScreen() {
	const chatScreen = useSelector((state) => state.chatScreen);

	return <div>{chatScreen == "welcome" && <Welcome />}</div>;
}

export default ChatScreen;
