import { generateFileNameFromBlob } from 'Helper/utils';
import useAPI from './useAPI';

export default function useWPAttachmentAPI() {
	const apiBase   = wpWaxCustomerSupportApp_CoreScriptData.apiBase;
	const routeBase = 'wp/v2/media';

	const { getItems, getItem, createItem, updateItem, deleteItem } = useAPI( routeBase, true );

	/**
	 * Create Item
	 *
	 * @param {object} args file File, link string, expires_on string
	 */
	function createAttachmentItem( args ) {
		// Set Headers
		const config = { headers: {
			'Content-Type': 'multipart/form-data',
			'Content-Disposition': 'attachment; filename=attachment',
		}};

		let formData = new FormData();

		// Prepare FormData
		if ( args && typeof args === 'object' ) {
			for ( let key in args ) {
				let fileName = '';

				if ( args[ key ] instanceof Blob ) {
					fileName = generateFileNameFromBlob( args[ key ] );
				}

				formData.append( key, args[ key ], fileName );
			}
		}

		return createItem( formData, config, apiBase );
	}

	return {
		getItems,
		getItem,
		createItem: createAttachmentItem,
		updateItem,
		deleteItem,
	};

}