import { createRoot } from 'react-dom/client';
import App from "./App.jsx";

document.addEventListener("DOMContentLoaded", function () {
	const container = document.getElementById("wpwax-vm-forms");

	if ( ! container ) {
		return;
	}

	const root = createRoot( container );
	root.render( <App /> );
});