import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ReactSVG from 'react-inlinesvg';
import FormSettings from "./components/FormSettings.jsx";
import GeneralSettings from "./components/GeneralSettings.jsx";
import PreviewOne from "./components/PreviewOne.jsx";
import PreviewTwo from "./components/PreviewTwo.jsx";
import ThankSettings from "./components/ThankSettings.jsx";
import useFormAPI from 'API/useFormAPI.js';
import arrowLeft from 'Assets/svg/icons/arrow-small-left.svg';
import arrowRight from 'Assets/svg/icons/arrow-small-right.svg';
import handsDown from 'Assets/svg/icons/hand-down.svg';
import pen from 'Assets/svg/icons/pen.svg';
import file from 'Assets/svg/icons/file.svg';
import roundStar from 'Assets/svg/icons/round-star.svg';
import football from 'Assets/svg/icons/football.svg';

import { AddFormStyle, FormTopStyle } from './Style';

import { handleReadForm, updateFormSettings } from '../../store/form/actionCreator';

const AddForm = () => {
    const { createItem: createForm, getItem: getForm, updateItem: updateForm } = useFormAPI();
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get("id");
    /* initialize Form Data */
    const {
        name,
        fontFamily,
        greetColor,
        chatColor,
        greetSize,
        chatSize,
        btnRadius,
        primaryBtnColor,
        primaryBtnBg,
        footerMessageColor,
        footerMessageFontSize,
        playBtnBg,
        thankTitleColor,
        thankPageBg,
        thankTitleFontSize,
        thankDescColor,
        thankDescFontSize,
        pageBgColor,
        pageHeaderBgColor,
        formInitialData,
        displayOnCustomPages
    } = useSelector(state => {
        return {
            name: state.form.data[0].name,
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
            footerMessageColor: state.form.data[0].options.footer_message_color,
            footerMessageFontSize: state.form.data[0].options.footer_message_font_size,
            playBtnBg: state.form.data[0].options.play_btn_background,
            thankTitleColor: state.form.data[0].options.thank_page_title_color,
            thankPageBg: state.form.data[0].options.thank_page_background_color,
            thankTitleFontSize: state.form.data[0].options.thank_page_title_font_size,
            thankDescColor: state.form.data[0].options.thank_page_description_color,
            thankDescFontSize: state.form.data[0].options.thank_page_description_font_size,
            pageBgColor: state.form.data[0].options.page_background_color,
            pageHeaderBgColor: state.form.data[0].options.page_header_background_color,
            formInitialData: state.form.data[0],
            displayOnCustomPages: state.form.settings.displayOnCustomPages,
            loading: state.form.loading,
        };
    });
    document.documentElement.style.setProperty("--color-page-bg", pageBgColor);
    document.documentElement.style.setProperty("--color-page-header-bg", pageHeaderBgColor);
    document.documentElement.style.setProperty("--color-text-greet", greetColor);
    document.documentElement.style.setProperty("--font-size-greet", greetSize+'em');
    document.documentElement.style.setProperty("--play-button-bg", playBtnBg);
    document.documentElement.style.setProperty("--color-text-chat", chatColor);
    document.documentElement.style.setProperty("--font-size-chat", chatSize+'em');
    document.documentElement.style.setProperty("--font-family", fontFamily);
    document.documentElement.style.setProperty("--btn-radius", btnRadius + 'px');
    document.documentElement.style.setProperty("--primary-button-color", primaryBtnColor);
    document.documentElement.style.setProperty("--primary-button-bg", primaryBtnBg);
    document.documentElement.style.setProperty("--color-footer-text", footerMessageColor);
    document.documentElement.style.setProperty("--footer-text-font-size", footerMessageFontSize+'em');
    document.documentElement.style.setProperty("--color-thank-page-bg", thankPageBg);
    document.documentElement.style.setProperty("--color-thank-title", thankTitleColor);
    document.documentElement.style.setProperty("--font-size-thank-title", thankTitleFontSize+'em');
    document.documentElement.style.setProperty("--color-thank-desc", thankDescColor);
    document.documentElement.style.setProperty("--font-size-thank-desc", thankDescFontSize+'em');
    const [state, setState] = useState({
        currentStage: "general",
        validation: true,
        loading: false,
        fetchStatus: true
    });

    const [response, setResponse] = useState("");
    const [formValidation, setFormValidation] = useState(true);

    const { currentStage, validation, loading, fetchStatus} = state;

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    function onlySpaces(str) {
        return str.trim().length === 0;
    }

    const handleFormNext = (event,btnName) => {
        event.preventDefault();
        if(btnName === "btn-general"){
            if(validation === true){
                setState({
                    ...state,
                    currentStage: "general",
                    validation: true,
                });
            }
        }else if(btnName === "btn-form"){
            if(!displayOnCustomPages){
                setState({
                    ...state,
                    currentStage: "form",
                    validation: true
                });
            }else{
                if(formInitialData.pages && formInitialData.pages.length !== 0){
                    setState({
                        ...state,
                        currentStage: "form",
                        validation: true
                    });
                }else{
                    setState({
                        ...state,
                        validation: false
                    });
                }
            }
        }else if(btnName === "btn-thank"){
            if(!displayOnCustomPages){
                setState({
                    ...state,
                    currentStage: "thank",
                    validation: true
                });
            }else{
                if(formInitialData.pages && formInitialData.pages.length !== 0){
                    setState({
                        ...state,
                        currentStage: "thank",
                        validation: true
                    });
                }else{
                    setState({
                        ...state,
                        validation: false
                    });
                }
            }
        }else{
            if(currentStage === "general"){
                if(!displayOnCustomPages){
                    setState({
                        ...state,
                        currentStage: "form",
                        validation: true
                    });
                }else{
                    if(formInitialData.pages && formInitialData.pages.length !== 0){
                        setState({
                            ...state,
                            currentStage: "form",
                            validation: true
                        });
                    }else{
                        setState({
                            ...state,
                            validation: false
                        });
                    }
                }
            }else if(currentStage === "form"){
                setState({
                    ...state,
                    currentStage: "thank",
                });
            }else if(currentStage === "thank"){
                setState({
                    ...state,
                });
            }
        }
    }

    const handleUpdateTemplate = (e) => {
        e.preventDefault()
        
        const formData = {
            id: formInitialData.id,
            name: formInitialData.name,
            options: JSON.stringify(formInitialData.options),
            pages: formInitialData.pages,
        }
        console.log(formData);
        setState({
            ...state,
            loading: true
        });
        const editForm = async ()=>{
            const editFormResponse = await updateForm( id,formData )
            return editFormResponse;
        }
        editForm()
            .then( editFormResponse => {
                console.log(editFormResponse);
                setState({
                    ...state,
                    loading: false,
                });
                setResponse(editFormResponse);
                dispatch(handleReadForm([editFormResponse.data]));
            })
            .catch((error) => {
                setState({
                    ...state,
                    currentStage: 'general',
                    loading: false,
                });
                setResponse(response);
            });
    }

    const handleNoticeClose = (e) =>{
        e.preventDefault();
        setResponse("")
    }

    const getFormContent = () => {
        if (currentStage === "general") {
            return <div className="wpwax-vm-add-form__content">
                <GeneralSettings formValidation={formValidation} setFormValidation={setFormValidation} />
            </div>
        } else if (currentStage === "form") {
            return <div className="wpwax-vm-add-form__content">
                <FormSettings />
            </div>
        } else {
            return <div className="wpwax-vm-add-form__content">
                <ThankSettings />
            </div>
        }
    }

    const getFormResponse = () =>{
        if(response){
            if(response.statusCode === 200){
                return (
                    <span className="wpwax-vm-notice wpwax-vm-notice-success">Successfully Saved. <br></br> To view all forms<a href={`${location.origin}${location.pathname}?page=vm-forms`}>click here </a>
                        <a href="#" className="wpwax-vm-notice-close" onClick={handleNoticeClose}><span className="dashicons dashicons-no-alt"></span></a>
                    </span>
                )
            }else if(response.statusCode === 403){
                return(
                    <span className="wpwax-vm-notice wpwax-vm-notice-danger">{response.message} Please <a href="">Try again</a> </span>
                )
            }else{
                return <span className="wpwax-vm-notice wpwax-vm-notice-danger">Failed to save the form. Please <a href="">Try again</a> </span>;
            }
        }
    }

    useEffect(() => {
        setState({
            ...state,
            loading: true
        });
        const fetchFormById = async ()=>{
            const formByIdResponse = await getForm(id)
            return formByIdResponse;
        }

        fetchFormById()
            .then( formByIdResponse => {
                setState({
                    ...state,
                    loading: false,

                });

                dispatch(handleReadForm([formByIdResponse.data]));

                const displayOnCustomPages = ( formByIdResponse.data && formByIdResponse.data.pages !== null ) ? true : false;
                dispatch( updateFormSettings( 'displayOnCustomPages', displayOnCustomPages ) );
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <React.Fragment>
            <FormTopStyle className="wpwax-vm-form-top">
                <div className="wpwax-vm-form-top__left">
                    <a href={`${location.pathname}?page=vm-forms`}><ReactSVG src={arrowRight} /> All Forms</a>
                    <p><ReactSVG src={pen} /> You are editing the <strong>{ name }</strong> form</p>
                </div>
                <div className="wpwax-vm-form-top__right">
                    <a href="" className="wpwax-vm-btn wpwax-vm-btn-rounded wpwax-vm-btn-upgrade"><ReactSVG src={roundStar} /> Upgrade to PRO</a>
                    <a href="" className="wpwax-vm-form-top__link"><ReactSVG src={file} /> Doc</a>
                    <a href="" className="wpwax-vm-form-top__link"><ReactSVG src={football} /> Need Help ?</a>
                </div>
            </FormTopStyle>
            <AddFormStyle>
                <div className={loading ? "wpwax-vm-add-form wpwax-vm-loder-active" : "wpwax-vm-add-form"}>
                    {
                        loading ? <span className="wpwax-vm-loading-spin">
                            <span className="wpwax-vm-spin-dot"></span>
                            <span className="wpwax-vm-spin-dot"></span>
                            <span className="wpwax-vm-spin-dot"></span>
                            <span className="wpwax-vm-spin-dot"></span>
                        </span>
                        :

                        <form action="" onSubmit={handleUpdateTemplate}>
                        {
                            state.fetchStatus ?
                                <>
                                    <div className="wpwax-vm-add-form__tab">
                                        <ul className="wpwax-vm-add-form__top">
                                            <li className={currentStage === "general" ? "wpwax-vm-add-form__top--btn wpwax-vm-add-form__top--btn-selected" : "wpwax-vm-add-form__top--btn"} onClick={(event)=>handleFormNext(event,"btn-general")}>General</li>
                                            <li className={currentStage === "form" ? "wpwax-vm-add-form__top--btn wpwax-vm-add-form__top--btn-selected" : "wpwax-vm-add-form__top--btn"} onClick={(event)=>handleFormNext(event,"btn-form")}>Form Settings</li>
                                            <li className={currentStage === "thank" ? "wpwax-vm-add-form__top--btn wpwax-vm-add-form__top--btn-selected" : "wpwax-vm-add-form__top--btn"} onClick={(event)=>handleFormNext(event,"btn-thank")}>Thank You Page</li>
                                        </ul>

                                        {
                                            getFormContent()
                                        }
                                        {
                                            getFormResponse()
                                        }
                                    </div>

                                    <div className="wpwax-vm-add-form__bottom">
                                        {
                                            currentStage === "thank" ? 
                                            <button href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary">Save</button> 
                                            : 
                                            <React.Fragment>
                                                <button href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary">Save</button>
                                                <button href="#" className={formValidation ? "wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-gray" : "wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-gray wpwax-vm-btn-disabled"} onClick={handleFormNext} disabled={!formValidation} >Next <ReactSVG src={arrowLeft} /></button>
                                            </React.Fragment>
                                        }
                                    </div>
                                </>
                                : <p>Sorry !! Server Error. Please Try Again.</p>
                        }
                        </form>
                    }

                </div>
                <div className="wpwax-vm-preview">
                    <span className="wpwax-vm-preview-label"><ReactSVG src={handsDown} />Preview your changes</span>
                    {
                        formInitialData.options.theme === 'theme-1' ?
                            <PreviewOne previewStage={currentStage} />
                            :
                            <PreviewTwo previewStage={currentStage} />
                    }
                </div>
            </AddFormStyle>
        </React.Fragment>
        
    )
}

export default AddForm;