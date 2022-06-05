import axios from "axios";

const axiosObj = axios.create({
	baseURL: vmData.apiEndpoint,
	headers: {
		"Content-type": "application/json",
		"X-WP-Nonce": vmData.apiNonce,
	},
});

const sendMessage = async (name, email, data) => {
	if (data.type == "text") {
		return await axiosObj.post("/messages", {
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
