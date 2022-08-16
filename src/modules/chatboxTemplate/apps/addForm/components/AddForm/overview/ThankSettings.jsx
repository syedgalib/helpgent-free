import Checkbox from "Components/formFields/Checkbox.jsx";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { default as Select } from 'react-select';
import Switch from "react-switch";
import { onFormEdit } from '../../../redux/form/actionCreator';
import { ThankSettingsWrap } from './Style';

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
const ThankSettings = () => {
    /* initialize Form Data */
    const { formData, formInitialData, formInitialOption } = useSelector(state => {
        return {
            formData: state.form.data,
            formInitialData: state.form.data[0],
            formInitialOption: state.form.data[0].option,
        };
    });
    const [state, setState] = useState({
        id: formInitialData.form_id,
        collectInfoVisibility: formInitialOption.collect_info,
        collectableInfo: formInitialOption.collectable_info,
        title: formInitialOption.thank_page_title,
        descriptionVisibility: formInitialOption.show_thank_page_description,
        description: formInitialOption.thank_page_description,
        ctaButtonVisibility: formInitialOption.show_thank_page_cta_button,
        ctaButtonText: formInitialOption.thank_page_cta_button_text,
        ctaButtonUrl: formInitialOption.thank_page_cta_button_url,
        ctaBgColor: formInitialOption.thank_page_cta_background,
        ctaTitleFontSize: formInitialOption.thank_page_cta_title_font_size,
        ctaFontColor: formInitialOption.thank_page_cta_font_color,
        ctaButtonColor: formInitialOption.thank_page_cta_button_color,
        ctaButtonTextColor: formInitialOption.thank_page_cta_button_text_color,
        ctaButtonRadius: formInitialOption.thank_page_cta_button_radius,
        openCollapse: true
    });

    /* Destructuring State */
    const {
        id, collectInfoVisibility, collectableInfo, title, descriptionVisibility, description, ctaButtonVisibility, ctaButtonText, ctaButtonUrl, ctaBgColor, ctaTitleFontSize, ctaFontColor, ctaButtonColor, ctaButtonTextColor, ctaButtonRadius, openCollapse
    } = state;

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();
    const updateForm = (label, value) => {
        let updatedData = formData.map(item => {
            switch (label) {
                case "info-visibility":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            collect_info: value
                        }
                    }
                case "title":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            thank_page_title: value
                        }
                    }
                case "collectable-info":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            collectable_info: value
                        }
                    }
                case "des-visibility":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            show_thank_page_description: value
                        }
                    }
                case "description":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            thank_page_description: value
                        }
                    }
                case "btn-visibility":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            show_thank_page_cta_button: value
                        }
                    }
                case "btn-text":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            thank_page_cta_button_text: value
                        }
                    }
                case "btn-url":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            thank_page_cta_button_url: value
                        }
                    }
                case "bg-color":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            thank_page_cta_background: value
                        }
                    }
                case "title-size":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            thank_page_cta_title_font_size: value
                        }
                    }
                case "font-color":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            thank_page_cta_font_color: value
                        }
                    }
                case "button-color":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            thank_page_cta_button_color: value
                        }
                    }
                case "button-text-color":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            thank_page_cta_button_text_color: value
                        }
                    }
                case "button-radius":
                    return {
                        ...item,
                        option: {
                            ...item.option,
                            thank_page_cta_button_radius: value
                        }
                    }
                default:
                // code block
            }
        });
        // console.log(updatedData);
        dispatch(onFormEdit(updatedData));
    }

    /* For updating each element, we create seperate function */
    const handleCollectInfoVisibility = () => {
        setState({
            ...state,
            collectInfoVisibility: !collectInfoVisibility,
        });
        updateForm('info-visibility', !collectInfoVisibility);
    }
    const changeBgColor = (event) => {
        let thankBgColor = event.target.value;
        setState({
            ...state,
            bgColor: thankBgColor
        });
        updateForm('bg-color', thankBgColor);
    }
    const changeFontColor = (event) => {
        let thankFontColor = event.target.value;
        setState({
            ...state,
            ctaFontColor: thankFontColor
        });
        updateForm('font-color', thankFontColor);
    }
    const changeButtonColor = (event) => {
        let thankButtonColor = event.target.value;
        setState({
            ...state,
            ctaButtonColor: thankButtonColor
        });
        updateForm('button-color', thankButtonColor);
    }
    const changeButtonTextColor = (event) => {
        let thankButtonTextColor = event.target.value;
        setState({
            ...state,
            ctaButtonTextColor: thankButtonTextColor
        });
        updateForm('button-text-color', thankButtonTextColor);
    }
    const changeButtonRadius = (event) => {
        let thankButtonRadius = event.target.value;
        setState({
            ...state,
            ctaButtonRadius: thankButtonRadius
        });
        updateForm('button-radius', thankButtonRadius);
    }
    const changeTitle = (event) => {
        let thankTitle = event.target.value;
        setState({
            ...state,
            title: thankTitle
        });
        updateForm('title', thankTitle);
    }
    const chagneTitleFontSize = selectedSize => {
        setState({
            ...state,
            titleFontSize: selectedSize.value
        });
        updateForm('title-size', selectedSize.value);
    }
    const changeDescriptionVisibility = () => {
        setState({
            ...state,
            descriptionVisibility: !descriptionVisibility
        });
        updateForm('des-visibility', !descriptionVisibility);
    }
    const changeDescription = (event) => {
        let thankDescription = event.target.value;
        setState({
            ...state,
            description: thankDescription
        });
        updateForm('description', thankDescription);
    }
    const changeButtonVisibility = () => {
        setState({
            ...state,
            buttonVisibility: !buttonVisibility
        });
        updateForm('btn-visibility', !buttonVisibility);
    }
    const changeButtonText = (event) => {
        let thankBtnText = event.target.value;
        setState({
            ...state,
            ctaButtonText: thankBtnText
        });
        updateForm('btn-text', thankBtnText);
    }
    const changeButtonUrl = (event) => {
        let thankBtnUrl = event.target.value;
        setState({
            ...state,
            ctaButtonUrl: thankBtnUrl
        });
        updateForm('btn-url', thankBtnUrl);
    }

    /* To handle section toggle */
    const toogleCollapse = (e) => {
        e.preventDefault();
        setState({
            ...state,
            openCollapse: !openCollapse
        });
    }

    return (
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
                            checked={collectInfoVisibility}
                            onChange={handleCollectInfoVisibility}
                        />
                    </label>
                </div>
                <div className="wpwax-vm-chekbox-list">
                    {
                        collectableInfo.map((item, index) => {
                            return (
                                <div className="wpwax-vm-chekbox-single" key={index}>
                                    <span>{item}</span>
                                    <Checkbox id={`contact-${item}`} label="" />
                                </div>
                            )

                        })
                    }
                </div>
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Title</span>
                </div>
                <textarea className="wpwax-vm-form__element" value={title} onChange={(e) => changeTitle(e)} />
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
                            onChange={changeDescriptionVisibility}
                        />
                    </label>
                </div>
                <textarea className="wpwax-vm-form__element" value={description} onChange={(e) => changeDescription(e)} />
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
                        checked={ctaButtonVisibility}
                        onChange={changeButtonVisibility}
                    />
                </div>
                <div className="wpwax-vm-form-group__input-list wpwax-vm-addbtn-style">
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Button text</span>
                        <input type="text" className="wpwax-vm-form__element" value={ctaButtonText} onChange={(e) => changeButtonText(e)} />
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Button URL</span>
                        <input type="url" className="wpwax-vm-form__element" value={ctaButtonUrl} onChange={(e) => changeButtonUrl(e)} />
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
                        <span>Background Color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{ctaBgColor}</span>
                            <label htmlFor="wpwax-vm-form-bg-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: ctaBgColor }}></label>
                            <input type="color" className="wpwax-vm-form__element" id="wpwax-vm-form-bg-color" value={ctaBgColor} onChange={(e) => changeBgColor(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Title Font size</span>
                        <Select
                            classNamePrefix="wpwax-vm-select"
                            options={fontSizeOptions}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            searchable={false}
                            onChange={chagneTitleFontSize}
                            defaultValue={fontSizeOptions.filter(function (option) {
                                return option.label === ctaTitleFontSize;
                            })[0]}
                        />
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Font color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{ctaFontColor}</span>
                            <label htmlFor="wpwax-vm-form-font-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: ctaFontColor }}></label>
                            <input type="color" className="wpwax-vm-form__element" id="wpwax-vm-form-font-color" value={ctaFontColor} onChange={(e) => changeFontColor(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Button color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{ctaButtonColor}</span>
                            <label htmlFor="wpwax-vm-form-button-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: ctaButtonColor }}></label>
                            <input type="color" id="wpwax-vm-form-button-color" className="wpwax-vm-form__element" value={ctaButtonColor} onChange={(e) => changeButtonColor(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Button text color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{ctaButtonTextColor}</span>
                            <label htmlFor="wpwax-vm-form-text-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: ctaButtonTextColor }}></label>
                            <input type="color" id="wpwax-vm-form-text-color" className="wpwax-vm-form__element" value={ctaButtonTextColor} onChange={(e) => changeButtonTextColor(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Button border-radius</span>
                        <div className="wpwax-vm-form__input-radius">
                            <input type="text" className="wpwax-vm-form__element" value={ctaButtonRadius} onChange={(e) => changeButtonRadius(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </ThankSettingsWrap>
    );
}

export default ThankSettings;