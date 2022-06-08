import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import store from "Chatbox/store/index";
import App from "Chatbox/App.jsx";

document.addEventListener("DOMContentLoaded", function () {
	const container = document.getElementById("wpwax-vm-chatbox");

	if ( ! container) {
		return;
	}

	const root = createRoot( container );

	root.render(
		<Provider store={store}>
			<App />
		</Provider>
	);
});
