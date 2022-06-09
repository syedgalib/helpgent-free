import { useDispatch } from "react-redux";
import { chatBoxActions } from "../../../../store/chatbox-slice";

// import classes from "ChatApp/assets/ClosePopup.module.scss";

function ClosePopup(props) {
	const dispatch = useDispatch();

	function yesHandler() {
		dispatch(chatBoxActions.reset());
	}
	function noHandler() {
		props.setDisplayClosePopup(false);
	}
	return (
		<div  className="ff">
			<div className="dd">
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
