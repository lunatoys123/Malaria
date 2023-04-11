import { useFocusEffect } from "@react-navigation/native";
import { Box, VStack, Divider, ScrollView, Text, Heading, Button, Link } from "native-base";
import React, { useCallback, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Admin } from "../../../Redux/Admin/selector";
import { AdminAction } from "../../../Redux/Admin/reducer";
import Auth_Global from "../../../Context/store/Auth_Global";
import { LOADING_STATUS } from "../../../Common/status_code";
import Border from "../../../sharedComponent/Common/Border";
import AdminPieChart from "./Chart/PieChart";
import AdminBarChart from "./Chart/BarChart";
import { Treatment_Mode } from "../../../Common/status_code";
import LoadingSpinner from "../../../sharedComponent/Loading";
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const Treatmentview = () => {
	const dispatch = useDispatch();
	const AdminState = useSelector(Admin());
	const context = useContext(Auth_Global);
	const [TreatmentStatus, setTreatmentStatus] = useState([]);
	const [TreatmentSummary, setTreatmentSummary] = useState([]);
	const [TreatementCount, setTreatmentCount] = useState([]);
	const [TreatmentMode, setTreatmentMode] = useState(Treatment_Mode.Treatment_Data);
	const [DrugData, setDrugData] = useState([]);
	const [loading, setLoading] = useState(false);

	useFocusEffect(
		useCallback(() => {
			const { loading, Treatment_status, Treatment_Summary, Treatment_count_data, Drug_data } =
				AdminState;
			if (loading === LOADING_STATUS.FULFILLED) {
				setTreatmentStatus(Treatment_status);
				setTreatmentSummary(Treatment_Summary);
				setTreatmentCount(Treatment_count_data);
				setDrugData(Drug_data);
				setLoading(false);
			}
		}, [AdminState])
	);

	useFocusEffect(
		useCallback(() => {
			setLoading(true);
			dispatch(AdminAction.TreatmentSummaryData({ Doctor_id: context.user.userInfo.Doctor_id }));
		}, [dispatch])
	);

	const DownloadData = () => {
		let data_wb = XLSX.utils.book_new();
		let data_array = [];
		let sheetName = "";
		if (TreatmentMode == Treatment_Mode.Treatment_Data) {
			sheetName = "Treatment status";
			let Treatment_excel_status = [...TreatmentStatus];
			let Treatment_excel_Summary = [...TreatmentSummary];

			let Treatment_excel_status_data = [];
			for (let i = 0; i < Treatment_excel_status.length; i++) {
				let data = Treatment_excel_status[i].data;
				data = data.map(d => {
					return { data: d.data, name: d.name };
				});

				Treatment_excel_status_data = Treatment_excel_status_data.concat(data);
			}

			data_array.push(["Treatment status"]);
			data_array.push(["Status", "Value"]);

			for (let i = 0; i < Treatment_excel_status_data.length; i++) {
				data_array.push([Treatment_excel_status_data[i].name, Treatment_excel_status_data[i].data]);
			}

			data_array.push([""]);
			data_array.push(["Treatment Summary"]);
			data_array.push(["Status", "Value"]);
			let Treatment_excel_Summary_data = [];
			for (let i = 0; i < Treatment_excel_Summary.length; i++) {
				let data = Treatment_excel_Summary[i].data;
				data = data.map(d => {
					return { data: d.data, name: d.name };
				});

				Treatment_excel_Summary_data = Treatment_excel_Summary_data.concat(data);
			}

			for (let i = 0; i < Treatment_excel_Summary_data.length; i++) {
				data_array.push([
					Treatment_excel_Summary_data[i].name,
					Treatment_excel_Summary_data[i].data,
				]);
			}
		} else if (TreatmentMode == Treatment_Mode.Threapy_Summary) {
			sheetName = "Threapy status";
			let Treatment_count_data = [...TreatementCount];

			let Treatment_count_data_map = new Map();
			for (let i = 0; i < Treatment_count_data.length; i++) {
				let data = Treatment_count_data[i].data;
				let title = Treatment_count_data[i].title;
				let label = Treatment_count_data[i].label;

				let combine_data = [];

				for (let j = 0; j < data.length; j++) {
					combine_data.push({ data: data[j], title: label[j] });
				}

				if (!Treatment_count_data_map.has(title)) {
					Treatment_count_data_map.set(title, combine_data);
				} else {
					let copy_data = Treatment_count_data_map.get(title);
					copy_data = copy_data.concat(combine_data);
				}
			}
			for (const [key, value] of Treatment_count_data_map) {
				data_array.push(["Threapy status (" + key + ")"]);
				data_array.push(["Status", "Value"]);

				for (let i = 0; i < value.length; i++) {
					data_array.push([value[i].title, value[i].data]);
				}

				data_array.push([""]);
			}
		} else if (TreatmentMode == Treatment_Mode.Drug_Summary) {
			sheetName = "Drug status";
			let Drug_Excel_Data = [...DrugData];

			let Drug_data_map = new Map();
			for (let i = 0; i < Drug_Excel_Data.length; i++) {
				let data = Drug_Excel_Data[i].data;
				let title = Drug_Excel_Data[i].title;
				let label = Drug_Excel_Data[i].label;

				let combine_data = [];

				for (let j = 0; j < data.length; j++) {
					combine_data.push({ data: data[j], title: label[j] });
				}

				if (!Drug_data_map.has(title)) {
					Drug_data_map.set(title, combine_data);
				} else {
					let copy_data = Drug_data_map.get(title);
					copy_data = copy_data.concat(combine_data);
				}
			}
			for (const [key, value] of Drug_data_map) {
				data_array.push(["Drug status (" + key + ")"]);
				data_array.push(["Status", "Value"]);

				for (let i = 0; i < value.length; i++) {
					data_array.push([value[i].title, value[i].data]);
				}

				data_array.push([""]);
			}
		}

		let data_ws = XLSX.utils.aoa_to_sheet(data_array);

		XLSX.utils.book_append_sheet(data_wb, data_ws, sheetName, true);
		const base64 = XLSX.write(data_wb, { type: "base64" });
		const filename = FileSystem.documentDirectory + sheetName + ".csv";

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
				<Box>
					<Border>
						<Button.Group
							colorScheme="blue"
							mx={2}
							size="sm"
							alignItems="center"
							width="100%"
							my={3}
						>
							<Button
								size="sm"
								onPress={() => setTreatmentMode(Treatment_Mode.Treatment_Data)}
								variant={TreatmentMode == Treatment_Mode.Treatment_Data ? "solid" : "outline"}
							>
								Treatment Data
							</Button>
							<Button
								size="sm"
								onPress={() => setTreatmentMode(Treatment_Mode.Threapy_Summary)}
								variant={TreatmentMode == Treatment_Mode.Threapy_Summary ? "solid" : "outline"}
							>
								Therapy Summary
							</Button>
							<Button
								size="sm"
								onPress={() => setTreatmentMode(Treatment_Mode.Drug_Summary)}
								variant={TreatmentMode == Treatment_Mode.Drug_Summary ? "solid" : "outline"}
							>
								Drug Summary
							</Button>
						</Button.Group>
					</Border>
					<ScrollView
						nestedScrollEnabled={true}
						contentContainerStyle={{
							paddingBottom: 100,
						}}
						width="100%"
					>
						{TreatmentMode === Treatment_Mode.Treatment_Data && (
							<Box>
								<Heading size="md" alignSelf="center">
									Treatment Data
								</Heading>
								<Border>
									<VStack divider={<Divider />}>
										<AdminPieChart data={TreatmentStatus} height={200} />
										<AdminPieChart data={TreatmentSummary} height={200} />
									</VStack>
								</Border>
								{TreatmentStatus.length > 0 && TreatmentSummary.length > 0 && (
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
								)}
							</Box>
						)}
						{TreatmentMode === Treatment_Mode.Threapy_Summary && (
							<Box>
								<Heading size="md" alignSelf="center">
									Therapy Summary
								</Heading>
								<Border>
									<AdminBarChart data={TreatementCount} />
								</Border>
								{TreatementCount.length > 0 && (
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
								)}
							</Box>
						)}
						{TreatmentMode === Treatment_Mode.Drug_Summary && (
							<Box>
								<Heading size="md" alignSelf="center">
									Drug Summary
								</Heading>
								<Border>
									<AdminBarChart data={DrugData} />
								</Border>
								{DrugData.length > 0 && (
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
								)}
							</Box>
						)}
					</ScrollView>
				</Box>
			)}
		</>
	);
};

export default Treatmentview;
