import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Summary from "../Screen/Summary/Summary";
import Data from "../Screen/Summary/Data";

const stack = createStackNavigator();

const SummaryNavigator = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Preview"
        component={Summary}
        options={{ headerShown: false }}
      />
      <stack.Screen 
        name="data"
        component={Data}
      />
    </stack.Navigator>
  );
};

export default SummaryNavigator;
