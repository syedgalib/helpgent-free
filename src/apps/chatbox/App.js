import { useSelector } from "react-redux";

import Avatar from "./components/avatar/Avatar";
import ChatScreen from "./components/ChatScreen/ChatScreen";

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
