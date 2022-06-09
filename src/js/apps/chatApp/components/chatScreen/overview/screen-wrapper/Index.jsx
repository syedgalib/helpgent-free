import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chatBoxActions } from "../../../../store/chatbox-slice";
import ClosePopup from "./ClosePopup";
import PreviewOne from "../../../../../addForm/components/AddForm/overview/PreviewOne";
import ScreenWrapper from "./Style";

// import classes from "ChatApp/assets/Container.module.scss";

function Container(props) {
	const dispatch = useDispatch();
	const chatScreen = useSelector((state) => state.chatScreen);
	const [displayClosePopup, setDisplayClosePopup] = useState(false);

	function backHandler() {
		dispatch(chatBoxActions.back());
	}
	function minusHandler() {
		dispatch(chatBoxActions.toggleDisplayChatScreen());
	}
	function closeHandler() {
		if ( chatScreen == "success" ) {
			dispatch(chatBoxActions.reset());
		} else {
			setDisplayClosePopup(true);
		}

	}

	let backBtn = (
		<button onClick={backHandler} className="">
			&#60;&#60;Back
		</button>
	);
	if (chatScreen == "welcome" || chatScreen == "success") {
		backBtn = "";
	}

	return (
		<ScreenWrapper>
			<div className="wpwax-vm-chatbox-container">
				<div className="wpwax-vm-chatbox-btnlist">
					{backBtn}
					{/* <button onClick={minusHandler} className="wpwax-vm-chatbox-btn wpwax-vm-chatbox-bt-minus">
						-
					</button> */}
					<button onClick={closeHandler} className="wpwax-vm-chatbox-btn-close">
						x
					</button>
				</div>
				{props.children}
			</div>
			{displayClosePopup && (
				<ClosePopup setDisplayClosePopup={setDisplayClosePopup} />
			)}
		</ScreenWrapper>
	);
}

export default Container;
