import { useSelector, useDispatch } from "react-redux";

import Container from "Chatbox/components/ui/Container";
import Welcome from "Chatbox/components/Welcome";
import Video from "Chatbox/components/video/Index";

function ChatScreen() {
	const chatScreen = useSelector((state) => state.chatScreen);

	return (
		<Container>
			{chatScreen == "welcome" && <Welcome />}
			{chatScreen == "video" && <Video />}
		</Container>
	);
}

export default ChatScreen;
