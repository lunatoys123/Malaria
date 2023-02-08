import React from "react";
import { Box, Heading, Text, VStack, HStack, Center } from "native-base";
const TableView = props => {
	var { Table_Data, Analytics_Data, selectcountry } = props;
	return (
		<VStack space={2} alignSelf="center">
			<Box mt={8}>
				{selectcountry && Table_Data.length == 0 && <Text>No Data for this country</Text>}
				{Table_Data.length > 0 && (
					<>
						<Heading size="sm" alignSelf="center">
							Country data
						</Heading>
						<Text color="tertiary.500" alignSelf="center">
							{`\u2B24`} Green Color means the value is lower than Average
						</Text>
						<Text color="danger.500" alignSelf="center">
							{`\u2B24`} Red Color means the value is Higher than Average
						</Text>
						<VStack>
							<HStack alignSelf="center">
								<Box borderWidth={1} width="45%" borderColor="indigo.500" bg="coolGray.200">
									<Center>
										<Text>Year</Text>
									</Center>
								</Box>
								<Box borderWidth={1} width="45%" borderColor="indigo.500" bg="coolGray.200">
									<Center>
										<Text>Value</Text>
									</Center>
								</Box>
							</HStack>
							{Table_Data.map((d, index) => (
								<HStack key={index} alignSelf="center">
									<Box borderWidth={1} width="45%">
										<Center>
											<Text>{d.Year}</Text>
										</Center>
									</Box>
									<Box
										borderWidth={1}
										width="45%"
										bg={
											d.value && d.value >= Analytics_Data["mean"] ? `tertiary.500` : `danger.300`
										}
									>
										<Center>
											<Text>{d.value ? d.value : 0}</Text>
										</Center>
									</Box>
								</HStack>
							))}
						</VStack>
					</>
				)}
			</Box>
		</VStack>
	);
};

export default TableView;
