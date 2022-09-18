import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactSVG } from 'react-svg';
import MediaBox from "Components/MediaBox.jsx";
import Message from "./overview/Message.jsx";
import Video from "./overview/video/Index.jsx";
import Voice from "./overview/voice/Index.jsx";
import userImg from "Assets/img/chatdashboard/user.png";
import search from "Assets/svg/icons/magnifier.svg";
import videoPlay from "Assets/svg/icons/video-play.svg";
import screenRecord from "Assets/svg/icons/s-record.svg";
import mice from "Assets/svg/icons/mice.svg";
import textIcon from "Assets/svg/icons/text.svg";
import paperPlane from "Assets/svg/icons/paper-plane.svg";
import { ChatBoxWrap, MessageBoxWrap } from "./Style";

import { handleReplyModeChange, handleMessageTypeChange } from '../../store/messages/actionCreator';

/* Dropdown Array Item Declaration */
const metaList = [
	{
		type: "email",
		text: "sample@gmail.com"
	}
];

const messageList = [
	{
		id: "01",
		type: "text",
		authorName: "Tanjim",
		authorImg: "",
		sentTime: "3:09",
		reply: false,
		content: "Consumers prefer watching a video rather than mere text. Embed your video on any  website using our floating widget. Just copy and paste."
	},
	{
		id: "02",
		type: "text",
		authorName: "Adnan",
		authorImg: "",
		sentTime: "3:09",
		reply: true,
		content: "Consumers prefer watching a video rather than mere text. Embed your video on any  website using our floating widget. Just copy and paste."
	},
	{
		id: "03",
		type: "video",
		authorName: "Tanjim",
		authorImg: "",
		sentTime: "3:09",
		reply: false,
		fileSrc: ""
	},
	{
		id: "04",
		type: "audio",
		authorName: "Adan",
		authorImg: "",
		sentTime: "3:09",
		reply: true,
		fileSrc: ""
	}
]

