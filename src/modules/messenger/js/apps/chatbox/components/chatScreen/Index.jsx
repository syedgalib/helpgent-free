import { useSelector } from "react-redux";

import Container from "./pages/screen-wrapper/Index";
import Home from "./pages/home/Index.jsx";
import ContactForm from "./pages/ContactForm";
import Sending from "./pages/Sending";
import Success from "./pages/Success";
import Video from "./pages/video/Index";
import Voice from "./pages/voice/Index";
import Text from "./pages/text/Index";
import ScreenRecord from "./pages/screen-record/Index";
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