import { useDispatch } from "react-redux";
import { hideChatbox } from '../../../../store/chatbox/actionCreator.js';
import { useResetStore } from "../../../../store/reset.js";
import ScreenWrapper from "./Style";

function Container(props) {
	const dispatch   = useDispatch();
	const resetStore = useResetStore();

	function handleClose() {
		resetStore();
		dispatch( hideChatbox() );
	}

	return (
		<ScreenWrapper>
			<div className="wpwax-vm-chatbox-container">
				<div className="wpwax-vm-chatbox-btnlist">
					<button onClick={handleClose} className="wpwax-vm-chatbox-btn-close">
						<span className="dashicons dashicons-no-alt"></span>
					</button>
				</div>

				<div className="wpwax-vm-h-100pr">{ props.children }</div>
			</div>
		</ScreenWrapper>
	);
}

export default Container;
