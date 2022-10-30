import useAPI from './useAPI';

export default function useFormAPI() {
	const routeBase = 'forms';
	const { getItems, getItem, createItem, updateItem, deleteItem } = useAPI( routeBase );

	return {
		getItems,
		getItem,
		createItem,
		updateItem,
		deleteItem,
	};

}