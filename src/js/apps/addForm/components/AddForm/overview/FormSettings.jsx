import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { default as Select } from 'react-select';
import Switch from "react-switch";
import { onFormEdit } from '../../../redux/form/actionCreator';
import { FormSettingsWrap } from './Style';
export const fontSizeOptions = [
    {value: "roboto", label: "Roboto"},
    {value: "inter", label: "Inter"},
    {value: "legend", label: "Legend"},
]
export const formType = [
    {value: "theme-1", label: "Theme 1"},
    {value: "theme-2", label: "Theme 2"}
]
export const fontOptions = [
    {value: "large", label: "large"},
    {value: "larger", label: "larger"},
    {value: "x-large", label: "x-large"},
    {value: "xx-large", label: "xx-large"},
    {value: "medium", label: "medium"},
    {value: "small", label: "small"},
    {value: "smaller", label: "smaller"},
    {value: "x-small", label: "x-small"},
]
const FormSettings = ()=>{
    const { formData, formInitialData } = useSelector(state => {
        return {
            formData: state.form.data,
            formInitialData: state.form.data[0],
        };
    });

    const [state, setState] = useState({
        id: formInitialData.form_id,
        formStyle: formInitialData.formStyle,
        grettingMessage: formInitialData.greet_message,
        descriptionVisibility: formInitialData.description_visibility,
        description: formInitialData.description,
        chatTitle: formInitialData.chat_box_title,
        replyTypeVideo: formInitialData.reply_type_video,
        replyTypeScreenRecord: formInitialData.reply_type_screen_record,
        replyTypeVoice: formInitialData.reply_type_voice,
        replyTypeText: formInitialData.reply_type_text,
        titleColor: formInitialData.font_color,
        buttonColor: formInitialData.button_color,
        buttonRadius: formInitialData.button_border_radius,
        footerVisibility: formInitialData.footer_visibility,
        footerMessage: formInitialData.footer_message,
        openCollapse: true,
    });
    
    const { id, formStyle, grettingMessage, descriptionVisibility, description, chatTitle, replyTypeVideo, replyTypeScreenRecord, replyTypeVoice, replyTypeText, titleColor, buttonColor, buttonRadius, footerVisibility, footerMessage, openCollapse } = state;

    const dispatch = useDispatch();
    const updateForm = (label,value)=>{
        let updatedData = formData.map(item => {
            if(item.form_id === id){
                switch(label) {
                    case "greet":
                        item.greet_message = value;
                        return { ...item, greet_message: value};
                      break;
                    case "des-visibility":
                        item.description_visibility = value;
                        return { ...item, description_visibility: value};
                      break;
                    case "description":
                        item.description = value;
                        return { ...item, description: value};
                      break;
                    case "chat-title":
                        item.chat_box_title = value;
                        return { ...item, chat_box_title: value};
                      break;
                    case "video-visibility":
                        item.reply_type_video = value;
                        return { ...item, reply_type_video: value};
                      break;
                    case "screen-record-visibility":
                        item.reply_type_screen_record = value;
                        return { ...item, reply_type_screen_record: value};
                      break;
                    case "voice-visibility":
                        item.reply_type_voice = value;
                        return { ...item, reply_type_voice: value};
                      break;
                    case "replyText-visibility":
                        item.reply_type_text = value;
                        return { ...item, reply_type_text: value};
                      break;
                    case "title-color":
                        item.font_color = value;
                        return { ...item, font_color: value};
                      break;
                    case "button-color":
                        item.button_color = value;
                        return { ...item, button_color: value};
                      break;
                    case "button-radius":
                        item.button_border_radius = value;
                        return { ...item, button_border_radius: value};
                      break;
                    case "footer-visibility":
                        item.footer_visibility = value;
                        return { ...item, footer_visibility: value};
                    break;
                    case "footer-text":
                        item.footer_message = value;
                        return { ...item, footer_message: value};
                    break;
                    case "form-style":
                        item.formStyle = value;
                        return { ...item, formStyle: value};
                    break;
                    default:
                      // code block
                }
                return item;
            }
            return item;
        });
        dispatch(onFormEdit(updatedData));
    }
    const changeGreet = (event) =>{
        let greetMessage = event.target.value;
        setState({
            ...state,
            grettingMessage: greetMessage
        });
        updateForm('greet', greetMessage);
    }
    const changeDescriptionVisibillity = () =>{
        setState({
            ...state,
            descriptionVisibility: !descriptionVisibility
        });
        updateForm('des-visibility', !descriptionVisibility);
    }
    const changeDescription = (event) =>{
        let description = event.target.value;
        setState({
            ...state,
            description: description
        });
        updateForm('description', description);
    }
    const changeChatTitle = (event) =>{
        let chatTitleText = event.target.value;
        setState({
            ...state,
            chatTitle: chatTitleText
        });
        updateForm('chat-title', chatTitleText);
    }
    const changeVideoVisibility = () =>{
        setState({
            ...state,
            replyTypeVideo: !replyTypeVideo
        });
        updateForm('video-visibility', !replyTypeVideo);
    }
    const changeScreenRecordVisibility = () =>{
        setState({
            ...state,
            replyTypeScreenRecord: !replyTypeScreenRecord
        });
        updateForm('screen-record-visibility', !replyTypeScreenRecord);
    }
    const changeVoiceVisibility = () =>{
        setState({
            ...state,
            replyTypeVoice: !replyTypeVoice
        });
        updateForm('voice-visibility', !replyTypeVoice);
    }
    const changeReplyTextVisibility = () =>{
        setState({
            ...state,
            replyTypeText: !replyTypeText
        });
        updateForm('replyText-visibility', !replyTypeText);
    }
    const changeFooterVisibility = () =>{
        setState({
            ...state,
            footerVisibility: !footerVisibility
        });
        updateForm('footer-visibility', !footerVisibility);
    }
    const changeFooterMessage = (event) =>{
        let footerMessageText = event.target.value;
        console.log(footerMessage);
        setState({
            ...state,
            footerMessage: footerMessageText
        });
        updateForm('footer-text', footerMessageText);
    }
    const changeTitleColor = (event) =>{
        let titleColor = event.target.value;
        setState({
            ...state,
            titleColor: titleColor
        });
        updateForm('title-color', titleColor);
    }
    const changeButtonColor = (event) =>{
        let buttonColor = event.target.value;
        setState({
            ...state,
            buttonColor: buttonColor
        });
        updateForm('button-color', buttonColor);
    }
    const changeButtonRadius = (event) =>{
        let buttonRadius = event.target.value;
        setState({
            ...state,
            buttonRadius: buttonRadius
        });
        updateForm('button-radius', buttonRadius);
    }

    const toogleCollapse = (e)=>{
        e.preventDefault();
        setState({
            ...state,
            openCollapse: !openCollapse
        });
    }

    const chagneFormStyle = event =>{
        let formStyle = event.value;
        // console.log(formStyle);
        setState({
            ...state,
            formStyle: formStyle
        });
        updateForm('form-style', formStyle);
    }

    return(
        <FormSettingsWrap>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Add an image/video or Record a video</span>
                </div>
                <div className="wpwax-vm-uploader">
                    <span className="wpwax-vm-btn wpwax-vm-media-btn wpwax-vm-upload-trigger">
                        <input type="file" id="wpwax-vm-media-upload"/>
                        <label htmlFor="wpwax-vm-media-upload">Add image/video</label>
                    </span>
                    <span className="wpwax-vm-seperation">or</span>
                    <a href="#" className="wpwax-vm-btn wpwax-vm-media-btn wpwax-vm-media-recorder">Record a video</a>
                </div>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Form Style</span>
                </div>
                <Select 
                    classNamePrefix="wpwax-vm-select"
                    options={formType}
                    closeMenuOnSelect={true}
                    hideSelectedOptions={false}
                    searchable={false}
                    onChange={chagneFormStyle}
                />
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Greetings message </span>
                </div>
                <textarea className="wpwax-vm-form__element" value={grettingMessage} onChange={(e)=>changeGreet(e)}/>
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
                <textarea className="wpwax-vm-form__element" value={description} onChange={changeDescription}/>
            </div>
            <div className="wpwax-vm-form-group">
                <input type="text" className="wpwax-vm-form__element" value={chatTitle} onChange={changeChatTitle}/>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Users can reply in</span>
                </div>
                <div className="wpwax-vm-switch-list">
                    <div className="wpwax-vm-switch-single">
                        <span>Videos</span>
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
                            checked={replyTypeVideo}
                            onChange={changeVideoVisibility}
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
                            checked={replyTypeScreenRecord}
                            onChange={changeScreenRecordVisibility}
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
                            checked={replyTypeVoice}
                            onChange={changeVoiceVisibility}
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
                            checked={replyTypeText}
                            onChange={changeReplyTextVisibility}
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
                <textarea className="wpwax-vm-form__element" value={footerMessage} onChange={(e)=> changeFooterMessage(e)}/>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Customize</span>
                    <a href="" className={openCollapse? "wpwax-vm-btn-collapsable wpwax-vm-open" : "wpwax-vm-btn-collapsable"} onClick={e=>toogleCollapse(e)}><span className="dashicons-arrow-down-alt2 dashicons"></span></a>
                </div>
                <div className={openCollapse? "wpwax-vm-form-group__input-list wpwax-vm-show" : "wpwax-vm-form-group__input-list wpwax-vm-hide"}>
                    <div className="wpwax-vm-form-group__input-single"> 
                        <span> Font</span>
                        <Select 
                            classNamePrefix="wpwax-vm-select"
                            options={fontOptions}
                            closeMenuOnSelect={true}
                            hideSelectedOptions={false}
                            searchable={false}
                            // onChange={chagneTitleFontSize}
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
                            // onChange={chagneTitleFontSize}
                        />
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Font color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{titleColor}</span>
                            <label htmlFor="wpwax-vm-form-title-color" className="wpwax-vm-form__color-ball" style={{backgroundColor: titleColor}}></label>
                            <input type="color" id="wpwax-vm-form-title-color" className="wpwax-vm-form__element" value={titleColor} onChange={(e)=>changeTitleColor(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Button color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{buttonColor}</span>
                            <label htmlFor="wpwax-vm-form-button-color" className="wpwax-vm-form__color-ball" style={{backgroundColor: buttonColor}}></label>
                            <input type="color" id="wpwax-vm-form-button-color" className="wpwax-vm-form__element" value={buttonColor} onChange={(e)=>changeButtonColor(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Button border-radius</span>
                        <div className="wpwax-vm-form__input-radius">
                            <input type="text" className="wpwax-vm-form__element" value={buttonRadius} onChange={(e)=>changeButtonRadius(e)}/>
                        </div>
                    </div>
                </div>
            </div>
        </FormSettingsWrap>
    )
}

export default FormSettings;