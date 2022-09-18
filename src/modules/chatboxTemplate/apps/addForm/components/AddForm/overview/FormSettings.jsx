import replaceIcon from 'Assets/svg/icons/replace.svg';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { default as Select } from 'react-select';
import { ReactSVG } from "react-svg";
import Switch from "react-switch";
import formUpdater from "../../../../../../../lib/components/FormUpdater";
import { handleDynamicEdit } from '../../../redux/form/actionCreator';
import { FormSettingsWrap } from './Style';

export const fontOptions = [
    { value: "roboto", label: "Roboto" },
    { value: "inter", label: "Inter" },
    { value: "legend", label: "Legend" },
]
export const formType = [
    { value: "theme-1", label: "Theme 1" },
    { value: "theme-2", label: "Theme 2" }
]
export const fontSizeOptions = [
    { value: "large", label: "Large" },
    { value: "larger", label: "Larger" },
    { value: "x-large", label: "X-large" },
    { value: "xx-large", label: "XX-large" },
    { value: "medium", label: "Medium" },
    { value: "small", label: "Small" },
    { value: "smaller", label: "Smaller" },
    { value: "x-small", label: "X-small" },
]
const FormSettings = () => {
    /* initialize Form Data */
    const {
        formInitialData,
        grettingMessage,
        grettingMessageColor,
        grettingVideo,
        grettingImage,
        descriptionVisibility,
        description,
        chatTitle,
        chatTitleColor,
        chatReplyType,
        footerVisibility,
        footerMessage,
        primaryColor,
        pageBgColor,
        fontFamily,
        fontSize,
        fontColor,
        buttonRadius,
        primaryButtonColor,
        primaryButtonBackground,
        formData,
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
            primaryColor: state.form.data[0].options.primary_color,
            pageBgColor: state.form.data[0].options.page_background_color,
            fontFamily: state.form.data[0].options.font_family,
            fontSize: state.form.data[0].options.font_size,
            fontColor: state.form.data[0].options.font_color,
            buttonRadius: state.form.data[0].options.button_border_radius,
            primaryButtonColor: state.form.data[0].options.primary_button_font_color,
            primaryButtonBackground: state.form.data[0].options.primary_button_background_color,
            formData: state.form.data,
            formInitialData: state.form.data[0],
            formInitialOption: state.form.data[0].options,
        };
    });
    const [state, setState] = useState({
        openCollapse: true,
    });

    /* Destructuring State */
    const { openCollapse } = state;

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    /* For updating each element, we create seperate function */
    const handleChatArray = (type) => {
        let updatear = chatReplyType;
        updatear = updatear.indexOf(type) === -1 ? [...updatear, type] : updatear.filter(elm => elm != type);
        const updatedData = formUpdater("chat-type", updatear, formData);
        dispatch(handleDynamicEdit(updatedData));
    }
    const handleChatReplyType = (checked, event, id) => {
        if (id === "wpwax-vm-reply-video") {
            handleChatArray("video");
        } else if (id === "wpwax-vm-reply-voice") {
            handleChatArray("audio");
        } else if (id === "wpwax-vm-reply-text") {
            handleChatArray("text");
        }
    }

    const handleChangeInputValue = (e) => {
        const updatedData = formUpdater(e.target.id, e.target.value, formData);
        dispatch(handleDynamicEdit(updatedData));
    }

    const handleChangeSwitchValue = (value, event, id) => {
        console.log(event, value, id);
        const updatedData = formUpdater(id, value, formData);
        dispatch(handleDynamicEdit(updatedData));
    }

    const handleChangeSelectValue = (selectEvent, e) => {
        const updatedData = formUpdater(e.name, selectEvent.value, formData);
        dispatch(handleDynamicEdit(updatedData));
    };

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

    console.log(grettingImage)

    return (
        <FormSettingsWrap>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Add an image/video or Record a video</span>
                </div>
                <div className={grettingVideo !== '' || grettingImage !== '' ? 'wpwax-vm-uploader wpax-vm-has-src' : 'wpwax-vm-uploader'}>
                    <span className="wpwax-vm-btn wpwax-vm-media-btn wpwax-vm-upload-trigger">
                        <a href="#" className="wpwax-vm-media-upload" onClick={e => openUploader(e)}>Add image/video</a>
                    </span>
                    {
                        grettingVideo !== '' || grettingImage !== '' ?
                            <div className="wpwax-vm-media-preview">
                                <div className="wpwax-vm-media-preview__src">
                                    {grettingImage !== '' ? <img src={grettingImage} alt="Wpwax Video Support" /> : null}
                                    {grettingVideo !== '' ? <video src={grettingVideo}></video> : null}
                                </div>
                                <a href="#" className="wpwax-vm-media-preview__replace" onClick={e => openUploader(e)}><div className="wpwax-vm-media-preview__replace--icon"><ReactSVG src={replaceIcon} /></div> Replace</a>
                            </div> : null
                    }
                </div>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Greetings message </span>
                </div>
                <textarea className="wpwax-vm-form__element" id="wpwax-vm-greet-msg" value={grettingMessage} onChange={(e) => handleChangeInputValue(e)} />
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Description</span>
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
                <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-chat-title" value={chatTitle} onChange={(e) => handleChangeInputValue(e)} />
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Users can reply in</span>
                </div>
                <div className="wpwax-vm-switch-list">
                    <div className="wpwax-vm-switch-single">
                        <span>Video</span>
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
                            id="wpwax-vm-reply-video"
                            checked={chatReplyType.indexOf('video') === -1 ? false : true}
                            onChange={handleChatReplyType}
                        />
                    </div>
                    <div className="wpwax-vm-switch-single">
                        <span>Voice</span>
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
                            id="wpwax-vm-reply-voice"
                            checked={chatReplyType.indexOf('audio') === -1 ? false : true}
                            onChange={handleChatReplyType}
                        />
                    </div>
                    <div className="wpwax-vm-switch-single">
                        <span>Text</span>
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
                            id="wpwax-vm-reply-text"
                            checked={chatReplyType.indexOf('text') === -1 ? false : true}
                            onChange={handleChatReplyType}
                        />
                    </div>
                </div>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Footer Message </span>
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
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Primary color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{primaryColor}</span>
                            <label htmlFor="wpwax-vm-primary-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: primaryColor }}></label>
                            <input type="color" id="wpwax-vm-primary-color" className="wpwax-vm-form__element" value="#6551f2" onChange={(e) => handleChangeInputValue(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Page Background color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{pageBgColor}</span>
                            <label htmlFor="wpwax-vm-page-bg-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: pageBgColor }}></label>
                            <input type="color" id="wpwax-vm-page-bg-color" className="wpwax-vm-form__element" value={pageBgColor} onChange={(e) => handleChangeInputValue(e)} />
                        </div>
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
                                return option.label === fontFamily;
                            })[0]}
                        />
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span> Font Size</span>
                        <Select
                            classNamePrefix="wpwax-vm-select"
                            options={fontSizeOptions}
                            closeMenuOnSelect={true}
                            hideSelectedOptions={false}
                            searchable={false}
                            name="wpwax-vm-fontsize"
                            onChange={handleChangeSelectValue}
                            defaultValue={fontSizeOptions.filter(function (option) {
                                return option.label === fontSize;
                            })[0]}
                        />
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Button Radius</span>
                        <div className="wpwax-vm-form__input-radius">
                            <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-form-btn-radius" value={buttonRadius} onChange={(e) => handleChangeInputValue(e)} />
                        </div>
                    </div>
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
                                return option.label === fontSize;
                            })[0]}
                        />
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Chat title Color</span>
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
                                return option.label === fontSize;
                            })[0]}
                        />
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Primary Button color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{primaryButtonColor}</span>
                            <label htmlFor="wpwax-vm-form-primray-button-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: primaryButtonColor }}></label>
                            <input type="color" id="wpwax-vm-form-primray-button-color" className="wpwax-vm-form__element" value={primaryButtonColor} onChange={(e) => handleChangeInputValue(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Primary Background color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{primaryButtonBackground}</span>
                            <label htmlFor="wpwax-vm-form-primary-button-bg" className="wpwax-vm-form__color-ball" style={{ backgroundColor: primaryButtonBackground }}></label>
                            <input type="color" id="wpwax-vm-form-primary-button-bg" className="wpwax-vm-form__element" value={primaryButtonBackground} onChange={(e) => handleChangeInputValue(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </FormSettingsWrap>
    );
}

export default FormSettings;