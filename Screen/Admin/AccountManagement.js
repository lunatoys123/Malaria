import React, { useContext, useCallback, useState } from "react";
import {
	ScrollView,
	Box,
	Heading,
	VStack,
	Divider,
	Text,
	HStack,
	Menu,
	IconButton,
	Input,
	Button,
	Pressable,
	HamburgerIcon,
} from "native-base";
import Auth_Global from "../../Context/store/Auth_Global";
import { useFocusEffect } from "@react-navigation/native";
import { AdminAction } from "../../Redux/Admin/reducer";
import { Admin } from "../../Redux/Admin/selector";
import { useSelector, useDispatch } from "react-redux";
import { LOADING_STATUS } from "../../Common/status_code";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";

const AccountManagement = props => {
	const dispatch = useDispatch(props);
	const AdminState = useSelector(Admin());
	const context = useContext(Auth_Global);
	const [Account, setAccount] = useState([]);

	useFocusEffect(
		useCallback(() => {
			const { loading, AccountManagement } = AdminState;
			if (loading === LOADING_STATUS.FULFILLED) {
				setAccount(AccountManagement);
				//dispatch(AdminAction.Initialilze());
			}
		}, [AdminState])
	);

	useFocusEffect(
		useCallback(() => {
			dispatch(
				AdminAction.GetNormalUsersFromHospital({ Doctor_id: context.user.userInfo.Doctor_id })
			);
		}, [dispatch])
	);

	const createUser = () => {
		props.navigation.navigate("AddUser");
	};

	return (
		<VStack divider={<Divider />}>
			<Box border="1" borderRadius="md" mt="3" alignSelf="center" safeArea>
				<VStack space={3}>
					<HStack alignItems="center">
						<Heading ml="4" w="65%">
							Admin Panel
						</Heading>
						<Button
							leftIcon={<AntDesign name="addusergroup" color="white" size={20} />}
							size="sm"
							onPress={() => createUser()}
						>
							Add User
						</Button>
					</HStack>
					<Divider />
					<VStack space={2} w="90%" alignSelf="center">
						<Input
							placeholder="Search For User"
							backgroundColor="white"
							borderRadius="4"
							fontSize="14"
						/>
						<Button leftIcon={<Ionicons name="search" size={20} color="white" />}>Search</Button>
					</VStack>

					<ScrollView
						nestedScrollEnabled={true}
						contentContainerStyle={{
							paddingBottom: 60,
						}}
						width="100%"
					>
						{Account.length > 0 &&
							Account.map((d, index) => (
								<Box
									border="1"
									borderRadius="lg"
									w="90%"
									bg="white"
									alignSelf="center"
									mt="3"
									borderWidth="1"
									borderColor="indigo.400"
									key={index}
								>
									<VStack space="2" divider={<Divider />}>
										<Box px="4">
											<Heading w="90%">{d.Login_name}</Heading>
										</Box>
										<Box px="4" pb="4">
											<VStack>
												<Text>
													{`\u2B24 Email: `}
													<Text bold>{d.Email}</Text>
												</Text>
												<Text>
													{`\u2B24 Phone Number: `}
													<Text bold>{d.Phone_number}</Text>
												</Text>
												<Text>
													{`\u2B24 Account Status: `}
													<Text bold>{d.Account_status}</Text>
												</Text>
											</VStack>
										</Box>
										<ScrollView horizontal={true}>
											<HStack space={2} py="2" px="2">
												<Button size="sm">View Patient Reports</Button>
												<Button
													size="sm"
													onPress={() =>
														props.navigation.navigate("Audit", {
															Doctor_name: d.Login_name,
															Doctor_id: d._id,
														})
													}
												>
													View Audit Trail
												</Button>
												<Button size="sm">Change Password</Button>
												<Button size="sm">Remove User</Button>
											</HStack>
										</ScrollView>
									</VStack>
								</Box>
							))}
					</ScrollView>
				</VStack>
			</Box>
		</VStack>
	);
};

export default AccountManagement;
