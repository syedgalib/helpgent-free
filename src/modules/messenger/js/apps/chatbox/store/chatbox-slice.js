import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import api from "../helpers/api";

const initialState = {
	name: "Someone",
	email: "user@email.com",
	data: {},
	displayChatScreen: false,
	chatScreen: "welcome", // welcome, video, audio, text, screenRecord, contactForm, sending, success
	chatStep: 1, // 1,2,3,4 etc + contact, sending, success
};

export const sendMessage = createAsyncThunk(
	"chatBox/send",
	async (_, thunkAPI) => {
		const data = thunkAPI.getState().data;
		const name = thunkAPI.getState().name;
		const email = thunkAPI.getState().email;

		console.log( { data, name, email } );

		const args = {
			userID: 1,
			message: 'Test',
		};

		try {
			let response = await api.sendMessage( args );
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
			// @todo - is not fully functional
			if (state.chatStep > 1) {
				state.chatStep -= 1;
			} else {
				state.chatScreen = "welcome";
			}
		},
		reset() {
			return initialState;
		},
		resetWithChatScreen() {
			let state = { ...initialState };
			state.displayChatScreen = true;
			return state;
		},
		setContactInfo(state, { payload }) {
			state.name = payload.name;
			state.email = payload.email;
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
