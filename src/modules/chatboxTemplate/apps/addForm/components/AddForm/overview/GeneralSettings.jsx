import Checkbox from "Components/formFields/Checkbox.jsx";
import Radio from "Components/formFields/Radio.jsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { components, default as Select } from 'react-select';
import { ReactSVG } from 'react-svg';
import Switch from "react-switch";
import formUpdater from "../../../../../../../lib/components/FormUpdater";
import { handleDynamicEdit } from '../../../redux/form/actionCreator';
import { GeneralSettingWrap } from './Style';

import questionIcon from 'Assets/svg/icons/question-circle.svg';

export const templateOptions = [
    { value: "theme-1", label: "Theme One" },
    { value: "theme-2", label: "Theme Two" },
]

export const fontOptions = [
    { value: "roboto", label: "Roboto" },
    { value: "inter", label: "Inter" },
    { value: "legend", label: "Legend" },
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

const GeneralSettings = () => {
    /* initialize Form Data */
    const { formData, primaryColor, diplayAllPage, templateName, templateTheme, displayedCustomPages, chatVisibilityType, sendMail } = useSelector(state => {
        return {
            formData: state.form.data,
            pageBackground: state.form.data[0].options.page_background_color,
            fontColor: state.form.data[0].options.font_family,
            primaryColor: state.form.data[0].options.primary_color,
            fontFamily: state.form.data[0].options.font_color,
            fontSize: state.form.data[0].options.font_size,
            diplayAllPage: state.form.data[0].options.display_on_all_pages,
            templateName: state.form.data[0].name,
            templateTheme: state.form.data[0].options.theme,
            displayedCustomPages: state.form.data[0].pages.split(","),
            chatVisibilityType: state.form.data[0].options.chat_visibility_type,
            sendMail: state.form.data[0].options.send_mail_upon_message_submission,
        };
    });

    const [state, setState] = useState({
        openCollapse: true,
    });

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    const Option = (props) => {
        return (
            <div>
                <components.Option {...props}>
                    <Checkbox id={`wpwax-vm${props.value}`} label={props.label} isSelected={props.isSelected} />
                </components.Option>
            </div>
        );
    };

    const customPages = [];
    wpWaxCustomerSupportApp_CoreScriptData.wp_pages.map((item, index) => {
        customPages.push({ value: `${item.id}`, label: `${item.title}` })
    });

    /* To Handle Template Change */
    const handleChatVisibility = (e) => {
        let visiblityType = e.target.value;
        const updatedData = formUpdater('chat-visibility', visiblityType, formData);
        dispatch(handleDynamicEdit(updatedData));
    };

    const handleChangeInputValue = (e) => {
        const updatedData = formUpdater(e.target.id, e.target.value, formData);
        dispatch(handleDynamicEdit(updatedData));
    }

    const handleChangeSwitchValue = (value, event, id) => {
        const updatedData = formUpdater(id, value, formData);
        dispatch(handleDynamicEdit(updatedData));
    }

    const handleChangeSelectValue = (selectEvent, e) => {
        let customPageIds = "";
        let updatedData = "";
        if(e.name === "wpwax-vm-display-custom-pages"){
            let newPageIdsArray = [];
            selectEvent.map(item=>{
                newPageIdsArray.push(item.value);
            });
            customPageIds = newPageIdsArray.join(',');
            updatedData = formUpdater(e.name, customPageIds, formData);
        }else{
            updatedData = formUpdater(e.name, selectEvent.value, formData);
        }
        dispatch(handleDynamicEdit(updatedData));
    };

    function getSelectedPageDefault() {
        let newArray = []
        if(displayedCustomPages.length !==0){
            displayedCustomPages.map(previousSelected=>{
                const filteredPage = customPages.filter(item => item.value === previousSelected);
                newArray.push(filteredPage[0]);
            })
        }
        return newArray;
    }

    return (
        <GeneralSettingWrap>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Name of Form <span className="wpwax-vm-require-sign">*</span></span>
                </div>
                <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-form-name" value={templateName} placeholder="Name this video form…" onChange={e => handleChangeInputValue(e)} />
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label wpwax-vm-has-tooltip">
                    <span className="wpwax-vm-tooltip-wrap">
                        <span>Theme </span>
                        <span className="wpwax-vm-tooltip">
                            <span className="wpwax-vm-tooltip-icon"><ReactSVG src={questionIcon} /></span>
                            <span className="wpwax-vm-tooltip-text">Tooltip Text will be here</span>
                        </span>
                    </span>
                </div>
                <Select
                    classNamePrefix="wpwax-vm-select"
                    options={templateOptions}
                    hideSelectedOptions={false}
                    searchable={false}
                    name="wpwax-vm-theme"
                    onChange={handleChangeSelectValue}
                    defaultValue={templateOptions.filter(function (option) {
                        return option.value === templateTheme;
                    })[0]}
                    allowSelectAll={true}
                />
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label wpwax-vm-mb-0">
                    <span className="wpwax-vm-tooltip-wrap">
                        <span>Display on all pages</span>
                        <span className="wpwax-vm-tooltip">
                            <span className="wpwax-vm-tooltip-icon"><ReactSVG src={questionIcon} /></span>
                            <span className="wpwax-vm-tooltip-text">Tooltip Text will be here</span>
                        </span>
                    </span>
                    <label>
                        <Switch
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#6551f2"
                            offColor="#E2E2E2"
                            onHandleColor="#FFFFFF"
                            className="wpwax-vm-switch"
                            id="wpwax-vm-display-all-pages"
                            handleDiameter={14}
                            height={22}
                            width={40}
                            checked={diplayAllPage}
                            onChange={handleChangeSwitchValue}
                        />
                    </label>
                </div>
            </div>
            {
                diplayAllPage ? null :
                <div className="wpwax-vm-form-group">
                    <div className="wpwax-vm-form-group__label">
                        <span className="wpwax-vm-tooltip-wrap">
                            <span>Display on custom pages</span>
                            <span className="wpwax-vm-tooltip">
                                <span className="wpwax-vm-tooltip-icon"><ReactSVG src={questionIcon} /></span>
                                <span className="wpwax-vm-tooltip-text">Tooltip Text will be here</span>
                            </span>
                        </span>
                    </div>
                    <Select
                        classNamePrefix="wpwax-vm-select"
                        options={customPages}
                        isMulti
                        searchable={false}
                        components={{
                            Option
                        }}
                        defaultValue={getSelectedPageDefault()}
                        name="wpwax-vm-display-custom-pages"
                        onChange={handleChangeSelectValue}
                        allowSelectAll={true}
                    />
                </div>
            }
            
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Close chat option</span>
                </div>
                <div className="wpwax-vm-radio-list">
                    <div className="wpwax-vm-radio-single">
                        <span>If closed never show again</span>
                        <Radio id="wpwax-vm-never-show" label="" value="never_load" name="wpwax-vm-close-option" onChange={e => handleChatVisibility(e)} checked={chatVisibilityType === "never_load"} />
                    </div>
                    <div className="wpwax-vm-radio-single">
                        <span>Show on reload</span>
                        <Radio id="wpwax-vm-load-show" label="" value="show_on_reload" name="wpwax-vm-close-option" onChange={e => handleChatVisibility(e)} checked={chatVisibilityType === "show_on_reload"} />
                    </div>
                </div>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label wpwax-vm-mb-0">
                    <span>Receive email upon message submission</span>
                    <label>
                        <Switch
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#6551f2"
                            offColor="#E2E2E2"
                            onHandleColor="#FFFFFF"
                            className="wpwax-vm-switch"
                            id="wpwax-vm-send-mail"
                            value={state.selectedCustomPages}
                            handleDiameter={14}
                            height={22}
                            width={40}
                            checked={sendMail}
                            onChange={handleChangeSwitchValue}
                        />
                    </label>
                </div>
            </div>
        </GeneralSettingWrap>
    )
}

export default GeneralSettings;