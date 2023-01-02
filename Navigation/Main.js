import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SummaryNavigator from "./SummaryNavigator";
import ReportNavigator from "./ReportNavigatior";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
	return (
		<Tab.Navigator initialRouteName="Summary">
			<Tab.Screen
				name="Summary"
				component={SummaryNavigator}
				options={{
					tabBarIcon: ({ color }) => <Icon name="database" color={color} size={30} />,
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Report"
				component={ReportNavigator}
				options={{
					tabBarIcon: ({ color }) => <MaterialIcon name="doctor" color={color} size={30} />,
					headerShown: false,
				}}
			/>
		</Tab.Navigator>
	);
};

export default Main;
