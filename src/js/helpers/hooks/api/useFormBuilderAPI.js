import { useAPI } from './useAPI';

export function useFormBuilderAPI() {
	const routeBase = 'chatbox-templates';
	const { getItems, getItem, createItem, updateItem, deleteItem } = useAPI( routeBase );

	return {
		getItems,
		getItem,
		createItem,
		updateItem,
		deleteItem,
	};

}