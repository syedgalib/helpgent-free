import { useAPI } from './useAPI';

export function useAttachmentAPI() {
	const routeBase = 'attachments';
	const { getItems, getItem, createItem, updateItem, deleteItem } = useAPI( routeBase );

	return {
		getItems,
		getItem,
		createItem,
		updateItem,
		deleteItem,
	};

}