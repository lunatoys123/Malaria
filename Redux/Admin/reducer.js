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
	TreatmentSummaryData,
	AdminAnalytics,
} from "./action";

const initialState = {
	loading: LOADING_STATUS.IDLE,
	AccountManagement: [],
	Audit_Log: [],
	status: "",
	Message: "",
	Error: "",
	Patient_Summary: [],
	Treatment_status: [],
	Treatment_Summary: [],
	Treatment_count_data: [],
	Drug_data: [],
	Analytics: [],
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

const TreatmentSummaryFulfillReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.FULFILLED,
		Treatment_status: action.payload.Treatment_status,
		Treatment_Summary: action.payload.Treatment_Summary,
		Treatment_count_data: action.payload.Treatment_count_data,
		Drug_data: action.payload.Drug_data,
	};
};

const AdminAnalyticsFulfilReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.FULFILLED,
		Analytics: action.payload.Analytics,
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
		[TreatmentSummaryData.pending]: pendingReducer,
		[TreatmentSummaryData.rejected]: rejectReducer,
		[TreatmentSummaryData.fulfilled]: TreatmentSummaryFulfillReducer,
		[AdminAnalytics.pending]: pendingReducer,
		[AdminAnalytics.rejected]: rejectReducer,
		[AdminAnalytics.fulfilled]: AdminAnalyticsFulfilReducer,
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
	TreatmentSummaryData,
	AdminAnalytics,
	...AdminSlice.actions,
};
