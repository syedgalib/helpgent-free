import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { default as Select } from 'react-select'
import { components } from 'react-select'
import { ReactSVG } from 'react-svg';
import Switch from "react-switch";
import Checkbox from "Components/formFields/Checkbox.jsx";
import Radio from "Components/formFields/Radio.jsx";
import { onFormEdit } from '../../../redux/form/actionCreator';
import { GeneralSettingWrap } from './Style';

import questionIcon from 'Assets/svg/icons/question-circle.svg';

export const templateOptions = [
    { value: "theme-1", label: "Theme One" },
    { value: "theme-2", label: "Theme Two" },
]

export const customPages = [
    { value: "0", label: "Sample Pages" },
    { value: "2", label: "Privacy Polices" },
]
const GeneralSettings = () => {
    /* initialize Form Data */
    const { formInitialData } = useSelector(state => {
        return {
            formInitialData: state.form.data,
        };
    });

    /* Initialize State Data */
    const [state, setState] = useState({
        diplayAllPage: formInitialData[0].option.display_on_all_pages,
        displayedCustomPages: formInitialData[0].page_ids,
        chatVisibilityType: formInitialData[0].option.chat_visibility_type,
    });

    const { diplayAllPage, displayedCustomPages, chatVisibilityType } = state;

    const Option = (props) => {
        return (
            <div>
                <components.Option {...props}>
                    <Checkbox id={`wpwax-vm${props.value}`} label={props.label} isSelected={props.isSelected} />
                </components.Option>
            </div>
        );
    };

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    const updateForm = (label, value) => {
        let updatedData = formInitialData.map(item => {
            switch (label) {
                case "name":
                    return { ...item, name: value };
                    break;
                case "theme":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            theme: value
                        }
                    }
                    break;
                case "display-page":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            display_on_all_pages: value
                        }
                    }
                    break;
                case "page-id":
                    return { ...item, page_ids: value }
                    break;
                case "close-chat":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            chat_visibility_type: value
                        }
                    }
                    break;
                default:
                // code block
            }
        });
        dispatch(onFormEdit(updatedData));
    }

    /* To Handle Template Change */
    const handleThemeChange = (selectedTheme) => {
        let templateTheme = selectedTheme.value;
        setState({
            ...state,
            optionSelected: selectedTheme
        });
        updateForm('theme', templateTheme);
    };

    /* To Handle Template Change */
    const handleNameChange = (event) => {
        let formName = event.target.value;
        setState({
            ...state,
            name: formName
        });
        updateForm('name', formName);
    };

    /* To Handle Template Change */
    const handleDisplayPages = () => {
        setState({
            ...state,
            diplayAllPage: !diplayAllPage
        });
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
    const handleClosignChat = (e) => {
        let closeOption = e.target.value;
        updateForm('close-chat', closeOption);

    };

    return (
        <GeneralSettingWrap>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Name of Form</span>
                </div>
                <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-form-name" placeholder="Name this video form…" onChange={e => handleNameChange(e)} />
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
                    // menuIsOpen={true}
                    allowSelectAll={true}
                    value={displayedCustomPages}
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
                            checked={diplayAllPage}
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
                        <Radio id="wpwax-vm-never-show" label="" value="never_load" name="wpwax-vm-close-option" onChange={e => handleClosignChat(e)} checked={chatVisibilityType === "never_load"} />
                    </div>
                    <div className="wpwax-vm-radio-single">
                        <span>Show on reload</span>
                        <Radio id="wpwax-vm-load-show" label="" value="show_on_reload" name="wpwax-vm-close-option" onChange={e => handleClosignChat(e)} checked={chatVisibilityType === "show_on_reload"} />
                    </div>
                </div>
            </div>
        </GeneralSettingWrap>
    )
}

export default GeneralSettings;