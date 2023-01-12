import { createSlice } from "@reduxjs/toolkit";
import { GetAllUserInHospital, SendMessageToUsers } from "./action";
import { LOADING_STATUS } from "../../Common/status_code";

const initialState = {
	Loading: LOADING_STATUS.IDLE,
	status: "",
	Error: "",
	Message: "",
	Receipents: [],
};

const pendingReducer = (state, action) => {
	return {
		...state,
		Loading: LOADING_STATUS.PENDING,
	};
};

const rejectedReducer = (state, action) => {
	return {
		...state,
		Loading: LOADING_STATUS.REJECTED,
		status: action.payload.status,
		Error: action.payload.Error,
	};
};

const fulfilledReducer = (state, action) => {
	return {
		...state,
		Loading: LOADING_STATUS.FULFILLED,
		Receipents: action.payload,
	};
};

const sendMessageFulfillReducer = (state, action) => {
	return {
		...state,
		Message: action.payload.Message,
		status: action.payload.status
	}
};

const MessageSlice = createSlice({
	name: "Message",
	initialState,
	extraReducers: {
		[GetAllUserInHospital.pending]: pendingReducer,
		[GetAllUserInHospital.rejected]: rejectedReducer,
		[GetAllUserInHospital.fulfilled]: fulfilledReducer,
		[SendMessageToUsers.pending]: pendingReducer,
		[SendMessageToUsers.rejected]: rejectedReducer,
		[SendMessageToUsers.fulfilled]: sendMessageFulfillReducer
	},
});

export const MessageReducer = MessageSlice.reducer;
export const MessageAction = {
	GetAllUserInHospital,
	SendMessageToUsers,
	...MessageSlice.actions,
};
