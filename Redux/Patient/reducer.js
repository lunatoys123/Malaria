import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../Common/status_code";
import { getPatientList, editPersonalInformation } from "./action";

const initialState = {
	loading: LOADING_STATUS.IDLE,
	data: [],
	Message: "",
	status: "",
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
        [editPersonalInformation.fulfilled]: UpdateFulfillReducer
	},
});

export const PatientReducer = PatientSlice.reducer;
export const PatientActions = {
	getPatientList,
	editPersonalInformation,
	...PatientSlice.actions,
};
