import { useState } from "react";
import { useSelector } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
// import apiService  from "../../../../../apiService/Service";
import { ReactSVG } from 'react-svg';
import handsDown from 'Assets/svg/icons/hand-down.svg';
import arrowLeft from 'Assets/svg/icons/arrow-small-left.svg';
import FormSettings from "./overview/FormSettings.jsx";
import GeneralSettings from "./overview/GeneralSettings.jsx";
import PreviewOne from "./overview/PreviewOne.jsx";
import PreviewTwo from "./overview/PreviewTwo.jsx";
import ThankSettings from "./overview/ThankSettings.jsx";
import { AddFormStyle } from './Style';

const AddForm = () => {
    /* initialize Form Data */
    const { formInitialData } = useSelector(state => {
        return {
            formInitialData: state.form.data[0],
        };
    });

    const [formStage, setFormStage] = useState("general");

    const handleFormNext = (e) => {
        e.preventDefault();
        if (formStage === "general") {
            setFormStage("form");
        } else if (formStage === "form") {
            setFormStage("thank");
        }
    }

    const claback = (childData) => {

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
                <ThankSettings />
            </div>
        }
    }

    console.log(formInitialData);

    return (
        <AddFormStyle>
            <div className="wpwax-vm-add-form">
                <form action="">
                    <div className="wpwax-vm-add-form__tab">
                        <ul className="wpwax-vm-add-form__top">
                            <li className={formStage === "general" ? "wpwax-vm-add-form__top--btn wpwax-vm-add-form__top--btn-selected" : "wpwax-vm-add-form__top--btn"} onClick={() => setFormStage("general")}>General</li>
                            <li className={formStage === "form" ? "wpwax-vm-add-form__top--btn wpwax-vm-add-form__top--btn-selected" : "wpwax-vm-add-form__top--btn"} onClick={() => setFormStage("form")}>Form Settings</li>
                            <li className={formStage === "thank" ? "wpwax-vm-add-form__top--btn wpwax-vm-add-form__top--btn-selected" : "wpwax-vm-add-form__top--btn"} onClick={() => setFormStage("thank")}>Thank You Page</li>
                        </ul>

                        {
                            getFormContent()
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
                </form>
            </div>
            <div className="wpwax-vm-preview">
                <span className="wpwax-vm-preview-label"><ReactSVG src={handsDown} />Preview your changes</span>
                {
                    formInitialData.option.theme === 'theme-1' ?
                        <PreviewOne previewStage={formStage} />
                        :
                        <PreviewTwo previewStage={formStage} />
                }
            </div>
        </AddFormStyle>
    )
}

export default AddForm;