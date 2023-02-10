import React, { useCallback, useState } from "react";
import { Box, Button, Pressable, Text, View, VStack, Link } from "native-base";
import { LineChart } from "react-native-chart-kit";
import { Rect, Text as TextSvG, Svg } from "react-native-svg";
import { Dimensions } from "react-native";

const CompareView = Props => {
	var {
		Target_Data,
		Current_Data,
		tooltipPosition,
		setTooltipPosition,
		currentCountry,
		targetCountry,
		GenerateCompareVersionExcel,
	} = Props;
	const DEVICE_WIDTH = Dimensions.get("window").width;

	const CreateCompareDataSet = () => {
		let DataSet = [];
		const length = Target_Data.length;

		if (currentCountry !== null && targetCountry != null) {
			for (let i = 0; i < length; i++) {
				const Year = Target_Data[i].map(d => d.Year);
				const TargetValue = Target_Data[i].map(d => d.value);
				const CurrentValue = Current_Data[i].map(d => d.value);
				DataSet.push({
					labels: Year,
					datasets: [
						{
							data: CurrentValue,
							color: (opacity = 1) => `rgba(226, 106, 0, 89)`,
						},
						{
							data: TargetValue,
							color: (opacity = 1) => `rgba(2, 198, 240, 94)`,
						},
					],
					legend: ["Country 1", "Country 2"],
				});
			}
		}
		//console.log(DataSet);
		return DataSet;
	};
	const DataSet = CreateCompareDataSet();

	return (
		<VStack space={2} alignSelf="center">
			<Box mt={8}>
				{DataSet &&
					DataSet.map((d, index) => (
						<Box key={index}>
							<Text>{`Year: ${d.labels[0]} - ${d.labels[d.labels.length - 1]}`}</Text>
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
									data={d}
									width={DEVICE_WIDTH * 0.9}
									height={300}
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
			</Box>
			{currentCountry != null && targetCountry != null && (
				<Link
					alignSelf="center"
					_text={{
						font: "md",
						fontWeight: "500",
						color: "indigo.500",
					}}
					onPress={() => GenerateCompareVersionExcel()}
				>
					Download Data
				</Link>
			)}
		</VStack>
	);
};

export default CompareView;
