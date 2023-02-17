import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../Common/status_code";
import {
	GetNormalUsersFromHospital,
	AddUserToOrganization,
	Initialilze,
	ResetPasswordForUser,
	GetAuditFromDoctorId,
	deleteUser,
	recoverUser,
	SearchQueryForUser,
	HospitalSummaryData,
} from "./action";

const initialState = {
	loading: LOADING_STATUS.IDLE,
	AccountManagement: [],
	Audit_Log: [],
	status: "",
	Message: "",
	Error: "",
	Patient_Summary: [],
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
		status: action.payload.status,
		AccountManagement: action.payload.AccountManagement,
		Message: action.payload.Message,
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

const AuditFulfillReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.FULFILLED,
		Audit_Log: action.payload,
	};
};

const HospitalDataReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.FULFILLED,
		Patient_Summary: action.payload.Patient_Summary,
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
		[ResetPasswordForUser.pending]: pendingReducer,
		[ResetPasswordForUser.rejected]: rejectReducer,
		[ResetPasswordForUser.fulfilled]: ResetPasswordFulfillReducer,
		[Initialilze.fulfilled]: InitialReducer,
		[GetAuditFromDoctorId.pending]: pendingReducer,
		[GetAuditFromDoctorId.rejected]: rejectReducer,
		[GetAuditFromDoctorId.fulfilled]: AuditFulfillReducer,
		[deleteUser.pending]: pendingReducer,
		[deleteUser.rejected]: rejectReducer,
		[deleteUser.fulfilled]: AccountManagementFulfillReducer,
		[recoverUser.pending]: pendingReducer,
		[recoverUser.rejected]: rejectReducer,
		[recoverUser.fulfilled]: AccountManagementFulfillReducer,
		[SearchQueryForUser.pending]: pendingReducer,
		[SearchQueryForUser.rejected]: rejectReducer,
		[SearchQueryForUser.fulfilled]: AccountManagementFulfillReducer,
		[HospitalSummaryData.pending]: pendingReducer,
		[HospitalSummaryData.rejected]: rejectReducer,
		[HospitalSummaryData.fulfilled]: HospitalDataReducer,
	},
});

export const AdminReducer = AdminSlice.reducer;
export const AdminAction = {
	GetNormalUsersFromHospital,
	AddUserToOrganization,
	Initialilze,
	ResetPasswordForUser,
	GetAuditFromDoctorId,
	deleteUser,
	recoverUser,
	SearchQueryForUser,
	HospitalSummaryData,
	...AdminSlice.actions,
};
