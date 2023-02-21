import { useFocusEffect } from "@react-navigation/native";
import { Box, VStack, Divider, ScrollView, Text, Heading, Button } from "native-base";
import React, { useCallback, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Admin } from "../../../Redux/Admin/selector";
import { AdminAction } from "../../../Redux/Admin/reducer";
import Auth_Global from "../../../Context/store/Auth_Global";
import { LOADING_STATUS } from "../../../Common/status_code";
import Border from "../../../sharedComponent/Common/Border";
import AdminPieChart from "./Chart/PieChart";
import AdminBarChart from "./Chart/BarChart";
import { Treatment_Mode } from "../../../Common/status_code";
import LoadingSpinner from "../../../sharedComponent/Loading";

const Treatmentview = () => {
	const dispatch = useDispatch();
	const AdminState = useSelector(Admin());
	const context = useContext(Auth_Global);
	const [TreatmentStatus, setTreatmentStatus] = useState([]);
	const [TreatmentSummary, setTreatmentSummary] = useState([]);
	const [TreatementCount, setTreatmentCount] = useState([]);
	const [TreatmentMode, setTreatmentMode] = useState(Treatment_Mode.Treatment_Data);
	const [DrugData, setDrugData] = useState([]);
	const [loading, setLoading] = useState(false);

	useFocusEffect(
		useCallback(() => {
			const { loading, Treatment_status, Treatment_Summary, Treatment_count_data, Drug_data } =
				AdminState;
			if (loading === LOADING_STATUS.FULFILLED) {
				setTreatmentStatus(Treatment_status);
				setTreatmentSummary(Treatment_Summary);
				setTreatmentCount(Treatment_count_data);
				setDrugData(Drug_data);
				setLoading(false);
			}
		}, [AdminState])
	);

	useFocusEffect(
		useCallback(() => {
			setLoading(true);
			dispatch(AdminAction.TreatmentSummaryData({ Doctor_id: context.user.userInfo.Doctor_id }));
		}, [dispatch])
	);
	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<Box>
					<Border>
						<Button.Group
							colorScheme="blue"
							mx={2}
							size="sm"
							alignItems="center"
							width="100%"
							my={3}
						>
							<Button
								size="sm"
								onPress={() => setTreatmentMode(Treatment_Mode.Treatment_Data)}
								variant={TreatmentMode == Treatment_Mode.Treatment_Data ? "solid" : "outline"}
							>
								Treatment Data
							</Button>
							<Button
								size="sm"
								onPress={() => setTreatmentMode(Treatment_Mode.Threapy_Summary)}
								variant={TreatmentMode == Treatment_Mode.Threapy_Summary ? "solid" : "outline"}
							>
								Threapy Summary
							</Button>
							<Button
								size="sm"
								onPress={() => setTreatmentMode(Treatment_Mode.Drug_Summary)}
								variant={TreatmentMode == Treatment_Mode.Drug_Summary ? "solid" : "outline"}
							>
								Drug Summary
							</Button>
						</Button.Group>
					</Border>
					<ScrollView
						nestedScrollEnabled={true}
						contentContainerStyle={{
							paddingBottom: 100,
						}}
						width="100%"
					>
						{TreatmentMode === Treatment_Mode.Treatment_Data && (
							<Box>
								<Heading size="md" alignSelf="center">
									Treatment Data
								</Heading>
								<Border>
									<VStack divider={<Divider />}>
										<AdminPieChart data={TreatmentStatus} height={200} />
										<AdminPieChart data={TreatmentSummary} height={200} />
									</VStack>
								</Border>
							</Box>
						)}
						{TreatmentMode === Treatment_Mode.Threapy_Summary && (
							<Box>
								<Heading size="md" alignSelf="center">
									Threapy Summary
								</Heading>
								<Border>
									<AdminBarChart data={TreatementCount} />
								</Border>
							</Box>
						)}
						{TreatmentMode === Treatment_Mode.Drug_Summary && (
							<Box>
								<Heading size="md" alignSelf="center">
									Drug Summary
								</Heading>
								<Border>
									<AdminBarChart data={DrugData} />
								</Border>
							</Box>
						)}
					</ScrollView>
				</Box>
			)}
		</>
	);
};

export default Treatmentview;
