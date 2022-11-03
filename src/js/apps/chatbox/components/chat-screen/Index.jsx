import { useDispatch, useSelector } from 'react-redux';

import Container from './components/screen-wrapper/Index.jsx';
import Home from './components/home/Index.jsx';
import ContactForm from './components/contact-form/Index.jsx';
import UserAuthenticationForm from './components/user-authentication-form/Index.jsx';
import SplashScreen from './components/SplashScreen.jsx';
import Sending from './components/Sending.jsx';
import Success from './components/Success.jsx';
import Video from './components/video/Index.jsx';
import Voice from './components/voice/Index.jsx';
import Text from './components/text/Index.jsx';
import ScreenRecord from './components/screen-record/Index.jsx';
import screenTypes from '../../store/chatbox/screenTypes';
import { useFormHooks } from '../../store/forms/hooks.js';
import { useEffect } from 'react';

import { changeChatScreen } from '../../store/chatbox/actionCreator';
import { upateState as upateUserState } from '../../store/forms/user/actionCreator';

import useUserAPI from 'API/useUserAPI.js';
import useSettingsAPI from 'API/useSettingsAPI.js';

function ChatScreen( { show } ) {
    useFormHooks();

	// API
	const { getCurrentUser } = useUserAPI();
	const { getItems: getSettings } = useSettingsAPI();

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
        [screenTypes.SPLASH_SCREEN]: <SplashScreen />,
    };

	useEffect( () => {

		loadInitData();

	}, [] );

	async function loadInitData() {
		// Update user data
		const currentUserResponse = await getCurrentUser();
		if ( currentUserResponse.success && currentUserResponse.data ) {
			dispatch( upateUserState( { user: currentUserResponse.data } ) );
		}

		const settingsResponse = await getSettings();
		if ( settingsResponse.success && settingsResponse.data && typeof settingsResponse.data.guestSubmission !== 'undefined' ) {
			dispatch( upateUserState( { guestSubmission: settingsResponse.data.guestSubmission } ) );
		}

		dispatch( changeChatScreen( screenTypes.HOME ) );
	}

    function getCurrentScreen() {
        if ( ! Object.keys(screens).includes( currentChatScreen ) ) {
            return '';
        }

        return screens[currentChatScreen];
    }

    return (
        (show) ? <Container screenName={currentChatScreen}>{getCurrentScreen()}</Container> : null
	);
}

export default ChatScreen;
