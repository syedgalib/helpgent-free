import { useDispatch, useSelector } from 'react-redux';

import Container from './components/screen-wrapper/Index.jsx';
import Home from './components/home/Index.jsx';
import ContactForm from './components/contact-form/Index.jsx';
import UserAuthenticationForm from './components/user-authentication-form/Index.jsx';
import Sending from './components/Sending.jsx';
import Success from './components/Success.jsx';
import Video from './components/video/Index.jsx';
import Voice from './components/voice/Index.jsx';
import Text from './components/text/Index.jsx';
import ScreenRecord from './components/screen-record/Index.jsx';
import screenTypes from '../../store/chatbox/screenTypes';
import { useFormHooks } from '../../store/forms/hooks.js';

function ChatScreen() {
    useFormHooks();

    const { currentChatScreen } = useSelector((state) => {
        return {
            currentChatScreen: state.chatbox.currentChatScreen,
        };
    });

    const screens = {
        [screenTypes.HOME]: <Home />,
        [screenTypes.VIDEO]: <Video />,
        [screenTypes.AUDIO]: <Voice />,
        [screenTypes.TEXT]: <Text />,
        [screenTypes.SCREEN_RECORD]: <ScreenRecord />,
        [screenTypes.CONTACT_FORM]: <ContactForm />,
        [screenTypes.USER_AUTHENTICATION_FORM]: <UserAuthenticationForm />,
        [screenTypes.SENDING]: <Sending />,
        [screenTypes.SUCCESS]: <Success />,
    };

    function getCurrentScreen() {
        if (!Object.keys(screens).includes(currentChatScreen)) {
            return '';
        }

        return screens[currentChatScreen];
    }

    return <Container>{getCurrentScreen()}</Container>;
}

export default ChatScreen;
