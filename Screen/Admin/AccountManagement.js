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
	AlertDialog,
	Center,
} from "native-base";
import Auth_Global from "../../Context/store/Auth_Global";
import { useFocusEffect } from "@react-navigation/native";
import { AdminAction } from "../../Redux/Admin/reducer";
import { Admin } from "../../Redux/Admin/selector";
import { useSelector, useDispatch } from "react-redux";
import { LOADING_STATUS, Account_status } from "../../Common/status_code";
import { MaterialIcons, AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import Border from "../../sharedComponent/Common/Border";
import LoadingSpinner from "../../sharedComponent/Loading";
import { Dimensions } from "react-native";

const AccountManagement = props => {
	const dispatch = useDispatch(props);
	const AdminState = useSelector(Admin());
	const context = useContext(Auth_Global);
	const [Account, setAccount] = useState([]);
	const [loading, setLoading] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const [recovered, setRecovered] = useState(false);
	const [message, setMessage] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [page, setpage] = useState(0);
	const [max_page, setMax_Page] = useState(0);
	const fullWidth = Dimensions.get("window").width;

	useFocusEffect(
		useCallback(() => {
			const { loading, AccountManagement, Message, Page, Max_Page } = AdminState;
			if (loading === LOADING_STATUS.FULFILLED) {
				setMessage(Message);
				setAccount(AccountManagement);
				setLoading(false);
				setpage(Page);
				setMax_Page(Max_Page);
				//dispatch(AdminAction.Initialilze());
			}
		}, [AdminState])
	);

	useFocusEffect(
		useCallback(() => {
			setLoading(true);
			dispatch(
				AdminAction.SearchQueryForUser({
					Doctor_id: context.user.userInfo.Doctor_id,
					searchQuery: searchQuery,
					Page: 1,
					limit: 10,
				})
			);
		}, [dispatch])
	);

	const createUser = () => {
		props.navigation.navigate("AddUser");
	};

	const deleteUser = Doctor_id => {
		// console.log(Doctor_id);
		setLoading(true);
		dispatch(AdminAction.deleteUser({ Doctor_id, page, searchQuery, limit: 10 }));
		setDeleted(true);
	};

	const recoverUser = Doctor_id => {
		setLoading(true);
		dispatch(AdminAction.recoverUser({ Doctor_id, page, searchQuery, limit: 10 }));
		setRecovered(true);
	};

	const searchUser = () => {
		setLoading(true);
		dispatch(
			AdminAction.SearchQueryForUser({
				Doctor_id: context.user.userInfo.Doctor_id,
				searchQuery: searchQuery,
			})
		);
	};

	const previousPage = () => {
		if (Number(page) == 1) {
			return;
		}
		setLoading(true);
		AdminAction.SearchQueryForUser({
			Doctor_id: context.user.userInfo.Doctor_id,
			searchQuery: searchQuery,
			Page: page - 1,
			limit: 10,
		});
		setpage(page - 1);
	};

	const nextPage = () => {
		if (Number(page) == Number(max_page)) {
			return;
		}
		setLoading(true);
		AdminAction.SearchQueryForUser({
			Doctor_id: context.user.userInfo.Doctor_id,
			searchQuery: searchQuery,
			Page: page + 1,
			limit: 10,
		});
		setpage(page + 1);
	};
	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<VStack>
					<Box border="1" borderRadius="md" mt="3" alignSelf="center" safeArea height="93%">
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
									value={searchQuery}
									onChangeText={text => setSearchQuery(text)}
								/>
								<Button
									leftIcon={<Ionicons name="search" size={20} color="white" />}
									onPress={() => searchUser()}
								>
									Search
								</Button>
							</VStack>

							<ScrollView
								nestedScrollEnabled={true}
								// contentContainerStyle={{
								// 	paddingBottom: 60,
								// }}
								width="100%"
							>
								{Account.length > 0 &&
									Account.map((d, index) => (
										<Border width="90%" key={index}>
											<VStack space="2" divider={<Divider />}>
												<HStack>
													<HStack px="4" py="2" alignItems="center">
														<Heading w="90%">{d.Login_name}</Heading>
														<Box>
															<Menu
																width="190"
																defaultIsOpen={false}
																trigger={triggerProps => {
																	return (
																		<Pressable {...triggerProps}>
																			{({ isPressed }) => {
																				return (
																					<HamburgerIcon
																						color={isPressed ? "indigo.500" : "black"}
																					/>
																				);
																			}}
																		</Pressable>
																	);
																}}
															>
																<Menu.Item
																	onPress={() => {
																		props.navigation.navigate("ViewDoctorReport", {
																			Doctor_name: d.Login_name,
																			Doctor_id: d._id,
																		});
																	}}
																>
																	View Patient Reports
																</Menu.Item>
																<Menu.Item
																	onPress={() =>
																		props.navigation.navigate("Audit", {
																			Doctor_name: d.Login_name,
																			Doctor_id: d._id,
																		})
																	}
																>
																	View Audit Trail
																</Menu.Item>
																{/* <Menu.Item isDisabled={d.Account_status == "active"}>
															Change Password
														</Menu.Item> */}
																{d.Account_status === Account_status.Deleted ? (
																	<Menu.Item onPress={() => recoverUser(d._id)}>
																		Recover User
																	</Menu.Item>
																) : (
																	<Menu.Item onPress={() => deleteUser(d._id)}>
																		Remove User
																	</Menu.Item>
																)}
															</Menu>
														</Box>
													</HStack>
												</HStack>
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
														<Button
															size="sm"
															onPress={() => {
																props.navigation.navigate("ViewDoctorReport", {
																	Doctor_name: d.Login_name,
																	Doctor_id: d._id,
																});
															}}
														>
															View Patient Reports
														</Button>
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
														{d.Account_status === Account_status.Deleted ? (
															<Button size="sm" onPress={() => recoverUser(d._id)}>
																Recover User
															</Button>
														) : (
															<Button size="sm" onPress={() => deleteUser(d._id)}>
																Remove User
															</Button>
														)}
													</HStack>
												</ScrollView>
											</VStack>
										</Border>
									))}
							</ScrollView>
						</VStack>
						<Border width={fullWidth}>
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
									onPress={() => nextPage}
								/>
							</HStack>
						</Border>
					</Box>
				</VStack>
			)}
			<AlertDialog isOpen={deleted} onClose={() => setDeleted(false)}>
				<AlertDialog.Content>
					<AlertDialog.CloseButton />
					<AlertDialog.Header>Delete User Status</AlertDialog.Header>
					<AlertDialog.Body>{message}</AlertDialog.Body>
				</AlertDialog.Content>
			</AlertDialog>
			<AlertDialog isOpen={recovered} onClose={() => setRecovered(false)}>
				<AlertDialog.Content>
					<AlertDialog.CloseButton />
					<AlertDialog.Header>Recover User Status</AlertDialog.Header>
					<AlertDialog.Body>{message}</AlertDialog.Body>
				</AlertDialog.Content>
			</AlertDialog>
		</>
	);
};

export default AccountManagement;
