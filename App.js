import { StatusBar } from "expo-status-bar";
import { StyleSheet, LogBox } from "react-native";
import { NativeBaseProvider } from "native-base";
import Login from "./Screen/Login/Login";
import ResetPassword from "./Screen/Login/ResetPassword";
import ForgetPassword from "./Screen/Login/ForgetPassword";
import Auth from "./Context/store/Auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "./store";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import UserNavigator from "./Navigation/UserNavigator";
import AdminNavigator from "./Navigation/AdminNavigator";
import ForgetPasswordNavigator from "./Navigation/ForgetPasswordNavigator";

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(["Warning:", "No element found", "VirtualizedLists should never be nested"]);
const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Provider store={store}>
				<NativeBaseProvider>
					<Auth>
						<Stack.Navigator
							initialRouteName="Login"
							screenOptions={{
								tabBarHideOnKeyboar: true,
								tabBarShowLabel: true,
								tabBarActiveTintColor: "#e91e63",
							}}
						>
							<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
							<Stack.Screen
								name="User"
								component={UserNavigator}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="Admin"
								component={AdminNavigator}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="ResetPassword"
								component={ResetPassword}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="ForgetNavigator"
								component={ForgetPasswordNavigator}
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
