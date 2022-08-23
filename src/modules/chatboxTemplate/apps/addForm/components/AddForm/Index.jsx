import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import apiService  from "../../../../../apiService/Service";
import arrowLeft from 'Assets/svg/icons/arrow-small-left.svg';
import handsDown from 'Assets/svg/icons/hand-down.svg';
import { ReactSVG } from 'react-svg';
import FormSettings from "./overview/FormSettings.jsx";
import GeneralSettings from "./overview/GeneralSettings.jsx";
import PreviewOne from "./overview/PreviewOne.jsx";
import PreviewTwo from "./overview/PreviewTwo.jsx";
import ThankSettings from "./overview/ThankSettings.jsx";
import apiService from 'apiService/Service.js';
import { AddFormStyle } from './Style';

import { addForm, editForm, updateDataWithId } from '../../redux/form/actionCreator';

const AddForm = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get("id");
    /* initialize Form Data */
    const {
        primaryColor,
        fontFamily,
        fontSize,
        fontColor,
        greetColor,
        chatColor,
        greetSize,
        chatSize,
        btnRadius,
        primaryBtnColor,
        primaryBtnBg,
        thankTitleColor,
        thankTitleFontSize,
        thankDescColor,
        thankDescFontSize,
        formInitialData,
        loading,
        response
    } = useSelector(state => {
        return {
            primaryColor: state.form.data[0].options.primary_color,
            fontFamily: state.form.data[0].options.font_family,
            fontSize: state.form.data[0].options.font_size,
            fontColor: state.form.data[0].options.font_color,
            greetColor: state.form.data[0].options.greet_message_font_color,
            chatColor: state.form.data[0].options.chat_options_title_font_color,
            greetSize: state.form.data[0].options.greet_message_font_size,
            chatSize: state.form.data[0].options.chat_options_title_font_size,
            btnRadius: state.form.data[0].options.button_border_radius,
            primaryBtnColor: state.form.data[0].options.primary_button_font_color,
            primaryBtnBg: state.form.data[0].options.primary_button_background_color,
            thankTitleColor: state.form.data[0].options.thank_page_title_color,
            thankTitleFontSize: state.form.data[0].options.thank_page_title_font_size,
            thankDescColor: state.form.data[0].options.thank_page_description_color,
            thankDescFontSize: state.form.data[0].options.thank_page_description_font_size,
            formInitialData: state.form.data[0],
            loading: state.form.loading,
            response: state.form.response,
        };
    });

    document.documentElement.style.setProperty("--color-primary", primaryColor);
    document.documentElement.style.setProperty("--font-family", fontFamily);
    document.documentElement.style.setProperty("--font-size", fontSize);
    document.documentElement.style.setProperty("--color-text", fontColor);
    document.documentElement.style.setProperty("--color-text-greet", greetColor);
    document.documentElement.style.setProperty("--color-text-chat", chatColor);
    document.documentElement.style.setProperty("--font-size-greet", greetSize);
    document.documentElement.style.setProperty("--font-size-chat", chatSize);
    document.documentElement.style.setProperty("--btn-radius", btnRadius + 'px');
    document.documentElement.style.setProperty("--primary-btn-color", primaryBtnColor);
    document.documentElement.style.setProperty("--primary-btn-bg", primaryBtnBg);
    document.documentElement.style.setProperty("--color-thank-title", thankTitleColor);
    document.documentElement.style.setProperty("--font-size-thank-title", thankTitleFontSize);
    document.documentElement.style.setProperty("--color-thank-desc", thankDescColor);
    document.documentElement.style.setProperty("--font-size-thank-desc", thankDescFontSize);

    const [state, setState] = useState({
        validation: true,
        fetchStatus: true
    });

    const [formStage, setFormStage] = useState("general");

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    const handleFormNext = (e) => {
        e.preventDefault();
        if (formStage === "general") {
            setFormStage("form");
        } else if (formStage === "form") {
            setFormStage("thank");
        }
    }

    const handleAddTemplate = (e) => {
        e.preventDefault()
        if (formInitialData.name === '') {
            setState({
                validation: false
            });
            setTimeout(() => {
                setState({
                    validation: true
                });
            }, "4000")
        } else {
            const formData = {
                id: formInitialData.id,
                name: formInitialData.name,
                options: JSON.stringify(formInitialData.options),
                page_ids: formInitialData.page_ids,
                is_default: formInitialData.is_default,
            }
            if (id) {
                dispatch(editForm(id, formData));
            } else {
                dispatch(addForm(formData));
            }
        }
    }

    const getFormContent = () => {
        if (formStage === "general") {
            return <div className="wpwax-vm-add-form__content">
                <GeneralSettings />
            </div>
        } else if (formStage === "form") {
            return <div className="wpwax-vm-add-form__content">
                <FormSettings />
            </div>
        } else {
            return <div className="wpwax-vm-add-form__content">
                {
                    !state.validation ? <span className="wpwax-vm-notice wpwax-vm-notice-danger">Please fill the required fields</span> : null
                }

                <ThankSettings />
            </div>
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(updateDataWithId(id));
        }
    }, []);

    return (
        <AddFormStyle>

            <div className={loading ? "wpwax-vm-add-form wpwax-vm-loder-active" : "wpwax-vm-add-form"}>
                {
                    loading ? <span className="wpwax-vm-loading-spin">
                        <span className="wpwax-vm-spin-dot"></span>
                        <span className="wpwax-vm-spin-dot"></span>
                        <span className="wpwax-vm-spin-dot"></span>
                        <span className="wpwax-vm-spin-dot"></span>
                    </span> : null
                }
                <form action="" onSubmit={handleAddTemplate}>
                    {
                        state.fetchStatus ?
                            <>
                                <div className="wpwax-vm-add-form__tab">
                                    <ul className="wpwax-vm-add-form__top">
                                        <li className={formStage === "general" ? "wpwax-vm-add-form__top--btn wpwax-vm-add-form__top--btn-selected" : "wpwax-vm-add-form__top--btn"} onClick={() => setFormStage("general")}>General</li>
                                        <li className={formStage === "form" ? "wpwax-vm-add-form__top--btn wpwax-vm-add-form__top--btn-selected" : "wpwax-vm-add-form__top--btn"} onClick={() => setFormStage("form")}>Form Settings</li>
                                        <li className={formStage === "thank" ? "wpwax-vm-add-form__top--btn wpwax-vm-add-form__top--btn-selected" : "wpwax-vm-add-form__top--btn"} onClick={() => setFormStage("thank")}>Thank You Page</li>
                                    </ul>

                                    <p className="wpwax-vm-text-highlighted">* required Fields</p>


                                    {
                                        getFormContent()
                                    }

                                    {
                                        response && response.status === 200 ? <span className="wpwax-vm-notice wpwax-vm-notice-success">{response.data.message}</span> : null
                                    }
                                    {
                                        response && response.status !== 200 ? <span className="wpwax-vm-notice wpwax-vm-notice-danger">{response.data.message}</span> : null
                                    }

                                </div>

                                <div className="wpwax-vm-add-form__bottom">

                                    {
                                        formStage === "form" || formStage === "general" ? <a href="#" className="wpwax-vm-form-next" onClick={e => handleFormNext(e)}>Next <ReactSVG src={arrowLeft} /></a> : null
                                    }
                                    {
                                        formStage === "thank" ? <button type="submit" className="wpwax-vm-form-save">Save</button> : null
                                    }

                                </div>
                            </>
                            : <p>Sorry !! Server Error. Please Try Again.</p>
                    }
                </form>
            </div>
            <div className="wpwax-vm-preview">
                <span className="wpwax-vm-preview-label"><ReactSVG src={handsDown} />Preview your changes</span>
                {
                    formInitialData.options.theme === 'theme-1' ?
                        <PreviewOne previewStage={formStage} />
                        :
                        <PreviewTwo previewStage={formStage} />
                }
            </div>
        </AddFormStyle>
    )
}

export default AddForm;