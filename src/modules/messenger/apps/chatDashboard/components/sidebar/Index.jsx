/*--------------------------------
 -- Title: Sidebar main component
 --	Description: This component is a hub of all child components of sidebar
 -- Author: wpWax
 -- Version: 1.0.0
 -- Date: 12/09/2022

--------------------------------*/

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ReactSVG } from 'react-svg';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Dropdown from 'Components/formFields/Dropdown.jsx';
import MediaBox from 'Components/MediaBox.jsx';
import Taglist from './overview/Taglist.jsx';
import AddTag from './overview/AddTag.jsx';
import DeleteConfirm from './overview/DeleteConfirm.jsx';
import apiService from 'apiService/Service.js';
import TagFilter from './overview/TagFilter.jsx';
import { handleReadSessions } from '../../store/sessions/actionCreator';
import ellipsisV from 'Assets/svg/icons/ellipsis-v.svg';
import envelopeOpen from 'Assets/svg/icons/envelope-open.svg';
import filterIcon from 'Assets/svg/icons/filter.svg';
import angleDown from 'Assets/svg/icons/angle-down.svg';
import angleUp from 'Assets/svg/icons/angle-up.svg';
import magnifier from 'Assets/svg/icons/magnifier.svg';
import slider from 'Assets/svg/icons/slider.svg';
import rotateIcon from 'Assets/svg/icons/rotate-right.svg';
import tag from 'Assets/svg/icons/tag.svg';
import trash from 'Assets/svg/icons/trash.svg';
import loaders from 'Assets/svg/icons/loader.svg';
import { SidebarWrap, SessionFilterWrap } from './Style';
import { updateSelectedSession } from '../../store/messages/actionCreator.js';
import { debounce } from '../../../../../../helpers/utils.js';

/* Dropdown Array Item Declaration */
const filterDropdown = [
    {
        name: 'filter-read',
        text: 'Read',
    },
    {
        name: 'filter-unread',
        text: 'Unread',
    },
    {
        name: 'filter-latest',
        text: 'Latest',
    },
    {
        name: 'filter-oldest',
        text: 'Oldest',
    },
];

