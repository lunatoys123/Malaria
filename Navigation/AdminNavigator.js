import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AccountManagement from "../Screen/Admin/AccountManagement";

const Tab = createMaterialBottomTabNavigator();
const AdminNavigator = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="AccountManager" component={AccountManagement} />
		</Tab.Navigator>
	);
};

export default AdminNavigator;
