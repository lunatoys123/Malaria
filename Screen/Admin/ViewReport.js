import { useFocusEffect } from "@react-navigation/native";
import {
	View,
	Text,
	VStack,
	Heading,
	ScrollView,
	Pressable,
	Center,
	HStack,
	IconButton,
	Input,
} from "native-base";
import React, { useCallback, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS } from "../../Common/status_code";
import { caseAction } from "../../Redux/Case/reducer";
import { Case } from "../../Redux/Case/selector";
import Border from "../../sharedComponent/Common/Border";
import { generatePDF } from "../../Common/User_Functions";
import { Entypo } from "@expo/vector-icons";
import LoadingSpinner from "../../sharedComponent/Loading";

const ViewReport = props => {
	const dispatch = useDispatch();
	const CaseState = useSelector(Case());
	const Doctor_name = props.route.params.Doctor_name;
	const Doctor_id = props.route.params.Doctor_id;
	const [ReportData, setReportData] = useState([]);
	const [page, setpage] = useState(0);
	const [max_page, setMax_Page] = useState(0);
	const [Loading, setLoading] = useState(false);

	useFocusEffect(
		useCallback(() => {
			const { loading, data, Page, Max_Page } = CaseState;
			if (loading === LOADING_STATUS.FULFILLED) {
				setReportData(data);
				setLoading(false);
				setpage(Page);
				setMax_Page(Max_Page);
			}
		}, [CaseState])
	);

	useFocusEffect(
		useCallback(() => {
			setLoading(true);
			dispatch(caseAction.getCaseByDoctorId({ Doctor_id: Doctor_id, Page: 1, limit: 10 }));
		}, [dispatch])
	);

	const nextPage = () => {
		if (Number(page) == Number(max_page)) {
			return;
		}
		setLoading(true);

		dispatch(
			caseAction.getCaseByDoctorId({
				Doctor_id: Doctor_id,
				Page: page + 1,
				limit: 10,
			})
		);

		setpage(page + 1);
	};

	const previousPage = () => {
		if (Number(page) == 1) {
			return;
		}
		setLoading(true);

		dispatch(
			caseAction.getCaseByDoctorId({
				Doctor_id: Doctor_id,
				Page: page - 1,
				limit: 10,
			})
		);

		setpage(page - 1);
	};
	return (
		<>
			{Loading ? (
				<LoadingSpinner />
			) : (
				<VStack>
					<Border>
						<Center>
							<Heading size="sm">{`Patient Reports(${Doctor_name})`}</Heading>
						</Center>
						<HStack alignSelf="center" my={3}>
							<IconButton
								icon={<Entypo name="arrow-with-circle-left" size={24} color="blue" />}
								isDisabled={Number(page) == 1}
								onPress={() => previousPage()}
							/>
							<Input
								value={page.toString()}
								w="20%"
								size="sm"
								_pressed={{ borderColor: "red.500" }}
							/>
							{/* <Input
										defaultValue={"/" + max_page.toString()}
										w="20%"
										isDisabled={true}
										size="sm"
										_disabled={{ borderColor: "red.500", textDecorationColor:"black" }}
									/> */}
							<Center
								borderWidth="1"
								borderColor="coolGray.400"
								alignContent="center"
								bg="coolGray.200"
								width="20%"
								borderRadius="md"
							>
								<Center>{"/" + max_page}</Center>
							</Center>
							<IconButton
								icon={<Entypo name="arrow-with-circle-right" size={24} color="blue" />}
								isDisabled={Number(page) == Number(max_page)}
								onPress={() => nextPage()}
							/>
						</HStack>
					</Border>
					<ScrollView
						nestedScrollEnabled={true}
						contentContainerStyle={{
							paddingBottom: 100,
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
				</VStack>
			)}
		</>
	);
};

export default ViewReport;
