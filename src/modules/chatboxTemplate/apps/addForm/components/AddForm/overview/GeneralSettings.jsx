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
    const { formInitialData, pageBackground, fontColor, fontFamily, fontSize, diplayAllPage, templateName, templateTheme, displayedCustomPages, chatVisibilityType } = useSelector(state => {
        return {
            formInitialData: state.form.data,
            pageBackground: state.form.data[0].options.page_background_color,
            fontColor: state.form.data[0].options.font_family,
            fontFamily: state.form.data[0].options.font_color,
            fontSize: state.form.data[0].options.font_size,
            diplayAllPage: state.form.data[0].options.display_on_all_pages ? state.form.data[0].options.display_on_all_pages : false,
            templateName: state.form.data[0].name,
            templateTheme: state.form.data[0].options.theme,
            displayedCustomPages: state.form.data[0].page_ids,
            chatVisibilityType: state.form.data[0].options.chat_visibility_type,

        };
    });

    const [state, setState] = useState({
        openCollapse: true
    });

    /* Destructuring State */
    const { openCollapse } = state;

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



    // const updateForm = (label, value) => {
    //     let updatedData = formInitialData.map(item => {
    //         switch (label) {
    //             case "name":
    //                 return { ...item, name: value };
    //             case "theme":
    //                 return {
    //                     ...item,
    //                     options: {
    //                         ...item.options,
    //                         theme: value
    //                     }
    //                 }
    //             case "display-page":
    //                 return {
    //                     ...item,
    //                     options: {
    //                         ...item.options,
    //                         display_on_all_pages: value
    //                     }
    //                 }
    //             case "page-id":
    //                 return { ...item, page_ids: value }
    //             case "chat-visibility":
    //                 return {
    //                     ...item,
    //                     options: {
    //                         ...item.options,
    //                         chat_visibility_type: value
    //                     }
    //                 }
    //             default:
    //             // code block
    //         }
    //     });
    //     console.log(updatedData)
    //     dispatch(handleDynamicEdit(updatedData));
    // }

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

    const handleChangeFormValue = (e) => {
        const updatedData = formUpdater(e.target.id, e.target.value, formInitialData);
        dispatch(handleDynamicEdit(updatedData));
    }

    const handleChangeSelectValue = (selectEvent, e) => {
        const updatedData = formUpdater(e.name, selectEvent.value, formInitialData);
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

    console.log(formInitialData[0]);

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
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Customize</span>
                    <a href="" className={openCollapse ? "wpwax-vm-btn-collapsable wpwax-vm-open" : "wpwax-vm-btn-collapsable"} onClick={e => toogleCollapse(e)}><span className="dashicons-arrow-down-alt2 dashicons"></span></a>
                </div>
                <div className={openCollapse ? "wpwax-vm-form-group__input-list wpwax-vm-show" : "wpwax-vm-form-group__input-list wpwax-vm-hide"}>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Page Background Color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{pageBackground}</span>
                            <label htmlFor="wpwax-vm-form-bg-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: pageBackground }}></label>
                            <input type="color" id="wpwax-vm-form-bg-color" className="wpwax-vm-form__element" value={pageBackground} onChange={(e) => handleChangeFormValue(e)} />
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
                            name="wpwax-vm-font-family"
                            onChange={handleChangeSelectValue}
                            defaultValue={fontOptions.filter(function (option) {
                                console.log(fontFamily);
                                return option.label === fontFamily;
                            })[0]}
                        />
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Font Size</span>
                        <Select
                            classNamePrefix="wpwax-vm-select"
                            options={fontSizeOptions}
                            closeMenuOnSelect={true}
                            hideSelectedOptions={false}
                            searchable={false}
                            name="wpwax-vm-font-size"
                            onChange={handleChangeSelectValue}
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
                            <input type="color" id="wpwax-vm-form-title-color" className="wpwax-vm-form__element" value={fontColor} onChange={(e) => handleChangeFormValue(e)} />
                        </div>
                    </div>
                    {/* <div className="wpwax-vm-form-group__input-single">
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
                    </div> */}
                </div>
            </div>
        </GeneralSettingWrap>
    )
}

export default GeneralSettings;