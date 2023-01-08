import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOADING_STATUS } from "../../Common/status_code";

export const Initialilze = createAsyncThunk("Admin/Initialilze", () => {
	return {
		loading: LOADING_STATUS.IDLE,
		Message: "",
		status: "",
	};
});

export const GetUserFromHospital = createAsyncThunk(
	"Admin/AccountManagement",
	async ({ Doctor_id }) => {
		const jwt = await AsyncStorage.getItem("jwt");
		const response = await axios.get(`${URL}/Malaria/User/GetUserFromHospital`, {
			params: { Doctor_id },
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});
		return response.data;
	}
);

export const AddUserToOrganization = createAsyncThunk(
	"Admin/AddUser",
	async ({ user, Doctor_id }, { rejectWithValue }) => {
		const jwt = await AsyncStorage.getItem("jwt");
		console.log(Doctor_id);
		try {
			const response = await axios.post(
				`${URL}/Malaria/User/register`,
				{
					user,
					Doctor_id,
				},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			);
			return response.data;
		} catch (e) {
			return rejectWithValue(e.response.data);
		}
	}
);

export const ResetPasswordForNewUser = createAsyncThunk(
	"Admin/ResetPasswordForNewUser",
	async ({ Doctor_id, Password }) => {
		const jwt = await AsyncStorage.getItem("jwt");
		const response = await axios.post(
			`${URL}/Malaria/User/ResetPassword`,
			{
				Doctor_id,
				Password,
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);

		return response.data;
	}
);
