import replaceIcon from 'Assets/svg/icons/replace.svg';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { default as Select } from 'react-select';
import { ReactSVG } from "react-svg";
import Switch from "react-switch";
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
        id,
        grettingMessage,
        grettingVideo,
        grettingImage,
        descriptionVisibility,
        description,
        chatTitle,
        chatReplyType,
        footerVisibility,
        formData,
        formInitialData,
        formInitialOption
    } = useSelector(state => {
        return {
            id: state.form.data.id,
            grettingMessage: state.form.data[0].options.greet_message,
            grettingVideo: state.form.data[0].options.greet_video_url,
            grettingImage: state.form.data[0].options.greet_image_url,
            descriptionVisibility: state.form.data[0].options.show_description,
            description: state.form.data[0].options.description,
            chatTitle: state.form.data[0].options.chat_box_title,
            chatReplyType: state.form.data[0].options.can_replay_in,
            footerVisibility: state.form.data[0].options.show_footer,
            footerMessage: state.form.data[0].options.footer_message,
            font: state.form.data[0].options.font,
            fontSize: state.form.data[0].options.font_size,
            fontColor: state.form.data[0].options.font_color,
            buttonColor: state.form.data[0].options.button_color,
            buttonRadius: state.form.data[0].options.button_border_radius,
            buttonRadius: state.form.data[0].options.button_border_radius,
            formData: state.form.data,
            formInitialData: state.form.data[0],
            formInitialOption: state.form.data[0].options,
        };
    });
    const [state, setState] = useState({
        // id: formInitialData.id,
        openCollapse: true,
    });

    /* Destructuring State */
    const {
        openCollapse
    } = state;

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    /* Helper function for live preview Update */
    const updateForm = (label, value) => {
        let updatedData = formData.map(item => {
            if (item.id === id) {
                switch (label) {
                    case "greet":
                        return {
                            ...item,
                            option: {
                                ...item.option,
                                greet_message: value
                            }
                        }
                    case "greet-media-image":
                        return {
                            ...item,
                            option: {
                                ...item.option,
                                greet_image_url: value,
                                greet_video_url: '',
                            }
                        }
                    case "greet-media-video":
                        return {
                            ...item,
                            option: {
                                ...item.option,
                                greet_video_url: value,
                                greet_image_url: ''
                            }
                        }
                    case "des-visibility":
                        return {
                            ...item,
                            option: {
                                ...item.option,
                                show_description: value
                            }
                        }
                    case "description":
                        return {
                            ...item,
                            option: {
                                ...item.option,
                                description: value
                            }
                        }
                    case "chat-title":
                        return {
                            ...item,
                            option: {
                                ...item.option,
                                chat_box_title: value
                            }
                        }
                    case "chat-type":
                        return {
                            ...item,
                            option: {
                                ...item.option,
                                can_replay_in: value
                            }
                        }
                    case "video-visibility":
                        return {
                            ...item,
                            option: {
                                ...item.option,
                                chat_box_title: value
                            }
                        }
                    case "footer-visibility":
                        return {
                            ...item,
                            option: {
                                ...item.option,
                                show_footer: value
                            }
                        }
                    case "footer-text":
                        return {
                            ...item,
                            option: {
                                ...item.option,
                                footer_message: value
                            }
                        }
                    case "form-font":
                        return {
                            ...item,
                            option: {
                                ...item.option,
                                font: value
                            }
                        }
                    case "form-font-size":
                        return {
                            ...item,
                            option: {
                                ...item.option,
                                font_size: value
                            }
                        }
                    case "font-color":
                        return {
                            ...item,
                            option: {
                                ...item.option,
                                font_color: value
                            }
                        }
                    case "button-color":
                        return {
                            ...item,
                            option: {
                                ...item.option,
                                button_color: value
                            }
                        }
                    case "button-radius":
                        return {
                            ...item,
                            option: {
                                ...item.option,
                                button_border_radius: value
                            }
                        }

                    default:
                    // code block
                }
                return item;
            }
            return item;
        });
        dispatch(handleDynamicEdit(updatedData));
    }

    /* For updating each element, we create seperate function */
    const changeGreet = (event) => {
        let greetMessage = event.target.value;
        setState({
            ...state,
            grettingMessage: greetMessage
        });
        updateForm('greet', greetMessage);
    }
    const changeDescriptionVisibillity = () => {
        setState({
            ...state,
            descriptionVisibility: !descriptionVisibility
        });
        updateForm('des-visibility', !descriptionVisibility);
    }
    const changeDescription = (event) => {
        let description = event.target.value;
        setState({
            ...state,
            description: description
        });
        updateForm('description', description);
    }
    const changeChatTitle = (event) => {
        let chatTitle = event.target.value;
        setState({
            ...state,
            chatTitle: chatTitleText
        });
        updateForm('chat-title', chatTitleText);
    }
    const handleChatArray = (type) => {
        let updatear = chatReplyType;
        updatear = updatear.indexOf(type) === -1 ? [...updatear, type] : updatear.filter(elm => elm != type);
        setState({
            ...state,
            chatReplyType: updatear
        });
        console.log(updatear)
        updateForm('chat-type', updatear);
    }
    const handleChatReplyType = (checked, event, id) => {
        if (id === "wpwax-vm-reply-video") {
            handleChatArray("video");
        } else if (id === "wpwax-vm-reply-s-record") {
            handleChatArray("screen_recording");
        } else if (id === "wpwax-vm-reply-voice") {
            handleChatArray("voice");
        } else if (id === "wpwax-vm-reply-text") {
            handleChatArray("text");
        }
    }

    const chagneFont = (selectedFont) => {
        updateForm('form-font', selectedFont.value);
    };
    const chagneFontSize = (selectedFontSize) => {
        updateForm('form-font-size', selectedFontSize.value);
    };
    const changeFooterVisibility = () => {
        setState({
            ...state,
            footerVisibility: !footerVisibility
        });
        updateForm('footer-visibility', !footerVisibility);
    }
    const changeFooterMessage = (event) => {
        let footerMessageText = event.target.value;
        setState({
            ...state,
            footerMessage: footerMessageText
        });
        updateForm('footer-text', footerMessageText);
    }
    const changeFontColor = (event) => {
        let fontColor = event.target.value;
        setState({
            ...state,
            fontColor: fontColor
        });
        updateForm('font-color', fontColor);
    }
    const changeButtonColor = (event) => {
        let buttonColor = event.target.value;
        setState({
            ...state,
            buttonColor: buttonColor
        });
        updateForm('button-color', buttonColor);
    }
    const changeButtonRadius = (event) => {
        let buttonRadius = event.target.value;
        setState({
            ...state,
            buttonRadius: buttonRadius
        });
        updateForm('button-radius', buttonRadius);
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
                updateForm('greet-media-image', attatchmentUrl);
            } else if (attachment.type === "video") {
                setState({
                    ...state,
                    grettingVideo: attatchmentUrl,
                    grettingImage: ''
                });
                updateForm('greet-media-video', attatchmentUrl);
            }

        });

        // Finally, open the modal on click
        frame.open();
    }
    return (
        <FormSettingsWrap>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Add an image/video or Record a video</span>
                </div>
                <div className={grettingVideo !== '' || grettingImage !== '' ? 'wpwax-vm-uploader wpax-vm-has-src' : 'wpwax-vm-uploader'}>
                    <span className="wpwax-vm-btn wpwax-vm-media-btn wpwax-vm-upload-trigger">
                        <a href="#" className="wpwax-vm-media-upload" onClick={e => openUploader(e)}>Add image/video</a>
                        {/* <input type="button" className="wpwax-vm-media-upload" onClick={e => openUploader(e)} value="Add image/video" /> */}
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
                <textarea className="wpwax-vm-form__element" value={grettingMessage} onChange={(e) => changeGreet(e)} />
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Description</span>
                    <label>
                        <Switch
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#6551F2"
                            offColor="#E2E2E2"
                            onHandleColor="#FFFFFF"
                            className="wpwax-vm-switch"
                            handleDiameter={14}
                            height={22}
                            width={40}
                            checked={descriptionVisibility}
                            onChange={changeDescriptionVisibillity}
                        />
                    </label>
                </div>
                <textarea className="wpwax-vm-form__element" value={description} onChange={changeDescription} />
            </div>
            <div className="wpwax-vm-form-group">
                <input type="text" className="wpwax-vm-form__element" value={chatTitle} onChange={changeChatTitle} />
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
                            onColor="#6551F2"
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
                        <span>Screen Recording</span>
                        <Switch
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#6551F2"
                            offColor="#E2E2E2"
                            onHandleColor="#FFFFFF"
                            className="wpwax-vm-switch"
                            handleDiameter={14}
                            height={22}
                            width={40}
                            id="wpwax-vm-reply-s-record"
                            checked={chatReplyType.indexOf('screen_recording') === -1 ? false : true}
                            onChange={handleChatReplyType}
                        />
                    </div>
                    <div className="wpwax-vm-switch-single">
                        <span>Voice</span>
                        <Switch
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#6551F2"
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
                        <span>Text</span>
                        <Switch
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#6551F2"
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
                        onColor="#6551F2"
                        offColor="#E2E2E2"
                        onHandleColor="#FFFFFF"
                        className="wpwax-vm-switch"
                        handleDiameter={14}
                        height={22}
                        width={40}
                        checked={footerVisibility}
                        onChange={changeFooterVisibility}
                    />
                </div>
                <textarea className="wpwax-vm-form__element" value={footerMessage} onChange={(e) => changeFooterMessage(e)} />
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Customize</span>
                    <a href="" className={openCollapse ? "wpwax-vm-btn-collapsable wpwax-vm-open" : "wpwax-vm-btn-collapsable"} onClick={e => toogleCollapse(e)}><span className="dashicons-arrow-down-alt2 dashicons"></span></a>
                </div>
                <div className={openCollapse ? "wpwax-vm-form-group__input-list wpwax-vm-show" : "wpwax-vm-form-group__input-list wpwax-vm-hide"}>
                    <div className="wpwax-vm-form-group__input-single">
                        <span> Font</span>
                        <Select
                            classNamePrefix="wpwax-vm-select"
                            options={fontOptions}
                            closeMenuOnSelect={true}
                            hideSelectedOptions={false}
                            searchable={false}
                            onChange={chagneFont}
                            defaultValue={fontOptions.filter(function (option) {
                                return option.label === font;
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
                            onChange={chagneFontSize}
                            defaultValue={fontSizeOptions.filter(function (option) {
                                return option.label === fontSize;
                            })[0]}
                        />
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Font color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{fontColor}</span>
                            <label htmlFor="wpwax-vm-form-title-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: fontColor }}></label>
                            <input type="color" id="wpwax-vm-form-title-color" className="wpwax-vm-form__element" value={fontColor} onChange={(e) => changeFontColor(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Button color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{buttonColor}</span>
                            <label htmlFor="wpwax-vm-form-button-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: buttonColor }}></label>
                            <input type="color" id="wpwax-vm-form-button-color" className="wpwax-vm-form__element" value={buttonColor} onChange={(e) => changeButtonColor(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Button border-radius</span>
                        <div className="wpwax-vm-form__input-radius">
                            <input type="text" className="wpwax-vm-form__element" value={buttonRadius} onChange={(e) => changeButtonRadius(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </FormSettingsWrap>
    );
}

export default FormSettings;