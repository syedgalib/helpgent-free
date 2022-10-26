import http from 'Helper/http';
import { getTimezoneString } from 'Helper/utils';

export default function useRestAPI( routeBase ) {
	const { getRestResponse, getData, postData, updateData, deleteData } = http;

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

		return await getRestResponse( request, args );
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

		return await getRestResponse( request, id );
	}

	/**
	 * Create Item
	 *
	 * @param {object} args
	 * @returns {object} status
	 */
	async function createItem( args, config ) {

		const request = async function( args, config ) {
			return await postData( routeBase, args, config );
		}

		return await getRestResponse( request, args, config );
	}

	/**
	 * Update Item
	 *
	 * @param {int} id
	 * @param {object} args
	 * @returns {object} status
	 */
	async function updateItem( id, args, config ) {

		const request = async function( args, config ) {
			if ( args && typeof args === 'object' ) {
				args.timezone = getTimezoneString();
			}

			return await updateData( `${routeBase}/${args.id}`, args.params, config );
		}

		return await getRestResponse( request, { id, params: args }, config );
	}

	/**
	 * Delete Item
	 *
	 * @param {int} id
	 * @param {object} args
	 * @returns {object} status
	 */
	async function deleteItem( id, args ) {

		const request = async function( args ) {

			const params = ( typeof args.params !== 'undefined' ) ? args.params : {};

			return await deleteData( `${routeBase}/${args.id}`, params );
		}

		return await getRestResponse( request, { id, params: args } );
	}

	return {
		getItems,
		getItem,
		createItem,
		updateItem,
		deleteItem,
	};

}