import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { default as Select } from 'react-select'
import { components } from 'react-select'
import Switch from "react-switch";
import Checkbox from "../../../../../components/Checkbox";
import Radio from "../../../../../components/Radio";
import { ThankSettingsWrap } from './Style';
export const templateOptions = [
    {value: "light", label: "Light"},
    {value: "medium", label: "Medium"},
    {value: "semi-bold", label: "Semi-bold"},
    {value: "bold", label: "Bold"},
    {value: "black", label: "Black"},
]
const ThankSettings = ()=>{
    const { formInitialData } = useSelector(state => {
        return {
            formInitialData: state.form.data,
        };
    });
    const [state, setState] = useState({
        collectInfoVisibility: formInitialData.info_collection_visibility,
        pageVisibility: formInitialData.all_page_visibility,
        accountVisibility: formInitialData.all_page_visibility,
        title: formInitialData.thank_page_title,
        descriptionVisibility: formInitialData.thank_page_description_Visibility,
        description: formInitialData.thank_page_description,
        buttonVisibility: formInitialData.thank_page_button_visibility,
        buttonText: formInitialData.thank_page_button_text,
        buttonUrl: formInitialData.thank_page_button_url,
        bgColor: formInitialData.thank_page_background,
        titleFontSize: formInitialData.thank_page_title_font_size,
        fontColor: formInitialData.thank_page_font_color,
        buttonColor: formInitialData.thank_page_button_color,
        buttonTextColor: formInitialData.thank_page_button_text_color,
        buttonRadius: formInitialData.thank_page_button_radius
    });
    
    const { collectInfoVisibility, pageVisibility, accountVisibility, title, descriptionVisibility, description, buttonVisibility, buttonText, buttonUrl, colorPicker, bgColor, titleFontSize, fontColor, buttonColor, buttonTextColor, buttonRadius} = state;
    
    const changePageVisibility = () =>{
        setState({
            ...state,
            pageVisibility: !pageVisibility,
        });
    }
    const changeBgColor = (event) =>{
        setState({
            ...state,
            bgColor: event.target.value
        });
    }
    const changeFontColor = (event) =>{
        setState({
            ...state,
            fontColor: event.target.value
        });
    }
    const changeButtonColor = (event) =>{
        setState({
            ...state,
            buttonColor: event.target.value
        });
    }
    const changeButtonTextColor = (event) =>{
        setState({
            ...state,
            buttonTextColor: event.target.value
        });
    }
    return(
        <ThankSettingsWrap>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Collect info</span>
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
                <div className="wpwax-vm-chekbox-list">
                    <div className="wpwax-vm-chekbox-single">
                        <span>Name</span>
                        <Checkbox id="contact-name" label=""/>
                    </div>
                    <div className="wpwax-vm-chekbox-single">
                        <span>Email</span>
                        <Checkbox id="contact-email" label=""/>
                    </div>
                    <div className="wpwax-vm-chekbox-single">
                        <span>Phone Number</span>
                        <Checkbox id="contact-password" label=""/>
                    </div>
                </div>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Title</span>
                </div>
                <textarea className="wpwax-vm-form__element" value={title}/>
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
                            checked={pageVisibility}
                            onChange={changePageVisibility}
                        />
                    </label>
                </div>
                <textarea className="wpwax-vm-form__element" value={description}/>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Add buttons</span>
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
                </div>
                <div className="wpwax-vm-form-group__input-list wpwax-vm-addbtn-style">
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Button text</span>
                        <input type="text" className="wpwax-vm-form__element" value={buttonText} />
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Button URL</span>
                        <input type="url" className="wpwax-vm-form__element" value={buttonUrl} />
                    </div>
                </div>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Customize</span>
                </div>
                <div className="wpwax-vm-form-group__input-list">
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Background Color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{bgColor}</span>
                            <label htmlFor="wpwax-vm-form-bg-color" className="wpwax-vm-form__color-ball" style={{backgroundColor: bgColor}}></label>
                            <input type="color" className="wpwax-vm-form__element" id="wpwax-vm-form-bg-color" value={bgColor} onChange={(e)=>changeBgColor(e)}/>
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Title Font size</span>
                        <Select 
                            options={templateOptions}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            searchable={false}
                        />
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Font color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{fontColor}</span>
                            <label htmlFor="wpwax-vm-form-font-color" className="wpwax-vm-form__color-ball" style={{backgroundColor: fontColor}}></label>
                            <input type="color" className="wpwax-vm-form__element" id="wpwax-vm-form-font-color" value={fontColor} onChange={(e)=>changeFontColor(e)} />
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
                        <span>Button text color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{buttonTextColor}</span>
                            <label htmlFor="wpwax-vm-form-text-color" className="wpwax-vm-form__color-ball" style={{backgroundColor: buttonTextColor}}></label>
                            <input type="color" id="wpwax-vm-form-text-color" className="wpwax-vm-form__element" value={buttonTextColor} onChange={(e)=>changeButtonTextColor(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Button border-radius</span>
                        <div className="wpwax-vm-form__color-plate">
                            <input type="text" className="wpwax-vm-form__element" value={buttonRadius} />
                        </div>
                    </div>
                </div>
            </div>
        </ThankSettingsWrap>
    )
}

export default ThankSettings;