import React from "react";
import { VStack, Box, HStack, Heading, Divider, Button, Input } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";

const MessageBox = props => {
	return (
		<VStack divider={<Divider />} space={2}>
			<Box safeArea mt="4">
				<HStack alignItems="center">
					<Heading ml="4" w="65%">
						Message Box
					</Heading>
					<Button
						leftIcon={<FontAwesome name="send" size={24} color="white" />}
						size="sm"
						onPress={() => props.navigation.navigate("SendMessage")}
					>
						Send
					</Button>
				</HStack>
			</Box>
			<VStack space={2} w="90%" alignSelf="center">
				<Input
					placeholder="Search For User"
					backgroundColor="white"
					borderRadius="4"
					fontSize="14"
				/>
				<Button leftIcon={<Ionicons name="search" size={20} color="white" />}>Search</Button>
			</VStack>
		</VStack>
	);
};

export default MessageBox;
