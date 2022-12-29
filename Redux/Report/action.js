import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AddReport = createAsyncThunk(
  "report/createReport",
  async (values) => {
    const jwt = await AsyncStorage.getItem("jwt");
    const Patient_data = values.report_data.Patient_data;
    const Case = values.report_data.case;
    const user = values.user;

    const response = await axios.post(
      `${URL}/Malaria/Case/AddCase`,
      {
        Patient_data: Patient_data,
        case: Case,
        user: user,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    //console.log(response.data);

    return response.data;
  }
);

export const AddTreatment = createAsyncThunk(
  "report/createTreatment",
  async (Treatment) => {
    const jwt = await AsyncStorage.getItem("jwt");

    const response = await axios.post(
      `${URL}/Malaria/Case/AddTreatment`,
      {
        Treatment,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    //console.log(response.data);
    return response.data;
  }
);

export const EditReport = createAsyncThunk(
  "report/editReport",
  async (values) => {
    const jwt = await AsyncStorage.getItem("jwt");
    const case_id = values.case_id;
    const report_data = values.report_data;

    const response = await axios.put(
      `${URL}/Malaria/Case/updateReportById`,
      {
        case_id,
        report_data,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    //console.log(response.data);
    return response.data;
  }
);

export const EditTreatment = createAsyncThunk(
  "report/editTreatment",
  async (values) => {
    const jwt = await AsyncStorage.getItem("jwt");
    const id = values.id;
    const Treatment = values.Treatment;

    const response = await axios.put(
      `${URL}/Malaria/Case/updateTreatmentByCaseId`,
      {
        id,
        Treatment,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response.data;
  }
);
