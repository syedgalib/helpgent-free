import { parseInteger } from "Helper/parser";
import actions from "./actions";
import api from './api';

const { 
    loadTemplateBegain, 
    loadTemplateSuccess, 
    loadTemplateError,
} = actions;

const loadTemplate = () => {
    return async dispatch => {
        try {
            dispatch( loadTemplateBegain() );

            const isFrontPage = parseInteger( wpWaxCustomerSupportApp_CoreScriptData.isFrontPage, 0 );
            const isHome      = parseInteger( wpWaxCustomerSupportApp_CoreScriptData.isHome, 0 );
            
            const currentPageID = parseInteger( wpWaxCustomerSupportApp_CoreScriptData.currentPageID, 0 );
            const pageID        = ( isFrontPage || isHome ) ? 0 : currentPageID;

            let response = await api.getChatboxTemplate({ pageID: pageID });
            let result   = response.data;

            dispatch( loadTemplateSuccess( result ) );
        } catch (error) {
            dispatch( loadTemplateError( error ) );
        }
    }
};

export { loadTemplate };