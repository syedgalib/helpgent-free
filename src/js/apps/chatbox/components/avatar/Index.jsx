import { useDispatch, useSelector } from "react-redux";
import { showChatbox } from "../../store/chatbox/actionCreator";
import AvatarWrap from "./Style";
import avater from 'Assets/img/avatar.png';

function Avatar() {
	const dispatch = useDispatch();

	const { templateOptions, displayChatbox } = useSelector( state => {
        return {
			templateOptions: state.chatboxTemplate.template.options,
			displayChatbox: state.chatbox.showChatbox
        };
    });

	function clickHandler(e) {
		e.preventDefault();
		dispatch(showChatbox());
	}

	return (
		!displayChatbox ?  
		<AvatarWrap className="wpwax-vm-chatbox-content" onClick={ clickHandler }>
			{
				templateOptions.greet_video_url ? <video style={{width: '120px'}} src={templateOptions.greet_video_url} loop autoPlay muted></video> : null
			}
			{
				templateOptions.greet_image_url ? <img className="wpwwax-vm-avatar" src={ templateOptions.greet_image_url } alt="Avatar" /> : null
			}
			{
				!templateOptions.greet_video_url && !templateOptions.greet_image_url ? <img className="wpwwax-vm-avatar" src={ avater } alt="Avatar" /> : null
			}
		</AvatarWrap> : null
	);
}

export default Avatar;