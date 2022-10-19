import http from 'Helper/http';
import useAPI from './useAPI';

export default function useSessionAPI() {
	const routeBase = 'sessions';
	const { getResponse, postData, updateData, } = http;
	const { getItems, getItem, deleteItem } = useAPI( routeBase );

	/**
	 * Mark as read
	 *
	 * @param {string} session_id
	 * @returns {object} status
	 */
	 async function markAsRead( session_id ) {

		const request = async function( session_id ) {
			return await updateData( `${routeBase}/${session_id}/mark-as-read` );
		}

		return await getResponse( request, session_id );
	}

	/**
	 * Mark as unread
	 *
	 * @param {string} session_id
	 * @returns {object} status
	 */
	 async function markAsUnread( session_id ) {

		const request = async function( session_id ) {
			return await updateData( `${routeBase}/${session_id}/mark-as-unread` );
		}

		return await getResponse( request, session_id );
	}

	/**
	 * Update Terms
	 *
	 * @param {string} session_id
	 * @param {object} params add_term_ids: string, remove_term_ids: string
	 * @returns {object} status
	 */
	 async function updateTerms( session_id, params ) {

		const request = async function( args ) {
			return await updateData( `${routeBase}/${args.session_id}/update-terms`, args.params );
		}

		return await getResponse( request, { session_id, params } );
	}

	/**
	 * Add Terms
	 *
	 * @param {string} session_id
	 * @param {object} params term_id: string
	 * @returns {object} status
	 */
	 async function addTerms( session_id, params ) {

		const request = async function( args ) {
			return await postData( `${routeBase}/add-terms`, args.params );
		}

		return await getResponse( request, { session_id, params } );
	}

	/**
	 * Remove Terms
	 *
	 * @param {string} session_id
	 * @param {object} params term_id: string
	 * @returns {object} status
	 */
	 async function removeTerms( session_id, params ) {

		const request = async function( args ) {
			return await updateData( `${routeBase}/remove-terms`, args.params );
		}

		return await getResponse( request, { session_id, params } );
	}

	return {
		getItems,
		getItem,
		deleteItem,
		markAsRead,
		markAsUnread,
		updateTerms,
		addTerms,
		removeTerms,
	};

}