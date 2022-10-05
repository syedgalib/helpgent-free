import Checkbox from "Components/formFields/Checkbox.jsx";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { default as Select } from 'react-select';
import Switch from "react-switch";
import formUpdater from "../../../../../../../lib/components/FormUpdater";
import { handleDynamicEdit } from '../../../redux/form/actionCreator';
import { ThankSettingsWrap } from './Style';

export const fontSizeOptions = [
    { value: "1.3", label: "large" },
    { value: "1.5", label: "x-large" },
    { value: "2", label: "xx-large" },
    { value: "1.2", label: "medium" },
    { value: "1", label: "small" },
    { value: ".85", label: "smaller" },
    { value: ".80", label: "x-small" },
]
const ThankSettings = () => {
    /* initialize Form Data */
    const {
        title,
        descriptionVisibility,
        description,
        ctaButtonVisibility,
        ctaButtonText,
        ctaButtonUrl,
        ctaBgColor,
        ctaTitleFontSize,
        ctaTitleColor,
        ctaDescFontSize,
        ctaDescColor,
        ctaButtonColor,
        ctaButtonTextColor,
        ctaButtonRadius,
        primaryColor,
        formData,
        formInitialData,
        formInitialOption
    } = useSelector(state => {
        return {
            title: state.form.data[0].options.thank_page_title,
            descriptionVisibility: state.form.data[0].options.show_thank_page_description,
            description: state.form.data[0].options.thank_page_description,
            ctaButtonVisibility: state.form.data[0].options.show_thank_page_cta_button,
            ctaButtonText: state.form.data[0].options.thank_page_cta_button_text,
            ctaButtonUrl: state.form.data[0].options.thank_page_cta_button_url,
            ctaBgColor: state.form.data[0].options.thank_page_background_color,
            ctaTitleFontSize: state.form.data[0].options.thank_page_title_font_size,
            ctaTitleColor: state.form.data[0].options.thank_page_title_color,
            ctaDescFontSize: state.form.data[0].options.thank_page_description_font_size,
            ctaDescColor: state.form.data[0].options.thank_page_description_color,
            ctaButtonColor: state.form.data[0].options.thank_page_cta_button_color,
            ctaButtonTextColor: state.form.data[0].options.thank_page_cta_button_text_color,
            ctaButtonRadius: state.form.data[0].options.thank_page_cta_button_radius,
            primaryColor: state.form.data[0].options.primary_color,
            formData: state.form.data,
            formInitialData: state.form.data[0],
            formInitialOption: state.form.data[0].options,
        };
    });
    const [state, setState] = useState({
        openCollapse: true
    });

    /* Destructuring State */
    const {
        openCollapse
    } = state;

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    /* To handle section toggle */
    const toogleCollapse = (e) => {
        e.preventDefault();
        setState({
            ...state,
            openCollapse: !openCollapse
        });
    }

    const handleChangeInputValue = (e) => {
        const updatedData = formUpdater(e.target.id, e.target.value, formData);
        dispatch(handleDynamicEdit(updatedData));
    }

    const handleChangeSwitchValue = (value, event, id) => {
        const updatedData = formUpdater(id, value, formData);
        dispatch(handleDynamicEdit(updatedData));
    }

    const handleChangeSelectValue = (selectEvent, e) => {
        const updatedData = formUpdater(e.name, selectEvent.value, formData);
        dispatch(handleDynamicEdit(updatedData));
    };

    return (
        <ThankSettingsWrap>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <label htmlFor="wpwax-vm-thank-title">Title</label>
                </div>
                <textarea className="wpwax-vm-form__element" id="wpwax-vm-thank-title" value={title} onChange={(e) => handleChangeInputValue(e)} />
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <label htmlFor="wpwax-vm-thank-description">Description</label>
                    <label>
                        <Switch
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#6551f2"
                            offColor="#E2E2E2"
                            onHandleColor="#FFFFFF"
                            className="wpwax-vm-switch"
                            id="wpwax-vm-thank-description-visibility"
                            handleDiameter={14}
                            height={22}
                            width={40}
                            checked={descriptionVisibility}
                            onChange={handleChangeSwitchValue}
                        />
                    </label>
                </div>
                <textarea className="wpwax-vm-form__element" id="wpwax-vm-thank-description" value={description} onChange={(e) => handleChangeInputValue(e)} />
            </div>
            <div className="wpwax-vm-form-group">
                <div className="wpwax-vm-form-group__label">
                    <span>Add buttons</span>
                    <Switch
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#6551f2"
                        offColor="#E2E2E2"
                        onHandleColor="#FFFFFF"
                        className="wpwax-vm-switch"
                        id="wpax-vm-cta-btn-visibility"
                        handleDiameter={14}
                        height={22}
                        width={40}
                        checked={ctaButtonVisibility}
                        onChange={handleChangeSwitchValue}
                    />
                </div>
                <div className="wpwax-vm-form-group__input-list wpwax-vm-addbtn-style">
                    <div className="wpwax-vm-form-group__input-single">
                        <label htmlFor="wpwax-vm-cta-btn-text">Button text</label>
                        <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-cta-btn-text" value={ctaButtonText} onChange={(e) => handleChangeInputValue(e)} />
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <label htmlFor="wpwax-vm-cta-btn-url">Button URL</label>
                        <input type="url" className="wpwax-vm-form__element" id="wpwax-vm-cta-btn-url" value={ctaButtonUrl} onChange={(e) => handleChangeInputValue(e)} />
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
                            <label htmlFor="wpwax-vm-thank-bg-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: ctaBgColor }}></label>
                            <input type="color" className="wpwax-vm-form__element" id="wpwax-vm-thank-bg-color" value={ctaBgColor} onChange={(e) => handleChangeInputValue(e)} />
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
                            name="wpwax-vm-thank-fontsize"
                            onChange={handleChangeSelectValue}
                            defaultValue={fontSizeOptions.filter(function (option) {
                                return option.value === ctaTitleFontSize;
                            })[0]}
                        />
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Title color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{ctaTitleColor}</span>
                            <label htmlFor="wpwax-vm-thank-title-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: ctaTitleColor }}></label>
                            <input type="color" className="wpwax-vm-form__element" id="wpwax-vm-thank-title-color" value={ctaTitleColor} onChange={(e) => handleChangeInputValue(e)} />
                        </div>
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Description Font size</span>
                        <Select
                            classNamePrefix="wpwax-vm-select"
                            options={fontSizeOptions}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            searchable={false}
                            name="wpwax-vm-thank-description-fontsize"
                            onChange={handleChangeSelectValue}
                            defaultValue={fontSizeOptions.filter(function (option) {
                                return option.value === ctaDescFontSize;
                            })[0]}
                        />
                    </div>
                    <div className="wpwax-vm-form-group__input-single">
                        <span>Description color</span>
                        <div className="wpwax-vm-form__color-plate">
                            <span className="wpwax-vm-form__color-text">{ctaDescColor}</span>
                            <label htmlFor="wpwax-vm-thank-title-color" className="wpwax-vm-form__color-ball" style={{ backgroundColor: ctaDescColor }}></label>
                            <input type="color" className="wpwax-vm-form__element" id="wpwax-vm-thank-description-color" value={ctaDescColor} onChange={(e) => handleChangeInputValue(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </ThankSettingsWrap>
    );
}

export default ThankSettings;