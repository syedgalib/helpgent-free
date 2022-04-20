import { createSlice } from "@reduxjs/toolkit";

const chatBoxSlice = createSlice({
	name: "chatBox",
	initialState: { showChatBox: false },
	reducers: {
		toggleChatBoxDisplay(state) {
			state.showChatBox = !state.showChatBox;
		},
	},
});

export const chatBoxActions = chatBoxSlice.actions;

export default chatBoxSlice;
