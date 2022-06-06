import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chatBoxActions } from "Chatbox/store/chatbox-slice";
import ClosePopup from "Chatbox/components/ui/ClosePopup";

import classes from "Chatbox/assets/Container.module.scss";

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
		<button onClick={backHandler} className={classes.back}>
			&#60;&#60;Back
		</button>
	);
	if (chatScreen == "welcome" || chatScreen == "success") {
		backBtn = "";
	}

	return (
		<>
			<div className={classes.container}>
				<div className={classes.relative}>
					{backBtn}
					<button onClick={minusHandler} className={classes.minus}>
						-
					</button>
					<button onClick={closeHandler} className={classes.close}>
						x
					</button>
					{props.children}
				</div>
			</div>
			{displayClosePopup && (
				<ClosePopup setDisplayClosePopup={setDisplayClosePopup} />
			)}
		</>
	);
}

export default Container;