function MessageBox() {

	const ref = useRef(null);

	const [state, setState] = useState({
		openSearch: false,
	});

	/* initialize Form Data */
	const { replyMode, messageType } = useSelector(state => {
		console.log(state);
		return {
			replyMode: state.messages.replyMode,
			messageType: state.messages.messageType,
		};
	});

	/* Dispasth is used for passing the actions to redux store  */
	const dispatch = useDispatch();

	const { openSearch } = state;

	/* Handle Search Toggle */
	const handleSearchToggle = (event) => {
		event.preventDefault();
		const searchInput = document.getElementById("wpwax-vm-messagebox-search");
		searchInput.setSelectionRange(0, 0);

		setState({
			openSearch: !openSearch
		});
	}

	/* Focus Input field when search inopen */
	useEffect(() => {
		ref.current.focus();
	}, [openSearch]);

	/* Handle Video Message */
	const handleVideoMessage = (event) => {
		event.preventDefault();
		dispatch(handleMessageTypeChange("video"));
	}

	/* Handle Text Message */
	const handleTextMessage = (event) => {
		event.preventDefault();
		dispatch(handleMessageTypeChange("text"));
		dispatch(handleReplyModeChange(false));
	}

	/* Handle Voice Message */
	const handleVoiceMessage = (event) => {
		event.preventDefault();
		dispatch(handleMessageTypeChange("voice"));
		// dispatch(handleReplyModeChange(false));
	}

	/* Handle Reply Mode */
	const haldleReplyMode = () => {
		if (messageType === "video") {
			return (
				<Video />
			)
		}else if(messageType === "voice"){
			return (
				// <Voice ?>
				<Voice />
			)
		}
	}

	/* Handle Load Footer Content */
	const handleFooterContent = () => {

		if (messageType === "text") {
			return (
				<div className="wpwax-vm-messagebox-footer">
					<a href="#" className="wpwax-vm-messagebox-reply-text-close" onClick={handleTextClose}><span className="dashicons dashicons-no-alt"></span></a>
					<div className="wpwax-vm-messagebox-reply">
						<div className="wpwax-vm-messagebox-reply__input">
							<input type="text" name="wpwax-vm-messagebox-reply-input" id="wpwax-vm-messagebox-reply-input" placeholder="Type a message" />
						</div>
						<div className="wpwax-vm-messagebox-reply__action">
							<a href="#" className="wpwax-vm-messagebox-reply-send"><ReactSVG src={paperPlane} /></a>
						</div>
					</div>
				</div>
			);
		} else if (messageType === "voice") {
			return (
				<div className="wpwax-vm-messagebox-footer">
					<div className="wpwax-vm-messagebox-reply wpwax-vm-messagebox-reply-voice">
						<div className="wpwax-vm-messagebox-reply__input">
							<a href="#" className="wpwax-vm-messagebox-reply-voice-close" onClick={handleTextClose}><span className="dashicons dashicons-no-alt"></span></a>
							<span className="wpwax-vm-audio-range">
								<span className="wpwax-vm-audio-range-inner"></span>
							</span>
							<span className="wpwax-vm-timer">02:30</span>
						</div>
						<div className="wpwax-vm-messagebox-reply__action"><a href="#" className="wpwax-vm-messagebox-reply-send"><ReactSVG src={paperPlane} /></a></div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="wpwax-vm-messagebox-footer">
					<span className="wpwax-vm-messagebox-footer__text">How would you like to answer?</span>
					<div className="wpwax-vm-messagebox-footer__actionlist">
						<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-gray" onClick={handleVideoMessage}>
							<div className="wpwax-vm-btn-icon"><ReactSVG src={videoPlay} /></div>
							<span className="wpwax-vm-btn-text">Video</span>
						</a>
						<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-gray" onClick={handleVoiceMessage}>
							<div className="wpwax-vm-btn-icon"><ReactSVG src={mice} /></div>
							<span className="wpwax-vm-btn-text">Voice</span>
						</a>
						<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-gray" onClick={handleTextMessage}>
							<div className="wpwax-vm-btn-icon"><ReactSVG src={textIcon} /></div>
							<span className="wpwax-vm-btn-text">Text</span>
						</a>
					</div>
				</div>
			);
		}
	}

	/* Handle Text Colse */
	const handleTextClose = (e) => {
		e.preventDefault();
		dispatch(handleMessageTypeChange(""));
		dispatch(handleReplyModeChange(false));

	}

	return (
		<ChatBoxWrap>
			<MessageBoxWrap>
				<div className="wpwax-vm-messagebox-header">
					<div className="wpwax-vm-messagebox-header__left">
						<MediaBox img={userImg} title={"Tanjim"} metaList={metaList} />
					</div>
					<div className="wpwax-vm-messagebox-header__right">
						<div className="wpwax-vm-messagebox-header__actionlist">
							<div className="wpwax-vm-messagebox-header__action-item wpwax-vm-messagebox-header-search">
								<div className={openSearch ? "wpwax-vm-searchbox wpwax-vm-show" : "wpwax-vm-searchbox"}>
									<input type="text" ref={ref} name="wpwax-vm-messagebox-search" id="wpwax-vm-messagebox-search" placeholder="Search" />
								</div>
								<a href="#" className="wpwax-vm-search-toggle" onClick={handleSearchToggle}><ReactSVG src={search} /></a>
							</div>
							<div className="wpwax-vm-messagebox-header__action-item wpwax-vm-messagebox-header-video">
								<a href="#" className="wpwax-vm-messagebox-header__action--link" onClick={handleVideoMessage}><ReactSVG src={videoPlay} /><span className="wpwax-vm-messagebox-header__action--text">Videos</span></a>
							</div>
							<div className="wpwax-vm-messagebox-header__action-item wpwax-vm-messagebox-header-voice">
								<a href="#" className="wpwax-vm-messagebox-header__action--link" onClick={handleVoiceMessage}><ReactSVG src={mice} /><span className="wpwax-vm-messagebox-header__action--text">Voice</span></a>
							</div>
						</div>
					</div>
				</div>

				<div className="wpwax-vm-messagebox-body">
					{
						messageList.map((message, index) => {
							return (
								<Message message={message} key={index} />
							)
						})
					}
				</div>
				{
					handleFooterContent()
				}
			</MessageBoxWrap>

			{
				replyMode ? <div className="wpwax-vm-replymode-wrap">{haldleReplyMode()}</div> : ""
			}
		</ChatBoxWrap>

	);
}

export default MessageBox;