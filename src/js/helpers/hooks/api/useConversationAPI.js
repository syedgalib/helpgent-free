import http from 'Helper/http';
import useAPI from './useAPI';

export default function useConversationAPI() {
	const routeBase = 'conversations';
	const { getResponse, postData, updateData, } = http;
	const { getItems, getItem, createItem, updateItem, deleteItem } = useAPI( routeBase );

	/**
	 * Mark as read
	 *
	 * @param {string} conversation_id
	 * @returns {object} status
	 */
	 async function markAsRead( conversation_id ) {

		const request = async function( conversation_id ) {
			return await updateData( `${routeBase}/${conversation_id}/mark-as-read` );
		}

		return await getResponse( request, conversation_id );
	}

	/**
	 * Mark as unread
	 *
	 * @param {string} conversation_id
	 * @returns {object} status
	 */
	 async function markAsUnread( conversation_id ) {

		const request = async function( conversation_id ) {
			return await updateData( `${routeBase}/${conversation_id}/mark-as-unread` );
		}

		return await getResponse( request, conversation_id );
	}

	/**
	 * Update Terms
	 *
	 * @param {string} conversation_id
	 * @param {object} params add_term_ids: string, remove_term_ids: string
	 * @returns {object} status
	 */
	 async function updateTerms( conversation_id, params ) {

		const request = async function( args ) {
			return await updateData( `${routeBase}/${args.conversation_id}/update-terms`, args.params );
		}

		return await getResponse( request, { conversation_id, params } );
	}

	/**
	 * Add Terms
	 *
	 * @param {string} conversation_id
	 * @param {object} params term_id: string
	 * @returns {object} status
	 */
	 async function addTerms( conversation_id, params ) {

		const request = async function( args ) {
			return await updateData( `${routeBase}/${args.conversation_id}/add-terms`, args.params );
		}

		return await getResponse( request, { conversation_id, params } );
	}

	/**
	 * Remove Terms
	 *
	 * @param {string} conversation_id
	 * @param {object} params term_id: string
	 * @returns {object} status
	 */
	 async function removeTerms( conversation_id, params ) {

		const request = async function( args ) {
			return await updateData( `${routeBase}/${args.conversation_id}/remove-terms`, args.params );
		}

		return await getResponse( request, { conversation_id, params } );
	}

	return {
		getItems,
		getItem,
		createItem,
		updateItem,
		deleteItem,
		markAsRead,
		markAsUnread,
		updateTerms,
		addTerms,
		removeTerms,
	};

}