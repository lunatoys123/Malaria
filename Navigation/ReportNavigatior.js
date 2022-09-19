import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Report from "../Screen/Report/Report";

const stack = createStackNavigator();
const ReportNavigator = () =>{
    return(
        <stack.Navigator>
            <stack.Screen 
                name="Main"
                component={Report}
            />
        </stack.Navigator>
    )
}

export default ReportNavigator;