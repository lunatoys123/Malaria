import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Summary from "../Screen/Summary";

const stack = createStackNavigator();

const SummaryNavigator = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="Preview" component={Summary} />
    </stack.Navigator>
  );
};

export default SummaryNavigator;
