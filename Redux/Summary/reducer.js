import { createSlice } from "@reduxjs/toolkit";
import { Preview, WHO_Data, GetCountries } from "./action";
import { LOADING_STATUS } from "../../Common/status_code";

const initialState = {
  option: {},
  loading: LOADING_STATUS.IDLE,
  countries: [],
  WHO_Data: []
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
  };
};

const CountriesFullfillReducer = (state, action) =>{
  return{
    ...state,
    loading: LOADING_STATUS.FULFILLED,
    status: action.payload.status,
    countries: action.payload.countries
  }
}
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
    [GetCountries.fulfilled]: CountriesFullfillReducer
  },
});

export const SummaryReducer = SummarySlice.reducer;
export const SummaryAction = {
  Preview,
  WHO_Data,
  GetCountries,
  ...SummarySlice.actions,
};
