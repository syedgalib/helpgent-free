import { useSelector, useDispatch } from "react-redux";
import MessageBox from "./components/messageBox/Index.jsx";
import Sidebar from "./components/sidebar/Index.jsx";

import ChatDashboardWrap from "./Style";

function App() {

	/* initialize Form Data */
	const { modalOverlay } = useSelector(state => {
		return {
			modalOverlay: state.tags.modalOverlay,
		};
	});

	return (
		<ChatDashboardWrap>
			<div className="wpwax-vm-sidebar">
				<Sidebar />
			</div>

			<div className="wpwax-vm-messagebox">
				<MessageBox />
			</div>

			<span className={modalOverlay ? "wpax-vm-overlay wpwax-vm-show" : "wpax-vm-overlay"}></span>
		</ChatDashboardWrap>
	);
}

export default App;
