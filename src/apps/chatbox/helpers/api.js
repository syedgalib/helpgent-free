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
		axiosObj
			.post("/messages", {
				name,
				email,
				message_type: "text",
				message_value: data.text,
			})
			.then(function (response) {
				console.log(response.response);
			});
	}
};

const api = {
	sendMessage
};

export default api;
