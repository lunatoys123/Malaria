import { useFocusEffect } from "@react-navigation/native";
import {
	Text,
	Heading,
	Center,
	VStack,
	Divider,
	Box,
	ScrollView,
	HStack,
	Select,
	Button,
	IconButton,
	Input,
	useToast,
} from "native-base";
import React, { useCallback, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS } from "../../Common/status_code";
import { AdminAction } from "../../Redux/Admin/reducer";
import { Admin } from "../../Redux/Admin/selector";
import Border from "../../sharedComponent/Common/Border";
import Auth_Global from "../../Context/store/Auth_Global";
import LoadingSpinner from "../../sharedComponent/Loading";
import { Audit_Code_Status } from "../../Common/Options";
import { Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Audit_report = props => {
	const toast = useToast();
	const dispatch = useDispatch();
	const AdminState = useSelector(Admin());
	const context = useContext(Auth_Global);
	const Doctor_name = props.route.params.Doctor_name;
	const target_Doctor_id = props.route.params.Doctor_id;
	const [AuditLog, setAuditLog] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectAuditCode, setSelectAuditCode] = useState("All");
	const [page, setpage] = useState(0);
	const [max_page, setMax_Page] = useState(0);
	const fullWidth = Dimensions.get("window").width;

	useFocusEffect(
		useCallback(() => {
			const { loading, Audit_Log, Audit_Page, Audit_MaxPage } = AdminState;
			if (loading === LOADING_STATUS.FULFILLED) {
				setAuditLog(Audit_Log);
				setLoading(false);
				setpage(Audit_Page);
				setMax_Page(Audit_MaxPage);
			}
		}, [AdminState])
	);

	useFocusEffect(
		useCallback(() => {
			setLoading(true);
			// dispatch(
			// 	AdminAction.GetAuditFromDoctorId({
			// 		Doctor_id: context.user.userInfo.Doctor_id,
			// 		target_Doctor_id: target_Doctor_id,
			// 	})
			// );
			dispatch(
				AdminAction.searchAuditByCode({
					Doctor_id: context.user.userInfo.Doctor_id,
					target_Doctor_id: target_Doctor_id,
					selectAuditCode: selectAuditCode == "All" ? "" : selectAuditCode,
					page: 1,
					limit: 10,
				})
			);
		}, [dispatch])
	);

	const searchAuditByCode = () => {
		if (selectAuditCode == "") {
			toast.show({
				title: "Error",
				description: "Please select a Audit code",
				placement: "top",
				duration: 500,
			});
		} else {
			setLoading(true);
			dispatch(
				AdminAction.searchAuditByCode({
					Doctor_id: context.user.userInfo.Doctor_id,
					target_Doctor_id: target_Doctor_id,
					selectAuditCode: selectAuditCode == "All" ? "" : selectAuditCode,
					page: 1,
					limit: 10,
				})
			);
		}
	};

	const previousPage = () => {
		if (Number(page) == 1) {
			return;
		}

		setLoading(true);

		dispatch(
			AdminAction.searchAuditByCode({
				Doctor_id: context.user.userInfo.Doctor_id,
				target_Doctor_id: target_Doctor_id,
				selectAuditCode: selectAuditCode == "All" ? "" : selectAuditCode,
				page: page - 1,
				limit: 10,
			})
		);

		setpage(page - 1);
	};

	const nextPage = () => {
		if (Number(page) == Number(max_page)) {
			return;
		}

		setLoading(true);

		dispatch(
			AdminAction.searchAuditByCode({
				Doctor_id: context.user.userInfo.Doctor_id,
				target_Doctor_id: target_Doctor_id,
				selectAuditCode: selectAuditCode == "All" ? "" : selectAuditCode,
				page: page + 1,
				limit: 10,
			})
		);

		setpage(page + 1);
	};
	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<VStack>
					<Box height="87%">
						<Box alignItems="center">
							<Heading size="sm">{`Audit Report (${Doctor_name})`}</Heading>
							<HStack space={2} my={1}>
								<Select
									selectedValue={selectAuditCode}
									placeholder="Select Audit Code"
									minWidth="200"
									onValueChange={itemValue => setSelectAuditCode(itemValue)}
								>
									<Select.Item value="All" label="All Audit Code" />
									{Audit_Code_Status.map(d => (
										<Select.Item value={d.value} label={d.Label} key={d.value} />
									))}
								</Select>
								<Button onPress={() => searchAuditByCode()}>Select Audit Code</Button>
							</HStack>
							<ScrollView
								nestedScrollEnabled={true}
								contentContainerStyle={{
									paddingBottom: 60,
								}}
								width="100%"
							>
								{AuditLog.map((d, index) => (
									<Border width="90%" key={index}>
										<VStack divider={<Divider />} px="2">
											<Heading size="md">{d.Audit_Code}</Heading>
											<Text>{d.Activity}</Text>
											<Text>{d.dtCreated}</Text>
										</VStack>
									</Border>
								))}
							</ScrollView>
						</Box>
					</Box>
					<Border width={fullWidth}>
						<HStack alignSelf="center" my={3}>
							<IconButton
								icon={<Entypo name="arrow-with-circle-left" size={24} color="blue" />}
								isDisabled={Number(page) == 1}
								onPress={previousPage}
							/>
							<Input
								value={page.toString()}
								w="20%"
								size="sm"
								_pressed={{ borderColor: "red.500" }}
								//onChangeText={text => setpage(text)}
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
								onPress={nextPage}
							/>
						</HStack>
					</Border>
				</VStack>
			)}
		</>
	);
};

export default Audit_report;
