import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Report from "../Screen/Report/Report";
import ClinicalInformation from "../Screen/Report/ClinicalInformation";
import PersonalInformation from "../Screen/Report/PersonalInformation";
import TravelHistory from "../Screen/Report/TravelHistory";
import Hospitalization from "../Screen/Report/Hospitalization";

const stack = createStackNavigator();
const ReportNavigator = () =>{
    return(
        <stack.Navigator>
            <stack.Screen 
                name="Main"
                component={Report}
                options={{headerShown: false}}
            />
            <stack.Screen 
                name="PersonalInformation"
                component={PersonalInformation}
                options={{headerTitle:"Patient Information"}}
            />
            <stack.Screen 
                name="ClinicalInformation"
                component={ClinicalInformation}
                options={{headerTitle: "Clinical Information"}}
            />
            <stack.Screen
                name="TravelHistory"
                component={TravelHistory}
                options={{headerTitle:"Travel History"}}
            />
            <stack.Screen 
                name="Hospitalization"
                component={Hospitalization}
                options={{headerTitle:'Hospitalization'}}
            />

        </stack.Navigator>
    )
}

export default ReportNavigator;