const Sidebar = ({ sessionState, setSessionState }) => {
    const ref = useRef(null);
    const [tagState, setTagState] = useState({
        allTags: [],
        assignedTags: [],
        filteredTagList: [],
        loader: false,
        tagLoader: false,
        addTagModalOpen: false,
    });

    const [pageNumber, setPageNumber] = useState(2);
    const [activeSession, setaAtiveSession] = useState('');
    const [refresher, setRefresher] = useState(false);
    const currentUser = wpWaxCustomerSupportApp_CoreScriptData.current_user;

    const {
        sessionList,
        activeSessionId,
        deleteModalOpen,
        successMessage,
        rejectMessage,
        sessionFilterDropdown,
        tagFilterDropdownOpen,
        hasMore,
        loader,
    } = sessionState;
    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    useEffect(() => {
        setSessionState({
            ...sessionState,
            hasMore: true,
            loader: true,
        });
        setPageNumber(2);

        const pageLimit = {
            limit: '15',
            page: 1,
        };
        const fetchSession = async () => {
            const sessionResponse = await apiService.getAllByArg(
                '/sessions',
                pageLimit
            );
            return sessionResponse;
        };

        fetchSession()
            .then((sessionResponse) => {
                setSessionState({
                    ...sessionState,
                    sessionList: sessionResponse.data.data,
                    filteredSessions: sessionResponse.data.data,
                    loader: false,
                });
                dispatch(handleReadSessions(sessionResponse.data.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [refresher]);

    const handleToggleSearchDropdown = (event) => {
        event.preventDefault();
        setSessionState({
            ...sessionState,
            tagFilterDropdownOpen: false,
            sessionFilterDropdown: !sessionFilterDropdown,
        });
    };

    const handleTagFilterDropdown = (event) => {
        event.preventDefault();
        setSessionState({
            ...sessionState,
            tagFilterDropdownOpen: !tagFilterDropdownOpen,
        });
    };

    const handleAllTagActivation = (event) => {
        event.preventDefault();
        const overlay = document.querySelector('.wpax-vm-overlay');
        overlay.classList.add('wpwax-vm-show');
        setSessionState({
            ...sessionState,
            tagListModalOpen: true,
            taglistWithSession: false,
        });
    };

	// Session search.
    const handleSessionSearch = (event) => {
		const searchArg = {
            search: event.target.value,
        };

        const fetchSearchNameMail = async () => {
            const searchByNameMailResponse = await apiService.getAllByArg(
                '/sessions',
                searchArg
            );
            return searchByNameMailResponse;
        };

        fetchSearchNameMail()
            .then((searchByNameMailResponse) => {
                setSessionState({
                    ...sessionState,
					loader: false,
                    sessionList: searchByNameMailResponse.data.data,
                });
                dispatch(
                    handleReadSessions(searchByNameMailResponse.data.data)
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };

	const onSessionSearch = useCallback( debounce( handleSessionSearch, 300 ), [] );

    const fetchMoreData = () => {
        const pageArg = {
            limit: '15',
            page: pageNumber,
        };
        setPageNumber(pageNumber + 1);
        const fetchNext = async () => {
            const nextSessionResponse = await apiService.getAllByArg(
                '/sessions',
                pageArg
            );
            return nextSessionResponse;
        };
        setTimeout(() => {
            fetchNext()
                .then((nextSessionResponse) => {
                    if (nextSessionResponse.data.data.length == 0) {
                        setSessionState({
                            ...sessionState,
                            hasMore: false,
                        });
                    } else {
                        setSessionState({
                            ...sessionState,
                            sessionList: sessionList.concat(
                                nextSessionResponse.data.data
                            ),
                            filteredSessions: sessionList.concat(
                                nextSessionResponse.data.data
                            ),
                            loader: false,
                        });
                    }

                    dispatch(
                        handleReadSessions(
                            sessionList.concat(nextSessionResponse.data.data)
                        )
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 1500);
    };

    const handeSelectSession = (e, item, index) => {
        setaAtiveSession(`wpwax-vm-session-${index}`);
        console.log(item);
        dispatch(updateSelectedSession(item));
    };

    const handleRefresh = (event) => {
        event.preventDefault();
        setRefresher({
            refresher: !refresher,
        });
        setSessionState({
            ...sessionState,
            hasMore: true,
        });
    };

    return (
        <SidebarWrap className={loader ? 'wpwax-vm-loder-active' : null}>
            <div className='wpwax-vm-sidebar-top'>
                <h3 className='wpwax-vm-sidebar-title'>List of Messages</h3>
                <a
                    href='#'
                    className='wpwax-vm-sidebar-refresher'
                    onClick={handleRefresh}
                >
                    <ReactSVG src={rotateIcon} />
                </a>
            </div>
            {successMessage !== '' ? (
                <span className='wpwax-vm-notice wpwax-vm-notice-success'>
                    {successMessage}
                </span>
            ) : null}
            {rejectMessage !== '' ? (
                <span className='wpwax-vm-notice wpwax-vm-notice-danger'>
                    {rejectMessage}
                </span>
            ) : null}
            <div className='wpwax-vm-sidebar-filter'>
                <SessionFilterWrap
                    className={
                        sessionFilterDropdown
                            ? 'wpwax-vm-search-dropdown-show'
                            : null
                    }
                >
                    <div className='wpwax-vm-sidebar-search'>
                        <div className='wpwax-vm-form-group wpwax-vm-form-icon-left'>
                            <div className='wpwax-vm-input-icon'>
                                <ReactSVG src={magnifier} />
                            </div>

                            <input
                                type='text'
								className='wpwax-vm-form__element'
								id='wpwax-vm-filter-search'
								placeholder='Search'
                                onChange={onSessionSearch}
                            />
                            <a
                                href='#'
                                className='wpwax-vm-search-toggle'
                                onClick={handleToggleSearchDropdown}
                            >
                                <ReactSVG src={slider} />
                            </a>
                        </div>
                        <ul className='wpwax-vm-search-dropdown'>
                            <li ref={ref}>
                                <a href='' onClick={handleTagFilterDropdown}>
                                    <span className='wpwax-vm-search-dropdown__text'>
                                        Search by tags
                                    </span>
                                    <span className='dashicons dashicons-arrow-down-alt2'></span>
                                </a>
                                <TagFilter
                                    outerState={sessionState}
                                    setOuterState={setSessionState}
                                    tagState={tagState}
                                    setTagState={setTagState}
                                />
                            </li>
                            {/* <li>
								<a href="">
									<span className="wpwax-vm-search-dropdown__text">Search by date</span>
									<span className="dashicons dashicons-arrow-down-alt2"></span>
								</a>
							</li> */}
                        </ul>
                    </div>
                </SessionFilterWrap>
                <div className='wpwax-vm-sidebar-filter__quick-actions'>
                    <Dropdown
                        dropdownText={true}
                        textIcon={filterIcon}
                        dropdownIconOpen={angleUp}
                        dropdownIconClose={angleDown}
                        dropdownList={filterDropdown}
                        outerState={sessionState}
                        setOuterState={setSessionState}
                    />
                    <a
                        href='#'
                        className='wpwax-vm-btn-all-tags'
                        onClick={handleAllTagActivation}
                    >
                        <ReactSVG src={tag} />
                        <span>Tags</span>
                    </a>
                </div>
            </div>
            {loader ? (
                <span className='wpwax-vm-loading-spin'>
                    <span className='wpwax-vm-spin-dot'></span>
                    <span className='wpwax-vm-spin-dot'></span>
                    <span className='wpwax-vm-spin-dot'></span>
                    <span className='wpwax-vm-spin-dot'></span>
                </span>
            ) : (
                <div className='wpwax-vm-sidebar-userlist'>
                    {sessionList.length !== 0 ? (
                        <ul id='scrollableDiv'>
                            <InfiniteScroll
                                dataLength={sessionList.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                scrollableTarget='scrollableDiv'
                                loader={
                                    <span>
                                        <ReactSVG src={loaders} />
                                    </span>
                                }
                            >
                                {sessionList.map((item, index) => {
                                    // console.log(currentUser);
                                    const users = item.users.filter(
                                        (p) =>
                                            currentUser &&
                                            p.id !== parseInt(currentUser.id)
                                    );
                                    // console.log(currentUser.id,users.length, users);
                                    
                                    // const selectedUSer = users.filter(
                                    //     (select) =>
                                    //         select.roles[0] === 'subscriber'
                                    // );

                                    let images = [];
                                    let titleString = [];
                                    let initialConv = false;
                                    if(users.length === 0 && !wpWaxCustomerSupportApp_CoreScriptData.is_user_admin){
                                        images.push(wpWaxCustomerSupportApp_CoreScriptData.admin_user.avater)
                                    }else if(users.length === 0 && wpWaxCustomerSupportApp_CoreScriptData.is_user_admin){
                                        images.push(wpWaxCustomerSupportApp_CoreScriptData.admin_user.avater)
                                    }else if(users.length === 1 && wpWaxCustomerSupportApp_CoreScriptData.is_user_admin){
                                        images.push(users[0].avater)
                                    }else if(users.length === 1 && !wpWaxCustomerSupportApp_CoreScriptData.is_user_admin){
                                        images.push(users[0].avater)
                                    }else if(users.length >= 1 && wpWaxCustomerSupportApp_CoreScriptData.is_user_admin){
                                        /* je login korchhe se Admin */
                                        const selectClient = users.filter(client => client.roles[0]==='subscriber');
                                        if(selectClient.length !==0){
                                            images.push(selectClient[0].avater);
                                        }else{
                                            images.push(users[0].avater);
                                        }
                                    }else if(users.length >= 1 && !wpWaxCustomerSupportApp_CoreScriptData.is_user_admin){
                                        images.push(users[0].avater);
                                    }
                                    // console.log(users.length,images);
                                    // if (selectedUSer.length !== 0) {
                                    //     images.push(selectedUSer[0].avater);
                                    // }

                                    if (item.users.length === 1) {
                                        titleString.push(item.users[0].name);
                                        initialConv = true;
                                    } else {
                                        for (let i = 0; i < users.length; i++) {
                                            titleString.push(users[i].name);
                                        }
                                    }

                                    if (Number(item.total_unread) > 0) {
                                        var moreDropdown = [
                                            {
                                                icon: envelopeOpen,
                                                name: 'mark-read',
                                                text: 'Mark as Read',
                                            },
                                            {
                                                icon: tag,
                                                name: 'add-tags',
                                                text: 'Add tags',
                                            },
                                            {
                                                icon: trash,
                                                name: 'delete-conv',
                                                text: 'Delete Conversation',
                                            },
                                        ];
                                    } else {
                                        var moreDropdown = [
                                            {
                                                icon: envelopeOpen,
                                                name: 'mark-unread',
                                                text: 'Mark as unread',
                                            },
                                            {
                                                icon: tag,
                                                name: 'add-tags',
                                                text: 'Add tags',
                                            },
                                            {
                                                icon: trash,
                                                name: 'delete-conv',
                                                text: 'Delete Conversation',
                                            },
                                        ];
                                    }

                                    const metaList = [
                                        {
                                            type: 'date',
                                            text: item.updated_on,
                                        },
                                    ];

                                    return (
                                        <li
                                            className={
                                                `wpwax-vm-session-${index}` ===
                                                activeSession
                                                    ? 'wpwax-vm-usermedia wpwax-vm-active'
                                                    : 'wpwax-vm-usermedia'
                                            }
                                            key={index}
                                            onClick={(e) =>
                                                handeSelectSession(
                                                    e,
                                                    item,
                                                    index
                                                )
                                            }
                                        >
                                            <div className='wpwax-vm-usermedia__left'>
                                                <MediaBox
                                                    chatingMedia={true}
                                                    lastMessage={
                                                        item.last_message
                                                    }
                                                    img={images}
                                                    initialConv={initialConv}
                                                    title={titleString.join()}
                                                    metaList={metaList}
                                                />
                                            </div>
                                            <div className='wpwax-vm-usermedia__right'>
                                                {Number(item.total_unread) >
                                                    0 && (
                                                    <span className='wpwax-vm-usermedia-status wpwax-vm-usermedia-status-unread'>
                                                        {item.total_unread}
                                                    </span>
                                                )}

                                                <Dropdown
                                                    dropdownText={false}
                                                    dropdownIconOpen={ellipsisV}
                                                    dropdownIconClose={
                                                        ellipsisV
                                                    }
                                                    dropdownList={moreDropdown}
                                                    outerState={sessionState}
                                                    setOuterState={
                                                        setSessionState
                                                    }
                                                    sessionId={item.session_id}
                                                />
                                            </div>
                                        </li>
                                    );
                                })}
                            </InfiniteScroll>
                        </ul>
                    ) : (
                        <div className='wpwax-vm-empty'>
                            <p>Not Found</p>
                        </div>
                    )}
                </div>
            )}

            <Taglist
                sessionState={sessionState}
                setSessionState={setSessionState}
                tagState={tagState}
                setTagState={setTagState}
            />

            <AddTag
                sessionState={sessionState}
                setSessionState={setSessionState}
                tagState={tagState}
                setTagState={setTagState}
            />

            <DeleteConfirm
                deleteBy={activeSessionId}
                modalOpen={deleteModalOpen}
                outerState={sessionState}
                setOuterState={setSessionState}
            />
        </SidebarWrap>
    );
};

export default Sidebar;
