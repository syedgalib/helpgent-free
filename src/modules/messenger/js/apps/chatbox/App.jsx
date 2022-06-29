import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Avatar from "./components/avatar/Index.jsx";
import ChatScreen from "./components/chatScreen/Index.jsx";
import { loadTemplate } from './store/chatboxTemplate/actionCreator';

function App() {
	const dispatch = useDispatch();

	const { showChatbox, template, displayChatScreen } = useSelector( state => {
        return {
			showChatbox: state.chatboxTemplate.showChatbox,
			template: state.chatboxTemplate.template,
            displayChatScreen: state.chatBox.displayChatScreen,
        };
    });

	// Init State
	useEffect( () => {
		dispatch(loadTemplate());
	}, []);
	
	if ( ! showChatbox ) {
		return '';
	}

	return (
		<>
			<Avatar />
			{displayChatScreen && <ChatScreen />}
		</>
	);
}

export default App;
