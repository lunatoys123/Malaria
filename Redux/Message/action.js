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
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);

export const SendMessageToUsers = createAsyncThunk("Message/SendMessage", async({Message, login_name}) => {
	const jwt = await AsyncStorage.getItem("jwt");

	try{
		const response = await axios.post(`${URL}/Malaria/Message/Send`,{
			Message,
			login_name
		},{
			headers:{
				Authorization: `Bearer ${jwt}`,
			}
		})
	}catch(e){
		console.log(e);
	}
});
