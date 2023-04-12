import React, { useState } from "react";
import {
	Box,
	Center,
	Text,
	VStack,
	Heading,
	FormControl,
	Input,
	Button,
	PresenceTransition,
	Alert,
	HStack,
	IconButton,
	CloseIcon,
} from "native-base";
import { CheckAuthenticationCode } from "../../Common/User_Functions";
import { status_code, User_Status } from "../../Common/status_code";
import LoadingSpinner from "../../sharedComponent/Loading";

const TwoFactorAuthentication = props => {
	const Email = props.route.params.Email;
	const [AuthenticationCode, setAuthenticationCode] = useState("");
	const [AuthenticationAlert, setAuthenticationAlert] = useState(false);
	const [AlertMessage, setAlertMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const submit = async () => {
		setLoading(true);
		const response = await CheckAuthenticationCode({ AuthenticationCode, Email });
		if (response.status === status_code.Failed) {
			setLoading(false);
			setAuthenticationAlert(true);
			setAlertMessage(response.Message);
		} else {
			setLoading(false);
			props.navigation.navigate("ResetPassword", { mode: User_Status.reset, Email });
		}
	};
	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<Center width="100%">
					<Box safeArea py="8" width="90%">
						<VStack space={3}>
							<Center>
								<Heading>Forget Password</Heading>
							</Center>
							<Text>
								To ensure your account security, Malaria App Requires you to enter the
								Authentication code that send to you email Account
							</Text>
							<FormControl>
								<FormControl.Label>Authentication Code</FormControl.Label>
								<Input
									placeholder="Authentication Code"
									value={AuthenticationCode}
									onChangeText={text => setAuthenticationCode(text)}
								/>
							</FormControl>
							<Button isDisabled={AuthenticationCode.length < 6} onPress={() => submit()}>
								Enter
							</Button>
							<PresenceTransition
								visible={AuthenticationAlert}
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
												setAuthenticationAlert(false);
												setAlertMessage("");
											}}
										/>
									</HStack>
								</Alert>
							</PresenceTransition>
						</VStack>
					</Box>
				</Center>
			)}
		</>
	);
};

export default TwoFactorAuthentication;
