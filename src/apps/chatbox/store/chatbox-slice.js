import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import api from "Chatbox/helpers/api";

const initialState = {
	sending: false,
	success: false,
	data: {},
	displayChatScreen: false,
	chatScreen: "welcome", // welcome, video, audio, text, screenRecord, contactForm, sending, success
	chatStep: 1, // 1,2,3,4 etc + contact, sending, success
};

export const send = createAsyncThunk(
	"chatBox/send",
	async ({ name, email }, thunkAPI) => {
		const data = thunkAPI.getState().data;

		try {
			let result = await api.sendMessage(name, email, data);
			return thunkAPI.fulfillWithValue(result);
			// console.log("success");
			// console.log(result);
		} catch (error) {
			let result = error.response.data;
			// console.log("error");
			// console.log(result);
			return thunkAPI.rejectWithValue(result);
		}

		// console.log("api");
		// console.log(data);
		// api.sendMessage(name, email, data)
		// 	.then(function (response) {
		// 		console.log("success");
		// 		console.log(response);
		// 		return response;
		// 	})
		// 	.catch(function (e) {
		// 		let result = e.response.data;
		// 		console.log("error");
		// 		console.log(result);
		// 		return thunkAPI.rejectWithValue(result);
		// 	});
	}
);

const chatBoxSlice = createSlice({
	name: "chatBox",
	initialState,
	reducers: {
		toggleDisplayChatScreen(state) {
			state.displayChatScreen = !state.displayChatScreen;
		},
		chatScreen(state, action) {
			state.chatScreen = action.payload;
		},
		chatStep(state, action) {
			state.chatStep = action.payload;
		},
		back(state) {
			if (state.chatStep > 1) {
				state.chatStep -= 1;
			} else {
				state.chatScreen = "welcome";
			}
		},
		reset() {
			return initialState;
		},
		setData(state, action) {
			state.data = action.payload;
		},
	},
	extraReducers: {
		[send.pending]: (state) => {
			console.log("pending");
			// state.chatScreen = "sending";
			console.log(action);
		},
		[send.fulfilled]: (state, { payload }) => {
			console.log("fulfilled");
			// state.chatScreen = "success";
			console.log(payload);
		},
		[send.rejected]: (state, action) => {
			// let message = payload.message;
			console.log(action);
		},
	},
});

export const chatBoxActions = chatBoxSlice.actions;

export default chatBoxSlice;
