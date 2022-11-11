import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../Common/status_code";
import { getPatientList } from "./action";

const initialState = {
    loading: LOADING_STATUS.IDLE,
    data: []
}

const PendingReducer = (state, action)=>{
    return{
        ...state,
        loading: LOADING_STATUS.PENDING
    }
}

const RejectReducer = (state, action) => {
    return {
        ...state,
        loading: LOADING_STATUS.REJECTED
    }
}

const FulfillReducer = (state, action) => {
    return {
        ...state,
        loading: LOADING_STATUS.FULFILLED,
        data: action.payload.data
    }
}

const PatientSlice = createSlice({
    name: 'Patient',
    initialState,
    extraReducers:{
        [getPatientList.pending]: PendingReducer,
        [getPatientList.rejected]: RejectReducer,
        [getPatientList.fulfilled]: FulfillReducer
    }
})

export const PatientReducer = PatientSlice.reducer;
export const PatientActions = {
    getPatientList,
    ...PatientSlice.actions
}
