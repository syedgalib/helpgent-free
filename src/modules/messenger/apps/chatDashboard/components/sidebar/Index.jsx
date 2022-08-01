import { ReactSVG } from 'react-svg';
import Dropdown from "Components/formFields/Dropdown.jsx";
import MediaBox from "Components/MediaBox.jsx";
import Taglist from "./overview/Taglist.jsx";
import AddTag from "./overview/AddTag.jsx";
import DeleteConfirm from "./overview/DeleteConfirm.jsx";
import userImg from "Assets/img/chatdashboard/user.png";
import ellipsisV from 'Assets/svg/icons/ellipsis-v.svg';
import envelopeOpen from 'Assets/svg/icons/envelope-open.svg';
import filterIcon from 'Assets/svg/icons/filter.svg';
import angleDown from 'Assets/svg/icons/angle-down.svg';
import angleUp from 'Assets/svg/icons/angle-up.svg';
import magnifier from 'Assets/svg/icons/magnifier.svg';
import rotateIcon from 'Assets/svg/icons/rotate-right.svg';
import tag from 'Assets/svg/icons/tag.svg';
import trash from 'Assets/svg/icons/trash.svg';
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
		name: "mark-read",
		text: "Mark as unread"
	},
	{
		icon: tag,
		name: "tags",
		text: "Add tags"
	},
	{
		icon: trash,
		name: "delete-conv",
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
				<Dropdown dropdownText={true} textIcon={filterIcon} dropdownIconOpen={angleUp} dropdownIconClose={angleDown} dropdownList={filterDropdown} />
			</div>

			<div className="wpwax-vm-sidebar-userlist">
				<ul>
					<li className="wpwax-vm-usermedia">
						<div className="wpwax-vm-usermedia__left">
							<MediaBox img={userImg} title={"Adnan"} metaList={metaList} />
						</div>
						<div className="wpwax-vm-usermedia__right">
							<span className="wpwax-vm-usermedia-status wpwax-vm-usermedia-status-unread"></span>
							<Dropdown dropdownText={false} dropdownIconOpen={ellipsisV} dropdownIconClose={ellipsisV} dropdownList={moreDropdown} />
						</div>
					</li>
					<li className="wpwax-vm-usermedia">
						<div className="wpwax-vm-usermedia__left">
							<MediaBox img={userImg} title={"Adnan"} metaList={metaList} />
						</div>
						<div className="wpwax-vm-usermedia__right">
							<span className="wpwax-vm-usermedia-status wpwax-vm-usermedia-status-unread"></span>
							<Dropdown dropdownText={false} dropdownIconOpen={ellipsisV} dropdownIconClose={ellipsisV} dropdownList={moreDropdown} />
						</div>
					</li>
					<li className="wpwax-vm-usermedia">
						<div className="wpwax-vm-usermedia__left">
							<MediaBox img={userImg} title={"Adnan"} metaList={metaList} />
						</div>
						<div className="wpwax-vm-usermedia__right">
							<span className="wpwax-vm-usermedia-status wpwax-vm-usermedia-status-unread"></span>
							<Dropdown dropdownText={false} dropdownIconOpen={ellipsisV} dropdownIconClose={ellipsisV} dropdownList={moreDropdown} />
						</div>
					</li>
				</ul>
			</div>

			<Taglist />

			<AddTag />

			<DeleteConfirm />
		</SidebarWrap>
	);
}

export default Sidebar;