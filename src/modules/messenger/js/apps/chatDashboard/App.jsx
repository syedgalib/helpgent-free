import { useSelector } from "react-redux";
import Sidebar from "./components/sidebar";
import MessageBox from "./components/messageBox";
// import ChatScreen from "./components/chatScreen/Index.jsx";

import ChatDashboardWrap from "./Style";

function App() {
	// const { displayChatScreen } = useSelector(state => {
	// 	return {
	// 		displayChatScreen: state.chatBox.displayChatScreen,
	// 	};
	// });

	return (
		<ChatDashboardWrap>
			<div className="wpwax-vm-sidebar">
				<Sidebar />
			</div>
			<div className="wpwax-vm-messagebox">
				<MessageBox />
			</div>
		</ChatDashboardWrap>
	);
}

export default App;
