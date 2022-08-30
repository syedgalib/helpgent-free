import React, { useState, useEffect } from 'react'
import { ReactSVG } from 'react-svg';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from "Components/formFields/Dropdown.jsx";
import MediaBox from "Components/MediaBox.jsx";
import Taglist from "./overview/Taglist.jsx";
import AddTag from "./overview/AddTag.jsx";
import DeleteConfirm from "./overview/DeleteConfirm.jsx";
import apiService from 'apiService/Service.js';
import { handleReadSessions } from '../../store/sessions/actionCreator';
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
		name: "add-tags",
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
	 /* initialize Form Data */
	 const { sessions, loading } = useSelector(state => {
		// console.log(state)
        return {
            sessions: state.sessions.sessions,
            loading: state.sessions.loading,
        };
    });

	

	/* Initialize State */
	const [sessionState, setSessionState] = useState({
		modalSession: {},
		deletableSession: "",
		deleteModalOpen: false,
		serveSuccess: true,
		loader: true
	});

	const { modalSession, deletableSession, deleteModalOpen, loader } = sessionState;

	console.log(sessionState)

	/* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();
	useEffect(() => {
		apiService.getAll('/sessions')
			.then(response => {
				dispatch(handleReadSessions(response.data.data));
			})
			.catch((error) => {
				console.log(error);
			})
	}, []);

	console.log(sessions);
	const currentUser = wpWaxCustomerSupportApp_CoreScriptData.current_user
	return (
		<SidebarWrap className={loading ? "wpwax-vm-loder-active" : null}>
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
			{
				loading ?
					<span className="wpwax-vm-loading-spin">
						<span className="wpwax-vm-spin-dot"></span>
						<span className="wpwax-vm-spin-dot"></span>
						<span className="wpwax-vm-spin-dot"></span>
						<span className="wpwax-vm-spin-dot"></span>
					</span>
					:
					<div className="wpwax-vm-sidebar-userlist">
						<ul>
							{
								sessions.map((item, index) => {
									const users = item.users.filter(p => p.id !== parseInt(currentUser.ID));
									let images = [];
									let titleString = [];
									let multiImg = false;
									for (let i = 0; i < users.length; i++) {
										images.push(users[i].avater);
										titleString.push(users[i].name)
									}

									if(images.length > 1){
										multiImg = true;
									}
									return (
										<li className="wpwax-vm-usermedia" key={index}>
											<div className="wpwax-vm-usermedia__left">
												<MediaBox img={images} multiImg={multiImg} title={titleString.join()} metaList={metaList} />
											</div>
											<div className="wpwax-vm-usermedia__right">
												<span className={item.totaL_unread > 0 ? 'wpwax-vm-usermedia-status wpwax-vm-usermedia-status-unread' : 'wpwax-vm-usermedia-status'}></span>
												<Dropdown dropdownText={false} dropdownIconOpen={ellipsisV} dropdownIconClose={ellipsisV} dropdownList={moreDropdown} outerState={sessionState} setOuterState={setSessionState} sessionId={item.session_id}/>
											</div>
										</li>
									)

								})
							}
						</ul>
					</div>
			}

			<Taglist />

			<AddTag />

			<DeleteConfirm deleteBy={deletableSession} modalOpen={deleteModalOpen} outerState={sessionState} setOuterState={setSessionState}/>
		</SidebarWrap>
	);
}

export default Sidebar;