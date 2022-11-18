import http from 'Helper/http';
import { getTimezoneString } from 'Helper/utils';
import { useState } from 'react';



export default function useAPI( routeBase, returnRestResponse ) {
	const { getResponse, getRestResponse, getData, postData, updateData, deleteData } = http;

	/**
	 * Get Items
	 *
	 * @param {object} args
	 * @returns {object} status
	 */
	async function getItems( args, apiBase ) {

		const request = async function( args, config, apiBase ) {
			if ( args && typeof args === 'object' ) {
				args.timezone = getTimezoneString();
			}

			return await getData( routeBase, args, apiBase );
		}

		if ( returnRestResponse ) {
			return await getRestResponse( request, args, null, apiBase );
		}

		return await getResponse( request, args, null, apiBase );
	}

	/**
	 * Get Item
	 *
	 * @param {int} id
	 * @returns {object} status
	 */
	async function getItem( id, apiBase ) {

		const request = async function( id, config, apiBase ) {
			const args = { timezone:  getTimezoneString() };
			return await getData( `${routeBase}/${id}`, args, apiBase );
		}

		if ( returnRestResponse ) {
			return await getRestResponse( request, id, null, apiBase );
		}

		return await getResponse( request, id, null, apiBase );
	}

	/**
	 * Create Item
	 *
	 * @param {object} args
	 * @returns {object} status
	 */
	async function createItem( args, config, apiBase ) {

		const request = async function( args, config, apiBase ) {
			return await postData( routeBase, args, config, apiBase );
		}

		if ( returnRestResponse ) {
			return await getRestResponse( request, args, config, apiBase );
		}

		return await getResponse( request, args, config, apiBase );
	}

	/**
	 * Update Item
	 *
	 * @param {int} id
	 * @param {object} args
	 * @returns {object} status
	 */
	async function updateItem( id, args, config, apiBase ) {

		const request = async function( args, config, apiBase ) {
			if ( args && typeof args === 'object' ) {
				args.timezone = getTimezoneString();
			}

			return await updateData( `${routeBase}/${args.id}`, args.params, config, apiBase );
		}

		if ( returnRestResponse ) {
			return await getRestResponse( request, { id, params: args }, config, apiBase );
		}

		return await getResponse( request, { id, params: args }, config, apiBase );
	}

	/**
	 * Delete Item
	 *
	 * @param {int} id
	 * @param {object} args
	 * @returns {object} status
	 */
	 async function deleteItem( id, args, apiBase ) {

		const request = async function( args, config, apiBase ) {

			const params = ( typeof args.params !== 'undefined' ) ? args.params : {};

			return await deleteData( `${routeBase}/${args.id}`, params, null, apiBase );
		}

		if ( returnRestResponse ) {
			return await getRestResponse( request, { id, params: args }, null, apiBase );
		}

		return await getResponse( request, { id, params: args }, null, apiBase );
	}

	return {
		getItems,
		getItem,
		createItem,
		updateItem,
		deleteItem,
	};

}