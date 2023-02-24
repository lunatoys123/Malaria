import { useFocusEffect } from "@react-navigation/native";
import { View, Text, VStack, ScrollView, HStack, Select, Box, Button, useToast } from "native-base";
import React, { useCallback, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS, Y_Axis_Mode } from "../../../Common/status_code";
import Auth_Global from "../../../Context/store/Auth_Global";
import { AdminAction } from "../../../Redux/Admin/reducer";
import { Admin } from "../../../Redux/Admin/selector";
import AdminScatterPlot from "./Chart/ScatterPlot";
import Border from "../../../sharedComponent/Common/Border";
import { Signs, Clinical_Complications } from "../../../Common/Options";
import LoadingSpinner from "../../../sharedComponent/Loading";

const AnalyticsView = () => {
	const dispatch = useDispatch();
	const context = useContext(Auth_Global);
	const adminState = useSelector(Admin());
	const [AnalyticsData, setAnalyticsData] = useState([]);
	const [xAxis, setXAxis] = useState("");
	const [yAxis, setYAxis] = useState("");
	const [YAxisOptions, setYAxisOptions] = useState([]);
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	useFocusEffect(
		useCallback(() => {
			const { loading, Analytics } = adminState;
			if (loading === LOADING_STATUS.FULFILLED) {
				setLoading(false);
				setAnalyticsData(Analytics);
				// console.log(Analytics);
			}
		}, [adminState])
	);

	useFocusEffect(
		useCallback(() => {
			//dispatch(AdminAction.AdminAnalytics({ Doctor_id: context.user.userInfo.Doctor_id }));

			//set Y Axis Options
			let YOptions = [];
			const signItem = Signs.map(d => d.item);
			const ClinicalComplicationsItem = Clinical_Complications.map(d => d.item);

			YOptions = YOptions.concat(signItem).concat(ClinicalComplicationsItem);
			setYAxisOptions(YOptions);
		}, [])
	);

	const getYAxisMode = (searchWithSign, searchWithComplications) => {
		if (searchWithSign) {
			return Y_Axis_Mode.searchWithSign;
		}

		if (searchWithComplications) {
			return Y_Axis_Mode.searchWithComplications;
		}
	};

	const displayAnalytics = () => {
		if (xAxis == "" || yAxis == "") {
			toast.show({
				title: "Error",
				description: "Must specify x and y Axis",
				placement: "top",
				duration: 1000,
			});
		} else {
			setLoading(true);
			const signItem = Signs.map(d => d.item);
			const ClinicalComplicationsItem = Clinical_Complications.map(d => d.item);
			const searchWithSign = signItem.includes(yAxis);
			const searchWithComplications = ClinicalComplicationsItem.includes(yAxis);

			const mode = getYAxisMode(searchWithSign, searchWithComplications);
			dispatch(
				AdminAction.AdminAnalytics({
					Doctor_id: context.user.userInfo.Doctor_id,
					xAxis,
					yAxis,
					mode,
				})
			);
		}
	};

	return (
		<Box sdfeArea>
			<VStack alignItems="center" mt={3} space={2}>
				<HStack alignItems="center" space={2}>
					<Text>X Axis: </Text>
					<Select
						minWidth="200"
						accessibilityLabel="Choose X Axis"
						placeholder="Choose X Axis"
						onValueChange={itemValue => setXAxis(itemValue)}
					>
						<Select.Item label="Age" value="Age" />
						<Select.Item label="Hospitalization" value="Hospitalization" />
						<Select.Item label="Travel History" value="Travel_History" />
					</Select>
				</HStack>
				<HStack alignItems="center" space={2}>
					<Text>Y Axis: </Text>
					<Select
						minWidth="200"
						accessibilityLabel="Choose Y Axis"
						placeholder="Choose Y Axis"
						onValueChange={itemValue => setYAxis(itemValue)}
					>
						{YAxisOptions.map((d, i) => (
							<Select.Item key={i} label={d} value={d} />
						))}
					</Select>
				</HStack>
				<Button onPress={() => displayAnalytics()}>Display Analytics</Button>
			</VStack>
			<ScrollView>
				<VStack>
					{xAxis != "" && yAxis != "" && AnalyticsData.length == 0 && (
						<Text>No Data for this X axis and Y axis</Text>
					)}
					{loading ? (
						<LoadingSpinner />
					) : (
						<>
							{xAxis != "" &&
								yAxis != "" &&
								AnalyticsData.length > 0 &&
								AnalyticsData.map((d, i) => (
									<Border>
										<Text>{d.Sign}</Text>
										<AdminScatterPlot AnalyticsData={d} xAxis={xAxis} />
									</Border>
								))}
						</>
					)}
				</VStack>
			</ScrollView>
		</Box>
	);
};

export default AnalyticsView;
