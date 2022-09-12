import axios from "axios";
import { status_code } from "../../Common/status_code";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const loginUser = async (user, dispatch) => {
  var token_response = {};
  await axios
    .post("https://0fad-116-49-45-129.ap.ngrok.io/Malaria/User/login", {
      email: user.Email,
      Password: user.Password,
    })
    .then((response) => {
      //console.log(response);
      const data = response.data;
      if (data.status === status_code.Success) {
        token_response.status = data.status;
        token_response.Message = data.Message;
        const token = data.token;
        AsyncStorage.setItem("jwt", token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
      }
    })
    .catch((err) => {
      //console.log("Error....... ", err);
      token_response.status = err.response.data.status;
      token_response.Message = err.response.data.Message;
    });
  return token_response;
};

export const logoutUser = (dispatch) => {
  AsyncStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
