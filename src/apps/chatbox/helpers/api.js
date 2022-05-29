import axios from "axios";

const axiosObj = axios.create({
	baseURL: vmData.apiEndpoint,
	headers: {
		"Content-type": "application/json",
		"X-WP-Nonce": vmData.apiNonce,
	},
});

const sendMessage = (name, email, data) => {
	if (data.type == "text") {
		return axiosObj.post("/messages", {
			name,
			email,
			message_type: "text",
			message_value: data.text,
		});
	}
};

const api = {
	axiosObj,
	sendMessage,
};

export default api;
