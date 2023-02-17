import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AccountManagementNavigator from "./AccountManagementNavigator";
import MessageNavigator from "./MessageNavigator";
import DataView from "../Screen/Admin/DataView";
import { AntDesign } from "@expo/vector-icons";
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
						<FontIcon name="user" color={color} size={focused ? 28 : 25} />
					),
				}}
			/>
			<Tab.Screen
				name="MessageNavigator"
				component={MessageNavigator}
				options={{
					tabBarIcon: ({ focused, size, color }) => (
						<AntDesign name="message1" size={focused ? 28 : 25} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="dataView"
				component={DataView}
				options={{
					tabBarIcon: ({ focused, size, color }) => (
						<AntDesign name="database" size={focused ? 28 : 25} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default AdminNavigator;
