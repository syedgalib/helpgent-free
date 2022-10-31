import useAPI from './useAPI';
import http from 'Helper/http';

export default function useSettingsAPI() {
	const routeBase = '/settings';
	const { getResponse, updateData } = http;
	const { getItems, getItem, deleteItem } = useAPI( routeBase );

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
		getItems,
		getItem,
		updateItem,
		deleteItem,
	};

}