import React, { useState, useContext, useCallback } from "react";
import { Center, Button, VStack, ScrollView, AlertDialog, Text, HStack } from "native-base";
import Card_Component from "../../sharedComponent/Card_Component";
import { useFormik } from "formik";
import FormInputField from "../../sharedComponent/Form/FormInputField";
import FormSigleSelect from "../../sharedComponent/Form/FormSigleSelect";
import { Role_Options } from "../../Common/Options";
import _ from "lodash";
import * as Yup from "yup";
import "yup-phone-lite";
import Auth_Global from "../../Context/store/Auth_Global";
import { useDispatch, useSelector } from "react-redux";
import { Admin } from "../../Redux/Admin/selector";
import { AdminAction } from "../../Redux/Admin/reducer";
import { useFocusEffect } from "@react-navigation/native";
import { LOADING_STATUS, status_code } from "../../Common/status_code";
import { MaterialIcons } from '@expo/vector-icons';
import AntIcon from "react-native-vector-icons/AntDesign";

const AddUser = props => {
	const dispatch = useDispatch();
	const AdminState = useSelector(Admin());
	const context = useContext(Auth_Global);
	const [UserCreated, setUserCreated] = useState(false);
	const [message, setMessage] = useState("");
	const [submit, setSubmit] = useState(false);
	const [status, setStatus] = useState("");

	useFocusEffect(
		useCallback(() => {
			const { loading, Message, Error, status } = AdminState;

			if (loading === LOADING_STATUS.FULFILLED) {
				if (submit && Message != "") {
					setStatus(status);
					setMessage(Message);
					setUserCreated(true);
					setSubmit(false);
				}

				//dispatch(AdminAction.Initialilze());
			} else if (loading === LOADING_STATUS.REJECTED && submit) {
				if (submit && Error != null) {
					setStatus(status);
					setMessage(Error);
					setUserCreated(true);
					setSubmit(false);
				}

				//dispatch(AdminAction.Initialilze());
			}
		}, [AdminState])
	);

	const formik = useFormik({
		initialValues: {
			Login_name: "",
			Email: "",
			// Password: "",
			Role: "",
			Phone_number: "",
		},
		validationSchema: Yup.object().shape({
			Login_name: Yup.string().required("Login Name is Required"),
			Email: Yup.string()
				.email("Please provide a valid email address")
				.required("New User email should be provided"),
			// Password: Yup.string()
			// 	.required("Password is required")
			// 	.min(8, "must be at least 8 characters")
			// 	.matches(/[0-9]/, "Password requires a number")
			// 	.matches(/[a-z]/, "Password requires a lowercase letter")
			// 	.matches(/[A-Z]/, "Password requires an uppercase letter"),
			Role: Yup.object().required("Role need to establish for user"),
			Phone_number: Yup.string()
				.phone("HK", "Please Enter valid phone number")
				.required("Phone number must be provided"),
		}),
		onSubmit: async values => {
			setSubmit(true);
			var newUser = _.cloneDeep(values);

			newUser.Hospital_id = context.user.userInfo.Hospital_id;
			newUser.Role = newUser.Role.id;
			dispatch(
				AdminAction.AddUserToOrganization({
					user: newUser,
					Doctor_id: context.user.userInfo.Doctor_id,
				})
			);
		},
	});

	const onChange = targetField => {
		return val => {
			formik.setFieldValue(targetField, val);
		};
	};

	const SubmitWithAlert = async values => {
		const validation = await formik.validateForm(values);

		if (!_.isEmpty(validation)) {
			console.log(validation);
		} else {
			formik.handleSubmit();
		}
	};

	const CheckConfirm = () => {
		setUserCreated(false);
		if (status === status_code.Success) {
			dispatch(AdminAction.Initialilze());
			props.navigation.navigate("AccountManagement");
		}
	};

	return (
		<ScrollView
			nestedScrollEnabled={true}
			contentContainerStyle={{
				paddingBottom: 60,
			}}
			width="100%"
		>
			<VStack space={2}>
				<Center>
					<Card_Component heading="New User">
						<FormInputField formik={formik} Label="Login Name" id="Login_name" isRequired={true} />
						<FormInputField formik={formik} Label="Email" id="Email" isRequired={true} />
						{/* <FormInputField
							formik={formik}
							Label="Password"
							id="Password"
							isRequired={true}
							type={ShowPassword ? "text" : "password"}
							rightElement={
								<Pressable onPress={() => setShowPassword(!ShowPassword)}>
									<Icon
										as={<MaterialIcons name={ShowPassword ? "visibility" : "visibility-off"} />}
										size={5}
										mr="2"
										color="muted.400"
									/>
								</Pressable>
							}
						/> */}
						<FormSigleSelect
							formik={formik}
							id="Role"
							Label="User Role"
							placeholder="user role"
							onChange={onChange}
							options={Role_Options}
							hideInputFilter={true}
						/>
						<FormInputField
							formik={formik}
							Label="Phone Number"
							id="Phone_number"
							isRequired={true}
						/>
					</Card_Component>
				</Center>
				<Button w="90%" alignSelf="center" onPress={() => SubmitWithAlert(formik.values)}>
					Add New User
				</Button>
			</VStack>
			<AlertDialog isOpen={UserCreated} onClose={() => setUserCreated(false)} size="xl">
				<AlertDialog.Content>
					<AlertDialog.Header>
						<HStack space={2} alignItems="center">
							{status === status_code.Success ? (
								<AntIcon name="checkcircle" size={30} color="black" />
							) : (
								<MaterialIcons name="error" size={24} color="red" />
							)}
							<Text>User creation Status</Text>
						</HStack>
					</AlertDialog.Header>
					<AlertDialog.Body>{message}</AlertDialog.Body>
					<AlertDialog.Footer>
						<Button w="100%" onPress={() => CheckConfirm()}>
							Confirm
						</Button>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog>
		</ScrollView>
	);
};

export default AddUser;
