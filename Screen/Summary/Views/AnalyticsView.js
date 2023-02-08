import { Box, Heading, VStack, HStack, Center, Text, Link } from "native-base";
import React from "react";

const AnalyticsView = props => {
	var { Table_Data, Analytics_Data, selectcountry, GenerateExcel } = props;
	return (
		<VStack space={2} alignSelf="center">
			<Box mt={8}>
				{Table_Data.length > 0 && Object.keys(Analytics_Data).length > 0 && (
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
			{selectcountry && Table_Data.length > 0 && (
				<Link
					alignSelf="center"
					_text={{ fontSize: "md", fontWeight: "500", color: "indigo.500" }}
					onPress={() => GenerateExcel()}
				>
					Download Data
				</Link>
			)}
		</VStack>
	);
};

export default AnalyticsView;
