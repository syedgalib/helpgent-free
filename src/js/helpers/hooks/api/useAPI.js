import http from 'Helper/http';
import { getTimezoneString } from 'Helper/utils';

export function useAPI( routeBase ) {
	const { getResponse, getData, postData, updateData, deleteData } = http;

	/**
	 * Get Items
	 *
	 * @param {object} args
	 * @returns {object} status
	 */
	async function getItems( args ) {

		const request = async function( args ) {
			if ( args && typeof args === 'object' ) {
				args.timezone = getTimezoneString();
			}

			return await getData( routeBase, args );
		}

		return await getResponse( request, args );
	}

	/**
	 * Get Item
	 *
	 * @param {int} id
	 * @returns {object} status
	 */
	async function getItem( id ) {

		const request = async function( id ) {
			const args = { timezone:  getTimezoneString() };
			return await getData( `${routeBase}/${id}`, args );
		}

		return await getResponse( request, id );
	}

	/**
	 * Create Item
	 *
	 * @param {object} args
	 * @returns {object} status
	 */
	async function createItem( args ) {

		const request = async function( args ) {
			return await postData( routeBase, args );
		}

		return await getResponse( request, args );
	}

	/**
	 * Update Item
	 *
	 * @param {int} id
	 * @param {object} args
	 * @returns {object} status
	 */
	async function updateItem( id, args ) {

		const request = async function( args ) {
			if ( args && typeof args === 'object' ) {
				args.timezone = getTimezoneString();
			}

			return await updateData( `${routeBase}/${args.id}`, args.params );
		}

		return await getResponse( request, { id, params: args } );
	}

	/**
	 * Delete Item
	 *
	 * @param {int} id
	 * @returns {object} status
	 */
	async function deleteItem( id ) {

		const request = async function( args ) {
			return await deleteData( `${routeBase}/${args.id}` );
		}

		return await getResponse( request, { id, params: args } );
	}

	return {
		getItems,
		getItem,
		createItem,
		updateItem,
		deleteItem,
	};

}