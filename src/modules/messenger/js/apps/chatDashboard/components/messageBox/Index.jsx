import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactSVG } from 'react-svg';
import MediaBox from "../../../../../../../lib/components/MediaBox";
import Message from "./overview/Message.jsx";
import Video from "./overview/video/Index.jsx";
import userImg from "../../../../../assets/img/chatdashboard/user.png";
import search from "../../../../../assets/svg/icons/magnifier.svg";
import videoPlay from "../../../../../assets/svg/icons/video-play.svg";
import screenRecord from "../../../../../assets/svg/icons/s-record.svg";
import mice from "../../../../../assets/svg/icons/mice.svg";
import textIcon from "../../../../../assets/svg/icons/text.svg";
import { MessageBoxWrap, ChatboxWrap } from "./Style";

import { handleMessageTypeChange } from '../../store/messages/actionCreator';

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

	const [state, setState] = useState({
		openSearch: false,
	});

	/* initialize Form Data */
	const { replyMode, messageType } = useSelector(state => {
		return {
			replyMode: state.messages.replyMode,
			messageType: state.messages.messageType,
		};
	});

	/* Dispasth is used for passing the actions to redux store  */
	const dispatch = useDispatch();

	const { openSearch } = state;

	const handleSearchToggle = (event) => {
		event.preventDefault();
		const searchInput = document.getElementById("wpwax-vm-messagebox-search");
		searchInput.setSelectionRange(0, 0);
		searchInput.focus();
		setState({
			openSearch: !openSearch
		});
	}

	const handleVideoMessage = (event) => {
		event.preventDefault();
		dispatch(handleMessageTypeChange("video"));
	}

	const haldleReplyMode = () => {

		if (messageType === "video") {
			return (
				<Video />
			)
		}
	}

	// const chatScreen = useSelector((state) => state.chatScreen);

	return (
		<ChatboxWrap>
			<MessageBoxWrap>
				<div className="wpwax-vm-messagebox-header">
					<div className="wpwax-vm-messagebox-header__left">
						<MediaBox img={userImg} title={"Tanjim"} metaList={metaList} />
					</div>
					<div className="wpwax-vm-messagebox-header__right">
						<div className="wpwax-vm-messagebox-header__actionlist">
							<div className="wpwax-vm-messagebox-header__action-item wpwax-vm-messagebox-header-search">
								<div className={openSearch ? "wpwax-vm-searchbox wpwax-vm-show" : "wpwax-vm-searchbox"}>
									<input type="text" name="wpwax-vm-messagebox-search" id="wpwax-vm-messagebox-search" placeholder="Search" />
								</div>
								<a href="#" className="wpwax-vm-search-toggle" onClick={handleSearchToggle}><ReactSVG src={search} /></a>
							</div>
							<div className="wpwax-vm-messagebox-header__action-item wpwax-vm-messagebox-header-video">
								<a href="#" className="wpwax-vm-messagebox-header__action--link" onClick={handleVideoMessage}><ReactSVG src={videoPlay} /><span className="wpwax-vm-messagebox-header__action--text">Videos</span></a>
							</div>
							<div className="wpwax-vm-messagebox-header__action-item wpwax-vm-messagebox-header-record">
								<a href="#" className="wpwax-vm-messagebox-header__action--link"><ReactSVG src={screenRecord} /><span className="wpwax-vm-messagebox-header__action--text">Screen Records</span></a>
							</div>
							<div className="wpwax-vm-messagebox-header__action-item wpwax-vm-messagebox-header-voice">
								<a href="#" className="wpwax-vm-messagebox-header__action--link"><ReactSVG src={mice} /><span className="wpwax-vm-messagebox-header__action--text">Voice</span></a>
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

				<div className="wpwax-vm-messagebox-footer">
					<span className="wpwax-vm-messagebox-footer__text">How would you like to answer?</span>
					<div className="wpwax-vm-messagebox-footer__actionlist">
						<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-gray" onClick={handleVideoMessage}>
							<div className="wpwax-vm-btn-icon"><ReactSVG src={videoPlay} /></div>
							<span className="wpwax-vm-btn-text">Video</span>
						</a>
						<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-gray">
							<div className="wpwax-vm-btn-icon"><ReactSVG src={screenRecord} /></div>
							<span className="wpwax-vm-btn-text">Screen Record</span>
						</a>
						<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-gray">
							<div className="wpwax-vm-btn-icon"><ReactSVG src={mice} /></div>
							<span className="wpwax-vm-btn-text">Voice</span>
						</a>
						<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-gray">
							<div className="wpwax-vm-btn-icon"><ReactSVG src={textIcon} /></div>
							<span className="wpwax-vm-btn-text">Text</span>
						</a>
					</div>
				</div>
			</MessageBoxWrap>

			{
				replyMode ? <div className="wpwax-vm-replymode-wrap">{haldleReplyMode()}</div> : ""

			}

		</ChatboxWrap>

	);
}

export default MessageBox;