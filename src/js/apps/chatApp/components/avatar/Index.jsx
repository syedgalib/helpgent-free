import { useDispatch } from "react-redux";
import { displayChatBox } from "../../store/chatBox/actionCreator";
import AvatarWrap from "./Style";
import avater from '../../assets/avatar.png';

function Avatar() {

	const dispatch = useDispatch();

	function clickHandler(e) {
		e.preventDefault();
		dispatch(displayChatBox());
	}

	return (
		<AvatarWrap onClick={ clickHandler }>
			<img className="wpwwax-vm-avatar" src={ avater } alt="Avatar" />
		</AvatarWrap>
	);
}

export default Avatar;