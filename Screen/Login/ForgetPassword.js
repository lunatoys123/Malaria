import React, { useState } from "react";
import {
	Box,
	Text,
	Center,
	Heading,
	FormControl,
	Input,
	VStack,
	Button,
	PresenceTransition,
	Alert,
	HStack,
	IconButton,
	CloseIcon,
} from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import { ForgetPasswordProcess } from "../../Common/User_Functions";
import { status_code } from "../../Common/status_code";
const ForgetPassword = props => {
	const [showAlert, setShowAlert] = useState(false);
	const [AlertMessage, setAlertMessage] = useState("");
	const validationSchema = Yup.object().shape({
		Email: Yup.string().email("This Input must be an email").required("Login Name is Required"),
	});

	const onSubmit = async value => {
		const Email = value.Email;
		const response = await ForgetPasswordProcess({ Email });
		console.log(response);
		if (response.status === status_code.Failed) {
			setShowAlert(true);
			setAlertMessage(response.Message);
		} else {
			props.navigation.navigate("TwoFactor", { Email });
		}
	};
	return (
		<Center w="100%">
			<Box safeArea py="8" w="90%">
				<VStack mt={5} space={3}>
					<Center>
						<Heading>Forget Password</Heading>
					</Center>
					<Text>
						A Email Notification will be send to your email to start the password reset process
						After clicking the send button
					</Text>
					<Formik
						initialValues={{
							Email: "",
						}}
						onSubmit={onSubmit}
						validationSchema={validationSchema}
					>
						{({ handleChange, handleSubmit, values, errors }) => (
							<VStack space={3}>
								<FormControl isInvalid={"Email" in errors}>
									<FormControl.Label>Login Email</FormControl.Label>
									<Input
										placeholder="Login email"
										value={values.Email}
										onChangeText={handleChange("Email")}
									/>
									<FormControl.ErrorMessage>{errors.Email}</FormControl.ErrorMessage>
								</FormControl>
								<Button onPress={handleSubmit}>Send</Button>
							</VStack>
						)}
					</Formik>
				</VStack>
				<PresenceTransition
					visible={showAlert}
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
										{AlertMessage}
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
								onPress={() => {
									setShowAlert(false);
									setAlertMessage("");
								}}
							/>
						</HStack>
					</Alert>
				</PresenceTransition>
			</Box>
		</Center>
	);
};

export default ForgetPassword;
