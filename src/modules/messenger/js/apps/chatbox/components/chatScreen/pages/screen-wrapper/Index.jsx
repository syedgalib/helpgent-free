import { useSelector, useDispatch } from "react-redux";
import { hideChatbox } from '../../../../store/chatbox/actionCreator.js';
import ScreenWrapper from "./Style";

function Container(props) {
	const dispatch = useDispatch();
	const chatScreen = useSelector((state) => state.chatScreen);

	function handleClose() {
		dispatch( hideChatbox() );
	}

	return (
		<ScreenWrapper>
			<div className="wpwax-vm-chatbox-container">
				<div className="wpwax-vm-chatbox-btnlist">
					<button onClick={handleClose} className="wpwax-vm-chatbox-btn-close">
						x
					</button>
				</div>

				<div className="wpwax-vm-h-100pr">{ props.children }</div>
			</div>
		</ScreenWrapper>
	);
}

export default Container;
