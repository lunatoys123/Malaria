import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { NativeBaseProvider } from "native-base";
import Login from "./Screen/Login";
import Main from "./Navigation/Main";
import Auth from "./Context/store/Auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "./store";
import { Provider } from "react-redux";

LogBox.ignoreAllLogs();
//LogBox.ignoreLogs(["Warning:","No element found","VirtualizedLists should never be nested"]);
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <NativeBaseProvider>
          <Auth>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="main"
                component={Main}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </Auth>
        </NativeBaseProvider>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
