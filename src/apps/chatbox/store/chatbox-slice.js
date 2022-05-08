import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	sending: false,
	success: false,
	data: {},
	displayChatScreen: false,
	chatScreen: "welcome", // welcome, video, audio, text, screenRecord, sending, success
	chatStep: 1, // 1,2,3,4 etc + contact, sending, success
};

const chatBoxSlice = createSlice({
	name: "chatBox",
	initialState: initialState,
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
			if ( state.chatStep > 1 ) {
				state.chatStep -= 1;
			} else {
				state.chatScreen = "welcome";
			}
		},
		reset() {
			return initialState;
		},
		sendData(state, action) {
			state.data = action.payload;
			state.sending = true;
			console.log(state.data)
		},
	},
});

export const chatBoxActions = chatBoxSlice.actions;

export default chatBoxSlice;
