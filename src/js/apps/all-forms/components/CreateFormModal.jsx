import React, { useState } from 'react';
import parse from 'html-react-parser'
import Modal from 'Components/Modal.jsx';
import useFormAPI from 'API/useFormAPI.js';

const CreateFormModal = props => {

    const { createItem: createForm } = useFormAPI();

    const { formState, setFormState } = props;

    /* Initialize State */
    const [state, setState] = useState({
        formCreationResponse: '',
		defaultForm: {
			name: "Untitled",
			options:{
				"theme":"theme-1",
				"collectInfo": ["phone"],
				"greet_image_url":"",
				"greet_video_url":"",
				"greet_message":"Hello there! 👋",
				"greet_message_font_color": "#ffffff",
				"greet_message_font_size": "1.3",
				"show_description":true,
				"description":"Please leave your questions below",
				"chat_options_title":"How would you like to contact?",
				"can_replay_in":[
				"video",
				"voice",
				"text",
				"screen_record"
				],
				"show_footer":true,
				"footer_message":"You can review it before sending",
				"thank_page_title":"Thank You 💐",
				"show_thank_page_description":true,
				"thank_page_description":"Your message has been sent successfully. You will receive a reply soon.",
				"show_thank_page_cta_button":false,
				"thank_page_cta_button_text":"Try for Free",
				"thank_page_cta_button_url":"https://wpwax.com/",
				"thank_page_background_color":"#ffffff",
				"thank_page_title_color":"#000000",
				"thank_page_title_font_size":"2",
				"thank_page_description_font_size":"1",
				"thank_page_description_color":"#000000",
				"play_btn_background": "#ffffff",
				"page_background_color": "#ffffff",
				"page_header_background_color": "#6551f2",
				"thank_page_cta_font_color":"#23030308",
				"thank_page_cta_button_color":"#236551F2",
				"thank_page_cta_button_text_color":"#23ffffff",
				"thank_page_cta_button_radius":"10",
				"font_family":"Inter",
				"font_color":"#23ffffff",
				"button_color":"#6551f2",
				"button_border_radius":"10",
				"chat_options_title_font_size": "1",
				"chat_options_title_font_color": "#ffffff",
				"footer_message_font_size": ".80",
				"footer_message_color": "#ffffff",
				"primary_button_font_color": "#ffffff",
				"primary_button_background_color": "#6551f2",
                "creditTextVisibility": true,
                "creditTextDom": "<span>Powered by <a href=\"#\">WpWax</a></span>",
			},
			pages: "",
		}
    });

    function handleChangeInputValue (e) {
        setState({
            ...state,
            defaultForm: {
                ...state.defaultForm,
                name: e.target.value
            }
        });
    }

    async function handleCreateForm(e){
        e.preventDefault();
        const formData = {
            name: state.defaultForm.name,
            options: JSON.stringify(state.defaultForm.options),
            pages: state.defaultForm.pages,
        }
        if(!onlySpaces(state.defaultForm.name)){
            await createForm(formData)
                .then((addFormResponse) => {
                    if(addFormResponse.success){
                        window.location.href=`${location.href}&mode=edit&id=${addFormResponse.data.id}`;
                    }else{
                        setState({
                            ...state,
                            formCreationResponse: addFormResponse,
                        });
                    }
                })
        }else{
            setState({
                ...state,
                formCreationResponse: {
                    statusCode: 500,
                    message: 'Please enter form name'
                },
            });
        }
    }

    /* Handle Delete Modal Cancelation */
    const handleCancel = (e) => {
        e.preventDefault();
        setFormState({
            ...formState,
            createFormModalStatus: 'close',
        });
    };

    function onlySpaces(str) {
        return str.trim().length === 0;
    }

    return(
        <div className="wpwax-vm-create-form-modal">
            <Modal
                title='Create Form'
                handleCancel={(e) => handleCancel(e)}
                status={formState.createFormModalStatus}
                footer={false}
            >
                <div className="wpwax-hg-create-form">
                    <form action="" onSubmit={handleCreateForm}>
                        {state.formCreationResponse.statusCode === 403 ? <span className="wpwax-vm-danger-text">Please Try Again</span> : null}
                        <div className="wpwax-vm-form-group">
                            <input type="text" className="wpwax-vm-form__element" id="wpwax-vm-chat-title" placeholder="Form Name" value={state.defaultForm.name} onChange={(e) => handleChangeInputValue(e)}/>
                            {state.formCreationResponse.statusCode === 500 ? <span className="wpwax-vm-danger-text">{state.formCreationResponse.message}</span> : null}
                        </div>
                        <button type="submit" className={ onlySpaces(state.defaultForm.name) ? 'wpwax-vm-btn wpwax-vm-btn-dark wpwax-vm-btn-block wpwax-vm-btn-disabled' : 'wpwax-vm-btn wpwax-vm-btn-dark wpwax-vm-btn-block'} disabled={onlySpaces(state.defaultForm.name) ? true : false}>Create Form</button>
                    </form>
                </div>
            </Modal>
        </div>
        
    );
}

export default CreateFormModal;