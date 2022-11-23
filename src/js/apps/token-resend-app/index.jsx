import { createRoot } from 'react-dom/client';
import App from "./App.jsx";

document.addEventListener("DOMContentLoaded", function () {
	const container = document.getElementById("wpwax-vm-token-resend-app");
	if ( ! container ) {
		return;
	}

	let tokenEmail = container.getAttribute( 'data-token-email' );
	tokenEmail = ( tokenEmail ) ? tokenEmail : '';

	createRoot(container).render( <App tokenEmail={tokenEmail} /> );
});

