import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "Chatbox/store/index";
import App from "Chatbox/App";

document.addEventListener("DOMContentLoaded", function () {
	const target = document.getElementById("wpwax-vm-chatbox");

	if (target) {
		ReactDOM.render(
			<Provider store={store}>
				<App />
			</Provider>,
			target
		);
	}
});
