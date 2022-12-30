import React, { useEffect, useContext, useState, useCallback } from "react";
import { FormControl, Text, Box, HStack, Button, Heading, VStack, Divider, ScrollView, Modal, Input } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Case } from "../../Redux/Case/selector";
import { caseAction } from "../../Redux/Case/reducer";
import Auth_Global from "../../Context/store/Auth_Global";
import { LOADING_STATUS, Operation_Mode } from "../../Common/status_code";
import { useFocusEffect } from "@react-navigation/native";
import { getCaseByCaseId, getTreatmentByCaseId, getLaboratoryByCaseId } from "../../Common/functions";

const Report = (props) => {
	const dispatch = useDispatch();
	const CaseState = useSelector(Case());
	const context = useContext(Auth_Global);
	const [Data, setData] = useState([]);
	const [ShowSearchModal, setShowSearchModal] = useState(false);

	useFocusEffect(
		useCallback(() => {
			const { loading, data } = CaseState;
			if (loading === LOADING_STATUS.FULFILLED) {
				setData(data);
			}
		}, [CaseState])
	);

	useFocusEffect(
		useCallback(() => {
			dispatch(
				caseAction.getCaseByDoctorId({
					Doctor_id: context.user.userInfo.Doctor_id,
				})
			);
		}, [])
	);

	const createReport = () => {
		props.navigation.navigate("PersonalInformation", {
			mode: Operation_Mode.create,
		});
	};

	const updateReport = async (case_id) => {
		const initialState = await getCaseByCaseId({ case_id: case_id });
		props.navigation.navigate("ClinicalInformation", {
			mode: Operation_Mode.edit,
			initialState: initialState,
		});
	};

	const createTreatment = async (case_id) => {
		props.navigation.navigate("Treatment", {
			mode: Operation_Mode.create,
			case_id: case_id,
		});
	};

	const editTreatment = async (case_id) => {
		const initialState = await getTreatmentByCaseId({ case_id: case_id });
		props.navigation.navigate("Treatment", {
			mode: Operation_Mode.edit,
			initialState: initialState,
		});
	};

	const createLaboratory = (case_id) => {
		props.navigation.navigate("Laboratory", {
			mode: Operation_Mode.create,
			case_id: case_id,
		});
	};

	const editLaboratory = async (case_id) => {
		const initialState = await getLaboratoryByCaseId({ case_id: case_id });
		props.navigation.navigate("Laboratory", {
			mode: Operation_Mode.edit,
			initialState: initialState,
		});
	};

	return (
		<VStack divider={<Divider />}>
			<Box
				border="1"
				borderRadius="md"
				mt="3"
				p="3"
				alignSelf="center"
			>
				<VStack space={3}>
					<HStack
						alignItems="center"
						space={2}
					>
						<Heading
							size="sm"
							w="50%"
						>
							Your Report
						</Heading>
						<Box w="50%">
							<HStack
								alignSelf="flex-end"
								space={2}
								px="2"
							>
								<Button
									colorScheme="success"
									size="sm"
									onPress={() => setShowSearchModal(true)}
								>
									Search
								</Button>
								<Button
									size="sm"
									onPress={() => createReport()}
								>
									Create
								</Button>
							</HStack>
						</Box>
					</HStack>
					<Divider />
					<ScrollView>
						{Data &&
							Data.map((d) => (
								<Box
									border="1"
									borderRadius="md"
									bg="white"
									shadow="3"
									my="2"
								>
									<VStack
										space="3"
										divider={<Divider />}
									>
										<Box px="4">
											<Heading
												size="sm"
												pt="3"
											>
												{d.Patient_Name}
											</Heading>
										</Box>
										<Box px="4">
											<Text>{`\u2B24 Patient id: ${d.Patient_id}`}</Text>
											<Text>{`\u2B24 Patient Status: ${d.Patient_Status}`}</Text>
											<Text>{`\u2B24 Report Status: ${d.Report_Status}`}</Text>
											<Text>{`\u2B24 Status Date: ${d.Status_date.substring(0, 10)}`}</Text>
										</Box>
										<Box
											px="4"
											pb="4"
										>
											<ScrollView horizontal={true}>
												<Button.Group space={2}>
													<Button
														size="sm"
														onPress={() => updateReport(d._id)}
													>
														Update Report
													</Button>
													{d.haveTreatment ? (
														<Button
															size="sm"
															onPress={() => editTreatment(d._id)}
														>
															Update Treatment
														</Button>
													) : (
														<Button
															size="sm"
															onPress={() => createTreatment(d._id)}
														>
															Create Treatment
														</Button>
													)}
													{d.haveLaboratory ? (
														<Button
															size="sm"
															onPress={() => editLaboratory(d._id)}
														>
															Update Laboratory
														</Button>
													) : (
														<Button
															size="sm"
															onPress={() => createLaboratory(d._id)}
														>
															Add Laboratory
														</Button>
													)}
												</Button.Group>
											</ScrollView>
										</Box>
									</VStack>
								</Box>
							))}
					</ScrollView>
				</VStack>
				<Modal
					isOpen={ShowSearchModal}
					onClose={() => setShowSearchModal(false)}
				>
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
	);
};

export default Report;
