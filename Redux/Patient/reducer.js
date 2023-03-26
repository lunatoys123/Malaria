import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../Common/status_code";
import { getPatientList, editPersonalInformation, searchPatientWithQuery } from "./action";

const initialState = {
	loading: LOADING_STATUS.IDLE,
	data: [],
	Message: "",
	status: "",
	Error: "",
	Page: 1,
	limit: 10,
	Max_Page: 0,
};

const PendingReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.PENDING,
	};
};

const RejectReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.REJECTED,
	};
};

const LoadDataFulfillReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.FULFILLED,
		data: action.payload.data,
		Page: action.payload.Page,
		limit: action.payload.limit,
		Max_Page: action.payload.Max_Page
	};
};

const UpdateFulfillReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.FULFILLED,
		status: action.payload.status,
		Message: action.payload.Message,
	};
};

const PatientSlice = createSlice({
	name: "Patient",
	initialState,
	extraReducers: {
		[getPatientList.pending]: PendingReducer,
		[getPatientList.rejected]: RejectReducer,
		[getPatientList.fulfilled]: LoadDataFulfillReducer,
		[editPersonalInformation.pending]: PendingReducer,
		[editPersonalInformation.rejected]: RejectReducer,
		[editPersonalInformation.fulfilled]: UpdateFulfillReducer,
		[searchPatientWithQuery.pending]: PendingReducer,
		[searchPatientWithQuery.rejected]: RejectReducer,
		[searchPatientWithQuery.fulfilled]: LoadDataFulfillReducer,
	},
});

export const PatientReducer = PatientSlice.reducer;
export const PatientActions = {
	getPatientList,
	editPersonalInformation,
	searchPatientWithQuery,
	...PatientSlice.actions,
};
