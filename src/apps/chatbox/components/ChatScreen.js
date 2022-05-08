import { useSelector } from "react-redux";

import Container from "Chatbox/components/ui/Container";
import Welcome from "Chatbox/components/Welcome";
import Sending from "Chatbox/components/Sending";
import Success from "Chatbox/components/Success";
import Video from "Chatbox/components/video/Index";
import Audio from "Chatbox/components/audio/Index";
import Text from "Chatbox/components/text/Index";
import ScreenRecord from "Chatbox/components/screen-record/Index";

function ChatScreen() {
	const chatScreen = useSelector((state) => state.chatScreen);
	const sending = useSelector((state) => state.sending);
	const success = useSelector((state) => state.success);

	return (
		<Container>
			{chatScreen == "welcome" && <Welcome />}
			{chatScreen == "video" && <Video />}
			{chatScreen == "audio" && <Audio />}
			{chatScreen == "text" && <Text />}
			{chatScreen == "screenRecord" && <ScreenRecord />}

			{chatScreen == "sending" && <Sending />}
			{chatScreen == "success" && <Success />}
		</Container>
	);
}

export default ChatScreen;
