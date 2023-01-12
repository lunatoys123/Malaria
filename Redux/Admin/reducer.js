import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../Common/status_code";
import { GetNormalUsersFromHospital, AddUserToOrganization, Initialilze, ResetPasswordForNewUser } from "./action";

const initialState = {
	loading: LOADING_STATUS.IDLE,
	AccountManagement: [],
	status: "",
	Message: "",
	Error: "",
};

const pendingReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.PENDING,
	};
};

const rejectReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.REJECTED,
		status: action.payload.status,
		Error: action.payload.Error,
	};
};

const AccountManagementFulfillReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.FULFILLED,
		AccountManagement: action.payload.AccountManagement,
	};
};

const AddUserFulfillReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.FULFILLED,
		status: action.payload.status,
		Message: action.payload.Message,
	};
};

const ResetPasswordFulfillReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.FULFILLED,
		status: action.payload.status,
		Message: action.payload.Message,
	};
};

const InitialReducer = (state, action) => {
	return {
		...state,
		loading: action.payload.loading,
		Message: "",
		status: "",
	};
};
const AdminSlice = createSlice({
	name: "Admin",
	initialState,
	extraReducers: {
		[GetNormalUsersFromHospital.pending]: pendingReducer,
		[GetNormalUsersFromHospital.rejected]: rejectReducer,
		[GetNormalUsersFromHospital.fulfilled]: AccountManagementFulfillReducer,
		[AddUserToOrganization.pending]: pendingReducer,
		[AddUserToOrganization.rejected]: rejectReducer,
		[AddUserToOrganization.fulfilled]: AddUserFulfillReducer,
		[ResetPasswordForNewUser.pending]: pendingReducer,
		[ResetPasswordForNewUser.rejected]: rejectReducer,
		[ResetPasswordForNewUser.fulfilled]: ResetPasswordFulfillReducer,
		[Initialilze.fulfilled]: InitialReducer,
	},
});

export const AdminReducer = AdminSlice.reducer;
export const AdminAction = {
	GetNormalUsersFromHospital,
	AddUserToOrganization,
	Initialilze,
	ResetPasswordForNewUser,
	...AdminSlice.actions,
};
