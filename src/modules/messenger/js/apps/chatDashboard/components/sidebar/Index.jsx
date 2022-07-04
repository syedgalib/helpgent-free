import { useDispatch } from "react-redux";
import { ReactSVG } from 'react-svg';
import { displayChatBox } from "../../store/chatBox/actionCreator";
import SidebarWrap from "./Style";
import { default as Select } from 'react-select'
import MediaBox from "../../../../../../../lib/components/MediaBox";
import userImg from "../../../../../assets/img/chatdashboard/user.png";
import rotateIcon from '../../../../../assets/svg/icons/rotate-right.svg';
import ellipsisH from '../../../../../assets/svg/icons/ellipsis-h.svg';
export const filterOptions = [
	{ value: "read", label: "Read" },
	{ value: "unread", label: "Unread" },
	{ value: "latest", label: "Latest" },
	{ value: "oldest", label: "Oldest" },
]
function Sidebar() {

	const dispatch = useDispatch();

	// function clickHandler(e) {
	// 	e.preventDefault();
	// 	dispatch(displayChatBox());
	// }

	return (
		<SidebarWrap>
			<div className="wpwax-vm-sidebar-top">
				<h3 className="wpwax-vm-sidebar-title">List of Messages</h3>
				<a href="#" className="wpwax-vm-sidebar-refresher"><ReactSVG src={rotateIcon} /></a>
			</div>
			<div className="wpwax-vm-sidebar-filter">
				<Select
					classNamePrefix="wpwax-vm-select"
					options={filterOptions}
					closeMenuOnSelect={true}
					hideSelectedOptions={false}
					searchable={false}
				// onChange={chagneTitleFontSize}
				/>
			</div>
			<div className="wpwax-vm-sidebar-userlist">
				<ul>
					<li className="wpwax-vm-usermedia">
						<div className="wpwax-vm-usermedia__left">
							<MediaBox img={userImg} title={"Adnan"} metaList={{ "date": "19 Jan 22 @ 08:38" }} />
						</div>
						<div className="wpwax-vm-usermedia__right">
							<span className="wpwax-vm-usermedia-status"></span>
							<div className="wpwax-vm-dropdown wpwax-vm-dropdown-left">
								<a href="#" className="wpwax-vm-dropdown__toggle">
									<ReactSVG src={ellipsisH} />
								</a>
								<ul className="wpwax-vm-dropdown__content">
									<li><a href="#">Mark as unread</a></li>
									<li><a href="#">Add tags</a></li>
									<li><a href="#">Delete conversation</a></li>
								</ul>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</SidebarWrap>
	);
}

export default Sidebar;