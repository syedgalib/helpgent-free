import http from 'Helper/http';
import { useAPI } from './useAPI';

export function useUserAPI() {
	const routeBase = 'users';
	const { getResponse, postData } = http;

	const { getItems, getItem, createItem, updateItem, deleteItem } = useAPI( routeBase );

	/**
	 * Authenticate
	 *
	 * @param {object} args email: string, password: string
	 * @returns {object} status
	 */
	 async function authenticate( args ) {

		const request = async function( args ) {
			return await postData( `${routeBase}/authenticate`, args );
		}

		return await getResponse( request, args );
	}

	return {
		getItems,
		getItem,
		createItem,
		updateItem,
		deleteItem,
		authenticate,
	};

}