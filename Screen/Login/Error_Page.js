import { Box, Text, VStack, Heading, Link } from "native-base";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const Error_Page = props => {
	return (
		<Box safeArea alignSelf="center" py="8" width="90%">
			<VStack alignItems="center" justifyContent="center" space={2}>
				<AntDesign name="warning" size={100} color="red" />
				<Heading>Error</Heading>
				<Box bg="red.400" alignSelf="center" shadow="3">
					<Text fontSize={16}>
						This Account has been Blocked due to Security Reason, Please contact Your admin to get
						further information
					</Text>
				</Box>
				<Link
					_text={{
						fontSize: "md",
						fontWeight: "500",
						color: "indigo.500",
					}}
					onPress={()=> props.navigation.navigate("Login")}
				>
					Back to Login
				</Link>
			</VStack>
		</Box>
	);
};

export default Error_Page;
