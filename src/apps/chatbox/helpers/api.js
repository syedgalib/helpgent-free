import axios from "axios";
import { useDispatch } from "react-redux";

const axiosObj = axios.create({
	baseURL: vmData.apiEndpoint,
	headers: {
		"Content-type": "application/json",
		"X-WP-Nonce": vmData.apiNonce,
	},
});

const sendMessage = (name, email, data) => {
	const dispatch = useDispatch();

	if (data.type == "text") {
		axiosObj
			.post("/messages", {
				name,
				email,
				message_type: "text",
				message_value: data.text,
			})
			.then(function (response) {
				dispatch(chatBoxActions.chatScreen('success'));
			})
			.catch((error) => {
				let result = error.response.data;
				console.log(result);
			});
	}
};

const api = {
	sendMessage,
};

export default api;
