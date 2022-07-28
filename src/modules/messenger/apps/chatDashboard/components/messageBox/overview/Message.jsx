import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MessageBox } from "./Style";
import { ReactSVG } from 'react-svg';
import author from "Assets/img/chatdashboard/user.png";
import replier from "Assets/img/chatdashboard/user2.png";
import audioRange from "Assets/svg/icons/audio-range.svg";

// import classes from "ChatApp/assets/Container.module.scss";

function Message({ message }) {

	/* Load Message Content */
	const setMessageContent = () => {
		if (message.type === "text") {
			return (
				<div className="wpwax-vm-message-content__inner--text">
					<p>Consumers prefer watching a video rather than mere text. Embed your video on any  website using our floating widget. Just copy and paste.</p>
				</div>
			);
		} else if (message.type === "video") {
			return (
				<div className="wpwax-vm-message-content__inner--video">
					<video src=""></video>
					<a href="#" className="wpwax-vm-btn-play"><span className="dashicons dashicons-controls-play"></span></a>
				</div>

			)
		} else if (message.type === "audio") {
			return (
				<div className="wpwax-vm-message-content__inner--audio">
					<a href="#" className="wpwax-vm-btn-play"><span className="dashicons dashicons-controls-play"></span></a>
					<span className="wpwax-vm-audio-range"><ReactSVG src={audioRange} /><span className="wpwax-vm-timer">06:20</span></span>
					<audio src=""></audio>
				</div>
			)
		}
	}
	return (
		<MessageBox className={message.reply ? `wpwax-vm-message-single wpwax-vm-message-single-${message.type} wpwax-vm-message-single-replied` : `wpwax-vm-message-single wpwax-vm-message-single-${message.type}`}>
			<div className="wpwax-vm-message-content">
				<div className="wpwax-vm-message-content__top">
					<span className="wpwax-vm-message--authorname">{message.authorName},</span>
					<span className="wpwax-vm-message-time">{message.sentTime}</span>
				</div>
				<div className="wpwax-vm-message-content__inner">
					{
						setMessageContent()
					}
				</div>
			</div>

			<div className="wpwax-vm-message-author">
				{
					message.reply ? <img src={replier} alt="Wpwax Video Support" /> : <img src={author} alt="Wpwax Video Support" />
				}
			</div>
		</MessageBox>
	);
}

export default Message;
