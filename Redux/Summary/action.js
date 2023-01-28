import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Initialize = createAsyncThunk("summary/Initialize", async () => {
	return {
		countries: [],
		WHO_Data: [],
	};
});

export const Preview = createAsyncThunk("summary/preview", async () => {
	const jwt = await AsyncStorage.getItem("jwt");
	//console.log(jwt);
	const response = await axios.get(`${URL}/Malaria/WHO/preview`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	//console.log(response)
	return response.data;
});

export const WHO_Data = createAsyncThunk("summary/WHO_data", async data => {
	const { option, selectcountry } = data;
	const jwt = await AsyncStorage.getItem("jwt");
	// console.log(jwt);
	const response = await axios
		.get(`${URL}/Malaria/WHO/Data`, {
			params: { option, selectcountry },
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		})
		.catch(err => {
			console.log(err);
		});
	return response.data;
});

export const GetCountries = createAsyncThunk("summary/countries", async () => {
	const jwt = await AsyncStorage.getItem("jwt");
	// console.log(jwt);
	// console.log(`${URL}/Malaria/WHO/countries`);

	const response = await axios.get(`${URL}/Malaria/WHO/countries`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	return response.data;
});
