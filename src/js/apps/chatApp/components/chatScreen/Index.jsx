import { useSelector } from "react-redux";

import Container from "./overview/screen-wrapper/Index";
import Welcome from "./overview/Welcome";
import ContactForm from "./overview/ContactForm";
import Sending from "./overview/Sending";
import Success from "./overview/Success";
import Video from "./overview/video/Index";
import Audio from "./overview/audio/Index";
import Text from "./overview/text/Index";
import ScreenRecord from "./overview/screen-record/Index";

function ChatScreen() {
	const chatScreen = useSelector((state) => state.chatScreen);

	return (
		<Container>
			{chatScreen == "welcome" && <Welcome />}
			{chatScreen == "video" && <Video />}
			{chatScreen == "audio" && <Audio />}
			{chatScreen == "text" && <Text />}
			{chatScreen == "screenRecord" && <ScreenRecord />}

			{chatScreen == "contactForm" && <ContactForm />}
			{chatScreen == "sending" && <Sending />}
			{chatScreen == "success" && <Success />}
		</Container>
	);
}

export default ChatScreen;