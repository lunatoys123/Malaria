import { useFocusEffect } from "@react-navigation/native";
import { View, Text, VStack, Heading, ScrollView, Pressable } from "native-base";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS } from "../../Common/status_code";
import { caseAction } from "../../Redux/Case/reducer";
import { Case } from "../../Redux/Case/selector";
import Border from "../../sharedComponent/Common/Border";
import { generatePDF } from "../../Common/User_Functions";

const ViewReport = props => {
	const dispatch = useDispatch();
	const CaseState = useSelector(Case());
	const Doctor_name = props.route.params.Doctor_name;
	const Doctor_id = props.route.params.Doctor_id;
	const [ReportData, setReportData] = useState([]);

	useFocusEffect(
		useCallback(() => {
			const { loading, data } = CaseState;
			if (LOADING_STATUS.FULFILLED === loading) {
				setReportData(data);
			}
		}, [CaseState])
	);

	useFocusEffect(
		useCallback(() => {
			dispatch(caseAction.getCaseByDoctorId({ Doctor_id: Doctor_id }));
		}, [dispatch])
	);
	return (
		<View>
			<Text>{`Patient Reports(${Doctor_name})`}</Text>
			<ScrollView
				nestedScrollEnabled={true}
				contentContainerStyle={{
					paddingBottom: 60,
				}}
				width="100%"
			>
				{ReportData &&
					ReportData.map((d, index) => (
						<Pressable onPress={() => generatePDF(d._id)} key={index}>
							{({ isHovered, isPressed, isFocused }) => {
								return (
									<Border width="90%" bg={isPressed ? "trueGray.300" : "white"}>
										<VStack px="2">
											<Heading size="sm">{d.Patient_Name}</Heading>
											<Text>
												{`\u2B24 Patient id: `}
												<Text bold>{d.Patient_id}</Text>
											</Text>
											<Text>
												{`\u2B24 Patient Status: `}
												<Text bold>{d.Patient_Status}</Text>
											</Text>
											<Text>
												{`\u2B24 Report Status: `}
												<Text bold> {d.Report_Status}</Text>
											</Text>
											<Text>
												{`\u2B24 Status Date: `}
												<Text bold>{d.Status_date.substring(0, 10)}</Text>
											</Text>
										</VStack>
									</Border>
								);
							}}
						</Pressable>
					))}
			</ScrollView>
		</View>
	);
};

export default ViewReport;
