import React, { useState, useContext, useCallback, useEffect } from "react";
import {
	VStack,
	Box,
	Divider,
	Center,
	Text,
	Heading,
	HStack,
	Button,
	ScrollView,
	Input,
	IconButton,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Patient } from "../../Redux/Patient/Selector";
import { PatientActions } from "../../Redux/Patient/reducer";
import Auth_Global from "../../Context/store/Auth_Global";
import { LOADING_STATUS, Operation_Mode } from "../../Common/status_code";
import { useFocusEffect } from "@react-navigation/native";
import { getPersonalInformationById } from "../../Common/User_Functions";
import LoadingSpinner from "../../sharedComponent/Loading";
import { MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";
import Border from "../../sharedComponent/Common/Border";

const PatientView = props => {
	const dispatch = useDispatch();
	const PatientState = useSelector(Patient());
	const context = useContext(Auth_Global);
	const [Data, setData] = useState();
	const [Loading, setLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [page, setpage] = useState(0);
	const [max_page, setMax_Page] = useState(0);

	useFocusEffect(
		useCallback(() => {
			const { loading, data, Page, Max_Page } = PatientState;
			if (loading === LOADING_STATUS.FULFILLED) {
				setData(data);
				setLoading(false);
				setpage(Page);
				setMax_Page(Max_Page);
			}
		}, [PatientState])
	);

	useFocusEffect(
		useCallback(() => {
			setLoading(true);
			dispatch(
				PatientActions.searchPatientWithQuery({
					Doctor_id: context.user.userInfo.Doctor_id,
					searchQuery: searchQuery,
					Page: 1,
					limit: 10,
				})
			);
		}, [dispatch])
	);

	const editPersonalInformation = async Patient_id => {
		const initialState = await getPersonalInformationById({ Patient_id: Patient_id });
		props.navigation.navigate("PersonalInformation", {
			mode: Operation_Mode.edit,
			initialState: initialState,
		});
	};

	const AddReportwithPersonalInformation = async Patient_id => {
		//const Patient_data = await getPersonalInformationById({ Patient_id: Patient_id });
		props.navigation.navigate("ClinicalInformation", {
			mode: Operation_Mode.createWithPatientId,
			Patient_id: Patient_id,
		});
	};

	const searchPatientWithQuery = async () => {
		// console.log(searchQuery);
		setLoading(true);
		dispatch(
			PatientActions.searchPatientWithQuery({
				Doctor_id: context.user.userInfo.Doctor_id,
				searchQuery: searchQuery,
				Page: 1,
				limit: 10,
			})
		);
	};

	const previousPage = () => {
		setLoading(true);

		dispatch(
			PatientActions.searchPatientWithQuery({
				Doctor_id: context.user.userInfo.Doctor_id,
				searchQuery: searchQuery,
				Page: page - 1,
				limit: 10,
			})
		);

		setpage(page - 1);
	};

	const nextPage = () => {
		setLoading(true);

		dispatch(
			PatientActions.searchPatientWithQuery({
				Doctor_id: context.user.userInfo.Doctor_id,
				searchQuery: searchQuery,
				Page: page + 1,
				limit: 10,
			})
		);

		setpage(page + 1);
	};

	return (
		<>
			{Loading ? (
				<LoadingSpinner />
			) : (
				<VStack divider={<Divider />}>
					<Box border="1" borderRadius="md" mt="3" p="3" alignSelf="center" width="100%">
						<VStack width="100%" height="85%">
							<VStack alignSelf="center" space={2} width="100%" height="20%">
								<Input
									placeholder="Enter Your Search"
									bg="white"
									value={searchQuery}
									onChangeText={text => setSearchQuery(text)}
									width="100%"
								/>
								<Button
									size="sm"
									leftIcon={<AntDesign name="search1" size={16} color="white" />}
									onPress={() => searchPatientWithQuery()}
								>
									Search
								</Button>
							</VStack>
							<ScrollView
								nestedScrollEnabled={true}
								// contentContainerStyle={{
								// 	paddingBottom: 100,
								// }}
								width="100%"
								height="70%"
							>
								<Center>
									{(Data == null || Data.length ==0) && <Text color="red.400" bold mt="3">No data</Text>}
									{Data &&
										Data.map((d, index) => (
											<Box
												border="1"
												borderRadius="md"
												bg="white"
												mt="3"
												w="100%"
												p="3"
												shadow="3"
												borderColor="indigo.400"
												key={index}
											>
												<VStack space="4" divider={<Divider />}>
													<Box px="4" pt="4">
														<Heading>{d.Name}</Heading>
													</Box>
													<Box px="4">
														<VStack>
															<HStack>
																<Box borderWidth="1" borderColor="muted.200" w="30%">
																	<Text bold alignSelf="center">
																		Age
																	</Text>
																</Box>
																<Box borderWidth="1" borderColor="muted.200" w="70%">
																	<Text alignSelf="center">{d.Age}</Text>
																</Box>
															</HStack>
															<HStack>
																<Box borderWidth="1" borderColor="muted.200" w="30%">
																	<Text bold alignSelf="center">
																		Email
																	</Text>
																</Box>
																<Box borderWidth="1" borderColor="muted.200" w="70%">
																	<Text alignSelf="center">{d.Email}</Text>
																</Box>
															</HStack>
															<HStack>
																<Box borderWidth="1" borderColor="muted.200" w="30%">
																	<Text bold alignSelf="center">
																		Phone
																	</Text>
																</Box>
																<Box borderWidth="1" borderColor="muted.200" w="70%">
																	<Text alignSelf="center">{d.Phone}</Text>
																</Box>
															</HStack>
														</VStack>
													</Box>
													<HStack px="4" space={2}>
														<Button
															size="sm"
															onPress={() => editPersonalInformation(d.Patient_id)}
															leftIcon={<MaterialIcons name="update" size={16} color="white" />}
														>
															Update
														</Button>
														<Button
															size="sm"
															onPress={() => AddReportwithPersonalInformation(d.Patient_id)}
															leftIcon={<AntDesign name="addfile" size={16} color="white" />}
														>
															Add Report
														</Button>
													</HStack>
												</VStack>
											</Box>
										))}
								</Center>
							</ScrollView>
						</VStack>
						<Border>
							<HStack alignSelf="center" my={3}>
								<IconButton
									icon={<Entypo name="arrow-with-circle-left" size={24} color="blue" />}
									isDisabled={page == 1}
									onPress={previousPage}
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
									isDisabled={page == max_page}
									onPress={nextPage}
								/>
							</HStack>
						</Border>
					</Box>
				</VStack>
			)}
		</>
	);
};

export default PatientView;
