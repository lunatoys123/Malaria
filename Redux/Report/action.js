import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AddReport = createAsyncThunk("report/createReport", async(values)=>{
    const jwt = await AsyncStorage.getItem("jwt")
    const Patient_data = values.report_data.Patient_data;
    const Case = values.report_data.case;
    const user = values.user;

    const response = await axios.post(`${URL}/Malaria/Case/AddCase`,{
      Patient_data: Patient_data, case: Case, user:user
    },{
      headers:{
        Authorization: `Bearer ${jwt}`,
      }
    });
    console.log(response.data);

    return response.data;
})