const FormUpdater = (label, value,formInitialData) => {
    let updatedData = formInitialData.map(item => {
        switch (label) {
            case "wpwax-vm-form-name":
                return {
                    ...item,
                    name: value
                }
			case "wpwax-vm-tag":
				return {
					...item,
					options: {
                        ...item.options,
                        tag: value
                    }
				}
            case "wpwax-vm-theme":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        theme: value
                    }
                }
            case "wpwax-vm-display-default":
                if(value){
                    return {
                        ...item,
                        pages: "",
                        show_on_all_pages: value
                    }
                }else{
                    return {
                        ...item,
                        show_on_all_pages: value
                    }
                }
            case "wpwax-vm-display-custom-pages":
                return {
                    ...item,
                    pages: value,
                }
            case "chat-visibility":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        chat_visibility_type: value
                    }
                }
            case "wpwax-vm-info-collection":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        collectInfo: value
                    }
                }
            case "wpwax-vm-send-mail":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        send_mail_upon_message_submission: value
                    }
                }
            case "greet-media-image":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        greet_image_url: value,
                        greet_video_url: ''
                    }
                }
            case "greet-media-video":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        greet_image_url: '',
                        greet_video_url: value
                    }
                }
            case "wpwax-vm-greet-msg":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        greet_message: value
                    }
                }
            case "wpwax-vm-description-visibility":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        show_description: value
                    }
                }
            case "wpwax-vm-description":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        description: value
                    }
                }
            case "wpwax-vm-chat-title":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        chat_options_title: value
                    }
                }
            case "chat-type":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        can_replay_in: value
                    }
                }
            case "wpwax-vm-footer-msg-visibility":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        show_footer: value
                    }
                }
            case "wpwax-vm-footer-msg":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        footer_message: value
                    }
                }
            case "wpwax-vm-play-btn-bg":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        play_btn_background: value
                    }
                }
            case "wpwax-vm-fontfamily":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        font_family: value
                    }
                }
            case "wpwax-vm-fontsize":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        font_size: value
                    }
                }
            case "wpwax-vm-greet-fontsize":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        greet_message_font_size: value
                    }
                }
            case "wpwax-vm-chat-title-fontsize":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        chat_options_title_font_size: value
                    }
                }
            case "wpwax-vm-form-color":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        font_color: value
                    }
                }
            case "wpwax-vm-greet-color":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        greet_message_font_color: value
                    }
                }
            case "wpwax-vm-chat-title-color":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        chat_options_title_font_color: value
                    }
                }
            case "wpwax-vm-form-primray-button-color":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        primary_button_font_color: value
                    }
                }
            case "wpwax-vm-form-btn-radius":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        button_border_radius: value
                    }
                }
            case "wpwax-vm-page-bg-color":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        page_background_color: value
                    }
                }
            case "wpwax-vm-pageheader-bg":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        page_header_background_color: value
                    }
                }
            case "wpwax-vm-form-primary-button-bg":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        primary_button_background_color: value
                    }
                }
            case "wpwax-vm-footer-text-color":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        footer_message_color: value
                    }
                }
            case "wpwax-vm-chat-footer-text-fontsize":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        footer_message_font_size: value
                    }
                }
            case "wpwax-vm-thank-title":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        thank_page_title: value
                    }
                }
            case "wpwax-vm-thank-description-visibility":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        show_thank_page_description: value
                    }
                }
            case "wpwax-vm-thank-description":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        thank_page_description: value
                    }
                }
            case "wpwax-vm-thank-bg-color":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        thank_page_background_color: value
                    }
                }
            case "wpwax-vm-thank-fontsize":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        thank_page_title_font_size: value
                    }
                }
            case "wpwax-vm-thank-description-fontsize":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        thank_page_description_font_size: value
                    }
                }
            case "wpwax-vm-thank-title-color":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        thank_page_title_color: value
                    }
                }
            case "wpwax-vm-thank-description-color":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        thank_page_description_color: value
                    }
                }
            case "wpax-vm-cta-btn-visibility":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        show_thank_page_cta_button: value
                    }
                }
            case "wpwax-vm-cta-btn-text":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        thank_page_cta_button_text: value
                    }
                }
            case "wpwax-vm-cta-btn-url":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        thank_page_cta_button_url: value
                    }
                }
            case "theme":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        theme: value
                    }
                }
            case "display-page":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        display_on_all_pages: value
                    }
                }
            case "page-id":
                return { ...item, page_ids: value }
            case "wpwax-vm-form-bg-color":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        page_background_color: value
                    }
                }
            case "wpwax-vm-font-family":
                return {
                    ...item,
                    options: {
                        ...item.options,
                        font_family: value
                    }
                }
            default:
            // code block
        }
    });
    return updatedData;
}
export default FormUpdater;