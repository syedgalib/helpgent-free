import { useSelector } from "react-redux";

import Container from "./overview/screen-wrapper/Index";
import Home from "./overview/home/index.jsx";
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

	const screens = {
		[ screenTypes.HOME ]: <Home />,
		[ screenTypes.VIDEO ]: <Video />,
		[ screenTypes.AUDIO ]: <Voice />,
		[ screenTypes.TEXT ]: <Text />,
		[ screenTypes.SCREEN_RECORD ]: <ScreenRecord />,
		[ screenTypes.CONTACT_FORM ]: <ContactForm />,
		[ screenTypes.SENDING ]: <Sending />,
		[ screenTypes.SENDING ]: <Success />,
	};

	function CurrentScreen() {
		if ( ! Object.keys( screens ).includes( currentChatScreen ) ) {
			return '';
		}

		return screens[ currentChatScreen ];
	}

	return (
		<Container>
			<CurrentScreen/>
		</Container>
	);
}

export default ChatScreen;