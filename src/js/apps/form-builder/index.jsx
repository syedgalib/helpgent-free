import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from "./App.jsx";

import store from './store/store';

document.addEventListener("DOMContentLoaded", function () {
	const container = document.getElementById("wpwax-vm-form-edit");

	if ( ! container ) {
		return;
	}

	const root = createRoot( container );
	root.render( <Provider store={store}><App /></Provider> );
});