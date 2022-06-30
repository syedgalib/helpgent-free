import { useDispatch, useSelector } from "react-redux";
import { showChatbox } from "../../store/chatbox/actionCreator";
import AvatarWrap from "./Style";
import avater from '../../assets/avatar.png';

function Avatar() {
	const dispatch = useDispatch();

	const { templateOptions } = useSelector( state => {
        return {
			templateOptions: state.chatboxTemplate.template.options,
        };
    });

	function clickHandler(e) {
		e.preventDefault();
		dispatch(showChatbox());
	}

	return (
		<AvatarWrap onClick={ clickHandler }>
			{
				( templateOptions.greet_video_url ) ?
				<video style={{objectFit: 'cover'}} width='100%' height='100%' src={templateOptions.greet_video_url} loop autoPlay muted></video>
				: 
				<img className="wpwwax-vm-avatar" src={ avater } alt="Avatar" />
			}
		</AvatarWrap>
	);
}

export default Avatar;