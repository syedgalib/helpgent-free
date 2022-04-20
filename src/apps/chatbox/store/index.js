import { configureStore } from "@reduxjs/toolkit";

import chatBoxSlice from "./chatbox-slice";

const store = configureStore({
	reducer: {
		chatBox: chatBoxSlice.reducer,
	},
});

export default store;
