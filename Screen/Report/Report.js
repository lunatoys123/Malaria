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
	HamburgerIcon
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
import LoadingSpinner from "../../sharedComponent/Loading";
import { MaterialIcons } from "@expo/vector-icons";

const Report = props => {
	const dispatch = useDispatch();
	const CaseState = useSelector(Case());
	const context = useContext(Auth_Global);
	const [Data, setData] = useState([]);
	const [ShowSearchModal, setShowSearchModal] = useState(false);
	const [Loading, setLoading] = useState(false);

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
										<Button colorScheme="success" onPress={() => setShowSearchModal(true)}>
											Search
										</Button>
										<Button onPress={() => createReport()}>Create</Button>
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
										<Box
											border="1"
											borderRadius="md"
											bg="white"
											shadow="3"
											my="2"
											key={d._id}
											borderWidth={1}
											borderColor="indigo.400"
										>
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
										</Box>
									))}
							</ScrollView>
						</VStack>
						<Modal isOpen={ShowSearchModal} onClose={() => setShowSearchModal(false)} size="full">
							<Modal.Content>
								<Modal.CloseButton />
								<Modal.Header>Search</Modal.Header>
								<Modal.Body>
									<FormControl>
										<FormControl.Label>Search</FormControl.Label>
										<Input placeholder="Enter your search" />
									</FormControl>
								</Modal.Body>
								<Modal.Footer>
									<Button.Group>
										<Button onPress={() => setShowSearchModal(false)}>Save</Button>
									</Button.Group>
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
