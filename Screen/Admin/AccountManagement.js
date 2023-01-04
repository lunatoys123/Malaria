import React from "react";
import { Center, ScrollView, Text, Box, Heading } from "native-base";

const AccountManagement = () => {
	return (
		<Box safeArea>
			<Center>
				<Heading>Account Management</Heading>
			</Center>
			<ScrollView
				nestedScrollEnabled={true}
				contentContainerStyle={{
					paddingBottom: 60,
				}}
				width="100%"
			>
				
			</ScrollView>
		</Box>
	);
};

export default AccountManagement;
