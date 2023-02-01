import React, { useContext, useEffect, useState } from "react";
import {
	Center,
	Box,
	Heading,
	VStack,
	FormControl,
	Input,
	Link,
	Button,
	useToast,
	PresenceTransition,
	Alert,
	Text,
	IconButton,
	CloseIcon,
	HStack,
} from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import Auth_Global from "../../Context/store/Auth_Global";
import { loginUser } from "../../Context/action/Auth_action";
import { status_code, Account_status } from "../../Common/status_code";
import LoadingSpinner from "../../sharedComponent/Loading";
import { Admin_Role, Normal_User_Role } from "../../Common/role";

const Login = props => {
	const context = useContext(Auth_Global);
	const toast = useToast();
	const [Loading, setLoading] = useState(false);
	const [showLoginAlert, setShowLoginAlert] = useState(false);
	const [Message, setMessage] = useState("");

	const onSubmit = async user => {
		setLoading(true);
		var token_response = await loginUser(user, context.dispatch);
		setLoading(false);

		if (token_response.status === status_code.Success) {
			// toast.show({
			// 	title: token_response.status,
			// 	description: token_response.Message,
			// 	placement: "top",
			// 	duration: 100,
			// });
			setShowLoginAlert(false);
			if (token_response.Account_status === Account_status.Active) {
				switch (token_response.user_role) {
					case Admin_Role:
						props.navigation.navigate("Admin");
						break;
					case Normal_User_Role:
						props.navigation.navigate("User");
						break;
					default:
						console.error("Invalid user role");
						break;
				}
			} else if (token_response.Account_status === Account_status.Pending) {
				props.navigation.navigate("ResetPassword");
			}
		} else {
			// toast.show({
			// 	title: token_response.status,
			// 	description: token_response.Message,
			// 	placement: "top",
			// 	duration: 100,
			// });
			setMessage(token_response.Message);
			setShowLoginAlert(true);
		}
	};

	const validationSchema = Yup.object().shape({
		Email: Yup.string().email().required("Email is Required"),
		Password: Yup.string().required("Password is Required"),
	});
	return (
		<>
			{Loading ? (
				<LoadingSpinner />
			) : (
				<Center w="100%">
					<Box safeArea py="8" w="90%">
						<Center>
							<Heading>Malaria Tracker</Heading>
						</Center>
						<Formik
							initialValues={{
								Email: "",
								Password: "",
							}}
							validationSchema={validationSchema}
							onSubmit={onSubmit}
						>
							{({ handleChange, handleBlur, handleSubmit, values, errors }) => (
								<VStack mt={5} space={3}>
									<FormControl isInvalid={"Email" in errors} isRequired>
										<FormControl.Label>Email</FormControl.Label>
										<Input
											onChangeText={handleChange("Email")}
											placeholder="Email"
											value={values.Email}
										/>
										<FormControl.ErrorMessage>{errors.Email}</FormControl.ErrorMessage>
									</FormControl>
									<FormControl isInvalid={"Password" in errors} isRequired>
										<FormControl.Label>Password</FormControl.Label>
										<Input
											type="password"
											placeholder="Password"
											onChangeText={handleChange("Password")}
											value={values.Password}
										/>
										<FormControl.ErrorMessage>{errors.Password}</FormControl.ErrorMessage>
										<Link
											_text={{
												fontSize: "md",
												fontWeight: "500",
												color: "indigo.500",
											}}
											alignSelf="flex-end"
											onPress={()=> props.navigation.navigate("ForgetNavigator")}
										>
											Forget Password
										</Link>
									</FormControl>
									<Button colorScheme="indigo" onPress={handleSubmit}>
										Login
									</Button>
								</VStack>
							)}
						</Formik>
						<PresenceTransition
							visible={showLoginAlert}
							initial={{
								opacity: 0,
								scale: 0,
							}}
							animate={{
								opacity: 1,
								scale: 1,
								transition: {
									duration: 250,
								},
							}}
						>
							<Alert justifyContent="center" status="error" mt="3">
								<HStack flexShrink={1} space={2} justifyContent="space-between">
									<HStack space={2} flexShrink={1} alignContent="center">
										<Alert.Icon mt="1" />
										<VStack>
											<Text fontSize="md" color="coolGray.800">
												{Message}
											</Text>
										</VStack>
									</HStack>
									<IconButton
										variant="unstyled"
										_focus={{
											borderWidth: 0,
										}}
										icon={<CloseIcon size="3" />}
										_icon={{
											color: "coolGray.600",
										}}
										onPress={() => setShowLoginAlert(false)}
									/>
								</HStack>
							</Alert>
						</PresenceTransition>
					</Box>
				</Center>
			)}
		</>
	);
};

export default Login;
