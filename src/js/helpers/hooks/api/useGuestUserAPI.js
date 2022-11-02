import useRestAPI from './useRestAPI';

export default function useGuestUserAPI() {
	const routeBase = 'guest-users';

	const { getItems, getItem, createItem, updateItem, deleteItem } = useRestAPI( routeBase );

	return {
		getItems,
		getItem,
		createItem,
		updateItem,
		deleteItem,
	};

}