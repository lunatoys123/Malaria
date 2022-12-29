import React, { useState, useEffect, useContext, useCallback } from "react";
import { VStack, Box, Divider, Center, Text, Heading, HStack, Button } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Patient } from "../../Redux/Patient/Selector";
import { PatientActions } from "../../Redux/Patient/reducer";
import Auth_Global from "../../Context/store/Auth_Global";
import { LOADING_STATUS } from "../../Common/status_code";
import { useFocusEffect } from "@react-navigation/native";

const PatientView = () => {
	const dispatch = useDispatch();
	const PatientState = useSelector(Patient());
	const context = useContext(Auth_Global);
	const [Data, setData] = useState();

	useEffect(() => {
		const { loading, data } = PatientState;
		if (loading === LOADING_STATUS.FULFILLED) {
			setData(data);
		}
	}, [PatientState]);

	useFocusEffect(
		useCallback(() => {
			dispatch(PatientActions.getPatientList({ Doctor_id: context.user.userInfo.Doctor_id }));
		}, [])
	);

	return (
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
						<VStack
							space="4"
							divider={<Divider />}
						>
							<Box
								px="4"
								pt="4"
							>
								<Heading>{d.Name}</Heading>
							</Box>
							<Box px="4">
								<VStack>
									<HStack>
										<Box
											borderWidth="1"
											borderColor="muted.200"
											w="30%"
										>
											<Text
												bold
												alignSelf="center"
											>
												Age
											</Text>
										</Box>
										<Box
											borderWidth="1"
											borderColor="muted.200"
											w="70%"
										>
											<Text alignSelf="center">{d.Age}</Text>
										</Box>
									</HStack>
									<HStack>
										<Box
											borderWidth="1"
											borderColor="muted.200"
											w="30%"
										>
											<Text
												bold
												alignSelf="center"
											>
												Email
											</Text>
										</Box>
										<Box
											borderWidth="1"
											borderColor="muted.200"
											w="70%"
										>
											<Text alignSelf="center">{d.Email}</Text>
										</Box>
									</HStack>
									<HStack>
										<Box
											borderWidth="1"
											borderColor="muted.200"
											w="30%"
										>
											<Text
												bold
												alignSelf="center"
											>
												Phone
											</Text>
										</Box>
										<Box
											borderWidth="1"
											borderColor="muted.200"
											w="70%"
										>
											<Text alignSelf="center">{d.Phone}</Text>
										</Box>
									</HStack>
								</VStack>
							</Box>
							<HStack
								px="4"
								space={2}
							>
								<Button size="sm">update</Button>
								<Button size="sm">Add Report</Button>
							</HStack>
						</VStack>
					</Box>
				))}
		</Center>
	);
};

export default PatientView;
