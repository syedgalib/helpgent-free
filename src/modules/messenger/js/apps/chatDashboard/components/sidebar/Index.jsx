import { useDispatch } from "react-redux";
import { ReactSVG } from 'react-svg';
import Dropdown from "../../../../../../../lib/components/formFields/Dropdown.jsx";
import MediaBox from "../../../../../../../lib/components/MediaBox";
import userImg from "../../../../../assets/img/chatdashboard/user.png";
import ellipsisH from '../../../../../assets/svg/icons/ellipsis-h.svg';
import envelopeOpen from '../../../../../assets/svg/icons/envelope-open.svg';
import filterIcon from '../../../../../assets/svg/icons/filter.svg';
import angleDown from '../../../../../assets/svg/icons/angle-down.svg';
import angleUp from '../../../../../assets/svg/icons/angle-up.svg';
import magnifier from '../../../../../assets/svg/icons/magnifier.svg';
import rotateIcon from '../../../../../assets/svg/icons/rotate-right.svg';
import tag from '../../../../../assets/svg/icons/tag.svg';
import trash from '../../../../../assets/svg/icons/trash.svg';
import SidebarWrap from "./Style";

/* Dropdown Array Item Declaration */
const filterDropdown = [
	{
		icon: "",
		text: "Read"
	},
	{
		icon: "",
		text: "Unread"
	},
	{
		icon: "",
		text: "Latest"
	},
	{
		icon: "",
		text: "Oldest"
	},
];

const moreDropdown = [
	{
		icon: envelopeOpen,
		text: "Mark as unread"
	},
	{
		icon: tag,
		text: "Add tags"
	},
	{
		icon: trash,
		text: "Delete Conversation"
	},
];
const metaList = [
	{
		type: "date",
		text: "19 Jan 22 @ 08:38"
	}
];

function Sidebar() {

	const dispatch = useDispatch();

	return (
		<SidebarWrap>
			<div className="wpwax-vm-sidebar-top">
				<h3 className="wpwax-vm-sidebar-title">List of Messages</h3>
				<a href="#" className="wpwax-vm-sidebar-refresher"><ReactSVG src={rotateIcon} /></a>
			</div>
			<div className="wpwax-vm-sidebar-filter">
				<div className="wpwax-vm-sidebar-search">
					<div className="wpwax-vm-form-group wpwax-vm-form-icon-left">
						<div className="wpwax-vm-input-icon"><ReactSVG src={magnifier} /></div>
						<input type="text" className="wpwax-vm-form__element" id="wpwax-vm-filter-search" placeholder="Search" />
					</div>
				</div>
				<Dropdown dropdownText={true} textIcon={filterIcon} dropdownIconOpen={angleUp} dropdownIconClose={angleDown} dropdownList={filterDropdown} dropdownWidth="full" />
			</div>
			<div className="wpwax-vm-sidebar-userlist">
				<ul>
					<li className="wpwax-vm-usermedia">
						<div className="wpwax-vm-usermedia__left">
							<MediaBox img={userImg} title={"Adnan"} metaList={metaList} />
						</div>
						<div className="wpwax-vm-usermedia__right">
							<span className="wpwax-vm-usermedia-status wpwax-vm-usermedia-status-unread"></span>
							<Dropdown dropdownText={false} dropdownIconOpen={ellipsisH} dropdownIconClose={ellipsisH} dropdownList={moreDropdown} dropdownWidth="fixed" />
						</div>
					</li>
					<li className="wpwax-vm-usermedia">
						<div className="wpwax-vm-usermedia__left">
							<MediaBox img={userImg} title={"Adnan"} metaList={metaList} />
						</div>
						<div className="wpwax-vm-usermedia__right">
							<span className="wpwax-vm-usermedia-status wpwax-vm-usermedia-status-unread"></span>
							<Dropdown dropdownText={false} dropdownIconOpen={ellipsisH} dropdownIconClose={ellipsisH} dropdownList={moreDropdown} dropdownWidth="fixed" />
						</div>
					</li>
					<li className="wpwax-vm-usermedia">
						<div className="wpwax-vm-usermedia__left">
							<MediaBox img={userImg} title={"Adnan"} metaList={metaList} />
						</div>
						<div className="wpwax-vm-usermedia__right">
							<span className="wpwax-vm-usermedia-status wpwax-vm-usermedia-status-unread"></span>
							<Dropdown dropdownText={false} dropdownIconOpen={ellipsisH} dropdownIconClose={ellipsisH} dropdownList={moreDropdown} dropdownWidth="fixed" />
						</div>
					</li>
				</ul>
			</div>
		</SidebarWrap>
	);
}

export default Sidebar;