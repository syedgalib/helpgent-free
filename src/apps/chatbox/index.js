import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from 'Chatbox/store/index';
import App from "Chatbox/App";

document.addEventListener("DOMContentLoaded", function () {
	window.store = store; // for debugging, remove later
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById("wpwax-vm-chatbox")
	);
});
