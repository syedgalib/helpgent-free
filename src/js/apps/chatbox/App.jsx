import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Avatar from "./components/avatar/Index.jsx";
import ChatScreen from "./components/chat-screen/Index.jsx";
import { loadTemplate } from './store/chatboxTemplate/actionCreator';

function App() {
	const dispatch = useDispatch();

	const { showChatboxApp, showChatbox } = useSelector( state => {
        return {
			showChatboxApp: state.chatboxTemplate.showChatbox,
            showChatbox: state.chatbox.showChatbox,
        };
    });

	// Init State
	useEffect( () => {
		dispatch( loadTemplate() );
	}, []);

	if ( ! showChatboxApp ) {
		return '';
	}

	return (
		<>
			<Avatar />
			{ showChatbox && <ChatScreen /> }
		</>
	);
}

export default App;
