import { useDispatch } from "react-redux";
import { chatBoxActions } from "Chatbox/store/chatbox-slice";

import classes from "Chatbox/assets/Container.scss";

function Container(props) {
	const dispatch = useDispatch();

	function closeHandler() {
		dispatch(chatBoxActions.toggleDisplayChatScreen());
	}

	return (
		<div className={classes.container}>
			<div className={classes.relative}>
				<button onClick={closeHandler} className={classes.close}>
					x
				</button>
				{props.children}
			</div>
		</div>
	);
}

export default Container;
