import useAPI from './useAPI';

export default function useAttachmentAPI() {
	const routeBase = 'attachments';
	const { getItems, getItem, updateItem, deleteItem } = useAPI( routeBase );

	/**
	 * Create Item
	 *
	 * @param {object} args file File, link string, expires_on string
	 */
	function createItem( args ) {

		// Set Headers
		const config = { headers: {
			'Content-Type': 'multipart/form-data',
		}};

		// Convert args to FormData
		if ( args && typeof args === 'object' ) {
			const formData = new FormData();

			for ( let key in args ) {
				formData.append( key, args[ key ] );
			}

			args = formData;
		}

		return createItem( args, config );

	}

	return {
		getItems,
		getItem,
		createItem,
		updateItem,
		deleteItem,
	};

}