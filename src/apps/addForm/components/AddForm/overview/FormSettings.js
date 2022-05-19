import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { default as Select } from 'react-select'
import { components } from 'react-select'
import Switch from "react-switch";
import Checkbox from "../../../../../components/Checkbox";
import Radio from "../../../../../components/Radio";
import { onFormEdit } from '../../../redux/form/actionCreator';
import { FormSettingsWrap } from './Style';
export const templateOptions = [
    {value: "chat", label: "Chat"},
    {value: "video", label: "Video"},
    {value: "Issue", label: "Issue"},
]
const FormSettings = ()=>{
    const { formData, formInitialData } = useSelector(state => {
        return {
            formData: state.form.data,
            formInitialData: state.form.data[0],
        };
    });
    // const [state, setState] = useState({
    //     pageVisibility: formInitialData.all_page_visibility,
    //     accountVisibility: formInitialData.all_page_visibility,
    // });

    const [state, setState] = useState({
        id: formInitialData.form_id,
        grettingMessage: formInitialData.greet_message,
        descriptionVisibility: formInitialData.description_visibility,
        description: formInitialData.description,
        chatTitle: formInitialData.chat_box_title,
        replyTypeVideo: formInitialData.reply_type_video,
        replyTypeScreenRecord: formInitialData.reply_type_screen_record,
        replyTypeVoice: formInitialData.reply_type_voice,
        replyTypeText: formInitialData.reply_type_text,
        footerVisibility: formInitialData.footer_visibility,
        footerMessage: formInitialData.footer_message,
    });
    
    const { id, grettingMessage, descriptionVisibility, description, chatTitle, replyTypeVideo, replyTypeScreenRecord, replyTypeVoice, replyTypeText, footerVisibility, footerMessage } = state;
    const dispatch = useDispatch();
    const updateForm = (label,value)=>{
        let updatedData = formData.map(item => {
            if(item.form_id === id){
                switch(label) {
                    case "greet":
                        item.greet_message = value;
                      break;
                    case "des-visibility":
                        item.description_visibility = value;
                      break;
                    case "description":
                        item.thank_page_description = value;
                      break;
                    case "chat-title":
                        item.chat_box_title = value;
                      break;
                    case "video-visibility":
                        item.reply_type_video = value;
                      break;
                    case "screen-record-visibility":
                        item.reply_type_screen_record = value;
                      break;
                    case "voice-visibility":
                        item.reply_type_voice = value;
                      break;
                    case "replyText-visibility":
                        item.reply_type_text = value;
                      break;
                    case "footer-visibility":
                        item.footer_visibility = value;
                      break;
                    case "footer-text":
                        item.footer_message = value;
                      break;
                    case "button-text-color":
                        item.thank_page_button_text_color = value;
                      break;
                    case "button-radius":
                        item.thank_page_button_radius = value;
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


    const changePageVisibility = () =>{
        setState({
            ...state,
            descriptionVisibility: !descriptionVisibility,
        });
    }
    const changeAccountVisibility = () =>{
        setState({
            ...state,
            descriptionVisibility: !descriptionVisibility,
        });
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
                <textarea className="wpwax-vm-form__element" value={description}/>
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
                </div>
                <div className="wpwax-vm-form-group__input-list">
                    
                    <div className="wpwax-vm-form-group__input-single">
                        <span> Font</span>
                        <Select 
                            options={templateOptions}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            searchable={false}
                            // onChange={chagneTitleFontSize}
                        />
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span> Font Size</span>
                        <Select 
                            options={templateOptions}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            searchable={false}
                            // onChange={chagneTitleFontSize}
                        />
                    </div>
                    
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Button color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{}</span>
                            <label htmlFor="wpwax-vm-form-button-color" className="wpwax-vm-form__color-ball"></label>
                            <input type="color" id="wpwax-vm-form-button-color" className="wpwax-vm-form__element" />
                        </div>
                    </div>
                </div>
            </div>
        </FormSettingsWrap>
    )
}

export default FormSettings;