import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import UserAvaterList from 'Components/UserAvaterList.jsx';
import Message from './overview/Message.jsx';
import Video from './overview/video/Index.jsx';
import search from 'Assets/svg/icons/magnifier.svg';
import videoPlay from 'Assets/svg/icons/video-play.svg';
import mice from 'Assets/svg/icons/mice.svg';
import textIcon from 'Assets/svg/icons/text.svg';
import paperPlane from 'Assets/svg/icons/paper-plane.svg';
import { ChatBoxWrap, MessageBoxWrap } from './Style';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
    handleReplyModeChange,
    handleMessageTypeChange,
    addSession,
    updateSessionMessages,
} from '../../store/messages/actionCreator';

import http from 'Helper/http.js';

const CenterBoxStyle = {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

function MessageBox() {
    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();
    const searchInputRef = useRef(null);

    const [state, setState] = useState({
        openSearch: false,
    });

    const current_user = wpWaxCustomerSupportApp_CoreScriptData.current_user;

    const [sessionMessages, setSessionMessages] = useState(null);
    const [latestMessageDate, setLatestMessageDate] = useState(null);

    const [isLoadingMoreMessages, setIsLoadingMoreMessages] = useState(false);
    const [isLoadingSession, setIsLoadingSession] = useState(false);

    const [isSendingTextMessage, setIsSendingTextMessage] = useState(false);
    const [isSendingAudioMessage, setIsSendingAudioMessage] = useState(false);
    const [isSendingVideoMessage, setIsSendingVideoMessage] = useState(false);

    // Refs
    const textMessageContentRef = useRef();

    // Message Contents
    const [textMessageContent, setTextMessageContent] = useState('');
    const [audioMessageContent, setAudioMessageContent] = useState(null);
    const [videoMessageContent, setVideoMessageContent] = useState(null);

    /* initialize Form Data */
    const {
        paginationPerPage,
        selectedSession,
        allSessions,
        replyMode,
        messageType,
    } = useSelector((state) => {
        return {
            paginationPerPage: state.messages.paginationPerPage,
            selectedSession: state.messages.selectedSession,
            allSessions: state.messages.allSessions,
            replyMode: state.messages.replyMode,
            messageType: state.messages.messageType,
        };
    });

    // Update session on sessionID change
    useEffect(
        function () {
            if (!selectedSession) {
                return;
            }

            if (!selectedSession.session_id) {
                return;
            }

            const session_id = selectedSession.session_id;

            // Load session data from store if available
            if (Object.keys(allSessions).includes(session_id)) {
                setSessionMessages(allSessions[session_id]);

                let latest_message_date = latestMessageDate;

                if (allSessions[session_id].length) {
                    const sessionMessageItems = allSessions[session_id];
                    const latestSessionItem =
                        sessionMessageItems[sessionMessageItems.length - 1];

                    latest_message_date = latestSessionItem.created_on;

                    setLatestMessageDate(latest_message_date);
                }

                // loadLatestMessages(latest_message_date);
                return;
            }

            // Otherwise session data load from API
            setIsLoadingSession(true);

            // Fetch session data from API
            const fetchSession = async () => {
                const sessionResponse = await http.getData('/messages', {
                    session_id,
                    limit: paginationPerPage,
                });
                return sessionResponse;
            };

            fetchSession()
                .then((response) => {
                    // Update Latest Message Date
                    if (response.data.data.length) {
                        setLatestMessageDate(response.data.data[0].created_on);
                    }

                    // Reverse The Order
                    const sessionMessages = response.data.data;

                    // Update The Store
                    dispatch(addSession(session_id, sessionMessages));

                    setSessionMessages(sessionMessages);
                    setIsLoadingSession(false);
                })
                .catch((error) => {
                    console.error({ error });
                    setIsLoadingSession(false);
                });
        },
        [selectedSession]
    );

    function getSessionUsers() {
        const sessionUsers =
            selectedSession && selectedSession.users
                ? JSON.parse(JSON.stringify(selectedSession.users))
                : [];

        return sessionUsers;
    }

    function getReplaingToUser() {
        const scriptData = wpWaxCustomerSupportApp_CoreScriptData;
        const is_user_admin = scriptData.is_user_admin;
        const admin_user = scriptData.admin_user
            ? scriptData.admin_user
            : {
                  name: 'Admin',
                  email: '',
                  avater: '',
              };

        let replayingTo = admin_user;

        if (is_user_admin) {
            replayingTo =
                selectedSession.first_message &&
                selectedSession.first_message.user
                    ? selectedSession.first_message.user
                    : null;
        }

        if (!replayingTo) {
            replayingTo = {
                name: 'Unknown User',
                email: '',
                avater: '',
            };
        }

        replayingTo.name = 'Replaying to ' + replayingTo.name;

        return replayingTo;
    }

    const { openSearch } = state;

    /* Handle Search Toggle */
    const handleSearchToggle = (event) => {
        event.preventDefault();
        const searchInput = document.getElementById(
            'wpwax-vm-messagebox-search'
        );
        searchInput.setSelectionRange(0, 0);

        setState({
            openSearch: !openSearch,
        });
    };

    /* Focus Input field when search inopen */
    useEffect(() => {
        if (!searchInputRef.current) {
            return;
        }

        searchInputRef.current.focus();
    }, [openSearch]);

    /* Handle Video Message */
    const showReplayViaVideoMessage = (event) => {
        event.preventDefault();
        dispatch(handleMessageTypeChange('video'));
    };

    /* Handle Text Message */
    const showReplayViaTextMessage = (event) => {
        event.preventDefault();

        dispatch(handleMessageTypeChange('text'));
        dispatch(handleReplyModeChange(false));
    };

    /* Handle Voice Message */
    const showReplayViaVoiceMessage = (event) => {
        event.preventDefault();
        dispatch(handleMessageTypeChange('voice'));
        dispatch(handleReplyModeChange(false));
    };

    /* Handle Reply Mode */
    const haldleReplyMode = () => {
        if (messageType === 'video') {
            return (
                <Video
                    sessionID={selectedSession.session_id}
                    onSuccess={loadLatestMessages}
                    replayingTo={getReplaingToUser()}
                />
            );
        }
    };

    const sendTextMessage = async function (e) {
        e.preventDefault();

        if (isSendingTextMessage) {
            return;
        }

        setIsSendingTextMessage(true);

        // Send Message
        const response = await createTextMessage(textMessageContent);

        setIsSendingTextMessage(false);

        // Show Alert on Error
        if (!response.success) {
            const message = response.message
                ? response.message
                : 'Somethong went wrong, please try again.';
            alert(message);

            return;
        }

        // Reset Input
        setTextMessageContent('');

        // Load Latest
        loadLatestMessages(latestMessageDate);
    };

    const createTextMessage = async (text) => {
        const args = {
            session_id: selectedSession.session_id,
            message_type: 'text',
            message: text,
        };

        let status = {
            success: false,
            data: null,
        };

        try {
            const response = await http.postData('/messages', args);

            status.success = true;
            status.data = response;

            return status;
        } catch (error) {
            status.success = false;

            console.error({ error });

            return status;
        }
    };

    const getMessages = async (customArgs) => {
        const defaultArgs = {
            session_id: selectedSession.session_id,
            page: 1,
        };

        const args = { ...defaultArgs, ...customArgs };

        let status = {
            success: false,
            data: null,
        };

        try {
            const response = await http.getData('/messages', args);

            status.success = true;
            status.data = response;

            return status;
        } catch (error) {
            status.success = false;
            status.data = response;

            console.error({ error });

            return status;
        }
    };

    async function loadLatestMessages(latest_message_date) {
        let args = { limit: -1 };

        latest_message_date = latest_message_date
            ? latest_message_date
            : latestMessageDate;

        if (latest_message_date) {
            args.created_on = latest_message_date;
            args.created_on_compare_date_time = '>';
        }

        const response = await getMessages(args);

        // Show Alert on Error
        if (!response.success) {
            const message = response.message
                ? response.message
                : 'Somethong went wrong, please try again.';
            alert(message);

            return;
        }

        const responseData = response.data.data.data;

        if (!responseData.length) {
            return;
        }

        const newLatestMessageDate = responseData[0].created_on;

        // Update Latest Message Date
        setLatestMessageDate(newLatestMessageDate);

        // Update Latest Message
        let latestItems = responseData;

        const updatedSessionMessages = [...latestItems, ...sessionMessages];

        setSessionMessages(updatedSessionMessages);

        dispatch(
            updateSessionMessages(
                selectedSession.session_id,
                updatedSessionMessages
            )
        );
    }

    const loadOlderMessages = async () => {
        setIsLoadingMoreMessages(true);

        // Get Older Messages
        const paginationMeta = getPaginationMeta();
        const nextPage = paginationMeta.nextPage;

        const response = await getMessages({
            page: nextPage,
            limit: paginationPerPage,
        });

        setIsLoadingMoreMessages(false);

        // Show Alert on Error
        if (!response.success) {
            const message = response.message
                ? response.message
                : 'Somethong went wrong, please try again.';
            alert(message);

            return;
        }

        // Update Loaded Session
        let latestItems = response.data.data.data;

        if (!latestItems.length) {
            return;
        }

        latestItems = latestItems.splice(
            0,
            latestItems.length - paginationMeta.reminder
        );

        if (!latestItems.length) {
            return;
        }

        const updatedSessionMessages = [...sessionMessages, ...latestItems];

        setSessionMessages(updatedSessionMessages);
    };

    const getPaginationMeta = () => {
        const currentSession = sessionMessages;
        const perPage = paginationPerPage;
        const currentPageItemsCount = currentSession.length;
        const currentPageItemsReminder = currentPageItemsCount % perPage;

        let currentPage =
            currentPageItemsCount >= perPage
                ? (currentPageItemsCount - currentPageItemsReminder) / perPage
                : 1;
        currentPage =
            currentPageItemsCount >= perPage && currentPageItemsReminder > 0
                ? currentPage + 1
                : currentPage;

        const nextPage =
            currentPageItemsReminder > 0 ? currentPage : currentPage + 1;

        return {
            currentPageItemsCount,
            perPage,
            currentPage,
            nextPage,
            reminder: currentPageItemsReminder,
        };
    };

    /* Handle Load Footer Content */
    const handleFooterContent = function () {
        if (messageType === 'text') {
            return (
                <div className='wpwax-vm-messagebox-footer'>
                    <a
                        href='#'
                        className='wpwax-vm-messagebox-reply-text-close'
                        onClick={handleTextClose}
                    >
                        <span className='dashicons dashicons-no-alt'></span>
                    </a>
                    <div className='wpwax-vm-messagebox-reply'>
                        <div className='wpwax-vm-messagebox-reply__input'>
                            <form onSubmit={sendTextMessage}>
                                <input
                                    ref={textMessageContentRef}
                                    type='text'
                                    disabled={isSendingTextMessage}
                                    name='wpwax-vm-messagebox-reply-input'
                                    id='wpwax-vm-messagebox-reply-input'
                                    placeholder='Type a message'
                                    value={textMessageContent}
                                    onChange={(event) => {
                                        setTextMessageContent(
                                            event.target.value
                                        );
                                    }}
                                />

                                <input
                                    type='submit'
                                    style={{ display: 'none' }}
                                    hidden
                                />
                            </form>
                        </div>
                        <div className='wpwax-vm-messagebox-reply__action'>
                            <a
                                href='#'
                                className='wpwax-vm-messagebox-reply-send'
                                onClick={sendTextMessage}
                            >
                                <ReactSVG src={paperPlane} />
                            </a>
                        </div>
                    </div>
                </div>
            );
        } else if (messageType === 'voice') {
            return (
                <div className='wpwax-vm-messagebox-footer'>
                    <div className='wpwax-vm-messagebox-reply wpwax-vm-messagebox-reply-voice'>
                        <div className='wpwax-vm-messagebox-reply__input'>
                            <a
                                href='#'
                                className='wpwax-vm-messagebox-reply-voice-close'
                                onClick={handleTextClose}
                            >
                                <span className='dashicons dashicons-no-alt'></span>
                            </a>
                            <span className='wpwax-vm-audio-range'>
                                <span className='wpwax-vm-audio-range-inner'></span>
                            </span>
                            <span className='wpwax-vm-timer'>02:30</span>
                        </div>
                        <div className='wpwax-vm-messagebox-reply__action'>
                            <a
                                href='#'
                                className='wpwax-vm-messagebox-reply-send'
                            >
                                <ReactSVG src={paperPlane} />
                            </a>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='wpwax-vm-messagebox-footer'>
                    <span className='wpwax-vm-messagebox-footer__text'>
                        How would you like to answer?
                    </span>
                    <div className='wpwax-vm-messagebox-footer__actionlist'>
                        <a
                            href='#'
                            className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-gray'
                            onClick={showReplayViaVideoMessage}
                        >
                            <div className='wpwax-vm-btn-icon'>
                                <ReactSVG src={videoPlay} />
                            </div>
                            <span className='wpwax-vm-btn-text'>Video</span>
                        </a>
                        <a
                            href='#'
                            className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-gray'
                            onClick={showReplayViaVoiceMessage}
                        >
                            <div className='wpwax-vm-btn-icon'>
                                <ReactSVG src={mice} />
                            </div>
                            <span className='wpwax-vm-btn-text'>Voice</span>
                        </a>
                        <a
                            href='#'
                            className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-gray'
                            onClick={showReplayViaTextMessage}
                        >
                            <div className='wpwax-vm-btn-icon'>
                                <ReactSVG src={textIcon} />
                            </div>
                            <span className='wpwax-vm-btn-text'>Text</span>
                        </a>
                    </div>
                </div>
            );
        }
    };

    /* Handle Text Colse */
    const handleTextClose = (e) => {
        e.preventDefault();

        dispatch(handleMessageTypeChange(''));
        dispatch(handleReplyModeChange(false));
    };

    return (
        <ChatBoxWrap>
            {sessionMessages ? (
                <div style={{ height: '100%' }}>
                    {!isLoadingSession ? (
                        <div>
                            <MessageBoxWrap>
                                <div className='wpwax-vm-messagebox-header'>
                                    <div className='wpwax-vm-messagebox-header__left'>
                                        <UserAvaterList
                                            users={getSessionUsers()}
                                        />
                                    </div>

                                    <div className='wpwax-vm-messagebox-header__right'>
                                        <div className='wpwax-vm-messagebox-header__actionlist'>
                                            <div className='wpwax-vm-messagebox-header__action-item wpwax-vm-messagebox-header-search'>
                                                <div
                                                    className={
                                                        openSearch
                                                            ? 'wpwax-vm-searchbox wpwax-vm-show'
                                                            : 'wpwax-vm-searchbox'
                                                    }
                                                >
                                                    <input
                                                        type='text'
                                                        ref={searchInputRef}
                                                        name='wpwax-vm-messagebox-search'
                                                        id='wpwax-vm-messagebox-search'
                                                        placeholder='Search'
                                                    />
                                                </div>
                                                <a
                                                    href='#'
                                                    className='wpwax-vm-search-toggle'
                                                    onClick={handleSearchToggle}
                                                >
                                                    <ReactSVG src={search} />
                                                </a>
                                            </div>
                                            <div className='wpwax-vm-messagebox-header__action-item wpwax-vm-messagebox-header-video'>
                                                <a
                                                    href='#'
                                                    className='wpwax-vm-messagebox-header__action--link'
                                                    onClick={
                                                        showReplayViaVideoMessage
                                                    }
                                                >
                                                    <ReactSVG src={videoPlay} />
                                                    <span className='wpwax-vm-messagebox-header__action--text'>
                                                        Videos
                                                    </span>
                                                </a>
                                            </div>
                                            <div className='wpwax-vm-messagebox-header__action-item wpwax-vm-messagebox-header-voice'>
                                                <a
                                                    href='#'
                                                    className='wpwax-vm-messagebox-header__action--link'
                                                    onClick={
                                                        showReplayViaVoiceMessage
                                                    }
                                                >
                                                    <ReactSVG src={mice} />
                                                    <span className='wpwax-vm-messagebox-header__action--text'>
                                                        Voice
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    id='scrollableDiv'
                                    className='wpwax-vm-messagebox-body'
                                    style={{
                                        overflow: 'auto',
                                        display: 'flex',
                                        flexDirection: 'column-reverse',
                                    }}
                                >
                                    <InfiniteScroll
                                        dataLength={sessionMessages.length}
                                        next={() => {
                                            loadOlderMessages();
                                        }}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column-reverse',
                                        }}
                                        inverse={true} //
                                        hasMore={true}
                                        loader={
                                            isLoadingMoreMessages ? (
                                                <h3
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    Loading...
                                                </h3>
                                            ) : (
                                                ''
                                            )
                                        }
                                        refreshFunction={() => {
                                            loadOlderMessages();
                                        }}
                                        pullDownToRefresh
                                        pullDownToRefreshThreshold={2}
                                        pullDownToRefreshContent={
                                            <h3 style={{ textAlign: 'center' }}>
                                                &#8595; Pull down to load older
                                                messages
                                            </h3>
                                        }
                                        releaseToRefreshContent={
                                            <h3 style={{ textAlign: 'center' }}>
                                                &#8593; Release to load older
                                                messages
                                            </h3>
                                        }
                                        scrollableTarget='scrollableDiv'
                                    >
                                        {sessionMessages.map(
                                            (message, index) => {
                                                return (
                                                    <Message
                                                        data={message}
                                                        key={index}
                                                        currentUser={
                                                            current_user
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                    </InfiniteScroll>
                                </div>
                                {handleFooterContent()}
                            </MessageBoxWrap>

                            {replyMode ? (
                                <div className='wpwax-vm-replymode-wrap'>
                                    {haldleReplyMode()}
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    ) : (
                        <div style={CenterBoxStyle}>
                            <h2>Loading...</h2>
                        </div>
                    )}
                </div>
            ) : (
                <div style={CenterBoxStyle}>
                    <h2>No conversation is selected.</h2>
                </div>
            )}
        </ChatBoxWrap>
    );
}

export default MessageBox;
