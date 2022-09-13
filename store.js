import { configureStore } from "@reduxjs/toolkit";
import { SummaryReducer } from "./Redux/Summary/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import ThunkMiddleware from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";

export default configureStore({
  reducer: {
    Summary: SummaryReducer
  },
  devTools: composeWithDevTools(applyMiddleware(ThunkMiddleware))
});
