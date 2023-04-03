import VideoRecorderPopup from 'Components/video-recorder-popup/App.jsx';

import replaceIcon from 'Assets/svg/icons/replace.svg';
import cross from 'Assets/svg/icons/cross.svg';

import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { default as Select } from 'react-select';
import ReactSVG from 'react-inlinesvg';
import parse from 'html-react-parser';
import ContentEditable from "react-contenteditable";
import Switch from "react-switch";
import formUpdater from "Helper/FormUpdater";
import { handleDynamicEdit } from '../../../store/form/actionCreator';
import miceIcon from 'Assets/svg/icons/mice.svg';
import textIcon from 'Assets/svg/icons/text.svg';
import videoIcon from 'Assets/svg/icons/video-camera.svg';
import recordIcon from 'Assets/svg/icons/desktop.svg';
import { FormSettingsWrap } from './Style';
import useWPAttachmentAPI from 'API/useWPAttachmentAPI';
import { encodeHTMLEntities, decodeHTMLEntities } from 'Helper/utils';

export const fontOptions = [
    { value: "Roboto,sans-serif", label: "Roboto" },
    { value: "Inter", label: "Inter" },
    { value: "Legend,sans-serif", label: "Legend" },
]

export const templateOptions = [
    { value: 'theme-1', label: 'Theme One' },
    { value: 'theme-2', label: 'Theme Two' },
];

