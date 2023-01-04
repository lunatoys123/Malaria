import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../Common/status_code";
import { GetUserFromHospital } from "./action";

const initialState = {
	loading: LOADING_STATUS.IDLE,
	AccountManagement: [],
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
	};
};

const AccountManagementFulfillReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.FULFILLED,
		AccountManagement: action.payload.AccountManagement,
	};
};
const AdminSlice = createSlice({
	name: "Admin",
	initialState,
	extraReducers: {
		[GetUserFromHospital.pending]: pendingReducer,
		[GetUserFromHospital.rejected]: rejectReducer,
		[GetUserFromHospital.fulfilled]: AccountManagementFulfillReducer,
	},
});

export const AdminReducer = AdminSlice.reducer;
export const AdminAction = {
	GetUserFromHospital,
	...AdminSlice.actions,
};
