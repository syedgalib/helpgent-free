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

import { addForm, updateDataWithId } from '../../redux/form/actionCreator';

const AddForm = () => {
    /* initialize Form Data */
    const { formInitialData, loading, response } = useSelector(state => {
        return {
            formInitialData: state.form.data[0],
            loading: state.form.loading,
            response: state.form.response,
        };
    });

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

            dispatch(addForm(formData));
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
        const queryParams = new URLSearchParams(window.location.search)
        const id = queryParams.get("id");

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