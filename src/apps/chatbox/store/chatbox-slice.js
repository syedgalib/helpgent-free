import { createSlice } from "@reduxjs/toolkit";

const chatBoxSlice = createSlice({
	name: "chatBox",
	initialState: {
		showChatBox: false,
		chatType: null, // video, audio, text, screenRecord
		chatStep: null, // 1,2,3,4 etc + contact, sending, success
	},
	reducers: {
		toggleChatBoxDisplay(state) {
			state.showChatBox = !state.showChatBox;
		},
		chatType(state, action) {
			state.chatType = action.payload.chatType;
		},
		chatStep(state, action) {
			state.chatStep = action.payload.chatStep;
		}
	},
});

export const chatBoxActions = chatBoxSlice.actions;

export default chatBoxSlice;
