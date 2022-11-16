import useConversationAPI from "API/useConversationAPI";
import useMessangerAPI from "API/useMessangerAPI";
import actions from "./actions";

const {
    upateState,
    updateFormData,
    submitFormBegain,
    submitFormSuccess,
    submitFormError,
    reset,
} = actions;

const { createItem: createConversationItem } = useConversationAPI();
const { createItem: creatMessangerItem } = useMessangerAPI();


const submitForm = ( formData ) => {
    return async dispatch => {
        try {
            dispatch( submitFormBegain() );

            const conversation = await createConversationItem();

            formData.conversation_id = conversation.data.id;

            let response = await creatMessangerItem( formData );

            let result   = response.data;

            dispatch( submitFormSuccess( result ) );
        } catch (error) {
            dispatch( submitFormError( error.response.data.message ) );

			console.log( 'chk0', { error } );
        }
    }
};

export { upateState, updateFormData, submitForm, reset };