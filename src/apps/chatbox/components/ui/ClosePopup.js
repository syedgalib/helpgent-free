import { useDispatch } from "react-redux";
import { chatBoxActions } from "Chatbox/store/chatbox-slice";

import classes from "Chatbox/assets/ClosePopup.scss";

function ClosePopup(props) {
	const dispatch = useDispatch();

	function yesHandler() {
		dispatch(chatBoxActions.reset());
	}
	function noHandler() {
		props.setDisplayClosePopup(false);
	}
	return (
		<div  className={classes.main}>
			<div className={classes.box}>
				<p>
					Are you sure that you want to close? All progress will be
					lost.
				</p>
				<div>
					<button onClick={yesHandler}>Yes I'm Sure</button>
					<button onClick={noHandler}>No</button>
				</div>
			</div>
		</div>
	);
}

export default ClosePopup;
