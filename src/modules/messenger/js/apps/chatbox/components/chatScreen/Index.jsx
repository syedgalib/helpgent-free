import { useSelector } from "react-redux";

import Container from "./overview/screen-wrapper/Index";
import Welcome from "./overview/home/Welcome.jsx";
import ContactForm from "./overview/ContactForm";
import Sending from "./overview/Sending";
import Success from "./overview/Success";
import Video from "./overview/video/Index";
import Voice from "./overview/voice/Index";
import Text from "./overview/text/Index";
import ScreenRecord from "./overview/screen-record/Index";
import screenTypes from "../../store/chatbox/screenTypes";

function ChatScreen() {
	const { currentChatScreen } = useSelector(state => {
        return {
            currentChatScreen: state.chatbox.currentChatScreen,
        };
    });

	return (
		<Container>
			{ currentChatScreen == screenTypes.HOME && <Welcome /> }
			{ currentChatScreen == screenTypes.VIDEO && <Video /> }
			{ currentChatScreen == screenTypes.AUDIO && <Voice /> }
			{ currentChatScreen == screenTypes.TEXT && <Text /> }
			{ currentChatScreen == screenTypes.SCREEN_RECORD && <ScreenRecord /> }

			{ currentChatScreen == screenTypes.CONTACT_FORM && <ContactForm /> }
			{ currentChatScreen == screenTypes.SENDING && <Sending /> }
			{ currentChatScreen == screenTypes.SUCCESS && <Success /> }
		</Container>
	);
}

export default ChatScreen;