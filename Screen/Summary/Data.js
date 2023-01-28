import React, { useEffect, useState } from "react";
import { Dimensions, BackHandler } from "react-native";
import {
	View,
	Text,
	Center,
	Select,
	Box,
	CheckIcon,
	HStack,
	Button,
	useToast,
	ScrollView,
	VStack,
	Pressable,
	Icon,
	IconButton,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Summary } from "../../Redux/Summary/Selector";
import { SummaryAction } from "../../Redux/Summary/reducer";
import { LOADING_STATUS } from "../../Common/status_code";
import LoadingSpinner from "../../sharedComponent/Loading";
import { LineChart } from "react-native-chart-kit";
import { Rect, Text as TextSvG, Svg } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

const Data = props => {
	const toast = useToast();
	const option = props.route.params.option;
	const SummaryState = useSelector(Summary());
	const dispatch = useDispatch();
	const [country, setCountries] = useState([]);
	const [selectcountry, setSelectCountry] = useState(null);
	const [loading, setLoading] = useState(false);
	const [WHO_DATA, setWHO_DATA] = useState([]);
	const DEVICE_WIDTH = Dimensions.get("window").width;
	const [tooltipPosition, setTooltipPosition] = useState([]);

	useEffect(() => {
		// dispatch(SummaryAction.WHO_Data({ option: option }));
		setLoading(true);
		dispatch(SummaryAction.GetCountries());

		const backAction = () => {
			dispatch(SummaryAction.Initialize());
			props.navigation.goBack();
			return true;
		};

		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

		return () => backHandler.remove();
	}, []);

	useEffect(() => {
		const { countries, loading, WHO_Data } = SummaryState;
		if (loading === LOADING_STATUS.FULFILLED) {
			setCountries(countries);
			setLoading(false);
			setWHO_DATA(WHO_Data);

			const tooltipPos = [];
			for (let i = 0; i < WHO_Data.length; i++) {
				tooltipPos.push({
					x: 0,
					y: 0,
					visible: false,
					value: 0,
				});
			}
			setTooltipPosition(tooltipPos);
		}
	}, [SummaryState]);

	useEffect(() => {
		props.navigation.setOptions({
			headerLeft: () => (
				<IconButton
					icon={<Icon as={<Ionicons name="arrow-back" size={24} color="black"/>} />}
					onPress={() => {
						dispatch(SummaryAction.Initialize());
						props.navigation.goBack();
					}}
				/>
			),
		});
	}, [props.navigation]);

	const selectCountries = () => {
		if (selectcountry == null) {
			toast.show({
				title: "Error",
				description: "Please select a country",
				placement: "top",
				duration: 500,
			});
		} else {
			setLoading(true);
			dispatch(SummaryAction.WHO_Data({ option, selectcountry }));
		}
	};

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
		<Center>
			{loading ? (
				<LoadingSpinner />
			) : (
				<Box safeArea alignItems="center" mt={3}>
					<Box maxW="300">
						<HStack space={2}>
							<Select
								selectedValue={selectcountry}
								minW="200"
								placeholder="Select Country"
								_selectedItem={{
									bg: "teal.600",
									endIcon: <CheckIcon size="5" />,
								}}
								onValueChange={itemValue => setSelectCountry(itemValue)}
							>
								{country &&
									country.map(c => {
										return <Select.Item label={c.Options} value={c.code} key={c.code} />;
									})}
							</Select>
							<Button onPress={selectCountries}>Select country</Button>
						</HStack>
					</Box>
					<Box>
						<ScrollView
							nestedScrollEnabled={true}
							contentContainerStyle={{ paddingBottom: 100 }}
							width="100%"
						>
							<VStack space={2}>
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
															tooltipPosition[index].x === data.x &&
															tooltipPosition[index].y === data.y;

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
						</ScrollView>
					</Box>
				</Box>
			)}
		</Center>
	);
};

export default Data;
