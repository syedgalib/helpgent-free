import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import api from "Chatbox/helpers/api";

const initialState = {
	data: {},
	displayChatScreen: false,
	chatScreen: "welcome", // welcome, video, audio, text, screenRecord, contactForm, sending, success
	chatStep: 1, // 1,2,3,4 etc + contact, sending, success
};

export const sendMessage = createAsyncThunk(
	"chatBox/send",
	async ({ name, email }, thunkAPI) => {
		const data = thunkAPI.getState().data;

		try {
			let response = await api.sendMessage(name, email, data);
			let result = response.data;
			return thunkAPI.fulfillWithValue(result);
		} catch (error) {
			let result = error.response.data;
			return thunkAPI.rejectWithValue(result);
		}
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
	extraReducers: (builder) => {
		builder.addCase(sendMessage.pending, (state) => {
			state.chatScreen = "sending";
		});
		builder.addCase(sendMessage.fulfilled, (state) => {
			state.chatScreen = "success";
		});
		builder.addCase(sendMessage.rejected, (state, { payload }) => {
			state.chatScreen = "contactForm";
			let message = payload.message;
			console.log(message);
		});
	},
});

export const chatBoxActions = chatBoxSlice.actions;

export default chatBoxSlice;
