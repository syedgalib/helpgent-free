import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { default as Select } from 'react-select'
import { components } from 'react-select'
import { ReactSVG } from 'react-svg';
import Switch from "react-switch";
import Checkbox from "../../../../../components/Checkbox";
import Radio from "../../../../../components/Radio";
import { GeneralSettingWrap } from './Style';

import questionIcon from '../../../../../../assets/svg/icons/question-circle.svg';

export const templateOptions = [
    {value: "page1", label: "Page Name"},
    {value: "page2", label: "Page Name"},
    {value: "page3", label: "Page Name"},
]

export const customPages = [
    {value: "chat", label: "Chat"},
    {value: "video", label: "Video"},
    {value: "Issue", label: "Issue"},
]
const GeneralSettings = ()=>{
    /* initialize Form Data */
    const { formInitialData } = useSelector(state => {
        return {
            formInitialData: state.form.data,
        };
    });

    const [state, setState] = useState({
        pageVisibility: formInitialData[0].all_page_visibility,
        accountVisibility: formInitialData[0].all_page_visibility,
        optionSelected: null
    });

    const { pageVisibility, accountVisibility, optionSelected } = state;
    const Option = (props) => {
        return (
          <div>
            <components.Option {...props}>
              <Checkbox id={`wpwax-vm${props.value}`} label={props.label} isSelected={props.isSelected}/>
            </components.Option>
          </div>
        );
    };

    /* To Handle Page visibility Option */
    const changePageVisibility = () =>{
        setState({
            ...state,
            pageVisibility: !pageVisibility,
        });
    }

    /* To Handle Account visibility Option */
    const changeAccountVisibility = () =>{
        setState({
            ...state,
            accountVisibility: !accountVisibility,
        });
    }

    /* To Handle Template Change */
    const handleSelectChange = (selected) => {
        setState({
            ...state,
            optionSelected: selected
        });
    };

    return(
        <GeneralSettingWrap>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Name of Form</span>
                </div>
                <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-form-name" placeholder="Name this video form…"/>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label wpwax-vm-has-tooltip">
                    <span className="wpwax-vm-tooltip-wrap"> 
                       <span>Template </span>
                       <span className="wpwax-vm-tooltip">
                            <span className="wpwax-vm-tooltip-icon"><ReactSVG src={ questionIcon } /></span>
                            <span className="wpwax-vm-tooltip-text">Tooltip Text will be here</span>
                        </span>
                    </span>
                </div>
                <Select
                    classNamePrefix="wpwax-vm-select"
                    isMulti
                    options={templateOptions}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    searchable={false}
                    onChange={handleSelectChange}
                    menuIsOpen={true}
                    allowSelectAll={true}
                    value={optionSelected}
                    components={{
                        Option
                    }}
                />
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span className="wpwax-vm-tooltip-wrap">
                        <span>Display on all pages</span> 
                        <span className="wpwax-vm-tooltip">
                            <span className="wpwax-vm-tooltip-icon"><ReactSVG src={ questionIcon } /></span>
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
                            checked={pageVisibility}
                            onChange={changePageVisibility}
                        />
                    </label>
                </div>
                <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-form-name"/>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span className="wpwax-vm-tooltip-wrap"> 
                        <span>Display on custom pages</span>
                       <span className="wpwax-vm-tooltip">
                            <span className="wpwax-vm-tooltip-icon"><ReactSVG src={ questionIcon } /></span>
                            <span className="wpwax-vm-tooltip-text">Tooltip Text will be here</span>
                        </span>
                    </span>
                </div>
                <Select 
                    classNamePrefix="wpwax-vm-select"
                    options={templateOptions} 
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    searchable={false}
                    components={{
                        Option
                    }}
                    onChange={handleSelectChange}
                    value={optionSelected}
                    allowSelectAll={true}
                />
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Create account first</span>
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
                        checked={accountVisibility}
                        onChange={changeAccountVisibility}
                    />
                </div>
                <div className="wpwax-vm-chekbox-list">
                    <div className="wpwax-vm-chekbox-single">
                        <span>Name</span>
                        <Checkbox id="account-name" label=""/>
                    </div>
                    <div className="wpwax-vm-chekbox-single">
                        <span>Email</span>
                        <Checkbox id="account-email" label=""/>
                    </div>
                    <div className="wpwax-vm-chekbox-single">
                        <span>Password</span>
                        <Checkbox id="account-password" label=""/>
                    </div>
                </div>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Close chat option</span>
                </div>
                <div className="wpwax-vm-radio-list">
                    <div className="wpwax-vm-radio-single">
                        <span>If closed never show again</span>
                        <Radio id="wpwax-vm-never-show" label="" name="wpwax-vm-close-option"/>
                    </div>
                    <div className="wpwax-vm-radio-single">
                        <span>Show on reload</span>
                        <Radio id="wpwax-vm-load-show" label="" name="wpwax-vm-close-option"/>
                    </div>
                </div>
            </div>
        </GeneralSettingWrap>
    )
}

export default GeneralSettings;