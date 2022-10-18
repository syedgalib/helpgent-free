import { useAPI } from './useAPI';

export function useMessangerAPI() {
	const routeBase = 'messages/terms';

	const { getItems, getItem, createItem, updateItem, deleteItem } = useAPI( routeBase );

	return {
		getItems,
		getItem,
		createItem,
		updateItem,
		deleteItem,
	};

}