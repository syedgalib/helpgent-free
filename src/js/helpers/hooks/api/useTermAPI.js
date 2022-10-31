import useAPI from './useAPI';

export default function useTermAPI() {
	const routeBase = 'terms';

	const { getItems, getItem, createItem, updateItem, deleteItem } = useAPI( routeBase );

	return {
		getItems,
		getItem,
		createItem,
		updateItem,
		deleteItem,
	};

}