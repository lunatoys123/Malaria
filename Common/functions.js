import axios from "axios";
import { URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCaseByCaseId =  async (values)=>{
    const jwt = await AsyncStorage.getItem("jwt");
    const case_id = values.case_id;
    
    const response = await axios.get(`${URL}/Malaria/Case/getCaseByCaseId`,{
        params:{case_id},
        headers:{
            Authorization: `Bearer ${jwt}`
        }
    });

    return response.data;

}