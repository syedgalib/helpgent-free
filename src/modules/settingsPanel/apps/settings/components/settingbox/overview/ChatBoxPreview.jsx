import React from 'react';
// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import { ChatBoxPreviewWrap } from '../Style';
import largeLine from 'Assets/svg/large-line.svg';
import smallLine from 'Assets/svg/small-line.svg';
import img from 'Assets/svg/img.svg';
import plane from 'Assets/svg/icons/paper-plane.svg';
import user from 'Assets/img/settings/user.png';

const ChatBoxPreview = () => {
    return (
        <ChatBoxPreviewWrap>
            <div className="wpwax-vm-chatbox-top">
                <div className="wpwax-vm-chatbox-top__title">
                    <ReactSVG src={largeLine} />
                </div>
                <div className="wpwax-vm-chatbox-top__imglist">
                    <ReactSVG src={img} />
                    <ReactSVG src={img} />
                    <ReactSVG src={img} />
                </div>
                <a href="#" className="wpwax-vm-chatbox-btn-close">
                    <span className="dashicons dashicons-no"></span>
                </a>
            </div>
            <div className="wpwax-vm-chatbox-content">
                <div className="wpwax-vm-chatbox-content___inner">
                    <div className="wpwax-vm-chatbox-content__img">
                        <img src={user} alt="Wpwax Video Support" />
                    </div>
                    <div className="wpwax-vm-chatbox-content__text">
                        <p>Leave your questions below and we will get back to you asap.</p>
                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary">Get Started</a>
                    </div>
                </div>
            </div>
            <div className="wpwax-vm-chatbox-bottom">
                <div className="wpwax-vm-chatbox-bottom__text"><ReactSVG src={smallLine} /></div>
                <a href="#" className="wpwax-vm-btn-send"><ReactSVG src={plane} /></a>
            </div>
        </ChatBoxPreviewWrap>
    )
}

export default ChatBoxPreview;