import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getPatientList = createAsyncThunk("Patient/getPatientList", async values => {
	const jwt = await AsyncStorage.getItem("jwt");
	const Doctor_id = values.Doctor_id;

	const response = await axios.get(`${URL}/Malaria/Patient/getPatientList`, {
		params: { Doctor_id },
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	return response.data;
});

export const editPersonalInformation = createAsyncThunk(
	"Patient/editPersonalInformation",
	async (values, thunkAPI) => {
		const jwt = await AsyncStorage.getItem("jwt");
		const Patient_id = values.Patient_id;
		const report_data = values.report_data;

		try {
			const response = await axios
				.post(
					`${URL}/Malaria/Patient/editPersonalInformationById`,
					{
						Patient_id,
						report_data,
					},
					{
						headers: {
							Authorization: `Bearer ${jwt}`,
						},
					}
				)
				.catch(err => {
					console.log(err);
				});

			//console.log(response.data);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);

export const searchPatientWithQuery = createAsyncThunk(
	"Patient/searchPatientWithQuery",
	async ({ Doctor_id, searchQuery }, thunkAPI) => {
		try {
			const jwt = await AsyncStorage.getItem("jwt");

			const response = await axios.get(`${URL}/Malaria/Patient/searchPatientWithQuery`, {
				params: { Doctor_id, searchQuery },
				headers: { Authorization: `Bearer ${jwt}` },
			});

			// console.log(response.data);
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);
