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
		console.log(data)
		console.log('api')
		api.sendMessage(name, email, data).then(function (response) {
			console.log(response);
			return response;
		});
		// const result = await api.sendMessage(name, email, data);
		// console.log(result)
		// console.log('showing result')
		// return result;
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
		// async send(state, action) {
		// 	state.chatScreen = "sending";

		// 	let name = action.payload.name;
		// 	let email = action.payload.email;
		// 	let data = state.data;

		// 	let result = await api.sendMessage(name, email, data);
		// 	console.log(result)

		// 	// send(name, email, data);
		// },
	},
	extraReducers: (builder) => {
		builder.addCase(send.pending, (state, action) => {
			console.log("pending");
			// state.chatScreen = "sending";
			console.log(action);
		});
		builder.addCase(send.fulfilled, (state, action) => {
			console.log("fulfilled");
			// state.chatScreen = "success";
			console.log(action);
		});
		builder.addCase(send.rejected, (state, action) => {
			console.log("rejected");
			console.log(action);
			// state.chatScreen = "contactForm";
		});
	},
});

export const chatBoxActions = chatBoxSlice.actions;

export default chatBoxSlice;
