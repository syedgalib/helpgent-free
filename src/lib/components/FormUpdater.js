import { useDispatch, useSelector } from 'react-redux';

const FormUpdater = (label, value,formInitialData) => {

    let updatedData = formInitialData.map(item => {
        switch (label) {
            case "name":
                return { ...item, name: value };
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
                        show_description: value
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
    // dispatch(handleDynamicEdit(updatedData));
}

export default FormUpdater;