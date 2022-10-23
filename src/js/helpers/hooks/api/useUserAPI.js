import http from 'Helper/http';
import useRestAPI from './useRestAPI';

export default function useUserAPI() {
	const routeBase = 'users';
	const { getRestResponse, postData } = http;

	const { getItems, getItem, createItem, updateItem, deleteItem } = useRestAPI( routeBase );

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

		return await getRestResponse( request, args );
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