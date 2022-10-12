import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactSVG from 'react-inlinesvg';
import UserAvaterList from 'Components/UserAvaterList.jsx';
import Message from './overview/Message.jsx';
import Video from './overview/video/Index.jsx';
import { useDebounce } from '../../../../../../helpers/debounce-hook.js';
import search from 'Assets/svg/icons/magnifier.svg';
import videoPlay from 'Assets/svg/icons/video-play.svg';
import mice from 'Assets/svg/icons/mice.svg';
import textIcon from 'Assets/svg/icons/text.svg';
import paperPlane from 'Assets/svg/icons/paper-plane.svg';
import loadingIcon from 'Assets/svg/loaders/loading-spin.svg';
import { ChatBoxWrap, MessageBoxWrap } from './Style';
import InfiniteScroll from 'react-infinite-scroll-component';
import attachmentAPI from 'apiService/attachment-api';
import { useScreenSize } from 'Helper/hooks.js';

import {
    handleReplyModeChange,
    handleMessageTypeChange,
    addSession,
    updateSessionMessages,
    updateSessionMessageItem,
    addSessionWindowData,
    updateSessionWindowData,
} from '../../store/messages/actionCreator';

import http from 'Helper/http.js';
import { formatSecondsAsCountdown } from 'Helper/formatter.js';
import LoadingSpinDot from 'Components/LoadingSpinDot.jsx';

const CenterBoxStyle = {
    minHeight: '620px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '20px',
};

