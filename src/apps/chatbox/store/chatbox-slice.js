import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
	sending: false,
	success: false,
	data: {},
	displayChatScreen: false,
	chatScreen: "welcome", // welcome, video, audio, text, screenRecord, contactForm, sending, success
	chatStep: 1, // 1,2,3,4 etc + contact, sending, success
};

function send(name, email, data) {
	if ( data.type == 'text' ) {
		console.log(current(data.text));
	}
	// alert(data.text);
	// console.log({ name, email, data });
}

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
			console.log(state.data);
		},
		send(state, action) {
			state.sending = true;

			let name = action.payload.name;
			let email = action.payload.email;
			let data = state.data;

			send(name, email, data);
		},
	},
});

export const chatBoxActions = chatBoxSlice.actions;

export default chatBoxSlice;
