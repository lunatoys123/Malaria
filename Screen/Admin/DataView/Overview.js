import { Box, Heading, ScrollView, Link } from "native-base";
import React, { useCallback, useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Auth_Global from "../../../Context/store/Auth_Global";
import { useDispatch, useSelector } from "react-redux";
import { Admin } from "../../../Redux/Admin/selector";
import { AdminAction } from "../../../Redux/Admin/reducer";
import { LOADING_STATUS } from "../../../Common/status_code";
import Border from "../../../sharedComponent/Common/Border";
import AdminPieChart from "./Chart/PieChart";
import LoadingSpinner from "../../../sharedComponent/Loading";
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const Overview = props => {
	const dispatch = useDispatch();
	const context = useContext(Auth_Global);
	const adminState = useSelector(Admin());
	const [patientSummary, setPatientSummary] = useState([]);
	const [loading, setLoading] = useState(false);

	useFocusEffect(
		useCallback(() => {
			const { loading, Patient_Summary } = adminState;
			if (LOADING_STATUS.FULFILLED === loading) {
				setPatientSummary(Patient_Summary);
				setLoading(false);
			}
		}, [adminState])
	);

	useFocusEffect(
		useCallback(() => {
			setLoading(true);
			dispatch(AdminAction.HospitalSummaryData({ Doctor_id: context.user.userInfo.Doctor_id }));
		}, [dispatch])
	);

	const DownloadData = () => {
		let Patient_Summary = [...patientSummary];

		let Patient_Summary_map = new Map();
		for (let i = 0; i < Patient_Summary.length; i++) {
			let data = Patient_Summary[i].data;
			let label = Patient_Summary[i].label;

			data = data.map(d => {
				return { data: d.data, name: d.name };
			});

			if (!Patient_Summary_map.has(label)) {
				Patient_Summary_map.set(label, data);
			} else {
				let copy_data = Patient_Summary_map.get(label);
				copy_data = copy_data.concat(data);
			}
		}

		let data_array = [];
		for (const [key, value] of Patient_Summary_map) {
			data_array.push(["Report status (" + key + ")"]);
			data_array.push(["Patient Status", "Value"]);

			for (let i = 0; i < value.length; i++) {
				data_array.push([value[i].name, value[i].data]);
			}

			data_array.push([""]);
		}

		let data_wb = XLSX.utils.book_new();
		let data_ws = XLSX.utils.aoa_to_sheet(data_array);

		XLSX.utils.book_append_sheet(data_wb, data_ws, "Treatment Status", true);
		const base64 = XLSX.write(data_wb, { type: "base64" });
		const filename = FileSystem.documentDirectory + "Report_status.csv";

		FileSystem.writeAsStringAsync(filename, base64, {
			encoding: FileSystem.EncodingType.Base64,
		}).then(() => {
			Sharing.shareAsync(filename);
		});
	};

	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<Box safeArea>
					<ScrollView
						nestedScrollEnabled={true}
						contentContainerStyle={{
							paddingBottom: 60,
						}}
						width="100%"
					>
						<Heading size="md" alignSelf="center">
							Overview
						</Heading>
						<Border>
							<AdminPieChart data={patientSummary} height={200} />
						</Border>
						<Link
							_text={{
								fontSize: "md",
								fontWeight: "500",
								color: "indigo.500",
							}}
							onPress={DownloadData}
							alignSelf="center"
						>
							Download Data
						</Link>
					</ScrollView>
				</Box>
			)}
		</>
	);
};

export default Overview;
