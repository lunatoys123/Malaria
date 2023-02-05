import React from "react";
import { VStack, Box, Pressable, Text, View } from "native-base";
import { LineChart } from "react-native-chart-kit";
import { Rect, Text as TextSvG, Svg } from "react-native-svg";
import { Dimensions } from "react-native";
const GraphView = props => {
	var { WHO_DATA, tooltipPosition, setTooltipPosition } = props;
	const DEVICE_WIDTH = Dimensions.get("window").width;

	const ConstructLabel = d => {
		if (d) {
			var labels = d.map(w => {
				return w.Year;
			});

			return labels;
		}
		return [];
	};

	const ConstructDataSet = d => {
		if (d) {
			var dataset = d.map(w => {
				return Number(w.value);
			});
			return dataset;
		}
		return [];
	};

	return (
		<VStack space={2} alignSelf="center">
			{WHO_DATA.length == 0 && <Text>No Data for this country</Text>}
			{WHO_DATA &&
				WHO_DATA.map((d, index) => (
					<Box key={index}>
						<Text>{`${ConstructLabel(d)[0]} - ${
							ConstructLabel(d)[ConstructLabel(d).length - 1]
						}`}</Text>
						<Pressable
							onPress={() => {
								let currentPoints = [...tooltipPosition];
								currentPoints[index] = {
									x: 0,
									y: 0,
									visible: false,
									value: 0,
								};
								setTooltipPosition(currentPoints);
							}}
						>
							<LineChart
								data={{
									labels: ConstructLabel(d),
									datasets: [
										{
											data: ConstructDataSet(d),
										},
									],
								}}
								width={DEVICE_WIDTH * 0.9}
								height={200}
								chartConfig={{
									backgroundColor: "#e26a00",
									backgroundGradientFrom: "#fb8c00",
									backgroundGradientTo: "#ffa726",
									decimalPlaces: 0,
									color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
									labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
									style: {
										//borderRadius: 16,
									},
									propsForDots: {
										r: "6",
										strokeWidth: "2",
										stroke: "#ffa726",
									},
								}}
								bezier
								style={{
									marginVertical: 8,
									borderRadius: 16,
								}}
								onDataPointClick={data => {
									let isSamePoint =
										tooltipPosition[index].x === data.x && tooltipPosition[index].y === data.y;

									if (isSamePoint) {
										let currentPoints = [...tooltipPosition];
										currentPoints[index] = {
											...currentPoints[index],
											value: data.value,
											visible: currentPoints[index].visible,
										};
										setTooltipPosition(currentPoints);
									} else {
										let currentPoints = [...tooltipPosition];
										currentPoints[index] = {
											x: data.x,
											value: data.value,
											y: data.y,
											visible: true,
										};
										setTooltipPosition(currentPoints);
									}
								}}
								decorator={() => {
									return tooltipPosition[index].visible ? (
										<View>
											<Svg>
												{/* <Rect
                								x={tooltipPosition[index].x - 15}
                								y={tooltipPosition[index].y + 10}
                								width={30}
                								height={20}
                								fill="black"
                							/> */}
												<TextSvG
													x={tooltipPosition[index].x + 5}
													y={tooltipPosition[index].y + 20}
													fill="black"
													fontSize={10}
													fontWeight="bold"
													textAnchor="middle"
												>
													{tooltipPosition[index].value}
												</TextSvG>
											</Svg>
										</View>
									) : null;
								}}
							/>
						</Pressable>
					</Box>
				))}
		</VStack>
	);
};

export default GraphView;
