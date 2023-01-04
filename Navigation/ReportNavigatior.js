import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClinicalInformation from "../Screen/Report/ClinicalInformation";
import PersonalInformation from "../Screen/Report/PersonalInformation";
import TravelHistory from "../Screen/Report/TravelHistory";
import Hospitalization from "../Screen/Report/Hospitalization";
import PatientCaseNavigator from "./PatientCaseNavigator";
import Treatment from "../Screen/Report/Treatment";
import Laboratory from "../Screen/Report/Laboratory";

const stack = createStackNavigator();
const ReportNavigator = () => {
	return (
		<stack.Navigator>
			<stack.Screen name="Main" component={PatientCaseNavigator} options={{ headerShown: false }} />
			<stack.Screen
				name="PersonalInformation"
				component={PersonalInformation}
				options={{
					headerTitle: "Patient Information",
					presentation: "modal",
					headerMode: "screen",
				}}
			/>
			<stack.Screen
				name="ClinicalInformation"
				component={ClinicalInformation}
				options={{
					headerTitle: "Clinical Information",
					presentation: "modal",
					headerMode: "screen",
				}}
			/>
			<stack.Screen
				name="TravelHistory"
				component={TravelHistory}
				options={{ headerTitle: "Travel History", presentation: "modal", headerMode: "screen" }}
			/>
			<stack.Screen
				name="Hospitalization"
				component={Hospitalization}
				options={{ headerTitle: "Hospitalization", presentation: "modal", headerMode: "screen" }}
			/>
			<stack.Screen
				name="Treatment"
				component={Treatment}
				options={{ presentation: "modal", headerMode: "screen" }}
			/>
			<stack.Screen
				name="Laboratory"
				component={Laboratory}
				options={{ presentation: "modal", headerMode: "screen" }}
			/>
		</stack.Navigator>
	);
};

export default ReportNavigator;
