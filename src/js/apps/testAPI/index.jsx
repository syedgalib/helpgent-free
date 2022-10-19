import { createRoot } from 'react-dom/client';
import App from "./App.jsx";

document.addEventListener("DOMContentLoaded", function () {
	const containerElement = document.createElement( 'div' );
	containerElement.setAttribute( 'id', 'wpwaxTestAPIApp' );
	document.querySelector( 'body' ).append( containerElement );

	const container = document.getElementById("wpwaxTestAPIApp");
	createRoot( container ).render( <App/> );
});
