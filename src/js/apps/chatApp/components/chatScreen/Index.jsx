import { useSelector } from "react-redux";

import Container from "./overview/screen-wrapper/Index";
import Welcome from "./overview/Welcome";
import ContactForm from "./overview/ContactForm";
import Sending from "./overview/Sending";
import Success from "./overview/Success";
import Video from "./overview/video/Index";
import Voice from "./overview/voice/Index";
import Text from "./overview/text/Index";
import ScreenRecord from "./overview/screen-record/Index";

function ChatScreen() {
	
	// const chatScreen = useSelector((state) => state.chatScreen);
	const { chatScreen, displayChatScreen } = useSelector(state => {
        return {
            chatScreen: state.chatBox.chatScreen,
            displayChatScreen: state.chatBox.displayChatScreen,
        };
    });
	console.log(chatScreen,displayChatScreen);
	return (
		<Container>
			{chatScreen == "welcome" && <Welcome />}
			{chatScreen == "video" && <Video />}
			{chatScreen == "voice" && <Voice />}
			{chatScreen == "text" && <Text />}
			{chatScreen == "screenRecord" && <ScreenRecord />}

			{chatScreen == "contactForm" && <ContactForm />}
			{chatScreen == "sending" && <Sending />}
			{chatScreen == "success" && <Success />}
		</Container>
	);
}

export default ChatScreen;