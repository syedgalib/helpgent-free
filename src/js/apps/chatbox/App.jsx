import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Avatar from "./components/avatar/Index.jsx";
import ChatScreen from "./components/chat-screen/Index.jsx";
import { ThemeProvider } from "styled-components";
import { loadTemplate } from './store/chatboxTemplate/actionCreator';
import { hideToggler } from "./store/chatbox/actionCreator";
import { handleChangeLayoutDirection } from './store/layoutModes/actionCreator.js';

function App() {
	const dispatch = useDispatch();

	const { dir, showChatboxApp, showChatbox, screenToggler, screenTogglerContent } = useSelector( state => {
        return {
			showChatboxApp: state.chatboxTemplate.showChatbox,
            showChatbox: state.chatbox.showChatbox,
            screenToggler: state.chatbox.screenToggler,
            screenTogglerContent: state.chatbox.screenTogglerContent,
			dir: state.changeLayout.dir,
        };
    });

	const theme = {
		direction: dir
	}

	// Init State
	useEffect( () => {
		dispatch( loadTemplate() );

		if ( document.documentElement.getAttribute('dir') === 'rtl'){
			dispatch(handleChangeLayoutDirection('rtl'));
		} else{
			dispatch(handleChangeLayoutDirection('ltr'));
		}
	}, []);

	if ( ! showChatboxApp ) {
		return '';
	}

	const handleScreenToggle = () =>{
		dispatch(hideToggler());
	}

	return (
		<ThemeProvider theme={theme}>
			<Avatar />
			{
				<ChatScreen show={! screenToggler && showChatbox} />
			}
			{
				screenToggler ?
				<a href="#" className="wpwax-hg-screen-toggler" onClick={handleScreenToggle}>
					<span className="wpwax-hg-record-time">
						{screenTogglerContent}
					</span>
				</a>
				: null
			}

		</ThemeProvider>
	);
}

export default App;
