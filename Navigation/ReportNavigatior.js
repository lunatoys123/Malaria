import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClinicalInformation from "../Screen/Report/ClinicalInformation";
import PersonalInformation from "../Screen/Report/PersonalInformation";
import TravelHistory from "../Screen/Report/TravelHistory";
import Hospitalization from "../Screen/Report/Hospitalization";
import PatientCaseNavigator from "./PatientCaseNavigator";
import Treatment from "../Screen/Report/Treatment";
import Laboratory from "../Screen/Report/Laboratory";
import { IconButton, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const stack = createStackNavigator();
const ReportNavigator = () => {
	return (
		<stack.Navigator>
			<stack.Screen name="Main" component={PatientCaseNavigator} options={{ headerShown: false }} />
			<stack.Screen
				name="PersonalInformation"
				component={PersonalInformation}
				options={({ navigation, route }) => ({
					headerTitle: "Patient Information",
					presentation: "modal",
					headerMode: "screen",
					headerLeft: () => (
						<IconButton
							icon={<Ionicons name="arrow-back" size={24} color="black" />}
							onPress={() => navigation.goBack()}
						/>
					),
				})}
			/>
			<stack.Screen
				name="ClinicalInformation"
				component={ClinicalInformation}
				options={({ navigation, route }) => ({
					headerTitle: "Clinical Information",
					presentation: "modal",
					headerMode: "screen",
					headerLeft: () => (
						<IconButton
							icon={<Ionicons name="arrow-back" size={24} color="black" />}
							onPress={() => navigation.goBack()}
						/>
					),
				})}
			/>
			<stack.Screen
				name="TravelHistory"
				component={TravelHistory}
				options={({ navigation, route }) => ({
					headerTitle: "Travel History",
					presentation: "modal",
					headerMode: "screen",
					headerLeft: () => (
						<IconButton
							icon={<Ionicons name="arrow-back" size={24} color="black" />}
							onPress={() => navigation.goBack()}
						/>
					),
				})}
			/>
			<stack.Screen
				name="Hospitalization"
				component={Hospitalization}
				options={({ navigation, route }) => ({
					headerTitle: "Hospitalization",
					presentation: "modal",
					headerMode: "screen",
					headerLeft: () => (
						<IconButton
							icon={<Ionicons name="arrow-back" size={24} color="black" />}
							onPress={() => navigation.goBack()}
						/>
					),
				})}
			/>
			<stack.Screen
				name="Treatment"
				component={Treatment}
				options={({ navigation, route }) => ({
					presentation: "modal",
					headerMode: "screen",
					headerLeft: () => (
						<IconButton
							icon={<Ionicons name="arrow-back" size={24} color="black" />}
							onPress={() => navigation.goBack()}
						/>
					),
				})}
			/>
			<stack.Screen
				name="Laboratory"
				component={Laboratory}
				options={({ navigation, route }) => ({
					presentation: "modal",
					headerMode: "screen",
					headerLeft: () => (
						<IconButton
							icon={<Ionicons name="arrow-back" size={24} color="black" />}
							onPress={() => navigation.goBack()}
						/>
					),
				})}
			/>
		</stack.Navigator>
	);
};

export default ReportNavigator;
