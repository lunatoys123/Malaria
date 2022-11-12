import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import { URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCaseByDoctorId = createAsyncThunk("Case/getCasebyDoctorId", async (values)=>{
    const jwt = await AsyncStorage.getItem("jwt");
    const Doctor_id = values.Doctor_id


    const response = await axios.get(`${URL}/Malaria/Case/getCaseById`,{
        params:{Doctor_id},
        headers:{
            Authorization: `Bearer ${jwt}`
        }
    });

    return response.data
    ;
});

