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
import userIcon from "Assets/svg/icons/users.svg";
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

const metaList = [
	{
		type: "date",
		text: "19 Jan 22 @ 08:38"
	}
];

function Sidebar() {
	const taglistModalOpen = false;
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
		asignedTerms: [],
		activeSessionId: "",
		deleteModalOpen: false,
		tagListModalOpen: false,
		successMessage: "",
		rejectMessage: "",
		editableTermId: "",
		loader: true
	});

	const { modalSession, activeSessionId, deleteModalOpen, tagListModalOpen, successMessage, rejectMessage, loader } = sessionState;

	/* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();
	useEffect(() => {
		setSessionState({
			...sessionState,
			loader: false
		});
		const fetchSession = async ()=>{
			const sessionResponse = await apiService.getAll('/sessions');
			return sessionResponse;
		} 
		fetchSession()
			.then( sessionResponse => {
				setSessionState({
					...sessionState,
					loader: false
				});
				dispatch(handleReadSessions(sessionResponse.data.data));
			})
			.catch((error) => {
				console.log(error);
			})
		// apiService.getAll('/sessions')
		// 	.then(response => {
				
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	})
	}, []);

	const currentUser = wpWaxCustomerSupportApp_CoreScriptData.current_user;

	console.log(loading);

	return (
		<SidebarWrap className={loader ? "wpwax-vm-loder-active" : null}>
			<div className="wpwax-vm-sidebar-top">
				<h3 className="wpwax-vm-sidebar-title">List of Messages</h3>
				<a href="#" className="wpwax-vm-sidebar-refresher"><ReactSVG src={rotateIcon} /></a>
			</div>
			{
				successMessage !== '' ?
				<span className="wpwax-vm-notice wpwax-vm-notice-success">{successMessage}</span>
				:null
			}
			{
				rejectMessage !== '' ?
				<span className="wpwax-vm-notice wpwax-vm-notice-danger">{rejectMessage}</span>
				:null
			}
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
				loader ?
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
									console.log(Math.floor(item.total_unread))
									if(Number(item.total_unread) > 0){
										var moreDropdown = [
											{
												icon: envelopeOpen,
												name: "mark-read",
												text: "Mark as Read"
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
									}else{
										var moreDropdown = [
											{
												icon: envelopeOpen,
												name: "mark-unread",
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
									}
									// console.log(typeof Number(item.total_unread), typeof 0);
									return (
										<li className="wpwax-vm-usermedia" key={index}>
											<div className="wpwax-vm-usermedia__left">
												<MediaBox img={images} multiImg={multiImg} title={titleString.join()} metaList={metaList} />
											</div>
											<div className="wpwax-vm-usermedia__right">
												<span className={Number(item.total_unread) > 0 ? 'wpwax-vm-usermedia-status wpwax-vm-usermedia-status-unread' : 'wpwax-vm-usermedia-status'}></span>
												<Dropdown dropdownText={false} dropdownIconOpen={ellipsisV} dropdownIconClose={ellipsisV} dropdownList={moreDropdown} outerState={sessionState} setOuterState={setSessionState} sessionId={item.session_id}/>
											</div>
										</li>
									)

								})
							}
						</ul>
					</div>
			}
			
			<Taglist sessionState={sessionState} setSessionState={setSessionState} />


			<AddTag sessionState={sessionState} setSessionState={setSessionState} />

			<DeleteConfirm deleteBy={activeSessionId} modalOpen={deleteModalOpen} outerState={sessionState} setOuterState={setSessionState}/>
		</SidebarWrap>
	);
}

export default Sidebar;