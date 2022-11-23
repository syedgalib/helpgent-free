import http from 'Helper/http';

export default function useSettingsAPI() {
	const routeBase = '/license';
	const { getResponse, updateData } = http;

	/**
	 * Update Item
	 *
	 * @param {int} id
	 * @param {object} args
	 * @returns {object} status
	 */
	 async function updateItem( args, config ) {

		const request = async function( args, config ) {
			return await updateData( `${routeBase}`, args.params, config );
		}

		return await getResponse( request, { params: args }, config );
	}

	return {
		updateItem,
	};

}