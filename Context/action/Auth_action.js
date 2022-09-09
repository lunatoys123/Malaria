import axios from "axios";
import { status_code } from "../../Common/status_code";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const loginUser = async (user, dispatch) => {
  axios
    .post("https://33e6-116-49-45-129.ap.ngrok.io/Malaria/User/login", {
      email: user.Email,
      Password: user.Password,
    })
    .then((response) => {
      const data = response.data;
      if (data.status === status_code.Success) {
        const token = data.token;
        AsyncStorage.setItem("jwt", token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
