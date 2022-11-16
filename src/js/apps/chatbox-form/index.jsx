import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";

import store from './store/store';
import App from "./App.jsx";

document.addEventListener("DOMContentLoaded", function () {
	const container = document.getElementById("helpgent-form");
	if ( ! container) {
		return;
	}

	let formID = container.getAttribute( 'data-id' );
	formID = ( formID ) ? parseInt( formID ) : 0;

	createRoot( container ).render(
		<Provider store={store}>
			<App id={formID} />
		</Provider>
	)
});
