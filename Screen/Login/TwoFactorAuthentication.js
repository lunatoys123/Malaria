import React, { useState } from "react";
import { Box, Center, Text, VStack, Heading, FormControl, Input, Button } from "native-base";
import { CheckAuthenticationCode } from "../../Common/User_Functions";

const TwoFactorAuthentication = props => {
	const Email = props.route.params.Email;
	const [AuthenticationCode, setAuthenticationCode] = useState("");

	const submit = async () => {
		const response = await CheckAuthenticationCode({AuthenticationCode, Email});
	};
	return (
		<Center width="100%">
			<Box safeArea py="8" width="90%">
				<VStack space={3}>
					<Center>
						<Heading>Forget Password</Heading>
					</Center>
					<Text>
						To ensure your account security, Malaria App Requires you to enter the Authentication
						code that send to you email Account
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
				</VStack>
			</Box>
		</Center>
	);
};

export default TwoFactorAuthentication;
