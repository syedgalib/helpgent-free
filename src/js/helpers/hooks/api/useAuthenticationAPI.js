import http from 'Helper/http';

export default function useAuthenticationAPI() {
	const routeBase = 'authentication';

	const { getResponse, postData } = http;

	/**
	 * Create Token
	 *
	 * @param {object} args { email: '', password: '' }
	 * @returns {object} status
	 */
	 async function createToken( args, config ) {

		const request = async function( args, config ) {
			return await postData( `${routeBase}/token` , args, config );
		}

		return await getResponse( request, args, config );
	}

	/**
	 * Validate Token
	 *
	 * @param {object} args { email: '', token: '' }
	 * @returns {object} status
	 */
	 async function validateToken( args, config ) {

		const request = async function( args, config ) {
			return await postData( `${routeBase}/validate` , args, config );
		}

		return await getResponse( request, args, config );
	}

	return {
		createToken,
		validateToken,
	};

}