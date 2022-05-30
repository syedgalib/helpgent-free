import { useDispatch } from "react-redux";
import { chatBoxActions } from "Chatbox/store/chatbox-slice";
import classes from "Chatbox/assets/Avatar.scss";
import img from "Chatbox/assets/avatar.png";

function Avatar() {
	const dispatch = useDispatch();

	function clickHandler(e) {
		e.preventDefault();
		dispatch(chatBoxActions.toggleDisplayChatScreen());
	}

	return (
		<div className={classes.avatar} onClick={clickHandler}>
			<img className={classes.ttt} src={img} alt="Avatar" />
		</div>
	);
}

export default Avatar;
