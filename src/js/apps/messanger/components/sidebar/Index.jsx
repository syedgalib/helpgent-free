/*--------------------------------
 -- Title: Sidebar main component
 --	Description: This component is a hub of all child components of sidebar
 -- Author: wpWax
 -- Version: 1.0.0
 -- Date: 12/09/2022

--------------------------------*/

import React, { useState, useEffect, useRef } from 'react';
import ReactSVG from 'react-inlinesvg';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Dropdown from 'Components/form-fields/Dropdown.jsx';
import MediaBox from 'Components/MediaBox.jsx';
import Taglist from './components/Taglist.jsx';
import AddTag from './components/AddTag.jsx';
import DeleteConfirm from './components/DeleteConfirm.jsx';
import useConversationAPI from 'API/useConversationAPI.js';
import useTermAPI from 'API/useTermAPI.js';
import TagFilter from './components/TagFilter.jsx';
import { useDebounce } from 'Helper/hooks';
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
import archive from 'Assets/svg/icons/box-archive.svg';
import checkSlot from 'Assets/svg/icons/check-to-slot.svg';
import { SidebarWrap, SessionFilterWrap } from './Style';
import { updateSelectedSession } from '../../store/messages/actionCreator.js';
import { getTimezoneString } from 'Helper/utils.js';
import { useCoreData } from 'Hooks/useCoreData.jsx';

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

