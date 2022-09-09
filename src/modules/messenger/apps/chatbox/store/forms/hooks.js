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

		if ( templateOpions.tag ) {
			dispatch( updateMessengerFormData( { terms: `${templateOpions.tag}` } ) );
		}

	}, []);

    return {};
}

export { useFormHooks }