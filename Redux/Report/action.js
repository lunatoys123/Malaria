import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOADING_STATUS } from "../../Common/status_code";

export const Initialilze = createAsyncThunk("report/Initialize", () => {
	return {
		loading: LOADING_STATUS.IDLE,
		Message: "",
		status: "",
	};
});
export const AddReport = createAsyncThunk("report/createReport", async values => {
	const jwt = await AsyncStorage.getItem("jwt");
	const Patient_data = values.report_data.Patient_data;
	const Case = values.report_data.case;
	const user = values.user;
	const mode = values.mode;

	const response = await axios.post(
		`${URL}/Malaria/Case/AddCase`,
		{
			Patient_data: Patient_data,
			case: Case,
			user: user,
			mode: mode,
		},
		{
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}
	);
	//console.log(response.data);

	return response.data;
});

export const AddTreatment = createAsyncThunk("report/createTreatment", async Treatment => {
	const jwt = await AsyncStorage.getItem("jwt");

	const response = await axios.post(
		`${URL}/Malaria/Case/AddTreatment`,
		{
			Treatment,
		},
		{
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}
	);

	//console.log(response.data);
	return response.data;
});

export const EditReport = createAsyncThunk("report/editReport", async values => {
	const jwt = await AsyncStorage.getItem("jwt");
	const case_id = values.case_id;
	const report_data = values.report_data;

	const response = await axios.put(
		`${URL}/Malaria/Case/updateReportById`,
		{
			case_id,
			report_data,
		},
		{
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}
	);
	//console.log(response.data);
	return response.data;
});

export const EditTreatment = createAsyncThunk("report/editTreatment", async values => {
	const jwt = await AsyncStorage.getItem("jwt");
	const id = values.id;
	const Treatment = values.Treatment;

	const response = await axios.put(
		`${URL}/Malaria/Case/updateTreatmentByCaseId`,
		{
			id,
			Treatment,
		},
		{
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}
	);

	return response.data;
});

export const AddLaboratory = createAsyncThunk("report/addLaboratory", async values => {
	const jwt = await AsyncStorage.getItem("jwt");
	const case_id = values.case_id;
	const Laboratory = values.Laboratory;

	const response = await axios.post(
		`${URL}/Malaria/Case/AddLabortary`,
		{
			case_id,
			Laboratory,
		},
		{
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}
	);

	return response.data;
});

export const EditLaboratory = createAsyncThunk("report/editLaboratory", async values => {
	const jwt = await AsyncStorage.getItem("jwt");
	const id = values.id;
	const Laboratory = values.Laboratory;
	console.log(id);
	const response = await axios.put(
		`${URL}/Malaria/Case/updateLaboratoryByCaseId`,
		{
			id,
			Laboratory,
		},
		{
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}
	);

	console.log(response.data);

	return response.data;
});
