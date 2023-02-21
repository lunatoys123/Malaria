import { Box, Divider, VStack } from "native-base";
import React from "react";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Heading } from "native-base";

const AdminBarChart = props => {
	var { data = [], width = Dimensions.get("window").width, height = 300 } = props;
	return (
		<Box>
			<VStack divider={<Divider />} space={2}>
				{data.length > 0 &&
					data.map((d, index) => (
						<Box key={index} alignSelf="center">
							<Heading size="sm" alignSelf="center">{d.title}</Heading>
							<BarChart
								height={height}
								width={width * 0.9}
								data={{
									labels: d.label,
									datasets: [{ data: d.data }],
								}}
								chartConfig={{
									backgroundColor: "#e26a00",
									backgroundGradientFrom: "#fb8c00",
									backgroundGradientTo: "#ffa726",
									decimalPlaces: 0,
									color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
									labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
									style: {
										borderRadius: 16,
									},
									// propsForDots: {
									// 	r: "6",
									// 	strokeWidth: "2",
									// 	stroke: "#ffa726",
									// },
								}}
								style={{
									marginVertical: 8,
									borderRadius: 16,
								}}
								showBarTops={true}
								fromZero={true}
								showValuesOnTopOfBars={true}
							/>
						</Box>
					))}
			</VStack>
		</Box>
	);
};

export default AdminBarChart;
