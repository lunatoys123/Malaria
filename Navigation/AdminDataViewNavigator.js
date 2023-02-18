import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Constants from "expo-constants";
import Overview from "../Screen/Admin/DataView/Overview";
import Treatmentview from "../Screen/Admin/DataView/Treatmentview";
import AnalyticsView from "../Screen/Admin/DataView/AnalyticsView";

const Tab = createMaterialTopTabNavigator();

const AdminDataViewNavigator = () => {
	return (
		<Tab.Navigator style={{ marginTop: Constants.statusBarHeight }}>
			<Tab.Screen name="OverView" component={Overview} />
			<Tab.Screen name="Treatment" component={Treatmentview} />
			<Tab.Screen name="Analytics" component={AnalyticsView} />
		</Tab.Navigator>
	);
};

export default AdminDataViewNavigator;
