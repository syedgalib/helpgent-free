import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import arrowLeft from 'Assets/svg/icons/arrow-small-left.svg';
import handsDown from 'Assets/svg/icons/hand-down.svg';
import ReactSVG from 'react-inlinesvg';
import FormSettings from "./components/FormSettings.jsx";
import GeneralSettings from "./components/GeneralSettings.jsx";
import PreviewOne from "./components/PreviewOne.jsx";
import PreviewTwo from "./components/PreviewTwo.jsx";
import ThankSettings from "./components/ThankSettings.jsx";
import useFormAPI from 'API/useFormAPI.js';

import { AddFormStyle } from './Style';

import { handleReadForm } from '../../store/form/actionCreator';

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

    const { currentStage, validation, loading, fetchStatus} = state;

    const [formStage, setFormStage] = useState("general");

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    function onlySpaces(str) {
        console.log(str.trim().length===0)
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
            if(onlySpaces(formInitialData.name) || formInitialData.pages.length === 0){
                setState({
                    ...state,
                    validation: false
                });
            }else{
                setState({
                    ...state,
                    currentStage: "form",
                    validation: true
                });
            }

        }else if(btnName === "btn-thank"){
            if(onlySpaces(name) || formInitialData.options.pages !== ""){
                setState({
                    ...state,
                    validation: false,
                });
            }else{
                setState({
                    ...state,
                    currentStage: "thank",
                    validation: true
                });
            }

        }else{
            if(currentStage === "general"){
                if(onlySpaces(formInitialData.name) || formInitialData.pages.length === 0){
                    setState({
                        ...state,
                        validation: false
                    });
                }else{
                    setState({
                        ...state,
                        currentStage: "form",
                        validation: true
                    });
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

    const handleAddTemplate = (e) => {
        e.preventDefault()
        if (formInitialData.name === '') {
            setTimeout(() => {
                setState({
                    ...state,
                    validation: true
                });
            }, "4000")
        } else {
            const formData = {
                id: formInitialData.id,
                name: formInitialData.name,
                options: JSON.stringify(formInitialData.options),
                pages: formInitialData.pages,
                show_on_all_pages: formInitialData.show_on_all_pages,
            }
            if (id) {
                console.log(id);
                setState({
                    ...state,
                    loading: true
                });
                const editSession = async ()=>{
                    const editSessionResponse = await updateForm( id,formData )
                    return editSessionResponse;
                }
                editSession()
                    .then( editSessionResponse => {
                        console.log(editSessionResponse)
                        setState({
                            ...state,
                            loading: false,
                        });
                        setResponse(editSessionResponse);
                        dispatch(handleReadForm([formData]));
                    })
                    .catch((error) => {
                        setState({
                            ...state,
                            currentStage: 'general',
                            loading: false,
                        });
                        setResponse(response);
                    })
            } else {
                setState({
                    ...state,
                    loading: true
                });
                const addSession = async ()=>{
                    createForm(formData)
                    const addSessionResponse = await createForm(formData)
                    return addSessionResponse;
                }
                addSession()
                    .then( addSessionResponse => {
                        console.log(addSessionResponse)
                        const formResetData = {
                            id: formInitialData.id,
                            name: "",
                            options: formInitialData.options,
                            pages: formInitialData.pages,
                            show_on_all_pages: formInitialData.show_on_all_pages,
                        }
                        setState({
                            ...state,
                            currentStage: 'general',
                            loading: false,
                        });
                        setResponse(addSessionResponse)
                        dispatch(handleReadForm([formResetData]));
                    })
                    .catch((error) => {
                        setState({
                            ...state,
                            currentStage: 'general',
                            loading: false,
                        });
                        console.log(error)
                        setResponse(error);
                    });
            }
        }
    }

    const handleNoticeClose = (e) =>{
        e.preventDefault();
        setResponse("")
    }

    const getFormContent = () => {
        if (currentStage === "general") {
            return <div className="wpwax-vm-add-form__content">
                <GeneralSettings />
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
                    <span className="wpwax-vm-notice wpwax-vm-notice-success">Successfully Saved. <br></br> Are you going to forms page? <a href={`${location.origin}${location.pathname}?page=vm-forms`}>Click Here </a>
                        <a href="#" className="wpwax-vm-notice-close" onClick={handleNoticeClose}><span className="dashicons dashicons-no-alt"></span></a>
                    </span>
                )
            }else if(response.statusCode === 403){
                return(
                    <span className="wpwax-vm-notice wpwax-vm-notice-danger">{response.message} Please <a href="">Try again</a> </span>
                )
            }else{
                return <span className="wpwax-vm-notice wpwax-vm-notice-danger">Sorry not saved. Please <a href="">Try again</a> </span>;
            }
        }
    }

    useEffect(() => {
        if (id) {
            setState({
                ...state,
                loading: true
            });
            const fetchSessionById = async ()=>{
                getForm(id)
                const sessionByIdResponse = await getForm(id)
                return sessionByIdResponse;
            }

            fetchSessionById()
                .then( sessionByIdResponse => {
                    setState({
                        ...state,
                        loading: false
                    });
                    dispatch(handleReadForm([sessionByIdResponse.data]));
                })
                .catch((error) => {
                    console.log(error);
                })
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
                    </span>
                    :

                    <form action="" onSubmit={handleAddTemplate}>
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
                                        currentStage === "form" || currentStage === "general" ? <a href="#" className="wpwax-vm-form-next" onClick={handleFormNext}>Next <ReactSVG src={arrowLeft} /></a> : null
                                    }
                                    {
                                        currentStage === "thank" ? <button type="submit" className="wpwax-vm-form-save">Save</button> : null
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
    )
}

export default AddForm;