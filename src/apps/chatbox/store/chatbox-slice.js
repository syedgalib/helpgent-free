import { createSlice } from "@reduxjs/toolkit";

const chatBoxSlice = createSlice({
	name: "chatBox",
	initialState: {
		chatScreen: null, // welcome, video, audio, text, screenRecord
		chatStep: null, // 1,2,3,4 etc + contact, sending, success
	},
	reducers: {
		chatScreen(state, action) {
			state.chatScreen = action.payload;
		},
		chatStep(state, action) {
			state.chatStep = action.payload.chatStep;
		}
	},
});

export const chatBoxActions = chatBoxSlice.actions;

export default chatBoxSlice;
