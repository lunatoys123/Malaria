import axios from "axios";
import { status_code } from "../../Common/status_code";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "@env";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const loginUser = async (user, dispatch) => {
	var token_response = {};
	//console.log(`${URL}/Malaria/User/login`)
	await axios
		.post(`${URL}/Malaria/User/login`, {
			email: user.Email,
			Password: user.Password,
		})
		.then(response => {
			//console.log(response);
			const data = response.data;
			if (data.status === status_code.Success) {
				const token = data.token;
				AsyncStorage.setItem("jwt", token);
				const decoded = jwt_decode(token);

				token_response.status = data.status;
				token_response.Message = data.Message;
				token_response.user_role = decoded.role;
				//console.log(decoded);
				dispatch(
					setCurrentUser({
						Doctor_id: decoded.Doctor_id,
						login_name: decoded.login_name,
						role: decoded.role,
					})
				);
			}
		})
		.catch(err => {
			//console.log("Error....... ", err);
			token_response.status = err.response.data.status;
			token_response.Message = err.response.data.Message;
		});
	return token_response;
};

export const logoutUser = dispatch => {
	AsyncStorage.removeItem("jwt");
	dispatch(setCurrentUser({}));
};

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};