function MessageBox({ setSessionState }) {
    const messengerScriptData = wpWaxCustomerSupportApp_MessengerScriptData;

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();
    const searchInputRef = useRef(null);

    const current_user = wpWaxCustomerSupportApp_CoreScriptData.current_user;

    const [searchTerm, setSearchTerm] = useState("");

    const [scrollBtnVisibility, setScrollBtnVisibility] = useState(false);
    const [messageDirection, setMessageDirection] = useState('bottom');

	const [screenSize, SCREEN_SIZES] = useScreenSize();

    const [sessionMessages, setSessionMessages] = useState([]);
    const [latestMessageDate, setLatestMessageDate] = useState(null);

    const [isLoadingMoreMessages, setIsLoadingMoreMessages] = useState(false);
    const [isLoadingSession, setIsLoadingSession] = useState(false);

    const [isSendingTextMessage, setIsSendingTextMessage] = useState(false);
    const [isSendingAudioMessage, setIsSendingAudioMessage] = useState(false);

    //
    const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
    const [isRecordingVoice, setIsRecordingVoice] = useState(false);
    const [recordedVoiceTimeInSecond, setRecordedVoiceTimeInSecond] = useState(0);

    const [recordedTimeLength, setRecordedTimeLength] = useState(0);

    const voiceRecordingLimitInSecond =
        messengerScriptData &&
        typeof messengerScriptData.voiceRecordTimeLimit !== 'undefined'
            ? parseInt(messengerScriptData.voiceRecordTimeLimit)
            : 300; // 5 Minuites

    // Refs
    const textMessageContentRef = useRef();

    // Message Contents
    const [textMessageContent, setTextMessageContent] = useState('');

    // Search Results
    const [currentSearchResultPage, setCurrentSearchResultPage] = useState(1);
    const [isLoadingSearchResults, setIsLoadingSearchResults] = useState(false);
    const [isLoadingMoreSearchResults, setIsLoadingMoreSearchResults] =
        useState(false);

    /* initialize Form Data */
    const {
        paginationPerPage,
        selectedSession,
        allSessions,
        allSessionWindowData,
        defaultSessionWindowData,
        replyMode,
        messageType,
    } = useSelector((state) => {
        return {
            paginationPerPage: state.messages.paginationPerPage,
            selectedSession: state.messages.selectedSession,
            allSessions: state.messages.allSessions,
            allSessionWindowData: state.messages.allSessionWindowData,
            defaultSessionWindowData: state.messages.defaultSessionWindowData,
            replyMode: state.messages.replyMode,
            messageType: state.messages.messageType,
        };
    });

	const canSendTextMessage = () => {
		return (textMessageContent.trim().length > 0);
	}

    const getWindowData = (key) => {
        const selectedSessionID = selectedSession
            ? selectedSession.session_id
            : null;

        if (!selectedSessionID) {
            return defaultSessionWindowData[key];
        }

        const selectedWindow =
            typeof allSessionWindowData[selectedSessionID] !== 'undefined'
                ? allSessionWindowData[selectedSessionID]
                : null;

        if (!selectedWindow) {
            return defaultSessionWindowData[key];
        }

        const selectedWindowData =
            typeof allSessionWindowData[selectedSessionID][key] !== 'undefined'
                ? allSessionWindowData[selectedSessionID][key]
                : null;

        if (!selectedWindowData) {
            return defaultSessionWindowData[key];
        }

        return selectedWindowData;
    };
    
    const debouncedSearchTerm = useDebounce(searchTerm, 250);

    // Effect for API call
    useEffect(() => {
        const text = debouncedSearchTerm;
        if(selectedSession){
            dispatch(
                updateSessionWindowData(
                    selectedSession.session_id,
                    'searchKeyword',
                    text
                )
            );
    
            // Update Query Args
            const newSearchQueryArgs = { message: text };
            dispatch(
                updateSessionWindowData(
                    selectedSession.session_id,
                    'searchQueryArgs',
                    newSearchQueryArgs
                )
            );
            if (text.length) {
                // Activate Search Mode
                dispatch(
                    updateSessionWindowData(
                        selectedSession.session_id,
                        'isSearching',
                        true
                    )
                );
            } else {
                // Inactivate Search Mode
                dispatch(
                    updateSessionWindowData(
                        selectedSession.session_id,
                        'isSearching',
                        false
                    )
                );
            }
    
            loadSearchResults(newSearchQueryArgs);
        }
        
    },[debouncedSearchTerm]);

    // Update session on sessionID change
    useEffect(
        function () {
            // Reset Text Message Content
            setTextMessageContent('');

            if (!selectedSession) {
                return;
            }

            if (!selectedSession.session_id) {
                return;
            }

            setIsLoadingSession(true);

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

                setIsLoadingSession(false);
                return;
            }

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

                    const sessionMessages = response.data.data;

                    // Update The Store
                    dispatch(addSession(session_id, sessionMessages));
                    dispatch(addSessionWindowData(session_id));

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

    const messageBody = document.querySelector(
        '.wpwax-vm-messagebox-body .infinite-scroll-component '
    );

    messageBody &&
        messageBody.addEventListener('scroll', function () {
            const scrolled = messageBody.scrollTop;

            if (scrolled < -350) {
                setScrollBtnVisibility(true);
            } else {
                setScrollBtnVisibility(false);
            }
        });

    const getMessageBoxHeight = () => {
        switch (screenSize) {
            case SCREEN_SIZES.LARGE:
                return 500;
            case SCREEN_SIZES.MEDIUM:
                return 400;
            case SCREEN_SIZES.TAB:
            case SCREEN_SIZES.MOBILE:
                return 300;
        }
    };

    // Update Recorded Time Length
    useEffect(() => {
        const timeLength = calculateRecordedTimeLength();
        setRecordedTimeLength(timeLength);

        if (recordedVoiceTimeInSecond >= voiceRecordingLimitInSecond) {
            stopVoiceRecording();
        }
    }, [recordedVoiceTimeInSecond]);

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
                    ? JSON.parse(
                          JSON.stringify(selectedSession.first_message.user)
                      )
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

    const openSearch = getWindowData('openSearch');
    const searchResults = getWindowData('searchResults');
    const isSearching = getWindowData('isSearching');
    const searchQueryArgs = getWindowData('searchQueryArgs');
    const messagesContainerScrollMeta = getWindowData(
        'messagesContainerScrollMeta'
    );

    const isShowingVideoSearchResult = getWindowData(
        'isShowingVideoSearchResult'
    );
    const isShowingVoiceSearchResult = getWindowData(
        'isShowingVoiceSearchResult'
    );

    const setSearchResults = function (results) {
        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'searchResults',
                results
            )
        );
    };

    const dismisSearch = () => {
        // Hide Search Results
        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'isSearching',
                false
            )
        );

        // Reset Serch Result
        setSearchResults([]);

        // Reset Serch Query Args
        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'searchQueryArgs',
                {}
            )
        );
    };

    const dismissFilters = () => {
        dismisSearch();

        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'isShowingVideoSearchResult',
                false
            )
        );

        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'isShowingVoiceSearchResult',
                false
            )
        );
    };

    /* Handle Search Toggle */
    const handleActiveSearch = (event) => {
        event.preventDefault();
        const searchInput = document.getElementById(
            'wpwax-vm-messagebox-search'
        );
        searchInput.setSelectionRange(0, 0);

        dismissFilters();

        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'openSearch',
                true
            )
        );
    };

    const handleDiactiveSearch = (event) => {
        event.preventDefault();
        const searchInput = document.getElementById(
            'wpwax-vm-messagebox-search'
        );
        searchInput.setSelectionRange(0, 0);

        // Close search bar
        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'openSearch',
                false
            )
        );

        // Reset search input
        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'searchKeyword',
                ''
            )
        );

        // Reset Search Result
        dismisSearch();
    };

    const calculateRecordedTimeLength = () => {
        let r = recordedVoiceTimeInSecond / voiceRecordingLimitInSecond;
        r = isNaN(r) ? 0 : r;

        return r * 100;
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
    const showReplayViaVoiceMessage = async (event) => {
        event.preventDefault();

        // Check Permission
        const can_record_auido = await canRecordAudio();

        if (!can_record_auido) {
            return;
        }

        // Prepare Voice Recording;
        await prepareVoiceRecording();

        // Show Recording UI
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

		if (!canSendTextMessage()) {
			return;
		}

        setIsSendingTextMessage(true);

        // Send Message
        const response = await createMessage({ message: textMessageContent });

        setIsSendingTextMessage(false);

        // Show Alert on Error
        if (!response.success) {
            const message = response.message
                ? response.message
                : 'Somethong went wrong, please try again.';
            alert(message);
            textMessageContentRef.current.focus();

            return;
        }

        // Reset Input
        setTextMessageContent('');
        textMessageContentRef.current.focus();

        // Load Latest
        loadLatestMessages(latestMessageDate);
    };

	const canSendAudioMessage = () => {
		const MIN_AUDIO_MESSAGE_LIMIT_IN_SECONDS = 1;
		return (recordedVoiceTimeInSecond >= MIN_AUDIO_MESSAGE_LIMIT_IN_SECONDS);
	}

    const handleSendAudioMessage = async function (e) {
        e.preventDefault();

        if (isSendingAudioMessage) {
            return;
        }

        if (isRecordingVoice) {
            stopVoiceRecording({ sendRecording: true });
            return;
        }

        await sendAudioMessage();
        closeVoiceChat();
    };

    const sendAudioMessage = async function (blob) {
        if (isSendingAudioMessage) {
            return;
        }

        const attachment = blob ? blob : recordedAudioBlob;

        if (!attachment) {
            alert('No recordings found');
            return;
        }

        setIsSendingAudioMessage(true);

        // Upload The Attachment
        const attachmentResponse = await createAttachment(attachment);

        // Show Alert on Error
        if (!attachmentResponse.success) {
            const message = attachmentResponse.message
                ? attachmentResponse.message
                : 'Somethong went wrong, please try again.';

            alert(message);
            setIsSendingAudioMessage(false);

            return;
        }

        const attachmentID = attachmentResponse.data.id;

        // Send The Message
        const response = await createMessage({
            message_type: 'audio',
            attachment_id: attachmentID,
        });

        setIsSendingAudioMessage(false);

        // Show Alert on Error
        if (!response.success) {
            const message = response.message
                ? response.message
                : 'Somethong went wrong, please try again.';
            alert(message);

            return;
        }

        // Load Latest
        loadLatestMessages();
    };

    async function createAttachment(file) {
        let status = {
            success: false,
            data: null,
        };

        try {
            const response = await attachmentAPI.createAttachment({ file });

            status.data = response.data.data;
            status.success = true;

            return status;
        } catch (error) {
            status.success = false;
            console.error({ error });
            return status;
        }
    }

    const createMessage = async (args) => {
        const defaultArgs = {
            session_id: selectedSession.session_id,
            message_type: 'text',
            message: '',
        };

        args =
            args && typeof args === 'object'
                ? { ...defaultArgs, ...args }
                : defaultArgs;

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

    const afterStopVoiceRecording = async ({ blob, sendRecording }) => {
        if (!sendRecording) {
            return;
        }

        await sendAudioMessage(blob);
        closeVoiceChat();
    };

    const closeVoiceChat = () => {
        dispatch(handleMessageTypeChange(''));
        dispatch(handleReplyModeChange(false));
    };

    const prepareVoiceRecording = async () => {
        const audioStreem = await setupAudioStreem();

        if (!audioStreem) {
            alert('Something went wrong, please try again.');
            return;
        }

        startVoiceRecording();
    };

    // setupAudioStreem
    async function setupAudioStreem() {
        try {
            // Setup Audio Streem
            window.wpwaxCSAudioStream =
                await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 44100,
                    },
                });

            window.wpwaxCSVoiceRecorder = new RecordRTC(
                window.wpwaxCSAudioStream,
                {
                    type: 'audio',
                    mimeType: 'audio/wav',
                    recorderType: RecordRTC.StereoAudioRecorder,
                    disableLogs: true,
                }
            );

            return true;
        } catch (error) {
            console.error({ error });
            return false;
        }
    }

    // startRecording
    async function startVoiceRecording() {
        await window.wpwaxCSVoiceRecorder.startRecording();

        setRecordedVoiceTimeInSecond(0);
        setIsRecordingVoice(true);
        startVoiceTimer();
    }

    // stopRecording
    function stopVoiceRecording(args) {
        const defaultArgs = { sendRecording: false };

        args =
            args && typeof args === 'object'
                ? { ...defaultArgs, ...args }
                : defaultArgs;

        stopVoiceTimer();

        window.wpwaxCSVoiceRecorder.stopRecording(function (url) {
            let blob = window.wpwaxCSVoiceRecorder.getBlob();

            const tracks = window.wpwaxCSAudioStream.getTracks();
            tracks.forEach((track) => track.stop());

            setRecordedAudioBlob(blob);
            setIsRecordingVoice(false);

            afterStopVoiceRecording({
                blob,
                sendRecording: args.sendRecording,
            });
        });
    }

    function startVoiceTimer() {
        window.wpwaxCSAudioTimer = setInterval(function () {
            setRecordedVoiceTimeInSecond(function (currentValue) {
                return currentValue + 1;
            });
        }, 1000);
    }

    function stopVoiceTimer() {
        clearInterval(window.wpwaxCSAudioTimer);
    }

    // canRecordAudio
    const canRecordAudio = async function () {
        const has_permission = await hasAudioRecordPermission();

        if (!has_permission) {
            const accepted_permission = await requestAudioRecordPermission();

            if (!accepted_permission) {
                alert(
                    'Please grant the requested permission to record the voice'
                );
                return false;
            }

            return true;
        }

        return true;
    };

    // hasAudioRecordPermission
    const hasAudioRecordPermission = async function () {
        try {
            const microphonePermission = await navigator.permissions.query({
                name: 'microphone',
            });

            return microphonePermission.state === 'granted';
        } catch (_) {
            return true;
        }
    };

    // requestAudioRecordPermission
    const requestAudioRecordPermission = async function () {
        try {
            await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100,
                },
            });

            return true;
        } catch (error) {
            console.error({ error });

            return false;
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

    const updateTextSearchResult = (event) => {
        event.preventDefault();
        const text = event.target.value;

        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'searchKeyword',
                text
            )
        );

        // Update Query Args
        const newSearchQueryArgs = { message: text };
        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'searchQueryArgs',
                newSearchQueryArgs
            )
        );

        if (text.length) {
            // Activate Search Mode
            dispatch(
                updateSessionWindowData(
                    selectedSession.session_id,
                    'isSearching',
                    true
                )
            );
        } else {
            // Inactivate Search Mode
            dispatch(
                updateSessionWindowData(
                    selectedSession.session_id,
                    'isSearching',
                    false
                )
            );
        }

        loadSearchResults(newSearchQueryArgs);
    };

    // const onMessageSearch = debounce(updateTextSearchResult, 250);

    const toggleFilterVideoMessages = (event) => {
        event.preventDefault();
        setMessageDirection('bottom');
        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'isShowingVoiceSearchResult',
                false
            )
        );

        if (isShowingVideoSearchResult) {
            dispatch(
                updateSessionWindowData(
                    selectedSession.session_id,
                    'isShowingVideoSearchResult',
                    false
                )
            );

            // Close Search
            dismisSearch();
            return;
        }

        //
        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'isShowingVideoSearchResult',
                true
            )
        );

        // Update Query Args
        const newSearchQueryArgs = { message_type: 'video' };
        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'searchQueryArgs',
                newSearchQueryArgs
            )
        );

        loadSearchResults(newSearchQueryArgs);

        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'isSearching',
                true
            )
        );
    };

    const filterVoiceMessages = (event) => {
        event.preventDefault();

        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'isShowingVideoSearchResult',
                false
            )
        );

        if (isShowingVoiceSearchResult) {
            dispatch(
                updateSessionWindowData(
                    selectedSession.session_id,
                    'isShowingVoiceSearchResult',
                    false
                )
            );

            // Close Search
            dismisSearch();
            return;
        }

        //
        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'isShowingVoiceSearchResult',
                true
            )
        );

        // Update Query Args
        const newSearchQueryArgs = { message_type: 'audio' };
        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'searchQueryArgs',
                newSearchQueryArgs
            )
        );

        loadSearchResults(newSearchQueryArgs);

        dispatch(
            updateSessionWindowData(
                selectedSession.session_id,
                'isSearching',
                true
            )
        );
    };

    const loadSearchResults = async (queryArgs) => {
        setIsLoadingSearchResults(true);

        // Query Args
        const defaultQueryArgs = {
            page: 1,
            limit: paginationPerPage,
        };

        queryArgs =
            queryArgs && typeof queryArgs === 'object'
                ? { ...defaultQueryArgs, ...queryArgs }
                : defaultQueryArgs;

        // Get Search Results
        const response = await getMessages(queryArgs);

        // Show Alert on Error
        if (!response.success) {
            const message = response.message
                ? response.message
                : 'Somethong went wrong, please try again.';
            alert(message);

            setIsLoadingSearchResults(false);
            return;
        }

        // Update Loaded Session
        const searchResults = response.data.data.data;

        setSearchResults(searchResults);
        setIsLoadingSearchResults(false);
    };

    const loadMoreSearchResults = async () => {
        setIsLoadingMoreSearchResults(true);

        // Get More Search Results
        const nextPage = currentSearchResultPage + 1;

        const queryArgs = {
            page: nextPage,
            limit: paginationPerPage,
            ...searchQueryArgs,
        };

        const response = await getMessages(queryArgs);

        // Show Alert on Error
        if (!response.success) {
            const message = response.message
                ? response.message
                : 'Somethong went wrong, please try again.';
            alert(message);

            setIsLoadingMoreSearchResults(false);
            return;
        }

        // Update Loaded Session
        let latestItems = response.data.data.data;

        if (!latestItems.length) {
            setIsLoadingMoreSearchResults(false);
            return;
        }

        const newSearchResults = [...searchResults, ...latestItems];

        setSearchResults(newSearchResults);
        setCurrentSearchResultPage(nextPage);
        setIsLoadingMoreSearchResults(false);
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

    const updateUnreadMessagesCount = function () {
        const session_id = selectedSession.session_id;

        setSessionState((currentState) => {
            const total_unread = currentState.filteredSessions.filter(
                (session) => session.session_id === session_id
            )[0].total_unread;

            let new_count = parseInt(total_unread) - 1;
            new_count = new_count < 0 ? '0' : `${new_count}`;

            const newState = {
                ...currentState,
                sessionList: currentState.sessionList.map((session) =>
                    session.session_id === session_id
                        ? { ...session, total_unread: new_count }
                        : session
                ),
                filteredSessions: currentState.filteredSessions.map((session) =>
                    session.session_id === selectedSession.session_id
                        ? { ...session, total_unread: new_count }
                        : session
                ),
            };

            return newState;
        });
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
                            <form onSubmit={sendTextMessage} autoComplete='off'>
                                <input
                                    ref={textMessageContentRef}
                                    type='text'
                                    disabled={isSendingTextMessage}
                                    name='wpwax-vm-messagebox-reply-input'
                                    id='wpwax-vm-messagebox-reply-input'
                                    placeholder='Type a message'
                                    value={textMessageContent}
                                    onChange={(event) => {
                                        setTextMessageContent(event.target.value);
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
								disabled={canSendTextMessage() ? false : true}
                                onClick={sendTextMessage}
                            >
                                {!isSendingTextMessage ? (
                                    <ReactSVG src={paperPlane} />
                                ) : (
                                    <ReactSVG
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                        }}
                                        src={loadingIcon}
                                    />
                                )}
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
                                onClick={handleVoiceClose}
                            >
                                <span className='dashicons dashicons-no-alt'></span>
                            </a>
                            <span className='wpwax-vm-audio-range'>
                                <span
                                    style={{
                                        width: recordedTimeLength + '%',
                                    }}
                                    className='wpwax-vm-audio-range-inner'
                                ></span>
                            </span>
                            <span className='wpwax-vm-timer'>
                                {formatSecondsAsCountdown(
                                    recordedVoiceTimeInSecond
                                )}
                            </span>
                        </div>
                        <div className='wpwax-vm-messagebox-reply__action'>
                            <a
                                href='#'
                                className='wpwax-vm-messagebox-reply-send'
								disabled={canSendAudioMessage() ? false : true}
                                onClick={handleSendAudioMessage}
                            >
                                {!isSendingAudioMessage ? (
                                    <ReactSVG src={paperPlane} />
                                ) : (
                                    <ReactSVG
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                        }}
                                        src={loadingIcon}
                                    />
                                )}
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

        if (isSendingTextMessage) {
            return;
        }

        dispatch(handleMessageTypeChange(''));
        dispatch(handleReplyModeChange(false));
    };

    /* Handle Text Colse */
    const handleVoiceClose = async (e) => {
        e.preventDefault();

        if (isSendingAudioMessage) {
            return;
        }

        if (isRecordingVoice) {
            stopVoiceRecording();
        } else {
            setRecordedAudioBlob(null);
        }

        dispatch(handleMessageTypeChange(''));
        dispatch(handleReplyModeChange(false));
    };

    // handleOnMarkedAsRead
    const handleOnMarkedAsRead = (message) => {
        // Update Seen Status
        setSessionMessages((currentState) => {
            return currentState.map((messageItem) =>
                messageItem.id === message.id
                    ? { ...messageItem, is_seen: true }
                    : messageItem
            );
        });

        dispatch(
            updateSessionMessageItem(selectedSession.session_id, message.id, {
                is_seen: true,
            })
        );

        // Update Unread Message Count
        updateUnreadMessagesCount();
    };

    const handleScrollBottom = (event) => {
        event.preventDefault();
        const scrollingBody = document.querySelector(
            '.wpwax-vm-messagebox-body .infinite-scroll-component '
        );
        console.log(scrollingBody,messageDirection);
        if (messageDirection === 'bottom') {
            scrollingBody.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        } else {
            scrollingBody.scrollTo({
                bottom: 0,
                behavior: 'smooth',
            });
        }
    };

    return (
        <ChatBoxWrap>
            {selectedSession && (
                <div style={{ height: '100%' }} className={isLoadingSearchResults || isLoadingSession ? 'wpwax-vm-loder-active': ''}>
                    {!isLoadingSession || !isLoadingSearchResults ? (
                        <React.Fragment>
                            <MessageBoxWrap>
                                <div className='wpwax-vm-messagebox-header'>
                                    {!openSearch ? (
                                        <div className='wpwax-vm-messagebox-header__left'>
                                            <UserAvaterList
                                                users={getSessionUsers()}
                                            />
                                        </div>
                                    ) : null}

                                    <div
                                        className={
                                            openSearch
                                                ? 'wpwax-vm-messagebox-header__right wpwax-vm-search-active'
                                                : 'wpwax-vm-messagebox-header__right'
                                        }
                                    >
                                        <div className='wpwax-vm-messagebox-header__actionlist'>
                                            <div className='wpwax-vm-messagebox-header__action-item wpwax-vm-messagebox-header-search'>
                                                <div className='wpwax-vm-searchbox'>
                                                    <input
                                                        type='text'
                                                        ref={searchInputRef}
                                                        name='wpwax-vm-messagebox-search'
                                                        // value={getWindowData('searchKeyword')}
                                                        id='wpwax-vm-messagebox-search'
                                                        placeholder='Search'
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                </div>
                                                {!openSearch ? (
                                                    <a
                                                        href='#'
                                                        className='wpwax-vm-search-toggle'
                                                        onClick={
                                                            handleActiveSearch
                                                        }
                                                    >
                                                        <ReactSVG
                                                            src={search}
                                                        />
                                                    </a>
                                                ) : (
                                                    <a
                                                        href='#'
                                                        className='wpwax-vm-search-toggle'
                                                        onClick={
                                                            handleDiactiveSearch
                                                        }
                                                    >
                                                        <span className='dashicons dashicons-no-alt'></span>
                                                    </a>
                                                )}
                                            </div>
                                            {!openSearch ? (
                                                <div className='wpwax-vm-messagebox-header__action-item wpwax-vm-messagebox-header-video'>
                                                    <a
                                                        href='#'
                                                        className={
                                                            'wpwax-vm-messagebox-header__action--link' +
                                                            (isShowingVideoSearchResult
                                                                ? ' active'
                                                                : '')
                                                        }
                                                        onClick={
                                                            toggleFilterVideoMessages
                                                        }
                                                    >
                                                        <ReactSVG
                                                            src={videoPlay}
                                                        />
                                                        <span className='wpwax-vm-messagebox-header__action--text'>
                                                            Videos
                                                        </span>
                                                    </a>
                                                </div>
                                            ) : null}

                                            {!openSearch ? (
                                                <div className='wpwax-vm-messagebox-header__action-item wpwax-vm-messagebox-header-voice'>
                                                    <a
                                                        href='#'
                                                        className={
                                                            'wpwax-vm-messagebox-header__action--link' +
                                                            (isShowingVoiceSearchResult
                                                                ? ' active'
                                                                : '')
                                                        }
                                                        onClick={
                                                            filterVoiceMessages
                                                        }
                                                    >
                                                        <ReactSVG src={mice} />
                                                        <span className='wpwax-vm-messagebox-header__action--text'>
                                                            Voice
                                                        </span>
                                                    </a>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>

                                {/* Sessions Messages List  */}
                                {/* If not loading session && If not loading search results && If not searching */}
                                {!isLoadingSearchResults && !isSearching && (
                                    <div
                                        id='scrollableDiv'
                                        className='wpwax-vm-messagebox-body'
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column-reverse',
                                        }}
                                    >
                                        {sessionMessages.length ? (
                                            <InfiniteScroll
                                                onScroll={(event) => {
                                                    const scrollMeta = {
                                                        viewPortTop:
                                                            event.target
                                                                .scrollTop,
                                                        viewPortBottom:
                                                            event.target
                                                                .scrollTop +
                                                            event.target
                                                                .offsetHeight,
                                                    };

                                                    dispatch(
                                                        updateSessionWindowData(
                                                            selectedSession.session_id,
                                                            'messagesContainerScrollMeta',
                                                            scrollMeta
                                                        )
                                                    );
                                                }}
                                                height={getMessageBoxHeight()}
                                                dataLength={
                                                    sessionMessages.length
                                                }
                                                next={() => {
                                                    loadOlderMessages();
                                                }}
                                                style={{
                                                    display: 'flex',
                                                    flexDirection:
                                                        'column-reverse',
                                                }}
                                                inverse={true} //
                                                hasMore={true}
                                                loader={
                                                    isLoadingMoreMessages ? (
                                                        <h3
                                                            style={{
                                                                textAlign:
                                                                    'center',
                                                            }}
                                                        >
                                                            Loading...
                                                        </h3>
                                                    ) : (
                                                        ''
                                                    )
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
                                                                containerScrollMeta={
                                                                    messagesContainerScrollMeta
                                                                }
                                                                onMarkedAsRead={() => {
                                                                    handleOnMarkedAsRead(
                                                                        message
                                                                    );
                                                                }}
                                                            />
                                                        );
                                                    }
                                                )}
                                            </InfiniteScroll>
                                        ) : (
                                            <div className="wpwax-vm-empty-messagebox">
                                                <h2>No message found</h2>
                                            </div>
                                        )}
                                        <a
                                            href='#'
                                            className={
                                                scrollBtnVisibility
                                                    ? 'wpwax-vm-scroll-bottom wpwax-vm-show'
                                                    : 'wpwax-vm-scroll-bottom'
                                            }
                                            onClick={handleScrollBottom}
                                        >
                                            <span className='dashicons dashicons-arrow-down-alt'></span>
                                        </a>
                                    </div>
                                )}

                                {/* Sessions Search Results  */}
                                {/* If not loading session && If not loading search results && If searching */}
                                {!isLoadingSearchResults && isSearching && (
                                    <div
                                        id='scrollableDiv'
                                        className='wpwax-vm-messagebox-body'
                                    >
                                        {searchResults.length ? (
                                            <InfiniteScroll
                                                height={getMessageBoxHeight()}
                                                dataLength={
                                                    searchResults.length
                                                }
                                                next={() => {
                                                    loadMoreSearchResults();
                                                }}
                                                hasMore={true}
                                                loader={
                                                    isLoadingMoreSearchResults ? (
                                                        <h3
                                                            style={{
                                                                textAlign:
                                                                    'center',
                                                            }}
                                                        >
                                                            Loading...
                                                        </h3>
                                                    ) : (
                                                        ''
                                                    )
                                                }
                                                refreshFunction={() => {
                                                    loadMoreSearchResults();
                                                }}
                                                scrollableTarget='scrollableDiv'
                                            >
                                                {searchResults.map(
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
                                        ) : (
                                            <div className="wpwax-vm-empty-messagebox">
                                                <h2>No message found</h2>
                                            </div>

                                        )}
                                        <a
                                            href='#'
                                            className={
                                                scrollBtnVisibility
                                                    ? 'wpwax-vm-scroll-bottom wpwax-vm-show'
                                                    : 'wpwax-vm-scroll-bottom'
                                            }
                                            onClick={handleScrollBottom}
                                        >
                                            <span className='dashicons dashicons-arrow-down-alt'></span>
                                        </a>
                                    </div>
                                )}

                                {/* Loading  */}
                                {/* If loading search results */}
                                {/* {isLoadingSearchResults ? <LoadingSpinDot /> : null} */}

                                {handleFooterContent()}
                            </MessageBoxWrap>

                            {replyMode ? (
                                <div className='wpwax-vm-replymode-wrap'>
                                    {haldleReplyMode()}
                                </div>
                            ) : (
                                ''
                            )}
                        </React.Fragment>
                    ) : null}
                    {isLoadingSearchResults || isLoadingSession ?  <LoadingSpinDot /> : null}
                </div>
            )}

            {!selectedSession && (
                <div style={CenterBoxStyle}>
                    <h2>No conversation is selected.</h2>
                </div>
            )}
        </ChatBoxWrap>
    );
}

export default MessageBox;
