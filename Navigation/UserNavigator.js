import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SummaryNavigator from "./SummaryNavigator";
import ReportNavigator from "./ReportNavigatior";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

const UserNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName="Summary"
			barStyle={{ backgroundColor: "#EADFFA", height: 70 }}
			inactiveColor="#A29AAD"
			activeColor="#645F6B"
		>
			<Tab.Screen
				name="Summary"
				component={SummaryNavigator}
				options={{
					tabBarIcon: ({ focused, size, color }) => (
						<Icon name="database" color={color} size={focused ? 30 : 25} />
					),
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Report"
				component={ReportNavigator}
				options={{
					tabBarIcon: ({ focused, size, color }) => (
						<MaterialIcon name="doctor" color={color} size={focused ? 30 : 25} />
					),
					headerShown: false,
				}}
			/>
		</Tab.Navigator>
	);
};

export default UserNavigator;
