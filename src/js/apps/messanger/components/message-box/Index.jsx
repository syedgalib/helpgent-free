import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactSVG from 'react-inlinesvg';
import UserAvaterList from 'Components/UserAvaterList.jsx';
import Message from './components/Message.jsx';
import Video from './components/video/Index.jsx';
import Screen from './components/screen/Index.jsx';
import { useDebounce } from 'Helper/hooks';
import search from 'Assets/svg/icons/magnifier.svg';
import videoPlay from 'Assets/svg/icons/video-play.svg';
import mice from 'Assets/svg/icons/mice.svg';
import textIcon from 'Assets/svg/icons/text.svg';
import paperPlane from 'Assets/svg/icons/paper-plane.svg';
import loadingIcon from 'Assets/svg/loaders/loading-spin.svg';
import recordIcon from 'Assets/svg/icons/screen-record.svg';
import crossIcon from 'Assets/svg/icons/cross.svg';
import { ChatBoxWrap, MessageBoxWrap } from './Style';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useScreenSize } from 'Helper/hooks';
import { updateScreenTogglerContent } from "../../store/messages/actionCreator";

import useScreenRecorder from 'Hooks/media-recorder/useScreenRecorder';
import useCountdown from 'Hooks/useCountdown';

import {
    handleReplyModeChange,
    handleMessageTypeChange,
	updateSelectedSession,
	resetAllSessions,
	resetAllSessionWindowData,
    addSession,
    updateSessionMessages,
    addSessionWindowData,
    updateSessionWindowData,
} from '../../store/messages/actionCreator';


import { formatSecondsAsCountdown } from 'Helper/formatter.js';
import LoadingSpinDot from 'Components/LoadingSpinDot.jsx';
import { getTimezoneString } from 'Helper/utils.js';

import useConversationAPI from 'API/useConversationAPI.js';
import useMessangerAPI from 'API/useMessangerAPI.js';
import useAttachmentAPI from 'API/useAttachmentAPI.js';
import { useCoreData } from 'Hooks/useCoreData.jsx';
import { MIN_IN_SECONDS } from 'Helper/const.js';

const CenterBoxStyle = {
    minHeight: '770px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '20px',
};

