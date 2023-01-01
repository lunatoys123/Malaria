import React, { useState, useContext, useCallback } from "react";
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
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Patient } from "../../Redux/Patient/Selector";
import { PatientActions } from "../../Redux/Patient/reducer";
import Auth_Global from "../../Context/store/Auth_Global";
import { LOADING_STATUS, Operation_Mode } from "../../Common/status_code";
import { useFocusEffect } from "@react-navigation/native";
import { getPersonalInformationById } from "../../Common/functions";
import LoadingSpinner from "../../sharedComponent/Loading";

const PatientView = props => {
	const dispatch = useDispatch();
	const PatientState = useSelector(Patient());
	const context = useContext(Auth_Global);
	const [Data, setData] = useState();
	const [Loading, setLoading] = useState(false);

	useFocusEffect(
		useCallback(() => {
			const { loading, data } = PatientState;
			if (loading === LOADING_STATUS.FULFILLED) {
				setData(data);
				setLoading(false);
			}
		}, [PatientState])
	);

	useFocusEffect(
		useCallback(() => {
			setLoading(true);
			dispatch(PatientActions.getPatientList({ Doctor_id: context.user.userInfo.Doctor_id }));
		}, [dispatch])
	);

	const editPersonalInformation = async Patient_id => {
		const initialState = await getPersonalInformationById({ Patient_id: Patient_id });
		props.navigation.navigate("PersonalInformation", {
			mode: Operation_Mode.edit,
			initialState: initialState,
		});
	};

	return (
		<>
			{Loading ? (
				<LoadingSpinner />
			) : (
				<ScrollView
					nestedScrollEnabled={true}
					contentContainerStyle={{
						paddingBottom: 60,
					}}
					width="100%"
				>
					<Center>
						{Data &&
							Data.map((d, index) => (
								<Box
									border="1"
									borderRadius="md"
									bg="white"
									mt="3"
									w="90%"
									p="3"
									shadow="3"
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
											<Button size="sm" onPress={() => editPersonalInformation(d.Patient_id)}>
												Update
											</Button>
											<Button size="sm">Add Report</Button>
										</HStack>
									</VStack>
								</Box>
							))}
					</Center>
				</ScrollView>
			)}
		</>
	);
};

export default PatientView;
