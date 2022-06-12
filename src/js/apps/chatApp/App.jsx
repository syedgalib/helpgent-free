import { useSelector } from "react-redux";
import Avatar from "./components/avatar";
import ChatScreen from "./components/chatScreen";

function App() {
	const { displayChatScreen } = useSelector(state => {
        return {
            displayChatScreen: state.chatBox.displayChatScreen,
        };
    });
	
	console.log(displayChatScreen);
	return (
		<>
			<Avatar />
			{displayChatScreen && <ChatScreen />}
		</>
	);
}

export default App;
