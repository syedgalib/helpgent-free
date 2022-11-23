import useAPI from './useAPI';

export default function useMessangerAPI() {
	const routeBase = 'messages';
	const { getItems, getItem, createItem, updateItem, deleteItem } = useAPI( routeBase );

	return {
		getItems,
		getItem,
		createItem,
		updateItem,
		deleteItem,
	};

}