import React, { useContext, useState, useCallback } from "react";
import {
	FormControl,
	Text,
	Box,
	HStack,
	Button,
	Heading,
	VStack,
	Divider,
	ScrollView,
	Modal,
	Input,
	Menu,
	IconButton,
	Pressable,
	HamburgerIcon,
	Select,
	Icon,
	useToast,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Case } from "../../Redux/Case/selector";
import { caseAction } from "../../Redux/Case/reducer";
import Auth_Global from "../../Context/store/Auth_Global";
import { LOADING_STATUS, Operation_Mode } from "../../Common/status_code";
import { useFocusEffect } from "@react-navigation/native";
import {
	getCaseByCaseId,
	getTreatmentByCaseId,
	getLaboratoryByCaseId,
	generatePDF,
} from "../../Common/User_Functions";
import { Patient_Status, report_status } from "../../Common/Options";
import LoadingSpinner from "../../sharedComponent/Loading";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import FontIcon from "react-native-vector-icons/FontAwesome";
import Border from "../../sharedComponent/Common/Border";
import DateTimePicker from "@react-native-community/datetimepicker";

const Report = props => {
	const dispatch = useDispatch();
	const CaseState = useSelector(Case());
	const context = useContext(Auth_Global);
	const toast = useToast();
	const [Data, setData] = useState([]);
	const [ShowSearchModal, setShowSearchModal] = useState(false);
	const [Loading, setLoading] = useState(false);

	const [searchStatus, setSearchStatus] = useState("");
	const [ReportStatus, setReportStatus] = useState("");
	const [PatientName, setPatientName] = useState("");
	const [showSearchStartDate, setShowSearchStartDate] = useState(false);
	const [showSearchEndDate, setShowSearchEndDate] = useState(false);
	const [searchStartDate, setSearchStartDate] = useState(null);
	const [searchEndDate, setSearchEndDate] = useState(null);

	useFocusEffect(
		useCallback(() => {
			const { loading, data } = CaseState;
			if (loading === LOADING_STATUS.FULFILLED) {
				setData(data);
				setLoading(false);
			}
		}, [CaseState])
	);

	useFocusEffect(
		useCallback(() => {
			setLoading(true);
			dispatch(
				caseAction.getCaseByDoctorId({
					Doctor_id: context.user.userInfo.Doctor_id,
				})
			);
			//setLoading(false);
		}, [])
	);

	const createReport = () => {
		props.navigation.navigate("PersonalInformation", {
			mode: Operation_Mode.create,
			//initialState: initialState,
		});
	};

	const updateReport = async case_id => {
		const initialState = await getCaseByCaseId({ case_id: case_id });
		props.navigation.navigate("ClinicalInformation", {
			mode: Operation_Mode.edit,
			initialState: initialState,
		});
	};

	const createTreatment = async case_id => {
		props.navigation.navigate("Treatment", {
			mode: Operation_Mode.create,
			case_id: case_id,
		});
	};

	const editTreatment = async case_id => {
		const initialState = await getTreatmentByCaseId({ case_id: case_id });
		props.navigation.navigate("Treatment", {
			mode: Operation_Mode.edit,
			initialState: initialState,
		});
	};

	const createLaboratory = case_id => {
		props.navigation.navigate("Laboratory", {
			mode: Operation_Mode.create,
			case_id: case_id,
		});
	};

	const editLaboratory = async case_id => {
		const initialState = await getLaboratoryByCaseId({ case_id: case_id });
		props.navigation.navigate("Laboratory", {
			mode: Operation_Mode.edit,
			initialState: initialState,
		});
	};

	const onChangeSearchStartDate = (event, selectedDate) => {
		if (event.type == "set") {
			const currentDate = selectedDate;
			//console.log(currentDate);
			setSearchStartDate(currentDate);
			setShowSearchStartDate(false);
		}
	};

	const onChangeSearchEndDate = (event, selectedDate) => {
		if (event.type == "set") {
			const currentDate = selectedDate;
			//console.log(currentDate);
			setSearchEndDate(currentDate);
			setShowSearchEndDate(false);
		}
	};

	const ResetSearch = () => {
		setSearchStatus("");
		setReportStatus("");
		setPatientName("");
		setSearchStartDate(null);
		setSearchEndDate(null);
	};

	const saveSearchQuery = () => {
		if (searchStartDate != null && searchEndDate != null) {
			if (searchStartDate > searchEndDate) {
				toast.show({
					title: "Error",
					description: "Start Date cannot be greater than End Date",
					placement: "top",
					duration: 100,
				});
				return;
			}
		}
		setLoading(true);
		let startDate = searchStartDate;
		if (startDate != null) {
			startDate = new Date(startDate);
			startDate.setHours(0, 0, 0);
		}

		let endDate = searchEndDate;
		if (endDate != null) {
			endDate = new Date(endDate);
			endDate.setHours(23, 59, 59);
		}

		dispatch(
			caseAction.searchCaseWithQuery({
				Doctor_id: context.user.userInfo.Doctor_id,
				PatientName: PatientName,
				searchStatus: searchStatus,
				searchStartDate: startDate,
				searchEndDate: endDate,
				ReportStatus: ReportStatus,
			})
		);
		setShowSearchModal(false);
	};

	return (
		<>
			{Loading ? (
				<LoadingSpinner />
			) : (
				<VStack divider={<Divider />}>
					<Box border="1" borderRadius="md" mt="3" p="3" alignSelf="center">
						<VStack space={3}>
							<HStack alignItems="center" space={2}>
								<Heading size="sm" w="50%">
									Your Report
								</Heading>
								<Box w="50%">
									<HStack alignSelf="flex-end" space={2} px="2">
										<Button
											colorScheme="success"
											onPress={() => setShowSearchModal(true)}
											leftIcon={<AntDesign name="search1" size={16} color="white" />}
										>
											Search
										</Button>
										<Button
											onPress={() => createReport()}
											leftIcon={<Ionicons name="create-outline" size={16} color="white" />}
										>
											Create
										</Button>
									</HStack>
								</Box>
							</HStack>
							<Divider />
							<ScrollView
								nestedScrollEnabled={true}
								contentContainerStyle={{
									paddingBottom: 60,
								}}
								width="100%"
							>
								{Data &&
									Data.map(d => (
										<Border key={d._id}>
											<VStack
												//space="3"
												divider={
													<Divider
														_light={{
															bg: "muted.400",
														}}
														_dark={{
															bg: "muted.50",
														}}
													/>
												}
											>
												<Box px="4">
													<HStack alignItems="center">
														<Heading size="sm" w="90%">
															{d.Patient_Name}
														</Heading>
														<Menu
															width="190"
															defaultIsOpen={false}
															trigger={triggerProps => {
																return (
																	<Pressable {...triggerProps}>
																		{({ isPressed }) => {
																			return (
																				<HamburgerIcon color={isPressed ? "indigo.500" : "black"} />
																			);
																		}}
																	</Pressable>
																);
															}}
														>
															<Menu.Item onPress={() => updateReport(d._id)}>
																Update Report
															</Menu.Item>
															{d.haveTreatment ? (
																<Menu.Item onPress={() => editTreatment(d._id)}>
																	Update Treatment
																</Menu.Item>
															) : (
																<Menu.Item onPress={() => createTreatment(d._id)}>
																	Create Treatment
																</Menu.Item>
															)}

															{d.haveLaboratory ? (
																<Menu.Item onPress={() => editLaboratory(d._id)}>
																	Update Laboratory
																</Menu.Item>
															) : (
																<Menu.Item onPress={() => createLaboratory(d._id)}>
																	Create Laboratory
																</Menu.Item>
															)}
															<Menu.Item onPress={() => generatePDF(d._id)}>View Report</Menu.Item>
														</Menu>
													</HStack>
												</Box>
												<Box px="4" pb="2">
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
												</Box>
											</VStack>
										</Border>
									))}
							</ScrollView>
						</VStack>
						<Modal isOpen={ShowSearchModal} onClose={() => setShowSearchModal(false)} size="full">
							<Modal.Content>
								<Modal.CloseButton />
								<Modal.Header>Search</Modal.Header>
								<Modal.Body>
									<FormControl>
										<FormControl.Label>Patient Name</FormControl.Label>
										<Input
											placeholder="Enter Patient Name"
											value={PatientName}
											onChangeText={text => setPatientName(text)}
										/>
									</FormControl>
									<FormControl>
										<FormControl.Label>Patient status</FormControl.Label>
										<Select
											selectedValue={searchStatus}
											minW="200"
											placeholder="Select Patient Status"
											onValueChange={itemValue => setSearchStatus(itemValue)}
										>
											{Patient_Status.map(d => (
												<Select.Item label={d.Label} value={d.Value} key={d.Label} />
											))}
										</Select>
									</FormControl>
									<FormControl>
										<FormControl.Label>Report Status</FormControl.Label>
										<Select
											selectedValue={ReportStatus}
											minW="200"
											placeholder="Select Report Status"
											onValueChange={itemValue => setReportStatus(itemValue)}
										>
											{report_status.map(d => (
												<Select.Item label={d.Label} value={d.Value} key={d.Label} />
											))}
										</Select>
									</FormControl>
									<FormControl>
										<HStack space={2} alignSelf="center">
											<Box width="2/5">
												<FormControl.Label>Start Date</FormControl.Label>
												<Input
													placeholder="Select Start Date"
													isDisabled={true}
													rightElement={
														<Pressable onPress={() => setShowSearchStartDate(true)}>
															<Icon as={<FontIcon name="calendar" />} size={5} mr={2} />
														</Pressable>
													}
													value={searchStartDate ? searchStartDate.toISOString().split("T")[0] : ""}
												/>
												{showSearchStartDate && (
													<DateTimePicker
														testID="dateTimePicker"
														value={searchStartDate ? searchStartDate : new Date()}
														mode={"date"}
														is24Hour={true}
														onChange={(event, selectedDate) =>
															onChangeSearchStartDate(event, selectedDate)
														}
													/>
												)}
											</Box>
											<Box width="2/5">
												<FormControl.Label>End Date</FormControl.Label>
												<Input
													placeholder="Select End Date"
													isDisabled={true}
													rightElement={
														<Pressable onPress={() => setShowSearchEndDate(true)}>
															<Icon as={<FontIcon name="calendar" />} size={5} mr={2} />
														</Pressable>
													}
													value={searchEndDate ? searchEndDate.toISOString().split("T")[0] : ""}
												/>
												{showSearchEndDate && (
													<DateTimePicker
														testID="dateTimePicker"
														value={searchEndDate ? searchEndDate : new Date()}
														mode={"date"}
														is24Hour={true}
														onChange={(event, selectedDate) =>
															onChangeSearchEndDate(event, selectedDate)
														}
													/>
												)}
											</Box>
										</HStack>
									</FormControl>
								</Modal.Body>
								<Modal.Footer>
									<HStack space={2} width="100%" justifyContent="center">
										<Button onPress={() => saveSearchQuery()} size="sm" width="2/5">
											Save
										</Button>
										<Button
											size="sm"
											width="2/5"
											colorScheme="danger"
											onPress={() => ResetSearch(false)}
										>
											Reset
										</Button>
									</HStack>
								</Modal.Footer>
							</Modal.Content>
						</Modal>
					</Box>
				</VStack>
			)}
		</>
	);
};

export default Report;
