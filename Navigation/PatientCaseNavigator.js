import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Report from '../Screen/Report/Report';
import Patient from '../Screen/Report/Patient';
import Constants from 'expo-constants'

const Tab = createMaterialTopTabNavigator();

const PatientCaseNavigator = () => {
    return (
        <Tab.Navigator initialRouteName='Report' style={{marginTop: Constants.statusBarHeight}}>
            <Tab.Screen component={Report} name="Report"/>
            <Tab.Screen component={Patient} name="Patient"/>
        </Tab.Navigator>
    )
}

export default PatientCaseNavigator;