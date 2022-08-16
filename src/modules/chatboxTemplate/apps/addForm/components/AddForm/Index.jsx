import { useState } from "react";
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
import { AddFormStyle } from './Style';

import { addForm } from '../../redux/form/actionCreator';

const AddForm = () => {
    /* initialize Form Data */
    const { formInitialData } = useSelector(state => {
        return {
            formInitialData: state.form.data[0],
        };
    });

    const [state, setState] = useState({
        validation: true
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
            dispatch(addForm(formInitialData));
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

    return (
        <AddFormStyle>
            <div className="wpwax-vm-add-form">
                <form action="" onSubmit={handleAddTemplate}>
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