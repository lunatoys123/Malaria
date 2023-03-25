import { createSlice } from "@reduxjs/toolkit";
import { getCaseByDoctorId, searchCaseWithQuery } from "./action";
import { LOADING_STATUS } from "../../Common/status_code";

const initialState = {
	loading: LOADING_STATUS.IDLE,
	data: [],
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

const RejectedReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.REJECTED,
	};
};

const GetCaseByDoctorId = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.FULFILLED,
		data: action.payload.case_object,
		Page: action.payload.Page,
		limit: action.payload.limit,
		Max_Page: action.payload.Max_Page,
	};
};

const CaseSlice = createSlice({
	name: "Case",
	initialState,
	extraReducers: {
		[getCaseByDoctorId.pending]: PendingReducer,
		[getCaseByDoctorId.rejected]: RejectedReducer,
		[getCaseByDoctorId.fulfilled]: GetCaseByDoctorId,
		[searchCaseWithQuery.pending]: PendingReducer,
		[searchCaseWithQuery.rejected]: RejectedReducer,
		[searchCaseWithQuery.fulfilled]: GetCaseByDoctorId,
	},
});

export const caseReducer = CaseSlice.reducer;
export const caseAction = {
	getCaseByDoctorId,
	searchCaseWithQuery,
	...CaseSlice.actions,
};
