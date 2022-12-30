import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../Common/status_code";
import { AddReport, AddTreatment, EditReport, EditTreatment, AddLaboratory, EditLaboratory, Initialilze } from "./action";

const initialState = {
	loading: LOADING_STATUS.IDLE,
	Message: "",
	status: "",
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

const fulFilledReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.FULFILLED,
		Message: action.payload.Message,
		status: action.payload.status,
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

const ReportSlice = createSlice({
	name: "Report",
	initialState,
	extraReducers: {
		[AddReport.pending]: pendingReducer,
		[AddReport.rejected]: rejectReducer,
		[AddReport.fulfilled]: fulFilledReducer,
		[AddTreatment.pending]: pendingReducer,
		[AddTreatment.rejected]: rejectReducer,
		[AddTreatment.fulfilled]: fulFilledReducer,
		[EditReport.pending]: pendingReducer,
		[EditReport.rejected]: rejectReducer,
		[EditReport.fulfilled]: fulFilledReducer,
		[EditTreatment.pending]: pendingReducer,
		[EditTreatment.rejected]: rejectReducer,
		[EditTreatment.fulfilled]: fulFilledReducer,
		[AddLaboratory.pending]: pendingReducer,
		[AddLaboratory.rejected]: rejectReducer,
		[AddLaboratory.fulfilled]: fulFilledReducer,
		[EditLaboratory.pending]: pendingReducer,
		[EditLaboratory.rejected]: rejectReducer,
		[EditLaboratory.fulfilled]: fulFilledReducer,
		[Initialilze.fulfilled]: InitialReducer,
	},
});

export const ReportReducer = ReportSlice.reducer;
export const ReportAction = {
	AddReport,
	AddTreatment,
	EditReport,
	EditTreatment,
	AddLaboratory,
	EditLaboratory,
	Initialilze,
	...ReportSlice.actions,
};
