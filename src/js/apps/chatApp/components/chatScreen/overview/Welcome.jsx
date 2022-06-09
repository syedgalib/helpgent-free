import { useDispatch } from "react-redux";

import { chatBoxActions } from "../../../store/chatbox-slice";
import previewBg from "../../../../../../assets/img/builder/bg.png";
import ChatboxForm from "./Style.js";
function Welcome() {
	const dispatch = useDispatch();

	function btnHandler(type) {
		dispatch(chatBoxActions.chatScreen(type));
		dispatch(chatBoxActions.chatStep(1));
	}

	return (
		<ChatboxForm>
			<div className="wpwax-vm-chatbox-bg" style={{backgroundImage: `url("${ previewBg }")`}}></div>
			<div className="wpwax-vm-chatbox-header">
				<div className="wpwax-vm-chatbox-header__top">
					<span className="wpwax-vm-timer">
						<span className="wpwax-vm-count-time">00:00</span> /
						<span className="wpwax-vm-total-time">00:20</span>
					</span>
					<a href="#" className="wpwax-vm-fulscreen-trigger">
						
					</a>
				</div>
				<h4 className="wpwax-vm-chatbox-title" >Welcome to WpWax, leave your questions below and we will get back to you asap.</h4>
			</div>
			<div className="wpwax-vm-chatbox-inner">
				<a href="#" className="wpwax-vm-btn-play"><i className="dashicons dashicons-controls-play"></i></a>
			</div>
			<div className="wpwax-vm-chatbox-footer">
				<h5 className="wpwax-vm-chatbox-footer__title">How would you like to chat?</h5>
				<div className="wpwax-vm-chatbox-footer__actions">
					<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary" onClick={() => btnHandler("video")}>Video</a>
					<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary" onClick={() => btnHandler("screenRecord")}>Screen Record</a>
					<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary" onClick={() => btnHandler("voice")}>Voice</a>
					<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary" onClick={() => btnHandler("text")}>Text</a>
				</div>
				<p className="wpwax-vm-chatbox-footer__text">You can practise before sending</p>
				<p className="wpwax-vm-chatbox-footer__bottom">Powered by <a href="#">WpWax</a></p>
			</div>
		</ChatboxForm>
	);
}

export default Welcome;