function MessageBox({ sessionState, setSessionState }) {
	const { addAction } = wpwaxHooks;

	// Use API
	const {
		markAsRead: markConversationAsRead,
	} = useConversationAPI();

	const {
		getItems: getMessangerItems,
		createItem: createMessangerItem,
	} = useMessangerAPI();

	const {
		createItem: createAttachmentItem,
	} = useAttachmentAPI();

	const {
		isActiveCountdown,
		startCountdown,
		stopCountdown,
		CountdownPage,
		getReverseCount,
	} = useCountdown();

	const afterStopRecording = ( data ) => {
		stopCountdown();

		if ( ! data ) {
			return;
		}

		setScreenRecordState({
			...screenRecordState,
			recordStage: "beforeSend"
		});

		dispatch( handleMessageTypeChange('screen') );
	};

    const {
		isRecording,
		hasPermission,
		requestPermission,
		recordedScreenBlob,
		recordedScreenURL,
		startRecording,
		setupStream,
		stopRecording,
		recordedTimeInSecond,
		getCountDown,
		recordingIsGoingToStopSoon,
	} = useScreenRecorder({
		maxRecordLength: getMaxRecordLength(),
		afterStopRecording,
	});

    const messengerScriptData = wpWaxCustomerSupportApp_MessengerScriptData;

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();
    const searchInputRef = useRef(null);
    const videoToggleRef = useRef(null);

    const current_user = wpWaxCustomerSupportApp_CoreScriptData.current_user;

    const [searchTerm, setSearchTerm] = useState("");

    const [scrollBtnVisibility, setScrollBtnVisibility] = useState(false);
    const [videoRecorderStatus, setVideoRecorderStatus] = useState(null);
    const [messageDirection, setMessageDirection] = useState('bottom');

	const [screenSize, SCREEN_SIZES] = useScreenSize();

    const [sessionMessages, setSessionMessages] = useState([]);

    const [isLoadingMoreMessages, setIsLoadingMoreMessages] = useState(false);
    const [isLoadingSession, setIsLoadingSession] = useState(false);

    const [isSendingTextMessage, setIsSendingTextMessage] = useState(false);
    const [isSendingAudioMessage, setIsSendingAudioMessage] = useState(false);

    //
    const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
    const [recordedAudioSteam, setRecordedAudioSteam] = useState(null);
    const [isRecordingVoice, setIsRecordingVoice] = useState(false);
    const [recordedVoiceTimeInSecond, setRecordedVoiceTimeInSecond] = useState(0);

    const [recordedTimeLength, setRecordedTimeLength] = useState(0);

    const voiceRecordingLimitInSecond =
        messengerScriptData &&
        typeof messengerScriptData.voiceRecordTimeLimit !== 'undefined'
            ? parseFloat(messengerScriptData.voiceRecordTimeLimit)
            : 2 * MIN_IN_SECONDS;

    const [screenRecordState, setScreenRecordState] = useState({
        recordStage: "request_permission"
    });

    // Refs
    const textMessageContentRef = useRef();

    // Message Contents
    const [textMessageContent, setTextMessageContent] = useState('');

	// Pagination
    const paginationPerPage = 20;

    // Search Results
    const [currentSearchResultPage, setCurrentSearchResultPage] = useState(1);
    const [isLoadingSearchResults, setIsLoadingSearchResults] = useState(false);
    const [isLoadingMoreSearchResults, setIsLoadingMoreSearchResults] =
        useState(false);

    /* initialize Form Data */
    const {
        selectedSession,
        allSessions,
        allSessionWindowData,
        defaultSessionWindowData,
        replyMode,
        messageType,
    } = useSelector((state) => {
        return {
            selectedSession: state.messages.selectedSession,
            allSessions: state.messages.allSessions,
            allSessionWindowData: state.messages.allSessionWindowData,
            defaultSessionWindowData: state.messages.defaultSessionWindowData,
            replyMode: state.messages.replyMode,
            messageType: state.messages.messageType,
        };
    });

    /* Focus Input field when search inopen */
    useEffect(() => {
        
        const checkIfClickedOutside = e => {
            
            if (messageType ==='video' && videoToggleRef.current && !videoToggleRef.current.contains(e.target)) {
                if(videoRecorderStatus === null){
                    dispatch(handleMessageTypeChange(''));
                    dispatch(handleReplyModeChange(false));
                }
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [messageType,videoRecorderStatus]);

    // @Init State
	useEffect( () => {
		initSetup();
	}, [] );

	useEffect( () => {
		dispatch( updateScreenTogglerContent( getCountDown() ) )
	}, [ recordedTimeInSecond ] );

    async function initSetup() {
		const _hasPermission = await hasPermission();

		if ( _hasPermission ) {
			setScreenRecordState({
				...screenRecordState,
				recordStage: "beforeStartScreen"
			});

			return;
		}
	}

	function getGreetTitle() {
		const current_user = useCoreData( 'current_user' );
		const useName      =  ( current_user ) ? `, ${current_user.name}` : '';

		return `Welcome back${useName}`;
	}

	function getTotalUnreadCount() {
		if ( null === sessionState.totalUnredConversations  ) {
			return 0;
		}

		return sessionState.totalUnredConversations;
	}

	function getGreetSubtitle() {
		const totalUnreadCount = getTotalUnreadCount();

		if ( ! totalUnreadCount ) {
			return '';
		}

		const plural = ( totalUnreadCount > 1 ) ? 's' : '';

		return `You have ${totalUnreadCount} unread conversation${plural}`;
	}

	function getMaxRecordLength() {

		if (  wpWaxCustomerSupportApp_MessengerScriptData.videoRecordTimeLimit ) {
			return parseFloat( wpWaxCustomerSupportApp_MessengerScriptData.videoRecordTimeLimit );
		}

		return MIN_IN_SECONDS * 2;
	}


    const handleSelectScreen = async event => {
        event.preventDefault();

		const grantedPermission = await requestPermission();

		if ( grantedPermission ) {
                setScreenRecordState({
                    ...screenRecordState,
                    recordStage: "beforeStartScreen"
                });

                await setupStream();

                // Start Recording
				const isStarted = await startRecording();

				if ( ! isStarted ) {
					return;
				}

				// Start Countdown
				await startCountdown();

				setScreenRecordState({
					...screenRecordState,
					recordStage: "startScreen"
				});
		}
    }

    const handleStopScreen = async event =>{
        event.preventDefault();
        stopRecording();
    }

	const canSendTextMessage = () => {
		return (textMessageContent.trim().length > 0);
	}

    const getWindowData = (key) => {
        const selectedSessionID = selectedSession
            ? selectedSession.id
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

	const updateWindowData = ( key, value ) => {
		dispatch(
			updateSessionWindowData(
				selectedSession.id,
				key,
				value
			)
		);
	}

    const debouncedSearchTerm = useDebounce(searchTerm, 250);

	// On Init
	useEffect( function () {
		addAction( 'onConversationDelete', onConversationDelete );
		addAction( 'beforeConversationRefresh', beforeConversationRefresh );
	}, [] );


	// beforeConversationRefresh
	function beforeConversationRefresh() {
		dispatch( updateSelectedSession( null ) );
		dispatch( resetAllSessions() );
		dispatch( resetAllSessionWindowData() );
	}

	// onConversationDelete
	function onConversationDelete( data ) {
		const { newSessionlist } = data;
		const newSession = ( newSessionlist.length ) ? newSessionlist[0] : null;

		dispatch( updateSelectedSession( newSession ) );
	}

    // Effect for API call
    useEffect(() => {
        const text = debouncedSearchTerm;
        if(selectedSession){
            dispatch(
                updateSessionWindowData(
                    selectedSession.id,
                    'searchKeyword',
                    text
                )
            );

            // Update Query Args
            const newSearchQueryArgs = { message: text };
            dispatch(
                updateSessionWindowData(
                    selectedSession.id,
                    'searchQueryArgs',
                    newSearchQueryArgs
                )
            );
            if (text.length) {
                // Activate Search Mode
                dispatch(
                    updateSessionWindowData(
                        selectedSession.id,
                        'isSearching',
                        true
                    )
                );
            } else {
                // Inactivate Search Mode
                dispatch(
                    updateSessionWindowData(
                        selectedSession.id,
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

            if (!selectedSession.id) {
                return;
            }

            setIsLoadingSession(true);

            const id = selectedSession.id;

            // Load session data from store if available
            if (Object.keys(allSessions).includes(id)) {
                setSessionMessages(allSessions[id]);
                setIsLoadingSession(false);
                return;
            }

            // Fetch session data from API
            const fetchSession = async () => {

				const messages = await getMessangerItems({
                    conversation_id: id,
                    limit: paginationPerPage,
                });

                return messages;
            };

            fetchSession()
                .then((response) => {
                    const sessionMessages = response.data;

                    // Update The Store
                    dispatch(addSession(id, sessionMessages));
                    dispatch(addSessionWindowData(id));

					const totalPage = ( response.headers && Object.keys( response.headers ).includes( 'x-wp-totalpages' ) ) ? parseInt( response.headers['x-wp-totalpages'] ) : 1;
					updateWindowData( 'totalPage', totalPage );

                    setSessionMessages(sessionMessages);

					markConversationAsRead( id ).then( function() {
						setSessionState( currentState => {
							const newState = {
								...currentState,
								sessionList: currentState.sessionList.map((session) =>
									session.id === id
										? { ...session, read: 1 }
										: session
								),
								filteredSessions: currentState.filteredSessions.map((session) =>
									session.id === selectedSession.id
										? { ...session, read: 1 }
										: session
								),
							};

							return newState;

						});
					});

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


        if ( recordedVoiceTimeInSecond >= voiceRecordingLimitInSecond ) {
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

        let replayingTo = JSON.parse( JSON.stringify( admin_user ) );

        if ( is_user_admin ) {
            replayingTo =
                selectedSession.first_message &&
                selectedSession.first_message.user
                    ? JSON.parse(
                          JSON.stringify(selectedSession.first_message.user)
                      )
                    : null;
        }

        if ( ! replayingTo ) {
            replayingTo = {
                name: 'Unknown User',
                email: '',
                avater: '',
            };
        }

        return replayingTo;
    }

    const openSearch = getWindowData('openSearch');
    const searchResults = getWindowData('searchResults');
    const isSearching = getWindowData('isSearching');
    const searchQueryArgs = getWindowData('searchQueryArgs');

    const isShowingVideoSearchResult = getWindowData(
        'isShowingVideoSearchResult'
    );
    const isShowingVoiceSearchResult = getWindowData(
        'isShowingVoiceSearchResult'
    );

    const setSearchResults = function (results) {
        dispatch(
            updateSessionWindowData(
                selectedSession.id,
                'searchResults',
                results
            )
        );
    };

    const dismisSearch = () => {
        // Hide Search Results
        dispatch(
            updateSessionWindowData(
                selectedSession.id,
                'isSearching',
                false
            )
        );

        // Reset Serch Result
        setSearchResults([]);

        // Reset Serch Query Args
        dispatch(
            updateSessionWindowData(
                selectedSession.id,
                'searchQueryArgs',
                {}
            )
        );
    };

    const dismissFilters = () => {
        dismisSearch();

        dispatch(
            updateSessionWindowData(
                selectedSession.id,
                'isShowingVideoSearchResult',
                false
            )
        );

        dispatch(
            updateSessionWindowData(
                selectedSession.id,
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
                selectedSession.id,
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
                selectedSession.id,
                'openSearch',
                false
            )
        );

        // Reset search input
        dispatch(
            updateSessionWindowData(
                selectedSession.id,
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

	const getRemainingVoiceTimeInSecond = () => {
		return (voiceRecordingLimitInSecond - recordedVoiceTimeInSecond);
	}

	const getVoiceCountdown = () => {
		return formatSecondsAsCountdown(
			getRemainingVoiceTimeInSecond()
		)
	}

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
        dispatch(handleReplyModeChange(false));
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

		// Voice Play
		voicePlay();

        // Show Recording UI
        dispatch(handleMessageTypeChange('voice'));
        dispatch(handleReplyModeChange(false));
    };

    /* Handle Reply Mode */
    const haldleReplyMode = () => {
        if (messageType === 'video') {

        }else if(messageType === 'screen'){
            return (
                <Screen
                    recordedBold={recordedScreenBlob}
                    recordUrl={recordedScreenURL}
                    sessionID={selectedSession.id}
                    onSuccess={loadLatestMessages}
                    replayingTo={getReplaingToUser()}
                />
            );
        }
    };

    const handleSendTextMessage = async function (e) {
        e.preventDefault();
		sendTextMessage();
    };

	const sendTextMessage = async function () {
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
                : 'Something went wrong, please try again.';
            alert(message);
            textMessageContentRef.current.focus();

            return;
        }

        // Reset Input
        setTextMessageContent('');
        textMessageContentRef.current.focus();

        // Load Latest
        loadLatestMessages();
	}

	const canSendAudioMessage = () => {
		const MIN_AUDIO_MESSAGE_LIMIT_IN_SECONDS = 1;
		return (recordedVoiceTimeInSecond >= MIN_AUDIO_MESSAGE_LIMIT_IN_SECONDS);
	}

    const handleSendAudioMessage = async function (e) {
        e.preventDefault();

        if (isSendingAudioMessage) {
            return;
        }

        stopVoiceRecording({ sendRecording: true });
    };

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

            // sendAudioMessage(blob);
            afterStopVoiceRecording({
                blob,
                sendRecording: args.sendRecording,
            });
        });
    }

    const createMessage = async (args) => {
        const defaultArgs = {
            conversation_id: selectedSession.id,
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
            const response = await createMessangerItem( args );

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
			timezone: getTimezoneString(),
            conversation_id: selectedSession.id,
            page: 1,
        };

        const args = { ...defaultArgs, ...customArgs };

        let status = {
            success: false,
            data: null,
        };

        try {
            const response = await getMessangerItems( args );
            status.success = true;
            status.data = response.data;

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
        const attachmentResponse = await createAttachmentItem( { file: attachment } );

        // Show Alert on Error
        if (!attachmentResponse.success) {
            const message = attachmentResponse.message
                ? attachmentResponse.message
                : 'Something went wrong, please try again.';

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

        // Show Alert on Error
        if (!response.success) {
            const message = response.message
                ? response.message
                : 'Something went wrong, please try again.';
            alert(message);

            return;
        }

        // Load Latest
        await loadLatestMessages();

		setIsSendingAudioMessage(false);
    };

    const closeVoiceChat = () => {
        if (isSendingAudioMessage) {
            return;
        }

        setRecordedAudioBlob(null);
        setRecordedAudioSteam(null);
        setRecordedVoiceTimeInSecond(0);
        setIsRecordingVoice(false)
        dispatch(handleMessageTypeChange(''));
        dispatch(handleReplyModeChange(false));
    };

    const handleVoicePlay = async function (event){
        event.preventDefault();
        voicePlay();
    }

	const canStartRecording = () => {
		if ( isSendingAudioMessage ) {
			return false;
		}

		if ( recordedVoiceTimeInSecond >= voiceRecordingLimitInSecond ) {
			return false;
		}

		return true;
	};

    const voicePlay = async function () {

		if ( ! canStartRecording() ) {
			return;
		}

        // Prepare Voice Recording;
        if(recordedAudioSteam){
            resumeVoiceRecording();
        }else{
            const audioStreem = await setupAudioStreem();

            if (!audioStreem) {
                alert('Something went wrong, please try again.');
                return;
            }
            startVoiceRecording();
        }
    }

    // setupAudioStreem
    async function setupAudioStreem() {
        try {
            // Setup Audio Streem
            window.wpwaxCSAudioStream =
                await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                    },
                });

            window.wpwaxCSVoiceRecorder = new RecordRTC(
                window.wpwaxCSAudioStream,
                {
                    type: 'audio',
                    mimeType: 'audio/wav',
                    recorderType: RecordRTC.StereoAudioRecorder,
                    disableLogs: true,
					numberOfAudioChannels: 1,
                }
            );

            setRecordedAudioSteam(window.wpwaxCSAudioStream);

            return true;
        } catch (error) {
            console.error({ error });
            return false;
        }
    }

    function resumeVoiceRecording(){
        window.wpwaxCSVoiceRecorder.resumeRecording();
        setIsRecordingVoice(true);
        startVoiceTimer();
        setRecordedVoiceTimeInSecond(recordedVoiceTimeInSecond);
    }

    // startRecording
    async function startVoiceRecording() {
        await window.wpwaxCSVoiceRecorder.startRecording();

        setIsRecordingVoice(true);
        startVoiceTimer();
        setRecordedVoiceTimeInSecond(recordedVoiceTimeInSecond);
    }

    async function pauseVoiceRecording(event){
        event.preventDefault();
        if(isRecordingVoice){
            await window.wpwaxCSVoiceRecorder.pauseRecording();
            setIsRecordingVoice(false);
            stopVoiceTimer();
        }
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

    async function loadLatestMessages() {
        let args = { limit: 10, page: 1 };

		const lastMessageID = sessionMessages.length ? sessionMessages[0].id : null;

		if ( lastMessageID ) {
			args.id = lastMessageID;
			args.id_compare = '>';
		}

        const response = await getMessages(args);

        // Show Alert on Error
        if ( ! response.success ) {
            const message = response.message
                ? response.message
                : 'Something went wrong, please try again.';

			alert( message );
            return;
        }

        const responseData = response.data;

        if ( ! responseData.length) {
            return;
        }

        // Update Latest Message
        let latestItems = responseData;

        const updatedSessionMessages = [...latestItems, ...sessionMessages];

        setSessionMessages(updatedSessionMessages);

        dispatch(
            updateSessionMessages(
                selectedSession.id,
                updatedSessionMessages
            )
        );
    }

    const loadOlderMessages = async () => {
        setIsLoadingMoreMessages(true);

        // Get Older Messages
        const paginationMeta = getPaginationMeta();

		if ( paginationMeta.isLastPage ) {
			setIsLoadingMoreMessages(false);
			return;
		}

        const response = await getMessages({
            page: paginationMeta.nextPage,
            limit: paginationMeta.perPage,
        });

        // Show Alert on Error
        if ( !  response.success ) {
			setIsLoadingMoreMessages(false);
            const message = response.message
                ? response.message
                : 'Something went wrong, please try again.';

			alert( message );
            return;
        }

        // Update Loaded Session
        const oldItems = response.data;

        if ( ! oldItems.length ) {
			setIsLoadingMoreMessages(false);
            return;
        }

        const updatedSessionMessages = [...sessionMessages, ...oldItems];

		updateWindowData( 'currentPage', paginationMeta.nextPage );

        setSessionMessages(updatedSessionMessages);
		dispatch(
            updateSessionMessages(
                selectedSession.id,
                updatedSessionMessages
            )
        );

		setIsLoadingMoreMessages(false);
    };

    const updateTextSearchResult = (event) => {
        event.preventDefault();
        const text = event.target.value;

        dispatch(
            updateSessionWindowData(
                selectedSession.id,
                'searchKeyword',
                text
            )
        );

        // Update Query Args
        const newSearchQueryArgs = { message: text };
        dispatch(
            updateSessionWindowData(
                selectedSession.id,
                'searchQueryArgs',
                newSearchQueryArgs
            )
        );

        if (text.length) {
            // Activate Search Mode
            dispatch(
                updateSessionWindowData(
                    selectedSession.id,
                    'isSearching',
                    true
                )
            );
        } else {
            // Inactivate Search Mode
            dispatch(
                updateSessionWindowData(
                    selectedSession.id,
                    'isSearching',
                    false
                )
            );
        }

        loadSearchResults(newSearchQueryArgs);
    };

    const toggleFilterVideoMessages = (event) => {
        event.preventDefault();
        setMessageDirection('bottom');
        dispatch(
            updateSessionWindowData(
                selectedSession.id,
                'isShowingVoiceSearchResult',
                false
            )
        );

        if (isShowingVideoSearchResult) {
            dispatch(
                updateSessionWindowData(
                    selectedSession.id,
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
                selectedSession.id,
                'isShowingVideoSearchResult',
                true
            )
        );

        // Update Query Args
        const newSearchQueryArgs = { message_type: 'video' };
        dispatch(
            updateSessionWindowData(
                selectedSession.id,
                'searchQueryArgs',
                newSearchQueryArgs
            )
        );

        loadSearchResults(newSearchQueryArgs);

        dispatch(
            updateSessionWindowData(
                selectedSession.id,
                'isSearching',
                true
            )
        );
    };

    const filterVoiceMessages = (event) => {
        event.preventDefault();

        dispatch(
            updateSessionWindowData(
                selectedSession.id,
                'isShowingVideoSearchResult',
                false
            )
        );

        if (isShowingVoiceSearchResult) {
            dispatch(
                updateSessionWindowData(
                    selectedSession.id,
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
                selectedSession.id,
                'isShowingVoiceSearchResult',
                true
            )
        );

        // Update Query Args
        const newSearchQueryArgs = { message_type: 'audio' };
        dispatch(
            updateSessionWindowData(
                selectedSession.id,
                'searchQueryArgs',
                newSearchQueryArgs
            )
        );

        loadSearchResults(newSearchQueryArgs);

        dispatch(
            updateSessionWindowData(
                selectedSession.id,
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
                : 'Something went wrong, please try again.';
            alert(message);

            setIsLoadingSearchResults(false);
            return;
        }

        // Update Loaded Session
        const searchResults = response.data;

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
                : 'Something went wrong, please try again.';
            alert(message);

            setIsLoadingMoreSearchResults(false);
            return;
        }

        // Update Loaded Session
        let latestItems = response.data;

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
		const currentPage = getWindowData( 'currentPage' );
		const totalPage   = getWindowData( 'totalPage' );
		const perPage     = paginationPerPage;
		const isLastPage  = currentPage === totalPage;
		const nextPage    = isLastPage ? 0 : currentPage + 1;

		return {
			perPage,
			currentPage,
			nextPage,
			isLastPage,
			totalPage,
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
                        <ReactSVG src={crossIcon} />
                    </a>
                    <div className='wpwax-vm-messagebox-reply'>
                        <div className='wpwax-vm-messagebox-reply__input'>
							<textarea
								style={{ height: (textMessageContent.split(/\r*\n/).length * 16) + 'px' }}
								ref={textMessageContentRef}
								disabled={isSendingTextMessage}
								name='wpwax-vm-messagebox-reply-input'
								id='wpwax-vm-messagebox-reply-input'
								placeholder='Type a message'
								value={textMessageContent}
								onChange={(event) => {
									setTextMessageContent(event.target.value);
								}}
								onKeyPress={( event ) => {
									if ( 'Enter' === event.key && ! event.shiftKey  ) {
										sendTextMessage();
									}
								}}
							>
							</textarea>
                        </div>
                        <div className='wpwax-vm-messagebox-reply__action'>
                            <a
                                href='#'
                                className='wpwax-vm-messagebox-reply-send'
								disabled={canSendTextMessage() ? false : true}
                                onClick={handleSendTextMessage}
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
                    <a
                        href='#'
                        className='wpwax-vm-messagebox-reply-text-close'
                        onClick={handleVoiceClose}
                    >
                        <ReactSVG src={crossIcon} />
                    </a>
                    <div className='wpwax-vm-messagebox-reply wpwax-vm-messagebox-reply-voice'>
                        <div className='wpwax-vm-messagebox-reply__input'>

                            {
                                isRecordingVoice ?
								<a href='#' className='wpwax-vm-messagebox-reply-voice-pause' onClick={pauseVoiceRecording}>
                                    <span className='dashicons dashicons-controls-pause'></span>
                                </a>
                                :
                                <a href='#' className='wpwax-vm-messagebox-reply-voice-play' onClick={handleVoicePlay}>
                                    <span className='dashicons dashicons-microphone'></span>
                                </a>
                            }

                            <span className='wpwax-vm-audio-range'>
                                <span
                                    style={{
                                        width: recordedTimeLength + '%',
                                    }}
                                    className='wpwax-vm-audio-range-inner'
                                ></span>
                            </span>
                            <span className='wpwax-vm-timer'>
                                {getVoiceCountdown()}
                            </span>
                        </div>
                        <div className='wpwax-vm-messagebox-reply__action'>
                            <a
                                href='#'
                                className='wpwax-vm-messagebox-reply-send'
								disabled={canSendAudioMessage() && ! isSendingAudioMessage ? false : true}
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
                    {
                        messageType === 'video' ?
                            <div className="wpwax-hg-messagebox-video-wrap" ref={videoToggleRef}>
                                <Video
                                    videoRecorderStatus={videoRecorderStatus}
                                    setVideoRecorderStatus={setVideoRecorderStatus}
                                    sessionID={selectedSession.id}
                                    onSuccess={loadLatestMessages}
                                    replayingTo={getReplaingToUser()}
                                />
                            </div>
                         : null
                    }

					{ ! isRecording && (
						<span className='wpwax-vm-messagebox-footer__text'>
							How would you like to answer?
						</span>
					) }

                    <div className='wpwax-vm-messagebox-footer__actionlist'>

						{ ! isRecording && (
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
						) }

						{ ! isRecording && (
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
						) }

						{ ! isRecording && (
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
						) }

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

    /* Handle Voice Colse */
    const handleVoiceClose = async (e) => {
        e.preventDefault();

        if (isSendingAudioMessage) {
            return;
        }

        stopVoiceRecording();
		closeVoiceChat();
    };

    const handleScrollBottom = (event) => {
        event.preventDefault();
        const scrollingBody = document.querySelector(
            '.wpwax-vm-messagebox-body .infinite-scroll-component '
        );
        // console.log(scrollingBody,messageDirection);
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
                                                            selectedSession.id,
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
                                                inverse={true}
                                                hasMore={ true }
                                                // hasMore={ getWindowData( 'currentPage' ) !== getWindowData( 'totalPage' ) }
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
                                                                currentUser={current_user}
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
                                                                currentUser={current_user}
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
					<div className="helpgent-greet-greetings">
						<h2 className='helpgent-greet-title'>{ getGreetTitle() }</h2>
						{ getTotalUnreadCount() > 0 && (
							<h3 className='helpgent-greet-subtitle'>{ getGreetSubtitle() }</h3>
						) }

					</div>

                </div>
            )}

			{ isActiveCountdown && ( <div className="wpwax-vm-countdown-wrap"><CountdownPage count={getReverseCount()}/></div> ) }
        </ChatBoxWrap>
    );
}

export default MessageBox;
