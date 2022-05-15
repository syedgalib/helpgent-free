import React, { useState, useEffect, useRef } from "react";
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
    const Option = (props) => {
        return (
          <div>
            <components.Option {...props}>
              <input
                type="checkbox"
                checked={props.isSelected}
                onChange={() => null}
              />
              <label>{props.label}</label>
            </components.Option>
          </div>
        );
      };
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
                        <span>Switch with default style</span>
                        <Switch />
                    </label>
                </div>
                <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-form-name"/>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Display on custom pages</span>
                </div>
                <Select 
                options={templateOptions} 
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                    Option
                }}
                allowSelectAll={true}
                />
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Create account first</span>
                    <Switch  />
                </div>
                <div className="wpwax-vm-chekbox-list">
                    <Checkbox id="account-name" label="Name"/>
                    <Checkbox id="account-email" label="Email"/>
                    <Checkbox id="account-password" label="Password"/>
                </div>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Close chat option</span>
                    <Switch  />
                </div>
                <div className="wpwax-vm-chekbox-list">
                    <Radio id="wpwax-vm-never-show" label="If closed never show again" name="wpwax-vm-close-option"/>
                    <Radio id="wpwax-vm-load-show" label="Show on reload" name="wpwax-vm-close-option"/>
                </div>
            </div>
        </GeneralSettingWrap>
    )
}

export default GeneralSettings;