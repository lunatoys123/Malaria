import { View, Text, Box, Heading } from "native-base";
import React, { useCallback, useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Auth_Global from "../../Context/store/Auth_Global";
import { useDispatch, useSelector } from "react-redux";
import { Admin } from "../../Redux/Admin/selector";
import { AdminAction } from "../../Redux/Admin/reducer";
import { LOADING_STATUS } from "../../Common/status_code";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const DataView = props => {
	const dispatch = useDispatch();
	const context = useContext(Auth_Global);
	const adminState = useSelector(Admin());
	const [patientSummary, setPatientSummary] = useState([]);

	useFocusEffect(
		useCallback(() => {
			const { loading, Patient_Summary } = adminState;
			if (LOADING_STATUS.FULFILLED === loading) {
				setPatientSummary(Patient_Summary);
			}
		}, [adminState])
	);

	useFocusEffect(
		useCallback(() => {
			dispatch(AdminAction.HospitalSummaryData({ Doctor_id: context.user.userInfo.Doctor_id }));
		}, [dispatch])
	);

	return (
		<Box safeArea>
			{patientSummary.length > 0 &&
				patientSummary.map((d, index) => (
					<View>
						<Heading size="sm">{`Report Status: ${d.label}`}</Heading>
						<PieChart
							width={Dimensions.get("window").width}
							height={300}
							data={d.data}
							chartConfig={{
								backgroundColor: "#e26a00",
								backgroundGradientFrom: "#fb8c00",
								backgroundGradientTo: "#ffa726",
								color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
								labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							}}
							accessor={"data"}
							paddingLeft="30"
						/>
					</View>
				))}
		</Box>
	);
};

export default DataView;
