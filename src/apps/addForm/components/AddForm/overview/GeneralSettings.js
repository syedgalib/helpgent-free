import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { default as Select } from 'react-select'
import { components } from 'react-select'
import Switch from "react-switch";
import Checkbox from "../../../../../components/Checkbox";
import Radio from "../../../../../components/Radio";
import { GeneralSettingWrap } from './Style';

export const templateOptions = [
    {value: "chat", label: "Chat"},
    {value: "video", label: "Video"},
    {value: "Issue", label: "Issue"},
]
const GeneralSettings = ()=>{
    const { formInitialData } = useSelector(state => {
        return {
            formInitialData: state.form.data,
        };
    });
    const [state, setState] = useState({
        pageVisibility: formInitialData.all_page_visibility,
        accountVisibility: formInitialData.all_page_visibility,
    });
    const { pageVisibility, accountVisibility } = state;
    const Option = (props) => {
        return (
          <div>
            <components.Option {...props}>
              <Checkbox id={`wpwax-vm${props.label}`} label={props.label}/>
            </components.Option>
          </div>
        );
    };
    const changePageVisibility = () =>{
        setState({
            ...state,
            pageVisibility: !pageVisibility,
        });
    }
    const changeAccountVisibility = () =>{
        setState({
            ...state,
            accountVisibility: !accountVisibility,
        });
    }
    return(
        <GeneralSettingWrap>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Name of Form</span>
                </div>
                <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-form-name"/>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Template <span className="wpwax-vm-tooltip"><i className="dashicons"></i></span></span>
                </div>
                <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-form-name"/>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Display on all pages</span>
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
                    <span>Display on custom pages</span>
                </div>
                <Select 
                    className='my-class'
                    options={templateOptions} 
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    searchable={false}
                    components={{
                        Option
                    }}
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