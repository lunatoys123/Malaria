import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SummaryNavigator from "./SummaryNavigator";
import ReportNavigator from "./ReportNavigatior";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Summary"
        component={SummaryNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="database" color={color} size={30} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcon name="doctor" color={color} size={30} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
