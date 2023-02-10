import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "@env";

export const GetAllUserInHospital = createAsyncThunk(
	"Messsage/GetUser",
	async ({ Doctor_Id }, thunkAPI) => {
		const jwt = await AsyncStorage.getItem("jwt");

		try {
			const response = await axios.get(`${URL}/Malaria/User/GetAllUserFromHospital`, {
				params: { Doctor_Id },
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});

			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

export const SendMessageToUsers = createAsyncThunk(
	"Message/SendMessage",
	async ({ Message, login_name }, thunkAPI) => {
		const jwt = await AsyncStorage.getItem("jwt");

		try {
			const response = await axios.post(
				`${URL}/Malaria/Message/Send`,
				{
					Message,
					login_name,
				},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			);
			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

export const GetMessageForUser = createAsyncThunk(
	"Message/GetMessage",
	async ({ Doctor_Id }, thunkAPI) => {
		const jwt = await AsyncStorage.getItem("jwt");
		try {
			const response = await axios.get(`${URL}/Malaria/Message/GetMessageForUser`, {
				params: { Doctor_Id },
				headers: { Authorization: `Bearer ${jwt}` },
			});
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);

export const GetUnreadCount = createAsyncThunk(
	"Message/GetUnreadCount",
	async ({ Doctor_Id }, thnukAPI) => {
		const jwt = await AsyncStorage.getItem("jwt");
		try {
			const response = await axios.get(`${URL}/Malaria/Message/getUnreadCount`, {
				params: { Doctor_Id },
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			return response.data;
		} catch (err) {
			return thnukAPI.rejectWithValue(err.response.data);
		}
	}
);

export const SearchMessage = createAsyncThunk(
	"Message/SearchMessage",
	async ({ Doctor_Id, query }, thnukAPI) => {
		const jwt = await AsyncStorage.getItem("jwt");
		console.log(Doctor_Id);
		console.log(query);
		try {
			const response = await axios.get(`${URL}/Malaria/Message/SearchMessage`, {
				params: { Doctor_Id, query },
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			return response.data;
		} catch (err) {
			return thnukAPI.rejectWithValue(err.response.data);
		}
	}
);

