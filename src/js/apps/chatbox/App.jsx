import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Avatar from "./components/avatar/Index.jsx";
import ChatScreen from "./components/chat-screen/Index.jsx";
import { loadTemplate } from './store/chatboxTemplate/actionCreator';
import { hideToggler } from "./store/chatbox/actionCreator";

function App() {
	const dispatch = useDispatch();

	const { showChatboxApp, showChatbox, screenToggler, screenTogglerContent } = useSelector( state => {
        return {
			showChatboxApp: state.chatboxTemplate.showChatbox,
            showChatbox: state.chatbox.showChatbox,
            screenToggler: state.chatbox.screenToggler,
            screenTogglerContent: state.chatbox.screenTogglerContent,
        };
    });

	// Init State
	useEffect( () => {
		dispatch( loadTemplate() );
	}, []);

	if ( ! showChatboxApp ) {
		return '';
	}

	const handleScreenToggle = () =>{
		dispatch(hideToggler());
	}

	return (
		<>
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

		</>
	);
}

export default App;
