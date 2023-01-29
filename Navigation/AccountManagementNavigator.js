import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountManagement from "../Screen/Admin/AccountManagement";
import AddUser from "../Screen/Admin/AddUser";
import Audit_report from "../Screen/Admin/Audit_report";
import ViewReport from "../Screen/Admin/ViewReport";
import { IconButton } from "native-base";
import { Ionicons } from "@expo/vector-icons";

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
				options={({ navigation, route }) => ({
					headerTitle: "Add User",
					headerLeft: () => (
						<IconButton
							icon={
								<Ionicons
									name="arrow-back"
									size={24}
									color="black"
									onPress={() => navigation.goBack()}
								/>
							}
						/>
					),
				})}
			/>
			<Stack.Screen
				name="Audit"
				component={Audit_report}
				options={({ navigation, route }) => ({
					headerLeft: () => (
						<IconButton
							icon={
								<Ionicons
									name="arrow-back"
									size={24}
									color="black"
									onPress={() => navigation.goBack()}
								/>
							}
						/>
					),
				})}
			/>
			<Stack.Screen
				name="ViewDoctorReport"
				component={ViewReport}
				options={({ navigation, route }) => ({
					headerLeft: () => (
						<IconButton
							icon={
								<Ionicons
									name="arrow-back"
									size={24}
									color="black"
									onPress={() => navigation.goBack()}
								/>
							}
						/>
					),
				})}
			/>
		</Stack.Navigator>
	);
};

export default AccountManagementNavigator;
