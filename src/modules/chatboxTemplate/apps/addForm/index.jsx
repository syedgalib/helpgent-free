import { createRoot } from 'react-dom/client';
import App from "./App.jsx";

document.addEventListener("DOMContentLoaded", function () {
	const container = document.getElementById("wpwax-vm-form-edit");

	if ( ! container ) {
		return;
	}

	const root = createRoot( container );
	root.render( <App /> );
});