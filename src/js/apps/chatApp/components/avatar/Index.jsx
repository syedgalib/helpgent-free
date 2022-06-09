import { useDispatch } from "react-redux";
import { chatBoxActions } from "../../store/chatbox-slice.js";
import AvatarWrap from "./Style";
import avater from '../../assets/avatar.png';

function Avatar() {
	const dispatch = useDispatch();

	function clickHandler(e) {
		e.preventDefault();
		dispatch(chatBoxActions.toggleDisplayChatScreen());
	}

	return (
		<AvatarWrap onClick={ clickHandler }>
			<img className="wpwwax-vm-avatar" src={ avater } alt="Avatar" />
		</AvatarWrap>
	);
}

export default Avatar;