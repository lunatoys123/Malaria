import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Summary from "../Screen/Summary/Summary";
import Data from "../Screen/Summary/Data";
import { IconButton } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const stack = createStackNavigator();

const SummaryNavigator = () => {
	return (
		<stack.Navigator>
			<stack.Screen name="Preview" component={Summary} options={{ headerShown: false }} />
			<stack.Screen
				name="data"
				component={Data}
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
		</stack.Navigator>
	);
};

export default SummaryNavigator;
