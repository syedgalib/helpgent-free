import useAPI from './useAPI';
import { generateFileNameFromBlob } from 'Helper/utils';

export default function useAttachmentAPI() {
	const routeBase = 'attachments';
	const { getItems, getItem, createItem, updateItem, deleteItem } = useAPI( routeBase );

	/**
	 * Create Item
	 *
	 * @param {object} args file File, link string, expires_on string
	 */
	function createAttachmentItem( args ) {
		// Set Headers
		const config = { headers: {
			'Content-Type': 'multipart/form-data',
		}};

		let formData = new FormData();

		// Prepare FormData
		if ( args && typeof args === 'object' ) {
			for ( let key in args ) {
				if ( args[ key ] instanceof Blob ) {
					const fileName = generateFileNameFromBlob( args[ key ] );
					formData.append( key, args[ key ], fileName );
					continue;
				}

				formData.append( key, args[ key ] );
			}
		}

		return createItem( formData, config );
	}

	return {
		getItems,
		getItem,
		createItem: createAttachmentItem,
		updateItem,
		deleteItem,
	};

}