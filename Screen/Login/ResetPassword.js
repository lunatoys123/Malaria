import { Center, Box, Heading, VStack, Button, Text, AlertDialog } from "native-base";
import React, { useCallback, useContext, useState } from "react";
import { useFormik } from "formik";
import FormInputField from "../../sharedComponent/Form/FormInputField";
import * as Yup from "yup";
import _ from "lodash";
import Auth_Global from "../../Context/store/Auth_Global";
import { useDispatch, useSelector } from "react-redux";
import { Admin } from "../../Redux/Admin/selector";
import { AdminAction } from "../../Redux/Admin/reducer";
import { useFocusEffect } from "@react-navigation/native";
import { LOADING_STATUS, User_Status } from "../../Common/status_code";
import { Admin_Role, Normal_User_Role } from "../../Common/role";

const ResetPassword = props => {
	const dispatch = useDispatch();
	const AdminState = useSelector(Admin());
	const context = useContext(Auth_Global);
	const mode = props.route.params.mode;
	const Email = props.route.params.Email;

	const [submit, setSubmit] = useState(false);
	const [message, setMessage] = useState("");
	const [ResetPassword, setResetPassword] = useState(false);
	const formik = useFormik({
		initialValues: {
			Password: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object().shape({
			Password: Yup.string()
				.required("Password is Required")
				.min(8, "must be at least 8 characters")
				.matches(/[0-9]/, "Password requires a number")
				.matches(/[a-z]/, "Password requires a lowercase letter")
				.matches(/[A-Z]/, "Password requires an uppercase letter"),
			confirmPassword: Yup.string()
				.required("Please type in Your Password again")
				.oneOf([Yup.ref("Password")], "Your password does not match"),
		}),
		onSubmit: values => {
			setSubmit(true);
			if (mode === User_Status.newUser) {
				dispatch(
					AdminAction.ResetPasswordForUser({
						Recovery_Info: context.user.userInfo.Doctor_id,
						Password: values.Password,
						mode: User_Status.newUser,
					})
				);
			} else if (mode === User_Status.reset) {
				dispatch(
					AdminAction.ResetPasswordForUser({
						Recovery_Info: Email,
						Password: values.Password,
						mode: User_Status.reset,
					})
				);
			}
		},
	});

	useFocusEffect(
		useCallback(() => {
			const { loading, Message } = AdminState;
			if (loading === LOADING_STATUS.FULFILLED && submit) {
				setSubmit(false);
				setMessage(Message);
				setResetPassword(true);
				dispatch(AdminAction.Initialilze());
			}
		}, [AdminState, submit])
	);

	const ValidationCheck = async value => {
		const validation = await formik.validateForm(value);

		if (!_.isEmpty(validation)) {
			console.log(validation);
		} else {
			formik.handleSubmit();
		}
	};

	const ReturnToAdminPanel = async () => {
		setResetPassword(false);
		if (mode === User_Status.newUser) {
			if (context.user.userInfo.role === Admin_Role) {
				props.navigation.navigate("Admin");
			} else if (context.user.userInfo.role === Normal_User_Role) {
				props.navigation.navigate("User");
			}
		} else if (mode === User_Status.reset) {
			props.navigation.navigate("Login");
		}
	};
	return (
		<Center w="100%">
			<Box safeArea w="90%" py="8">
				<Center>
					<Heading>Reset Password</Heading>
				</Center>
				<Center>
					<Text color="primary.800" bold>
						Please Enter the new Password
					</Text>
				</Center>
				<VStack mt={5} space={3}>
					<FormInputField
						formik={formik}
						id="Password"
						Label="Password"
						isRequired={true}
						type="password"
					/>
					<FormInputField
						formik={formik}
						id="confirmPassword"
						Label="Confirm Password"
						isRequired={true}
						type="password"
					/>
					<Button colorScheme="indigo" onPress={() => ValidationCheck(formik.values)}>
						Reset Password
					</Button>
				</VStack>
			</Box>
			<AlertDialog isOpen={ResetPassword} onClose={() => setResetPassword(false)} size="xl">
				<AlertDialog.Content>
					<AlertDialog.Header>Reset Password Status</AlertDialog.Header>
					<AlertDialog.Body>{message}</AlertDialog.Body>
					<AlertDialog.Footer>
						<Button onPress={() => ReturnToAdminPanel()} w="100%">
							Confirm
						</Button>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog>
		</Center>
	);
};

export default ResetPassword;
