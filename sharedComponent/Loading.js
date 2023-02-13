import React from "react";
import { HStack, Spinner, Heading, Center, Box } from "native-base";
import { Dimensions } from "react-native";

const LoadingSpinner = () => {
	return (
		<Box safeArea height={Dimensions.get("window").height} justifyContent="center">
			<Center>
				<HStack space={2} height="100%" alignItems="center">
					<Spinner accessibilityLabel="Loading posts" />
					<Heading color="primary.500" fontSize="md">
						Loading
					</Heading>
				</HStack>
			</Center>
		</Box>
	);
};

export default LoadingSpinner;
