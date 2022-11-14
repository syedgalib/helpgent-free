import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from "./App.jsx";
import store from './store/store';

document.addEventListener("DOMContentLoaded", function () {
	const container = document.getElementById("wpwax-vm-forms");

	if ( ! container ) {
		return;
	}

	const root = createRoot( container );
	root.render( <Provider store={store}><App /></Provider> );
});