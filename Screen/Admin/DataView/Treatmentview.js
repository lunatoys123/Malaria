import { useFocusEffect } from "@react-navigation/native";
import { Box, Text, Heading } from "native-base";
import React, { useCallback, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Admin } from "../../../Redux/Admin/selector";
import { AdminAction } from "../../../Redux/Admin/reducer";
import Auth_Global from "../../../Context/store/Auth_Global";
import { LOADING_STATUS } from "../../../Common/status_code";
import { PieChart } from "react-native-chart-kit";
import Border from "../../../sharedComponent/Common/Border";
import { Dimensions } from "react-native";

const Treatmentview = () => {
	const dispatch = useDispatch();
	const AdminState = useSelector(Admin());
	const context = useContext(Auth_Global);
	const [TreatmentStatus, setTreatmentStatus] = useState([]);
	const [TreatmentSummary, setTreatmentSummary] = useState([]);

	useFocusEffect(
		useCallback(() => {
			const { loading, Treatment_status, Treatment_Summary } = AdminState;
			if (loading === LOADING_STATUS.FULFILLED) {
				setTreatmentStatus(Treatment_status);
				setTreatmentSummary(Treatment_Summary);
			}
		}, [AdminState])
	);

	useFocusEffect(
		useCallback(() => {
			dispatch(AdminAction.TreatmentSummaryData({ Doctor_id: context.user.userInfo.Doctor_id }));
		}, [dispatch])
	);
	return (
		<Box safeArea>
			{TreatmentStatus.length > 0 &&
				TreatmentStatus.map((d, index) => (
					<Border key={index}>
						<Heading size="sm" alignSelf="center">
							{d.label}
						</Heading>
						<PieChart
							width={Dimensions.get("window").width * 0.9}
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
					</Border>
				))}
		</Box>
	);
};

export default Treatmentview;
