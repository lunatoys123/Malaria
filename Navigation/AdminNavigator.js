import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AccountManagementNavigator from "./AccountManagementNavigator";

import FontIcon from "react-native-vector-icons/FontAwesome5";

const Tab = createMaterialBottomTabNavigator();
const AdminNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName="AccountManager"
			barStyle={{ backgroundColor: "#EADFFA", height: 70 }}
			inactiveColor="#A29AAD"
			activeColor="#645F6B"
		>
			<Tab.Screen
				name="AccountManager"
				component={AccountManagementNavigator}
				options={{
					tabBarIcon: ({ focused, size, color }) => (
						<FontIcon name="user" color={color} size={focused ? 30 : 25} />
					),
				}}
			/>
			
		</Tab.Navigator>
	);
};

export default AdminNavigator;
