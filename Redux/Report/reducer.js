import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../Common/status_code";
import { AddReport } from "./action";

const initialState = {
    loading: LOADING_STATUS.IDLE,
    Message: "",
    status: "",
}

const pendingReducer = (state, action) => {
    return {
        ...state,
        loading: LOADING_STATUS.PENDING
    }
}

const rejectReducer = (state, action) =>{
    return{
        ...state,
        loading: LOADING_STATUS.REJECTED
    }
}

const fulFilledReducer = (state, action) => { 
    return{
        ...state,
        loading: LOADING_STATUS.FULFILLED,
        Message: action.payload.Message,
        status: action.payload.status
    }
}

const ReportSlice = createSlice({
    name:'Report',
    initialState,
    extraReducers:{
        [AddReport.pending]: pendingReducer,
        [AddReport.rejected]: rejectReducer,
        [AddReport.fulfilled]: fulFilledReducer
    }
});

export const ReportReducer = ReportSlice.reducer;
export const ReportAction = {
    AddReport,
    ...ReportSlice.actions
}
