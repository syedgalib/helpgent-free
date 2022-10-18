import http from 'Helper/http';
import useAPI from './useAPI';

export default function useMessangerAPI() {
	const routeBase = 'messages';
	const { getResponse, getData, postData, deleteData } = http;

	const { getItems, getItem, createItem, updateItem, deleteItem } = useAPI( routeBase );

	/**
	 * Get Seen By
	 *
	 * @param {int} id
	 * @returns {object} status
	 */
	 async function getSeenBy( id ) {

		const request = async function( id ) {
			return await getData( `${routeBase}/${id}/seen-by` );
		}

		return await getResponse( request, id );
	}

	/**
	 * Create Seen By
	 *
	 * @param {int} id
	 * @returns {object} status
	 */
	 async function createSeenBy( id ) {

		const request = async function( id ) {
			return await postData( `${routeBase}/${id}/seen-by` );
		}

		return await getResponse( request, id );
	}

	/**
	 * Delete Seen By
	 *
	 * @param {int} id
	 * @returns {object} status
	 */
	 async function deleteSeenBy( id ) {

		const request = async function( id ) {
			return await deleteData( `${routeBase}/${id}/seen-by` );
		}

		return await getResponse( request, id );
	}

	return {
		getItems,
		getItem,
		createItem,
		updateItem,
		deleteItem,
		getSeenBy,
		createSeenBy,
		deleteSeenBy,
	};

}