import { createSlice } from "@reduxjs/toolkit";
import { Preview, WHO_Data, GetCountries, Initialize } from "./action";
import { LOADING_STATUS } from "../../Common/status_code";

const initialState = {
	option: {},
	loading: LOADING_STATUS.IDLE,
	countries: [],
	WHO_Data: [],
	Table_data: [],
	Analytics: {},
};

const PendingReducer = (state, action) => {
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

const OptionfulfillReducer = (state, action) => {
	return {
		...state,
		option: action.payload.option,
		status: action.payload.status,
		loading: LOADING_STATUS.FULFILLED,
	};
};

const PreviewDataFullfillReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.FULFILLED,
		status: action.payload.status,
		WHO_Data: action.payload.data,
		Table_data: action.payload.Table_data,
		Analytics: action.payload.Analytics
	};
};

const CountriesFullfillReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.FULFILLED,
		status: action.payload.status,
		countries: action.payload.countries,
	};
};

const InitializeReducer = (state, action) => {
	return {
		...state,
		loading: LOADING_STATUS.IDLE,
		countries: action.payload.countries,
		WHO_Data: action.payload.WHO_Data,
	};
};
const SummarySlice = createSlice({
	name: "Summary",
	initialState,
	extraReducers: {
		[Preview.pending]: PendingReducer,
		[Preview.rejected]: rejectReducer,
		[Preview.fulfilled]: OptionfulfillReducer,
		[WHO_Data.pending]: PendingReducer,
		[WHO_Data.rejected]: rejectReducer,
		[WHO_Data.fulfilled]: PreviewDataFullfillReducer,
		[GetCountries.pending]: PendingReducer,
		[GetCountries.rejected]: rejectReducer,
		[GetCountries.fulfilled]: CountriesFullfillReducer,
		[Initialize.fulfilled]: InitializeReducer,
	},
});

export const SummaryReducer = SummarySlice.reducer;
export const SummaryAction = {
	Preview,
	WHO_Data,
	GetCountries,
	Initialize,
	...SummarySlice.actions,
};
