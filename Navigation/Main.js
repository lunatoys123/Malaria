import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SummaryNavigator from "./SummaryNavigator";
import Icon from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Summary"
        component={SummaryNavigator}
        options={{ 
          tabBarIcon: ({color})=>(
            <Icon name="database" color={color} size={30} />
          ),
          headerShown: false 
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
