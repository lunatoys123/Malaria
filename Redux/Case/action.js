import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCaseByDoctorId = createAsyncThunk(
	"Case/getCasebyDoctorId",
	async (values, thunkAPI) => {
		const jwt = await AsyncStorage.getItem("jwt");
		const Doctor_id = values.Doctor_id;
		const Page = values.Page;
		const limit = values.limit;

		try {
			const response = await axios.get(`${URL}/Malaria/Case/getCaseById`, {
				params: { Doctor_id, Page, limit },
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			//console.log(response.data);
			return response.data;
		} catch (err) {
			console.log(err);
		}
	}
);

export const searchCaseWithQuery = createAsyncThunk(
	"report/searchCaseWithQuery",
	async (query, thunkAPI) => {
		const jwt = await AsyncStorage.getItem("jwt");
		const Doctor_id = query.Doctor_id;
		const PatientName = query.PatientName;
		const ReportStatus = query.ReportStatus;
		const searchStartDate = query.searchStartDate;
		const searchEndDate = query.searchEndDate;
		const searchStatus = query.searchStatus;
		const Page = query.Page;
		const limit = query.limit;

		try {
			const response = await axios.get(`${URL}/Malaria/Case/SearchCasewithQuery`, {
				params: {
					Doctor_id: Doctor_id,
					PatientName: PatientName,
					ReportStatus: ReportStatus,
					searchStartDate: searchStartDate,
					searchEndDate: searchEndDate,
					searchStatus: searchStatus,
					Page: Page,
					limit: limit,
				},
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			//console.log(response.data);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);
