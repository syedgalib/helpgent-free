import useAPI from './useAPI';

export default function useGuestUserAPI() {
	const routeBase = 'guest-users';

	const { getItems, getItem, createItem, updateItem, deleteItem } = useAPI( routeBase );

	return {
		getItems,
		getItem,
		createItem,
		updateItem,
		deleteItem,
	};

}