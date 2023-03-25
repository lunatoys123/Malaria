import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessageBox from "../Screen/Message/MessageBox";
import SendMessageTemplete from "../Screen/Message/SendMessageTemplete";
const stack = createStackNavigator();

const MessageNavigator = () => {
	return (
		<stack.Navigator initialRouteName="MessageBox">
			<stack.Screen
				name="MessageBox"
				component={MessageBox}
				options={{
					tabBarIcon: ({ focused, size, color }) => (
						<AntDesign name="message1" size={focused ? 30 : 25} color={color} />
					),
					headerShown: false,
				}}
			/>
			<stack.Screen
				name="SendMessage"
				component={SendMessageTemplete}
				options={({ navigation, route }) => ({
					headerTitle: route.params.mode == "view" ? "View Message" : "Send Message",
				})}
			/>
		</stack.Navigator>
	);
};

export default MessageNavigator;
