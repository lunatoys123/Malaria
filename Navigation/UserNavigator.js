import React, { useCallback, useContext } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SummaryNavigator from "./SummaryNavigator";
import ReportNavigator from "./ReportNavigatior";
import MessageNavigator from "./MessageNavigator";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import Auth_Global from "../Context/store/Auth_Global";
import { MessageAction } from "../Redux/Message/reducer";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../Redux/Message/Selector";

const Tab = createMaterialBottomTabNavigator();

const UserNavigator = () => {
	const dispatch = useDispatch();
	const context = useContext(Auth_Global);
	const MessageState = useSelector(Message());

	useFocusEffect(
		useCallback(() => {
			dispatch(MessageAction.GetUnreadCount({ Doctor_Id: context.user.userInfo.Doctor_id }));
		}, [dispatch])
	);
	return (
		<Tab.Navigator
			initialRouteName="Summary"
			barStyle={{ backgroundColor: "#EADFFA", height: 70 }}
			inactiveColor="#A29AAD"
			activeColor="#645F6B"
			shifting={true}
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
			<Tab.Screen
				name="MessageNavigator"
				component={MessageNavigator}
				options={{
					tabBarBadge: MessageState.unreadCount,
					tabBarLabel: "MessageBox",
					tabBarIcon: ({ focused, size, color }) => (
						<AntDesign name="message1" size={focused ? 30 : 25} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default UserNavigator;
