const actions = {
    LOAD_TEMPLATE_BEGAIN: 'LOAD_TEMPLATE_BEGAIN',
    LOAD_TEMPLATE_SUCCESS: 'LOAD_TEMPLATE_SUCCESS',
    LOAD_TEMPLATE_ERROR: 'LOAD_TEMPLATE_ERROR',

    loadTemplateBegain: () => {
        return {
            type: actions.LOAD_TEMPLATE_BEGAIN,
        }
    },
    loadTemplateSuccess: ( response ) => {
        return {
            type: actions.LOAD_TEMPLATE_SUCCESS,
            payload: response,
        }
    },
    loadTemplateError: ( response ) => {
        return {
            type: actions.LOAD_TEMPLATE_ERROR,
            payload: response,
        }
    },
};

export default actions;