import { View, Text, Box, Heading, ScrollView } from "native-base";
import React, { useCallback, useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Auth_Global from "../../../Context/store/Auth_Global";
import { useDispatch, useSelector } from "react-redux";
import { Admin } from "../../../Redux/Admin/selector";
import { AdminAction } from "../../../Redux/Admin/reducer";
import { LOADING_STATUS } from "../../../Common/status_code";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Border from "../../../sharedComponent/Common/Border";
import AdminPieChart from "./Chart/PieChart";
import LoadingSpinner from "../../../sharedComponent/Loading";

const Overview = props => {
	const dispatch = useDispatch();
	const context = useContext(Auth_Global);
	const adminState = useSelector(Admin());
	const [patientSummary, setPatientSummary] = useState([]);
	const [loading, setLoading] = useState(false);

	useFocusEffect(
		useCallback(() => {
			const { loading, Patient_Summary } = adminState;
			if (LOADING_STATUS.FULFILLED === loading) {
				setPatientSummary(Patient_Summary);
				setLoading(false);
			}
		}, [adminState])
	);

	useFocusEffect(
		useCallback(() => {
			setLoading(true);
			dispatch(AdminAction.HospitalSummaryData({ Doctor_id: context.user.userInfo.Doctor_id }));
		}, [dispatch])
	);

	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<Box safeArea>
					<ScrollView
						nestedScrollEnabled={true}
						contentContainerStyle={{
							paddingBottom: 60,
						}}
						width="100%"
					>
						<Heading size="md" alignSelf="center">Overview</Heading>
						<Border>
							<AdminPieChart data={patientSummary} height={200}/>
						</Border>
					</ScrollView>
				</Box>
			)}
		</>
	);
};

export default Overview;
