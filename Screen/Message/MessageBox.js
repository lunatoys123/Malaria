import React from "react";
import { VStack, Box, HStack, Heading, Divider, Button } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

const MessageBox = () => {
	return (
		<VStack divider={<Divider />}>
			<Box safeArea>
				<HStack alignItems="center">
					<Heading ml="4" w="65%">
						Message Box
					</Heading>
					<Button leftIcon={<FontAwesome name="send" size={24} color="white" />} size="sm">
						Send
					</Button>
				</HStack>
			</Box>
		</VStack>
	);
};

export default MessageBox;