const Sidebar = ({ sessionState, setSessionState, extractTotalUnread }) => {
    const {
		getItems: getConversations,
		updateItem: updateFormName,
		deleteItem: deleteForm,
	} = useConversationAPI();

    const { getItems: getTerms } = useTermAPI();

	const { doAction } = wpwaxHooks;

    const ref = useRef(null);
    const [tagState, setTagState] = useState({
        allTags: [],
        assignedTags: [],
        filteredTagList: [],
        loader: false,
        tagLoader: false,
        addTagModalOpen: false,
    });

    const [isShowingArchive, setIsShowingArchive] = useState(false);
    const [pageNumber, setPageNumber] = useState(2);
    const [activeSession, setAtiveSession] = useState('');
    const [refresher, setRefresher] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [tagFilterDropdownOpen, setTagFilterDropdownOpen] = useState(false);
    const currentUser = useCoreData( 'current_user' );
	const isCurrentUserAdmin = useCoreData( 'is_user_admin' );

    const {
        sessionList,
        activeSessionId,
        deleteModalOpen,
        successMessage,
        rejectMessage,
        sessionFilterDropdown,
        hasMore,
        loader,
    } = sessionState;

    const {allTags} = tagState;
    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    const debouncedSearchTerm = useDebounce(searchTerm, 300) ;

    const refSidebar = useRef(null);

    // Effect for API call
    useEffect(() => {
        const searchArg = {
            search: debouncedSearchTerm,
			timezone: getTimezoneString(),
        };
        const fetchSearchNameMail = async () => {
            const searchByNameMailResponse = await getConversations(searchArg);
            return searchByNameMailResponse;
        };

        fetchSearchNameMail()
            .then((searchByNameMailResponse) => {
                setSessionState({
                    ...sessionState,
                    loader: false,
                    sessionList: searchByNameMailResponse.data,
					totalUnredConversations: extractTotalUnread( searchByNameMailResponse )
                });
            })
            .catch((error) => {
                console.log(error);
            });

    },[debouncedSearchTerm]);

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (tagFilterDropdownOpen && refSidebar.current && !refSidebar.current.contains(e.target)) {
                setTagFilterDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
	}, [tagFilterDropdownOpen]);

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
			timezone: getTimezoneString(),
        };
        const fetchSession = async () => {
            const sessionResponse = await getConversations(pageLimit);
            return sessionResponse;
        };

        fetchSession()
            .then((sessionResponse) => {
                setSessionState({
                    ...sessionState,
                    sessionList: sessionResponse.data,
                    filteredSessions: sessionResponse.data,
					totalUnredConversations: extractTotalUnread( sessionResponse ),
                    successMessage: "",
                    loader: false,
                });
                dispatch(handleReadSessions(sessionResponse.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }, [refresher]);

    const handleTagFilterDropdown = (event) => {
        event.preventDefault();
        if(allTags.length === 0){
            setTagState({
                ...tagState,
                tagLoader: true
            });
            const fetchTags = async () =>{

                const tagsResponse = await getTerms({limit:5});
                return tagsResponse;
            }
            fetchTags()
                .then((tagsResponse) => {
                    setTagState({
                        ...tagState,
                        tagLoader: false,
                        allTags: tagsResponse.data,
                        filteredTagList: tagsResponse.data,
                    });
                })
                .catch((error) => {
                    setTagState({
                        ...tagState,
                        tagLoader: false,
                    });
                    console.log(error);
                });
        }

        setTagFilterDropdownOpen(!tagFilterDropdownOpen);
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

    const fetchMoreData = () => {
        const pageArg = {
            limit: '15',
            page: pageNumber,
        };
        setPageNumber(pageNumber + 1);
        const fetchNext = async () => {
            const nextSessionResponse = await getConversations(pageArg);
            return nextSessionResponse;
        };
        setTimeout(() => {
            fetchNext()
                .then((nextSessionResponse) => {
                    if (nextSessionResponse.data.length == 0) {
                        setSessionState({
                            ...sessionState,
                            hasMore: false,
                        });
                    } else {
                        setSessionState({
                            ...sessionState,
                            sessionList: sessionList.concat(
                                nextSessionResponse.data
                            ),
                            filteredSessions: sessionList.concat(
                                nextSessionResponse.data
                            ),
							totalUnredConversations: extractTotalUnread( nextSessionResponse ),
                            loader: false,
                        });
                    }

                    dispatch(
                        handleReadSessions(
                            sessionList.concat(nextSessionResponse.data)
                        )
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 1500);
    };

    const handeSelectSession = (e, item, index) => {
        setAtiveSession(`wpwax-vm-session-${index}`);
        dispatch(updateSelectedSession(item));
    };

    const handleRefresh = (event) => {
        event.preventDefault();

		doAction( 'beforeConversationRefresh' );

		setAtiveSession('');

        setRefresher({
            refresher: !refresher,
        });
        setSessionState({
            ...sessionState,
            sessionFilterDropdown: false,
            hasMore: true,
        });

        let args = {
			limit: '15',
			page: 1,
		};

		args.status = 'active';
		setIsShowingArchive( false );

		updateConversations( args );
    };

	const handleToggleArchivedConversation = ( e ) =>  {
		e.preventDefault();

		let args = {
			limit: '15',
			page: 1,
		};

		if ( isShowingArchive ) {
			args.status = 'active';
			setIsShowingArchive( false );
		} else {
			args.status = 'archive';
			setIsShowingArchive( true );
		}

		updateConversations( args );

	}

	const updateConversations = ( args ) => {
		setSessionState({
            ...sessionState,
            hasMore: true,
            loader: true,
        });

        setPageNumber(2);

        const defaultArgs = {
            limit: '15',
            page: 1,
            status: 'active',
        };

		args = ( args && typeof args === 'object' ) ? { ...defaultArgs, ...args } : defaultArgs;

        const fetchSession = async () => {
            const sessionResponse = await getConversations( args );
            return sessionResponse;
        };

        fetchSession()
            .then((sessionResponse) => {
                setSessionState({
                    ...sessionState,
                    sessionList: sessionResponse.data,
                    filteredSessions: sessionResponse.data,
					totalUnredConversations: extractTotalUnread( sessionResponse ),
                    successMessage: "",
                    hasMore: true,
                    loader: false,
                });
                dispatch(handleReadSessions(sessionResponse.data));
            })
            .catch((error) => {
                console.log(error);
            });
	};

    const interval = setInterval(function() {
        // method to be executed;
    }, 5000);

    return (
        <SidebarWrap className={loader ? 'wpwax-vm-loder-active' : null}>
            <div className='wpwax-vm-sidebar-top'>
                <h3 className='wpwax-vm-sidebar-title'>
                    <a href="#" onClick={handleRefresh}>All Conversations</a>
                </h3>
                <div className="wpwax-vm-sidebar-top__action">
					{ sessionState.isCurrentUserAdmin && (
						<a href="#" onClick={handleToggleArchivedConversation} className={ isShowingArchive ? 'active' : '' }>
							<ReactSVG src={archive}/>
							<span>Archive</span>
						</a>
					)}

                    <a
                        href='#'
                        className='wpwax-vm-sidebar-refresher'
                        onClick={handleRefresh}
                    >
                        <ReactSVG src={rotateIcon} />
                    </a>
                </div>

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
                    <div className='wpwax-vm-sidebar-search' ref={refSidebar}>

                        <div className={tagFilterDropdownOpen ? 'wpwax-vm-form-group wpwax-vm-form-icon-left wpwax-vm-tag-dropdown-open' : 'wpwax-vm-form-group wpwax-vm-form-icon-left'}>
                            <span className='wpwax-vm-input-icon'>
                                <ReactSVG src={magnifier} />
                            </span>

                            <input
                                type='text'
								className='wpwax-vm-form__element'
								id='wpwax-vm-filter-search'
								placeholder='Search'
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

							{ isCurrentUserAdmin &&
								<a
									href='#'
									className='wpwax-vm-search-toggle'
									onClick={handleTagFilterDropdown}
								>
									<ReactSVG src={slider} />
								</a>
							}
                        </div>
                        <TagFilter
                            outerState={sessionState}
                            setOuterState={setSessionState}
                            tagState={tagState}
                            setTagState={setTagState}
                            setPageNumber={setPageNumber}
                            tagFilterDropdownOpen={tagFilterDropdownOpen}
                            setTagFilterDropdownOpen={setTagFilterDropdownOpen}
                        />
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
                    {
                        wpWaxCustomerSupportApp_CoreScriptData.is_user_admin ?
                        <a
                            href='#'
                            className='wpwax-vm-btn-all-tags'
                            onClick={handleAllTagActivation}
                        >
                            <ReactSVG src={tag} />
                            <span>Tags</span>
                        </a> : null
                    }

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
									const currentUserEmail = ( currentUser && currentUser.email ) ? currentUser.email : '';
									const currentUserRole  = ( currentUser && currentUser.roles.length ) ? currentUser.roles[0] : '';

									let engagedUsers = item.users.filter( item => {

										if ( item.email === currentUserEmail ) {
											return false;
										}

										if ( item.roles[0] === currentUserRole ) {
											return false;
										}

										return true;
									});

									engagedUsers = ( engagedUsers.length ) ? engagedUsers : [ currentUser ];

									const initialConv = item.users.length === 1;
									const userImages  = engagedUsers.map( item => item.avater );
									const userNames   = engagedUsers.map( item => item.name );

                                    if (item.read) {
                                        var moreDropdown = wpWaxCustomerSupportApp_CoreScriptData.is_user_admin ?
                                            [
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
                                                    icon: item.status === 'active' ? archive : checkSlot,
                                                    name: item.status === 'active' ? 'archive-conversation' : 'active-conversation',
                                                    text: item.status === 'active' ? 'Archive' : 'Active',
                                                },
                                                {
                                                    icon: trash,
                                                    name: 'delete-conv',
                                                    text: 'Delete Conversation',
                                                },
                                            ]
                                        :
                                            [
                                                {
                                                    icon: envelopeOpen,
                                                    name: 'mark-unread',
                                                    text: 'Mark as unread',
                                                }
                                            ];
                                    } else {
                                        var moreDropdown = wpWaxCustomerSupportApp_CoreScriptData.is_user_admin ?
                                            [
                                                {
                                                    icon: envelopeOpen,
                                                    name: 'mark-read',
                                                    text: 'Mark as read',
                                                },
                                                {
                                                    icon: tag,
                                                    name: 'add-tags',
                                                    text: 'Add tags',
                                                },
                                                {
                                                    icon: item.status === 'active' ? archive : checkSlot,
                                                    name: item.status === 'active' ? 'archive-conversation' : 'active-conversation',
                                                    text: item.status === 'active' ? 'Archive' : 'Active',
                                                },
                                                {
                                                    icon: trash,
                                                    name: 'delete-conv',
                                                    text: 'Delete Conversation',
                                                },
                                            ]
                                        :
                                            [
                                                {
                                                    icon: envelopeOpen,
                                                    name: 'mark-read',
                                                    text: 'Mark as read',
                                                }
                                            ]
                                    }

                                    const metaList = [
                                        {
                                            type: 'date',
                                            text: ( item.last_message && item.last_message.updated_at_formatted ) ? item.last_message.updated_at_formatted : '',
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
                                            onClick={ (e) => {
												handeSelectSession( e, item, index );
											}}
                                        >
                                            <div className={item.read ? 'wpwax-vm-usermedia__left' : 'wpwax-vm-usermedia__left wpwax-vm-media-unread'}>
                                                <MediaBox
                                                    chatingMedia={true}
                                                    lastMessage={
                                                        item.last_message
                                                    }
                                                    img={userImages}
                                                    sessionState={sessionState}
                                                    setSessionState={setSessionState}
                                                    sessionTerm={ isCurrentUserAdmin ? item.terms : [] }
                                                    initialConv={initialConv}
                                                    sessionId={item.id}
                                                    title={userNames}
                                                    metaList={metaList}
                                                />
                                            </div>
                                            <div className='wpwax-vm-usermedia__right'>
                                                {!item.read ?  <span className='wpwax-vm-usermedia-status wpwax-vm-usermedia-status-unread'></span> : null}
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
                                                    sessionId={item.id}
                                                />
                                            </div>
                                        </li>
                                    );
                                })}
                            </InfiniteScroll>
                        </ul>
                    ) : (
                        <div className='wpwax-vm-empty'>
                            <p>No Item Found</p>
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
				onSuccess={( data ) => {
					doAction( 'onConversationDelete', data );
				}}
            />
        </SidebarWrap>
    );
};

export default Sidebar;
