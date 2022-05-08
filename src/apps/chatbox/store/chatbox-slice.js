import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	displayChatScreen: false,
	chatScreen: "welcome", // welcome, video, audio, text, screenRecord
	chatStep: 1, // 1,2,3,4 etc + contact, sending, success
};

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
			state.chatStep = action.payload.chatStep;
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
	},
});

export const chatBoxActions = chatBoxSlice.actions;

export default chatBoxSlice;
