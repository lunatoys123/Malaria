import { Box, Heading, VStack, HStack, Center, Text } from "native-base";
import React from "react";

const AnalyticsView = props => {
	var { Analytics_Data } = props;
	return (
		<Box mt={8}>
			{Object.keys(Analytics_Data).length > 0 && (
				<>
					<Heading size="sm" alignSelf="center">
						Analytics
					</Heading>
					<VStack>
						<HStack alignSelf="center">
							<Box borderWidth={1} width="45%" borderColor="indigo.500" bg="coolGray.200">
								<Center>
									<Text>Analytics</Text>
								</Center>
							</Box>
							<Box borderWidth={1} width="45%" borderColor="indigo.500" bg="coolGray.200">
								<Center>
									<Text>Value</Text>
								</Center>
							</Box>
						</HStack>

						{Object.keys(Analytics_Data).map(d => (
							<HStack alignSelf="center">
								<Box borderWidth={1} width="45%">
									<Center>
										<Text>{d}</Text>
									</Center>
								</Box>
								<Box borderWidth={1} width="45%">
									<Center>
										<Text>{Analytics_Data[d]}</Text>
									</Center>
								</Box>
							</HStack>
						))}
					</VStack>
				</>
			)}
		</Box>
	);
};

export default AnalyticsView;
