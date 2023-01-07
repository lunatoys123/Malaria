import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountManagement from "../Screen/Admin/AccountManagement";
import AddUser from "../Screen/Admin/AddUser";

const Stack = createStackNavigator();

const AccountManagementNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="AccountManagement">
			<Stack.Screen
				name="AccountManagement"
				component={AccountManagement}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="AddUser"
				component={AddUser}
				options={{ headerTitle: "Add User" }}
			/>
		</Stack.Navigator>
	);
};

export default AccountManagementNavigator;
