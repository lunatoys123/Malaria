import { createSlice } from "@reduxjs/toolkit";
import {
	GetAllUserInHospital,
	SendMessageToUsers,
	GetMessageForUser,
	GetUnreadCount,
	SearchMessage,
} from "./action";
import { LOADING_STATUS } from "../../Common/status_code";

const initialState = {
	Loading: LOADING_STATUS.IDLE,
	status: "",
	Error: "",
	Message: "",
	Receipents: [],
	Message_Stack: [],
	unreadCount: 0,
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
		Loading: LOADING_STATUS.FULFILLED,
		Message: action.payload.Message,
		status: action.payload.status,
	};
};

const GetMessageFulfillReducer = (state, action) => {
	return {
		...state,
		Loading: LOADING_STATUS.FULFILLED,
		Message_Stack: action.payload.Message_Object,
	};
};

const GetUnreadCountFulfillReducer = (state, action) => {
	return {
		...state,
		Loading: LOADING_STATUS.FULFILLED,
		unreadCount: action.payload.unreadCount,
	};
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
		[SendMessageToUsers.fulfilled]: sendMessageFulfillReducer,
		[GetMessageForUser.pending]: pendingReducer,
		[GetMessageForUser.rejected]: rejectedReducer,
		[GetMessageForUser.fulfilled]: GetMessageFulfillReducer,
		[GetUnreadCount.pending]: pendingReducer,
		[GetUnreadCount.rejected]: rejectedReducer,
		[GetUnreadCount.fulfilled]: GetUnreadCountFulfillReducer,
		[SearchMessage.pending]: pendingReducer,
		[SearchMessage.rejected]: rejectedReducer,
		[SearchMessage.fulfilled]: GetMessageFulfillReducer,
	},
});

export const MessageReducer = MessageSlice.reducer;
export const MessageAction = {
	GetAllUserInHospital,
	SendMessageToUsers,
	GetMessageForUser,
	GetUnreadCount,
	SearchMessage,
	...MessageSlice.actions,
};
