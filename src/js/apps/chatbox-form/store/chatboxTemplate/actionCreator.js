import { parseInteger } from "Helper/parser";
import useFormAPI from "API/useFormAPI";
import actions from "./actions";

const {
    loadTemplateBegain,
    loadTemplateSuccess,
    loadTemplateError,
} = actions;

const { getItems: getFormItems } = useFormAPI();

const loadTemplate = () => {
    return async dispatch => {
        try {
            dispatch( loadTemplateBegain() );

            const isFrontPage = parseInteger( wpWaxCustomerSupportApp_CoreScriptData.isFrontPage, 0 );
            const isHome      = parseInteger( wpWaxCustomerSupportApp_CoreScriptData.isHome, 0 );

            const currentPageID = parseInteger( wpWaxCustomerSupportApp_CoreScriptData.currentPageID, 0 );
            const pageID        = ( isFrontPage || isHome ) ? 0 : currentPageID;
            const args          = { pages: pageID };

            const response = await getFormItems( args );

            let result   = response.data;

            dispatch( loadTemplateSuccess( result ) );
        } catch (error) {
            dispatch( loadTemplateError( error ) );
        }
    }
};

export { loadTemplate, loadTemplateSuccess };