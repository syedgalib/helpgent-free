import Checkbox from "Components/formFields/Checkbox.jsx";
import Radio from "Components/formFields/Radio.jsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { components, default as Select } from 'react-select';
import { ReactSVG } from 'react-svg';
import Switch from "react-switch";
import { handleDynamicEdit, updateDataWithId } from '../../../redux/form/actionCreator';
import { GeneralSettingWrap } from './Style';

import questionIcon from 'Assets/svg/icons/question-circle.svg';

export const templateOptions = [
    { value: "theme-1", label: "Theme One" },
    { value: "theme-2", label: "Theme Two" },
]

const GeneralSettings = () => {
    /* initialize Form Data */
    const { formInitialData, diplayAllPage, templateName, templateTheme, displayedCustomPages, chatVisibilityType } = useSelector(state => {
        return {
            formInitialData: state.form.data,
            diplayAllPage: state.form.data[0].options.display_on_all_pages,
            templateName: state.form.data[0].name,
            templateTheme: state.form.data[0].options.theme,
            displayedCustomPages: state.form.data[0].page_ids,
            chatVisibilityType: state.form.data[0].options.chat_visibility_type,

        };
    });

    templateOptions.filter(function (option) {
        return option.value === templateTheme;
    })[0]

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

    const customPages = []

    useEffect(() => {
        wpWaxCustomerSupportApp_CoreScriptData.wp_pages.map((item, index) => {
            customPages.push({ value: `${item.id}`, label: `${item.title}` })
        });
    }, []);



    const updateForm = (label, value) => {
        let updatedData = formInitialData.map(item => {
            switch (label) {
                case "name":
                    return { ...item, name: value };
                case "theme":
                    return {
                        ...item,
                        options: {
                            ...item.option,
                            theme: value
                        }
                    }
                case "display-page":
                    return {
                        ...item,
                        options: {
                            ...item.option,
                            display_on_all_pages: value
                        }
                    }
                case "page-id":
                    return { ...item, page_ids: value }
                case "chat-visibility":
                    return {
                        ...item,
                        options: {
                            ...item.option,
                            chat_visibility_type: value
                        }
                    }
                default:
                // code block
            }
        });
        console.log(updatedData)
        dispatch(handleDynamicEdit(updatedData));
    }

    /* To Handle Template Change */
    const handleThemeChange = (selectedTheme) => {
        let templateTheme = selectedTheme.value;
        updateForm('theme', templateTheme);
    };

    /* To Handle Template Change */
    const handleNameChange = (event) => {
        let formName = event.target.value;
        updateForm('name', formName);
    };

    /* To Handle Template Change */
    const handleDisplayPages = () => {
        updateForm('display-page', !diplayAllPage);
    };

    /* To Handle Template Change */
    const handleCustomPages = (selectedPages) => {
        let PageIds = [];
        selectedPages.map(item => {
            PageIds.push(item.value);
        });

        let pageIdString = PageIds.join();

        updateForm('page-id', pageIdString);
    };

    /* To Handle Template Change */
    const handleChatVisibility = (e) => {
        let visiblityType = e.target.value;
        updateForm('chat-visibility', visiblityType);
    };

    console.log(chatVisibilityType)

    return (
        <GeneralSettingWrap>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Name of Form <span className="wpwax-vm-require-sign">*</span></span>
                </div>
                <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-form-name" value={templateName} placeholder="Name this video form…" onChange={e => handleNameChange(e)} />
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
                    onChange={handleThemeChange}
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
                            onColor="#6551F2"
                            offColor="#E2E2E2"
                            onHandleColor="#FFFFFF"
                            className="wpwax-vm-switch"
                            handleDiameter={14}
                            height={22}
                            width={40}
                            checked={diplayAllPage ? diplayAllPage : false}
                            onChange={handleDisplayPages}
                        />
                    </label>
                </div>
            </div>
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
                    // defaultValue={[displayedCustomPages.filter(function (page) {

                    // })]}
                    onChange={handleCustomPages}
                    allowSelectAll={true}
                />
            </div>
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
        </GeneralSettingWrap>
    )
}

export default GeneralSettings;