import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

import { updateFormData as updateMessengerFormData } from "./messenger/actionCreator.js";

function useFormHooks() {
    const dispatch = useDispatch();

    // States
    // ----------------------------------------------------------
    const { templateOpions } = useSelector( state => {
        return {
            templateOpions: state.chatboxTemplate.template.options,
        };
    });

    // Set Intitial Form Data
    // ----------------------------------------------------------
	useEffect(() => {
		let messengerFormData = {};

		if ( wpWaxCustomerSupportApp_CoreScriptData && wpWaxCustomerSupportApp_CoreScriptData.current_user ) {
			messengerFormData.user_id = wpWaxCustomerSupportApp_CoreScriptData.current_user.id;
		}

		if ( templateOpions.tag ) {
			messengerFormData.terms = `${templateOpions.tag}`;
		}

		if ( Object.keys( messengerFormData ).length ) {
			dispatch( updateMessengerFormData( messengerFormData ) );
		}

	}, []);

    return {};
}

export { useFormHooks }