import { useSelector } from "react-redux";

import Container from "./pages/screen-wrapper/Index.jsx";
import Home from "./pages/home/Index.jsx";
import ContactForm from "./pages/contactForm/Index.jsx";
import Sending from "./pages/Sending.jsx";
import Success from "./pages/Success.jsx";
import Video from "./pages/video/Index.jsx";
import Voice from "./pages/voice/Index.jsx";
import Text from "./pages/text/Index.jsx";
import ScreenRecord from "./pages/screen-record/Index.jsx";
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
		[ screenTypes.SUCCESS ]: <Success />,
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