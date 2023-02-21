import { useFocusEffect } from "@react-navigation/native";
import { View, Text, VStack, ScrollView } from "native-base";
import React, { useCallback, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS } from "../../../Common/status_code";
import Auth_Global from "../../../Context/store/Auth_Global";
import { AdminAction } from "../../../Redux/Admin/reducer";
import { Admin } from "../../../Redux/Admin/selector";
import * as d3 from "d3";
import { Svg, G, Circle, Line, Text as SVGText } from "react-native-svg";
import AdminScatterPlot from "./Chart/ScatterPlot";
import Border from "../../../sharedComponent/Common/Border";

const AnalyticsView = () => {
	const dispatch = useDispatch();
	const context = useContext(Auth_Global);
	const adminState = useSelector(Admin());
	const [AnalyticsData, setAnalyticsData] = useState({});

	useFocusEffect(
		useCallback(() => {
			const { loading, Analytics } = adminState;
			if (loading === LOADING_STATUS.FULFILLED) {
				setAnalyticsData(Analytics);
				console.log(Analytics);
			}
		}, [adminState])
	);

	useFocusEffect(
		useCallback(() => {
			dispatch(AdminAction.AdminAnalytics({ Doctor_id: context.user.userInfo.Doctor_id }));
		}, [dispatch])
	);

	return (
		<View>
			<ScrollView>
				<VStack>
					{AnalyticsData &&
						AnalyticsData.map((d, i) => (
							<Border>
								<Text>{d.Sign}</Text>
								<AdminScatterPlot AnalyticsData={d} />
							</Border>
						))}
				</VStack>
			</ScrollView>
			{/* <Text>{AnalyticsData.Sign}</Text>
			<Border>
				<AdminScatterPlot AnalyticsData={AnalyticsData} />
			</Border> */}
		</View>
	);
};

export default AnalyticsView;
