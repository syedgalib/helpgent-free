import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

function Starter() {
	ReactDOM.createRoot(document.getElementById("root")).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
	// ReactDOM.render(
	// 	<React.StrictMode>
	// 		<App />
	// 	</React.StrictMode>,
	// 	document.getElementById("root")
	// );
}

export default Starter;
