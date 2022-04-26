import { useDispatch } from "react-redux";
import { chatBoxActions } from "../../store/chatbox-slice";
import classes from "./Avatar.scss";
import img from "./img.png";

function Avatar() {
	const dispatch = useDispatch();

	function clickHandler() {
		dispatch(chatBoxActions.toggleDisplayChatScreen());
	}

	return (
		<div className={classes.avatar} onClick={clickHandler}>
			<img src={img} alt="Avatar" />
		</div>
	);
}

export default Avatar;
