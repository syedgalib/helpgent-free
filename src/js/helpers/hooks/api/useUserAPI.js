import http from 'Helper/http';
import useRestAPI from './useRestAPI';

export default function useUserAPI() {
	const routeBase = 'users';
	const { getResponse, getRestResponse, getData, postData } = http;

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

	/**
	 * Get Current User
	 *
	 * @returns {object} status
	 */
	 async function getCurrentUser() {

		const request = async function() {
			return await getData( `${routeBase}/current-user` );
		}

		return await getResponse( request );
	}

	/**
	 * Check if user exists
	 *
	 * @returns {object} status
	 */
	 async function userExists( email ) {

		const request = async function( email ) {
			return await getData( `${routeBase}/user-exists`, { email: email } );
		}

		return await getResponse( request, email );
	}

	return {
		getItems,
		getItem,
		createItem,
		updateItem,
		deleteItem,
		authenticate,
		getCurrentUser,
		userExists,
	};

}