import { ReactSVG } from 'react-svg';
import { useDispatch } from "react-redux";
import { changeChatScreen } from '../../../../../store/chatBox/actionCreator';

import { ChatboxForm } from "../style/Style.js";

import previewBg from "MessengerAssets/img/builder/bg.png";
import expander from "MessengerAssets/svg/icons/expand.svg";

function Theme_2() {
    const dispatch = useDispatch();

    function handleChatAction(type) {
        console.log(type)
        dispatch(changeChatScreen(type));
        // dispatch(chatBoxActions.chatStep(1));
    }

    return (
        <ChatboxForm>
            <div className="wpwax-vm-chatbox-wrap wpwax-vm-chatbox-theme-2">
                <div className="wpwax-vm-chatbox-header">
                    <h4 className="wpwax-vm-chatbox-title" >Welcome to WpWax, leave your questions below and we will get back to you asap.</h4>
                </div>
                <div className="wpwax-vm-chatbox-inner">
                    <div className="wpwax-vm-chatbox-inner-action">
                        <span className="wpwax-vm-timer">
                            <span className="wpwax-vm-count-time">00:00</span> /
                            <span className="wpwax-vm-total-time">00:20</span>
                        </span>
                        <a href="#" className="wpwax-vm-fulscreen-trigger">
                            <ReactSVG src={expander} />
                        </a>
                    </div>
                    <div className="wpwax-vm-chatbox-img" style={{ backgroundImage: `url("${previewBg}")` }}></div>
                    <a href="#" className="wpwax-vm-btn-play"><i className="dashicons dashicons-controls-play"></i></a>
                </div>
                <div className="wpwax-vm-chatbox-footer">
                    <h5 className="wpwax-vm-chatbox-footer__title">How would you like to chat?</h5>
                    <div className="wpwax-vm-chatbox-footer__actions">
                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-md wpwax-vm-btn-primary" onClick={() => handleChatAction("video")}>Video</a>
                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-md wpwax-vm-btn-primary" onClick={() => handleChatAction("screenRecord")}>Screen Record</a>
                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-md wpwax-vm-btn-primary" onClick={() => handleChatAction("voice")}>Voice</a>
                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-md wpwax-vm-btn-primary" onClick={() => handleChatAction("text")}>Text</a>
                    </div>
                    <p className="wpwax-vm-chatbox-footer__text">You can practise before sending</p>
                    <p className="wpwax-vm-chatbox-footer__bottom">Powered by <a href="#">WpWax</a></p>
                </div>
            </div>
        </ChatboxForm>
    );
}

export default Theme_2;