import { useSelector } from "react-redux";

import Avatar from "./components/avatar/Avatar";
import Welcome from "./components/welcome/Welcome";

function App() {
	const chatScreen = useSelector((state) => state.chatBox.chatScreen);

	return (
		<>
			<Avatar />
			{chatScreen == "welcome" && <Welcome />}
		</>
	);
}

export default App;
