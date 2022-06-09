import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./App";

document.addEventListener("DOMContentLoaded", function () {
	const container = document.getElementById("wpwax-vm-chatbox");

	if ( ! container) {
		return;
	}

	const root = createRoot( container );
	console.log("chat")

	root.render(
		<Provider store={store}>
			<App />
		</Provider>
	);
});
