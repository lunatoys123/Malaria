import { configureStore } from "@reduxjs/toolkit";
import { SummaryReducer } from "./Redux/Summary/reducer";
import { ReportReducer } from "./Redux/Report/reducer";
import { PatientReducer } from "./Redux/Patient/reducer";
import { caseReducer } from "./Redux/Case/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import ThunkMiddleware from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";

export default configureStore({
  reducer: {
    Summary: SummaryReducer,
    Report: ReportReducer,
    Patient: PatientReducer,
    Case: caseReducer
  },
  devTools: composeWithDevTools(applyMiddleware(ThunkMiddleware))
});
