import { createSlice } from "@reduxjs/toolkit";
import { Preview, WHO_Data } from "./action";
import { LOADING_STATUS } from "../../Common/status_code";

const initialState = {
  data: {},
  loading: LOADING_STATUS.IDLE,
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

const fulfillReducer = (state, action) => {
  return {
    ...state,
    data: action.payload.data,
    status: action.payload.status,
    loading: LOADING_STATUS.FULFILLED,
  };
};

const SummarySlice = createSlice({
  name: "Summary",
  initialState,
  extraReducers: {
    [Preview.pending]: PendingReducer,
    [Preview.rejected]: rejectReducer,
    [Preview.fulfilled]: fulfillReducer,
    [WHO_Data.pending]: PendingReducer,
    [WHO_Data.rejected]: rejectReducer,
    [WHO_Data.fulfilled]: fulfillReducer,
  },
});

export const SummaryReducer = SummarySlice.reducer;
export const SummaryAction = {
  Preview,
  WHO_Data,
  ...SummarySlice.actions,
};
