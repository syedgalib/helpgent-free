import { useSelector } from "react-redux";

import Avatar from "Chatbox/components/avatar/Avatar";
import ChatScreen from "Chatbox/components/ChatScreen/ChatScreen";

function App() {
	const displayChatScreen = useSelector((state) => state.displayChatScreen);

	return (
		<>
			<Avatar />
			{displayChatScreen && <ChatScreen />}
		</>
	);
}

export default App;