export const fontSizeOptions = [
    { value: "1.3", label: "large" },
    { value: "1", label: "medium" },
    { value: ".80", label: "small" },
]
const FormSettings = () => {
    /* initialize Form Data */
    const {
        formInitialData,
        grettingMessage,
        grettingMessageColor,
        grettingMessageFontSize,
        grettingVideo,
        grettingImage,
        descriptionVisibility,
        description,
        chatTitle,
        chatTitleFontSize,
        chatTitleColor,
        chatReplyType,
        footerVisibility,
        footerMessage,
        footerMessageColor,
        footerMessageFontSize,
        playBtnBackground,
        pageBgColor,
        pageHeaderBgColor,
        fontFamily,
        fontColor,
        buttonRadius,
        primaryButtonColor,
        primaryButtonBackground,
        creditTextDom,
        creditTextVisibility,
        formData,
        templateTheme
    } = useSelector(state => {
        return {
            id: state.form.data.id,
            grettingMessage: state.form.data[0].options.greet_message,
            grettingMessageColor: state.form.data[0].options.greet_message_font_color,
            grettingMessageFontSize: state.form.data[0].options.greet_message_font_size,
            grettingVideo: state.form.data[0].options.greet_video_url,
            grettingImage: state.form.data[0].options.greet_image_url,
            descriptionVisibility: state.form.data[0].options.show_description,
            description: state.form.data[0].options.description,
            chatTitle: state.form.data[0].options.chat_options_title,
            chatTitleFontSize: state.form.data[0].options.chat_options_title_font_size,
            chatTitleColor: state.form.data[0].options.chat_options_title_font_color,
            chatReplyType: state.form.data[0].options.can_replay_in,
            footerVisibility: state.form.data[0].options.show_footer,
            footerMessage: state.form.data[0].options.footer_message,
            footerMessageFontSize: state.form.data[0].options.footer_message_font_size,
            footerMessageColor: state.form.data[0].options.footer_message_color,
            playBtnBackground: state.form.data[0].options.play_btn_background,
            pageBgColor: state.form.data[0].options.page_background_color,
            pageHeaderBgColor: state.form.data[0].options.page_header_background_color,
            fontFamily: state.form.data[0].options.font_family,
            fontColor: state.form.data[0].options.font_color,
            buttonRadius: state.form.data[0].options.button_border_radius,
            primaryButtonColor: state.form.data[0].options.primary_button_font_color,
            primaryButtonBackground: state.form.data[0].options.primary_button_background_color,
            templateTheme: state.form.data[0].options.theme,
            creditTextDom: state.form.data[0].options.creditTextDom,
            creditTextVisibility: state.form.data[0].options.creditTextVisibility,
            formData: state.form.data,
            formInitialData: state.form.data[0],
            formInitialOption: state.form.data[0].options,
        };
    });

	const { createItem: createAttachmentItem } = useWPAttachmentAPI();

    const [state, setState] = useState({
        openCollapse: true,
    });

    /* Destructuring State */
    const { openCollapse } = state;

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

	const [ showVideoRecorderPopup, setShowVideoRecorderPopup ] = useState( false );

    /* For updating each element, we create seperate function */
    const handleChatArray = (type) => {
        let updater = chatReplyType;
        updater = updater.indexOf(type) === -1 ? [...updater, type] : updater.filter(elm => elm != type);
        const updatedData = formUpdater("chat-type", updater, formData);
        dispatch(handleDynamicEdit(updatedData));
    }
    const handleChatReplyType = (checked, event, id) => {
        if (id === "wpwax-vm-reply-video") {
            handleChatArray("video");
        } else if (id === "wpwax-vm-reply-voice") {
            handleChatArray("voice");
        } else if (id === "wpwax-vm-reply-text") {
            handleChatArray("text");
        }else if (id === "wpwax-vm-reply-screen") {
            handleChatArray("screen_record");
        }
    }

    const handleChangeInputValue = (e) => {
		const value = encodeHTMLEntities( e.target.value );
        const upduatedData = formUpdater(e.target.id, value, formData);
        dispatch(handleDynamicEdit(upduatedData));
    }

    const handleChangeSwitchValue = (value, event, id) => {
        const updatedData = formUpdater(id, value, formData);
        dispatch(handleDynamicEdit(updatedData));
    }

    const handleChangeSelectValue = (selectEvent, e) => {
        // let updateFormData = {};
        if(e.name === "wpwax-vm-theme" && selectEvent.value === "theme-2"){
            const updateFormData = formData.map(item =>{
                return {
                    ...item,
                    options: {
                        ...item.options,
                        chat_options_title_font_color: "#030308",
                        footer_message_color: "#4D4D4D",
                        theme: selectEvent.value
                    }
                }
            });
            dispatch(handleDynamicEdit(updateFormData));
        }else if(e.name === "wpwax-vm-theme" && selectEvent.value === "theme-1"){
            const updateFormData = formData.map(item =>{
                return {
                    ...item,
                    options: {
                        ...item.options,
                        chat_options_title_font_color: "#ffffff",
                        footer_message_color: "#ffffff",
                        theme: selectEvent.value
                    }
                }
            });
            dispatch(handleDynamicEdit(updateFormData));
        }else{
            const updateFormData = formUpdater(e.name, selectEvent.value, formData);
            dispatch(handleDynamicEdit(updateFormData));
        }

    };

    const handleEditableChange = ( event,id ) => {
        const updatedData = formUpdater(id, parse(event.target.value), formData);
        dispatch(handleDynamicEdit(updatedData));
    }

    /* To handle section toggle */
    const toogleCollapse = (e) => {
        e.preventDefault();
        setState({
            ...state,
            openCollapse: !openCollapse
        });
    }

    let frame;
    const openUploader = e => {
        e.preventDefault();

        // If the media frame already exists, reopen it.
        if (frame) {
            frame.open()
            return
        }
        // Create a new media frame
        frame = wp.media({
            title: 'Select or Upload Media Of Your Chosen Persuasion',
            button: {
                text: 'Use this media',
            },
            library: {
                type: [ 'video', 'image' ]
            },
            multiple: false, // Set to true to allow multiple files to be selected
        })

        frame.on('select', function () {
            let attachment = frame.state().get('selection').first() && frame.state().get('selection').first().toJSON();
            const attatchmentType = attachment.type
            const attatchmentUrl = attachment.url

            if (attatchmentType === "image") {
                setState({
                    ...state,
                    grettingImage: attatchmentUrl,
                    grettingVideo: '',
                });
                const updatedData = formUpdater('greet-media-image', attatchmentUrl, formData);
                dispatch(handleDynamicEdit(updatedData));
            } else if (attachment.type === "video") {
                setState({
                    ...state,
                    grettingVideo: attatchmentUrl,
                    grettingImage: ''
                });
                const updatedData = formUpdater('greet-media-video', attatchmentUrl, formData);
                dispatch(handleDynamicEdit(updatedData));
            }

        });

        // Finally, open the modal on click
        frame.open();
    }

	function handleRecordVideo( e ) {
		e.preventDefault();
		setShowVideoRecorderPopup( true );
	}

	function onSelectRecordVideo( data ) {
		if ( ! data ) {
			return;
		}

		let updatedData = formUpdater( 'greet-media-image', '', formData );
		updatedData = formUpdater( 'greet-media-video', data, formData );

		dispatch( handleDynamicEdit( updatedData ) );

		setState({
			...state,
			grettingVideo: data,
			grettingImage: ''
		});
	}

	async function onSaveRecordVideo( args ) {
		let status = { success: false, message: '', data: null };

		const fileResponse = await createAttachmentItem( { file: args.file } );

		if ( ! fileResponse.success ) {
			status.message = fileResponse.message;
			return status;
		}

		status.success = true;
		status.data = fileResponse.data.source_url;

		return status;
	}

	function onCloseRecordVideo() {
		setShowVideoRecorderPopup( false );
	}

	function removeGrettingAttachment( e ) {
		e.preventDefault();

		let updatedData = formUpdater('greet-media-image', '', formData);
		updatedData = formUpdater('greet-media-video', '', formData);

		dispatch( handleDynamicEdit( updatedData ) );

		setState({
			...state,
			grettingImage: '',
			grettingVideo: '',
		});
	}

	function getActiveReplayTypeCount() {
		const replayTypes = [ 'video', 'voice', 'text', 'screen_record' ];

		const count = replayTypes
			.map( item => chatReplyType.indexOf( item ) !== -1 ? 1 : 0 )
			.reduce( ( total, current ) => total + current );

		return count;
	}

	function shouldDisabledReplayType( replayType ) {
		const count    = getActiveReplayTypeCount();
		const isActive = chatReplyType.indexOf( replayType ) !== -1;

		if ( count < 2 && isActive ) {
			return true;
		}

		return false;
	}

    return (
        <FormSettingsWrap>
            <div className='wpwax-vm-form-group'>
                <div className='wpwax-vm-form-group__label wpwax-vm-has-tooltip'>
                    <span className='wpwax-vm-tooltip-wrap'>
                        <label htmlFor='wpwax-vm-theme'>Theme </label>
                    </span>
                </div>
                <Select
                    classNamePrefix='wpwax-vm-select'
                    options={templateOptions}
                    hideSelectedOptions={false}
                    searchable={false}
                    name='wpwax-vm-theme'
                    onChange={handleChangeSelectValue}
                    defaultValue={
                        templateOptions.filter(function (option) {
                            return option.value === templateTheme;
                        })[0]
                    }
                    allowSelectAll={true}
                />
            </div>

            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Add an image/video or Record a video</span>
                </div>
                <div className={grettingVideo !== '' || grettingImage !== '' ? 'wpwax-vm-uploader wpax-vm-has-src' : 'wpwax-vm-uploader'}>
                    <span className="wpwax-vm-btn wpwax-vm-media-btn wpwax-vm-upload-trigger">
                        <a href="#" className="wpwax-vm-media-upload" onClick={openUploader}>Add image/video</a>
                    </span>

					<p>or</p>

                    <span className="wpwax-vm-btn wpwax-vm-media-btn wpwax-vm-upload-trigger">
                        <a href="#" className="wpwax-vm-media-upload" onClick={handleRecordVideo}>Record a video</a>
                    </span>

                    {
                        grettingVideo !== '' || grettingImage !== '' ?
                            <div className="wpwax-vm-media-preview">
                                <div className="wpwax-vm-media-preview__src">
                                    {grettingImage !== '' ? <img src={grettingImage} alt="Wpwax Video Support" /> : null}
                                    {grettingVideo !== '' ? <video src={grettingVideo}></video> : null}
                                </div>

								<div className="wpwax-vm-media-actions">
									<a href="#" className="wpwax-vm-media-preview__replace" onClick={removeGrettingAttachment}><span className="wpwax-vm-media-preview__replace--icon"><ReactSVG src={cross} /></span> Remove</a>
									<a href="#" className="wpwax-vm-media-preview__replace" onClick={openUploader}><span className="wpwax-vm-media-preview__replace--icon"><ReactSVG src={replaceIcon} /></span> Replace</a>
								</div>

                            </div> : null
                    }
                </div>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <label htmlFor='wpwax-vm-greet-msg'>Greetings message </label>
                </div>
                <textarea className="wpwax-vm-form__element" id="wpwax-vm-greet-msg" value={grettingMessage} onChange={(e) => handleChangeInputValue(e)} />
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <label htmlFor='wpwax-vm-description'>Description</label>
                    <label>
                        <Switch
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#6551f2"
                            offColor="#E2E2E2"
                            onHandleColor="#FFFFFF"
                            className="wpwax-vm-switch"
                            handleDiameter={14}
                            height={22}
                            width={40}
                            id="wpwax-vm-description-visibility"
                            checked={descriptionVisibility}
                            onChange={handleChangeSwitchValue}
                        />
                    </label>
                </div>
                <textarea className="wpwax-vm-form__element" value={description} id="wpwax-vm-description" onChange={(e) => handleChangeInputValue(e)} />
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <label htmlFor='wpwax-vm-chat-title'>Chat Title </label>
                </div>
                <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-chat-title" value={chatTitle} onChange={(e) => handleChangeInputValue(e)} />
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Users can reply in</span>
                </div>
                <div className="wpwax-vm-switch-list">
                    <div className="wpwax-vm-switch-single">
                        <span><ReactSVG src={videoIcon}/> Video</span>
                        <Switch
							disabled={ shouldDisabledReplayType( 'video' )  }
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#6551f2"
                            offColor="#E2E2E2"
                            onHandleColor="#FFFFFF"
                            className="wpwax-vm-switch"
                            handleDiameter={14}
                            height={22}
                            width={40}
                            id="wpwax-vm-reply-video"
                            checked={chatReplyType.indexOf('video') === -1 ? false : true}
                            onChange={handleChatReplyType}
                        />
                    </div>
                    <div className="wpwax-vm-switch-single">
                        <span><ReactSVG src={miceIcon}/>Voice</span>
                        <Switch
							disabled={ shouldDisabledReplayType( 'voice' ) }
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#6551f2"
                            offColor="#E2E2E2"
                            onHandleColor="#FFFFFF"
                            className="wpwax-vm-switch"
                            handleDiameter={14}
                            height={22}
                            width={40}
                            id="wpwax-vm-reply-voice"
                            checked={chatReplyType.indexOf('voice') === -1 ? false : true}
                            onChange={handleChatReplyType}
                        />
                    </div>
                    <div className="wpwax-vm-switch-single">
                        <span><ReactSVG src={textIcon}/>Text</span>
                        <Switch
							disabled={ shouldDisabledReplayType( 'text' ) }
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#6551f2"
                            offColor="#E2E2E2"
                            onHandleColor="#FFFFFF"
                            className="wpwax-vm-switch"
                            handleDiameter={14}
                            height={22}
                            width={40}
                            id="wpwax-vm-reply-text"
                            checked={chatReplyType.indexOf('text') === -1 ? false : true}
                            onChange={handleChatReplyType}
                        />
                    </div>
                   
                </div>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <label htmlFor='wpwax-vm-footer-msg'>Footer Message </label>
                    <Switch
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#6551f2"
                        offColor="#E2E2E2"
                        onHandleColor="#FFFFFF"
                        className="wpwax-vm-switch"
                        id="wpwax-vm-footer-msg-visibility"
                        handleDiameter={14}
                        height={22}
                        width={40}
                        checked={footerVisibility}
                        onChange={handleChangeSwitchValue}
                    />
                </div>
                <textarea className="wpwax-vm-form__element" id="wpwax-vm-footer-msg" value={footerMessage} onChange={(e) => handleChangeInputValue(e)} />
            </div>
           
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Customize</span>
                    <a href="" className={openCollapse ? "wpwax-vm-btn-collapsable wpwax-vm-open" : "wpwax-vm-btn-collapsable"} onClick={e => toogleCollapse(e)}><span className="dashicons-arrow-down-alt2 dashicons"></span></a>
                </div>
                <div className={openCollapse ? "wpwax-vm-form-group__input-list wpwax-vm-show" : "wpwax-vm-form-group__input-list wpwax-vm-hide"}>
                    {
                        templateTheme === 'theme-2' ?
                        <div className="wpwax-vm-form-group__input-single">
                            <span>Page Background</span>
                            <div className="wpwax-vm-form__color-plate">
                                <span className="wpwax-vm-form__color-text">{pageBgColor}</span>
                                <label htmlFor="wpwax-vm-page-bg-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: pageBgColor }}></label>
                                <input type="color" id="wpwax-vm-page-bg-color" className="wpwax-vm-form__element" value={pageBgColor} onChange={(e) => handleChangeInputValue(e)} />
                            </div>
                        </div> : null
                    }
                    {
                        templateTheme === 'theme-2' ?
                        <div className="wpwax-vm-form-group__input-single">
                            <span>Page Header Background</span>
                            <div className="wpwax-vm-form__color-plate">
                                <span className="wpwax-vm-form__color-text">{pageHeaderBgColor}</span>
                                <label htmlFor="wpwax-vm-pageheader-bg" className="wpwax-vm-form__color-ball" style={{ backgroundColor: pageHeaderBgColor }}></label>
                                <input type="color" id="wpwax-vm-pageheader-bg" className="wpwax-vm-form__element" value={pageHeaderBgColor} onChange={(e) => handleChangeInputValue(e)} />
                            </div>
                        </div> : null
                    }
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Greet Message Color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{grettingMessageColor}</span>
                            <label htmlFor="wpwax-vm-greet-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: grettingMessageColor }}></label>
                            <input type="color" id="wpwax-vm-greet-color" className="wpwax-vm-form__element" value={grettingMessageColor} onChange={(e) => handleChangeInputValue(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Greet Message Font Size</span>
                        <Select
                            classNamePrefix="wpwax-vm-select"
                            options={fontSizeOptions}
                            closeMenuOnSelect={true}
                            hideSelectedOptions={false}
                            searchable={false}
                            name="wpwax-vm-greet-fontsize"
                            onChange={handleChangeSelectValue}
                            defaultValue={fontSizeOptions.filter(function (option) {
                                return option.value === grettingMessageFontSize;
                            })[0]}
                        />
                    </div>
                    {
                        grettingVideo !=='' ?
                        <div className="wpwax-vm-form-group__input-single">
                            <span>Play Button Background</span>
                            <div className="wpwax-vm-form__color-plate">
                                <span className="wpwax-vm-form__color-text">{playBtnBackground}</span>
                                <label htmlFor="wpwax-vm-play-btn-bg" className="wpwax-vm-form__color-ball" style={{ backgroundColor: playBtnBackground }}></label>
                                <input type="color" id="wpwax-vm-play-btn-bg" className="wpwax-vm-form__element" value="#6551f2" onChange={(e) => handleChangeInputValue(e)} />
                            </div>
                        </div>:null
                    }
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Chat Title Color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{chatTitleColor}</span>
                            <label htmlFor="wpwax-vm-chat-title-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: chatTitleColor }}></label>
                            <input type="color" id="wpwax-vm-chat-title-color" className="wpwax-vm-form__element" value={chatTitleColor} onChange={(e) => handleChangeInputValue(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Chat Title Font Size</span>
                        <Select
                            classNamePrefix="wpwax-vm-select"
                            options={fontSizeOptions}
                            closeMenuOnSelect={true}
                            hideSelectedOptions={false}
                            searchable={false}
                            name="wpwax-vm-chat-title-fontsize"
                            onChange={handleChangeSelectValue}
                            defaultValue={fontSizeOptions.filter(function (option) {
                                return option.value === chatTitleFontSize;
                            })[0]}
                        />
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Font Family</span>
                        <Select
                            classNamePrefix="wpwax-vm-select"
                            options={fontOptions}
                            closeMenuOnSelect={true}
                            hideSelectedOptions={false}
                            searchable={false}
                            name="wpwax-vm-fontfamily"
                            onChange={handleChangeSelectValue}
                            defaultValue={fontOptions.filter(function (option) {
                                return option.value === fontFamily;
                            })[0]}
                        />
                    </div>

                    <div className="wpwax-vm-form-group__input-single">
                        <span>Button Radius</span>
                        <div className="wpwax-vm-form__input-radius">
                            <input min="0" type="number" className="wpwax-vm-form__element" id="wpwax-vm-form-btn-radius" value={buttonRadius} onChange={(e) => handleChangeInputValue(e)} />
                        </div>
                    </div>

                    <div className="wpwax-vm-form-group__input-single">
                        <span>Primary Button Color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{primaryButtonColor}</span>
                            <label htmlFor="wpwax-vm-form-primray-button-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: primaryButtonColor }}></label>
                            <input type="color" id="wpwax-vm-form-primray-button-color" className="wpwax-vm-form__element" value={primaryButtonColor} onChange={(e) => handleChangeInputValue(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Button Background Color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{primaryButtonBackground}</span>
                            <label htmlFor="wpwax-vm-form-primary-button-bg" className="wpwax-vm-form__color-ball" style={{ backgroundColor: primaryButtonBackground }}></label>
                            <input type="color" id="wpwax-vm-form-primary-button-bg" className="wpwax-vm-form__element" value={primaryButtonBackground} onChange={(e) => handleChangeInputValue(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Footer Text Color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{footerMessageColor}</span>
                            <label htmlFor="wpwax-vm-chat-footer-text-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: footerMessageColor }}></label>
                            <input type="color" id="wpwax-vm-footer-text-color" className="wpwax-vm-form__element" value={footerMessageColor} onChange={(e) => handleChangeInputValue(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Footer Text Font Size</span>
                        <Select
                            classNamePrefix="wpwax-vm-select"
                            options={fontSizeOptions}
                            closeMenuOnSelect={true}
                            hideSelectedOptions={false}
                            searchable={false}
                            name="wpwax-vm-chat-footer-text-fontsize"
                            onChange={handleChangeSelectValue}
                            defaultValue={fontSizeOptions.filter(function (option) {
                                return option.value === footerMessageFontSize;
                            })[0]}
                        />
                    </div>
                </div>
            </div>


			{ showVideoRecorderPopup &&
				<VideoRecorderPopup
					onSelect={onSelectRecordVideo}
					onSave={onSaveRecordVideo}
					onClose={onCloseRecordVideo}
				/>
			}
        </FormSettingsWrap>
    );
}

export default FormSettings;