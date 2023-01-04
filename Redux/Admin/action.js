import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
