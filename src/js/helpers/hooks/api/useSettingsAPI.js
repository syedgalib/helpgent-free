import useAPI from './useAPI';

export default function useSettingsAPI() {
	const routeBase = '/settings';

	const { getItems, getItem, updateItem } = useAPI( routeBase );

	return {
		getItems,
		getItem,
		updateItem,
	};

}