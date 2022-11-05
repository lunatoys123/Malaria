import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AddReport = createAsyncThunk("report/createReport", async(values)=>{
    const jwt = await AsyncStorage.getItem("jwt")

    const response = await axios.post(`${URL}/Malaria/Case/AddCase`,{
      Patient_data: values.Patient_data, case: values.case
    },{
      headers:{
        Authorization: `Bearer ${jwt}`,
      }
    });

    return response;
})