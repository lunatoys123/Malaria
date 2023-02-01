import { createStackNavigator } from "@react-navigation/stack";
import ForgetPassword from "../Screen/Login/ForgetPassword";
import TwoFactorAuthentication from "../Screen/Login/TwoFactorAuthentication";
import React from "react";

const stack = createStackNavigator();
const ForgetPasswordNavigator = () => {
	return (
		<stack.Navigator initialRouteName="ForgetPassword">
			<stack.Screen
				name="ForgetPassword"
				component={ForgetPassword}
				options={{ headerShown: false }}
			/>
			<stack.Screen
				name="TwoFactor"
				component={TwoFactorAuthentication}
				options={{ headerShown: false }}
			/>
		</stack.Navigator>
	);
};

export default ForgetPasswordNavigator;
