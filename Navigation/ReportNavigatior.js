import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Report from "../Screen/Report/Report";
import ClinicalInformation from "../Screen/Report/ClinicalInformation";
import PersonalInformation from "../Screen/Report/PersonalInformation";

const stack = createStackNavigator();
const ReportNavigator = () =>{
    return(
        <stack.Navigator>
            <stack.Screen 
                name="Main"
                component={Report}
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
        </stack.Navigator>
    )
}

export default ReportNavigator;