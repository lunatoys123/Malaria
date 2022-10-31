import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AddReport = createAsyncThunk("report/createReport", async(values)=>{
    const jwt = await AsyncStorage.getItem("jwt")
})