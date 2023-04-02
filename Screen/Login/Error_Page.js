import { Box, Text, VStack, Heading, Link } from "native-base";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Border from "../../sharedComponent/Common/Border";

const Error_Page = props => {
	return (
		<Box safeArea alignSelf="center" py="8" width="90%">
			<Border borderColor="red.400">
				<VStack alignItems="center" justifyContent="center" space={2}>
					<AntDesign name="warning" size={100} color="red" />
					<Heading>Error</Heading>
					<Box bg="red.400" alignSelf="center" shadow="3" px="3" my={3}>
						<Text fontSize={16}>
							This Account has been Blocked due to Security Reason, Please contact Your admin to get
							further information
						</Text>
					</Box>
				</VStack>
			</Border>
			<Link
				_text={{
					fontSize: "md",
					fontWeight: "500",
					color: "indigo.500",
				}}
				onPress={() => props.navigation.navigate("Login")}
				alignSelf="center"
			>
				Back to Login
			</Link>
		</Box>
	);
};

export default Error_Page;
