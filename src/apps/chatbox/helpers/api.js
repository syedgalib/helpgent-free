import axios from "axios";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";

const axiosObj = axios.create({
	baseURL: vmData.apiEndpoint,
	headers: {
		"Content-type": "application/json",
		"X-WP-Nonce": vmData.apiNonce,
	},
});

const sendMessage2 = (name, email, data) => {
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
				dispatch(chatBoxActions.chatScreen("success"));
			})
			.catch((error) => {
				let result = error.response.data;
				console.log(result);
			});
	}
};

const sendMessage3 = createAsyncThunk(
	"chatBox/sendMessage",
	async ({ name, email, data }, thunkAPI) => {
		let response;
		if (data.type == "text") {
			response = await axiosObj.post("/messages", {
				name,
				email,
				message_type: "text",
				message_value: data.text,
			});
		}

		console.log(response);

		return response.data;
	}
);

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
