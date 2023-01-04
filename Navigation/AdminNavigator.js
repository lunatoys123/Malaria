import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AccountManagement from "../Screen/Admin/AccountManagement";
import FontIcon from "react-native-vector-icons/FontAwesome5";

const Tab = createMaterialBottomTabNavigator();
const AdminNavigator = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="AccountManager"
				component={AccountManagement}
				options={{
					tabBarIcon: ({ color }) => <FontIcon name="user" color={color} size={30} />,
				}}
			/>
		</Tab.Navigator>
	);
};

export default AdminNavigator;
