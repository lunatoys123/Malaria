import axios from "axios";
import { URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetAllHospital = async () => {
	const jwt = await AsyncStorage.getItem("jwt");

	const response = await axios.get(`${URL}/Malaria/Hospital/all`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	return response.data.Hospital;
};
