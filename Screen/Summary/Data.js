import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import {
	Center,
	Select,
	Box,
	CheckIcon,
	HStack,
	Button,
	useToast,
	ScrollView,
	VStack,
	Icon,
	IconButton,
	Text,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Summary } from "../../Redux/Summary/Selector";
import { SummaryAction } from "../../Redux/Summary/reducer";
import { LOADING_STATUS, Data_Mode } from "../../Common/status_code";
import LoadingSpinner from "../../sharedComponent/Loading";
import { Ionicons } from "@expo/vector-icons";
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import GraphView from "./Views/GraphView";
import TableView from "./Views/TableView";
import AnalyticsView from "./Views/AnalyticsView";
import CompareView from "./Views/CompareView";

const Data = props => {
	const toast = useToast();
	const option = props.route.params.option;
	const SummaryState = useSelector(Summary());
	const dispatch = useDispatch();
	const [country, setCountries] = useState([]);
	const [selectcountry, setSelectCountry] = useState(null);
	const [loading, setLoading] = useState(false);
	const [WHO_DATA, setWHO_DATA] = useState([]);
	const [Table_Data, setTable_Data] = useState([]);
	const [Target_Data, setTarget_Data] = useState([]);
	const [Current_Data, setCurrent_Data] = useState([]);
	const [Analytics_Data, setAnalytics_Data] = useState({});
	const [tooltipPosition, setTooltipPosition] = useState([]);
	const [ComparetooltipPosition, setComparetoolPosition] = useState([]);
	const [dataModel, setDataModel] = useState(Data_Mode.Graph);
	const [currentCountry, setCurrentCountry] = useState(null);
	const [targetCountry, setTargetCountry] = useState(null);
	const [Compare_Analytics_Data, setCompare_Analytics_Data] = useState({});
	const [displayGraph, setDisplayGraph] = useState(false);
	const [NoDataText, setNoDataText] = useState("");
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
		const {
			countries,
			loading,
			WHO_Data,
			Table_data,
			Analytics,
			target_Data,
			current_Data,
			Compare_Analytics,
		} = SummaryState;
		if (loading === LOADING_STATUS.FULFILLED) {
			setCountries(countries);
			setLoading(false);
			setWHO_DATA(WHO_Data);
			setTable_Data(Table_data);
			setAnalytics_Data(Analytics);
			setTarget_Data(target_Data);
			setCurrent_Data(current_Data);
			setCompare_Analytics_Data(Compare_Analytics);
			setDisplayGraph(false);

			if (selectcountry && (WHO_DATA.length == 0 || Table_Data.length == 0)) {
				setNoDataText("No data available for this country");
			}

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

			const ComparetooltipPos = [];
			for (let i = 0; i < target_Data.length; i++) {
				ComparetooltipPos.push({
					x: 0,
					y: 0,
					visible: false,
					value: 0,
				});
			}

			setComparetoolPosition(ComparetooltipPos);
		}
	}, [SummaryState]);

	useEffect(() => {
		props.navigation.setOptions({
			headerLeft: () => (
				<IconButton
					icon={<Icon as={<Ionicons name="arrow-back" size={24} color="black" />} />}
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
			//setCurrentCountry(selectcountry);
			dispatch(SummaryAction.WHO_Data({ option, selectcountry }));
		}
	};

	const CompareData = () => {
		if (targetCountry == null || currentCountry == null) {
			toast.show({
				title: "Error",
				description: "Please select two countries for comparison",
				placement: "top",
				duration: 500,
			});
		} else if (targetCountry == currentCountry) {
			toast.show({
				title: "Error",
				description: "Two Country should not be the same",
				placement: "top",
				duration: 500,
			});
		} else {
			setLoading(true);
			setDisplayGraph(true);
			dispatch(SummaryAction.CompareView({ option, targetCountry, currentCountry }));
		}
	};

	const GenerateExcel = () => {
		var data_array = [];
		data_array.push([option]);
		data_array.push(["Data", "Value"]);

		const extract_Table_data = Table_Data.map(d => {
			return { Year: d.Year, value: d.value ? d.value : 0 };
		});

		for (let i = 0; i < extract_Table_data.length; i++) {
			data_array.push([extract_Table_data[i].Year, extract_Table_data[i].value]);
		}

		//console.log(data_array);

		let data_wb = XLSX.utils.book_new();
		let data_ws = XLSX.utils.aoa_to_sheet(data_array);

		XLSX.utils.book_append_sheet(data_wb, data_ws, "Country Data", true);

		var Analytics_array = [];
		Analytics_array.push([option]);
		Analytics_array.push(["Analytics", "Value"]);

		const analytics_key = Object.keys(Analytics_Data);
		for (let i = 0; i < analytics_key.length; i++) {
			const key = analytics_key[i];
			Analytics_array.push([key, Analytics_Data[key]]);
		}
		let Analytics_ws = XLSX.utils.aoa_to_sheet(Analytics_array);

		XLSX.utils.book_append_sheet(data_wb, Analytics_ws, "Analytics", true);
		const base64 = XLSX.write(data_wb, { type: "base64" });
		const filename = FileSystem.documentDirectory + selectcountry + ".csv";

		FileSystem.writeAsStringAsync(filename, base64, {
			encoding: FileSystem.EncodingType.Base64,
		}).then(() => {
			Sharing.shareAsync(filename);
		});
	};

	const GenerateCompareVersionExcel = () => {
		let Flattern_Current_Data = [];
		for (let i = 0; i < Current_Data.length; i++) {
			Flattern_Current_Data = Flattern_Current_Data.concat(Current_Data[i]);
		}

		let Flattern_Target_Data = [];
		for (let i = 0; i < Target_Data.length; i++) {
			Flattern_Target_Data = Flattern_Target_Data.concat(Target_Data[i]);
		}

		let data_array = [];
		data_array.push([option]);
		data_array.push(["Year", currentCountry, targetCountry]);

		const length = Flattern_Target_Data.length;

		for (let i = 0; i < length; i++) {
			data_array.push([
				Flattern_Target_Data[i].Year,
				Flattern_Current_Data[i].value,
				Flattern_Target_Data[i].value,
			]);
		}

		// console.log(data_array);
		// console.log(Compare_Analytics_Data);
		let data_wb = XLSX.utils.book_new();
		let data_ws = XLSX.utils.aoa_to_sheet(data_array);

		XLSX.utils.book_append_sheet(data_wb, data_ws, "Country Data", true);
		const countries = Compare_Analytics_Data.map(d => d.country_code);
		const Analytics_Data = Compare_Analytics_Data.map(d => d.Analytics);

		let Analytics_array = [];
		Analytics_array.push([option]);
		Analytics_array.push(["", ...countries]);
		//console.log(Analytics_array);

		const Analytics_map = new Map();
		for (let i = 0; i < Analytics_Data.length; i++) {
			const a_Data = Analytics_Data[i];
			const keys = Object.keys(a_Data);
			for (let j = 0; j < keys.length; j++) {
				if (!Analytics_map.has(keys[j])) {
					Analytics_map.set(keys[j], ["", a_Data[keys[j]]]);
				} else {
					var copy_data = Analytics_map.get(keys[j]);
					copy_data.push(a_Data[keys[j]]);
				}
			}
		}
		//console.log(Analytics_map);
		for (const [key, value] of Analytics_map) {
			Analytics_array.push(value);
		}
		let Analytics_ws = XLSX.utils.aoa_to_sheet(Analytics_array);
		XLSX.utils.book_append_sheet(data_wb, Analytics_ws, "Analytics", true);

		const base64 = XLSX.write(data_wb, { type: "base64" });
		const filename = FileSystem.documentDirectory + "CompareView.csv";
		FileSystem.writeAsStringAsync(filename, base64, {
			encoding: FileSystem.EncodingType.Base64,
		}).then(() => {
			Sharing.shareAsync(filename);
		});
	};

	return (
		<Center>
			{loading ? (
				<LoadingSpinner />
			) : (
				<>
					<Box bg="white" width="100%" shadow={3} borderWidth={1} borderColor="indigo.500">
						<Center>
							<VStack space={2} py={3}>
								<Button.Group
									isAttached
									colorScheme="blue"
									mx={{
										base: "auto",
										md: 0,
									}}
									size="sm"
									alignItems="center"
									width="100%"
								>
									<Button
										size="sm"
										variant={dataModel == Data_Mode.Graph ? "solid" : "outline"}
										onPress={() => setDataModel(Data_Mode.Graph)}
									>
										Graph View
									</Button>
									<Button
										size="sm"
										variant={dataModel == Data_Mode.Table ? "solid" : "outline"}
										onPress={() => setDataModel(Data_Mode.Table)}
									>
										Table View
									</Button>
									<Button
										size="sm"
										variant={dataModel == Data_Mode.Compare ? "solid" : "outline"}
										onPress={() => setDataModel(Data_Mode.Compare)}
									>
										Compare View
									</Button>
								</Button.Group>
							</VStack>
						</Center>
					</Box>
					{dataModel == Data_Mode.Compare ? (
						<VStack space={2} py={3} width="90%" alignItems="center">
							<HStack alignItems="center" space={2}>
								<Text>Country 1</Text>
								<Select
									selectedValue={currentCountry}
									minW="200"
									placeholder="Select country"
									_selectedItem={{
										bg: "teal.600",
										endIcon: <CheckIcon size="5" />,
									}}
									onValueChange={itemValue => setCurrentCountry(itemValue)}
								>
									{country &&
										country.map(c => {
											return <Select.Item label={c.Options} value={c.code} key={c.code} />;
										})}
								</Select>
							</HStack>
							<HStack alignItems="center" space={2}>
								<Text>Country 2</Text>
								<Select
									selectedValue={targetCountry}
									minW="200"
									placeholder="Select country"
									_selectedItem={{
										bg: "teal.600",
										endIcon: <CheckIcon size="5" />,
									}}
									onValueChange={itemValue => setTargetCountry(itemValue)}
								>
									{country &&
										country.map(c => {
											return <Select.Item label={c.Options} value={c.code} key={c.code} />;
										})}
								</Select>
							</HStack>
							<Button width="100%" onPress={CompareData}>
								Compare
							</Button>
						</VStack>
					) : (
						<HStack space={2} alignSelf="center" py={3}>
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
					)}

					<ScrollView
						nestedScrollEnabled={true}
						contentContainerStyle={{ paddingBottom: 150 }}
						width="100%"
					>
						{dataModel === Data_Mode.Graph && (
							<GraphView
								WHO_DATA={WHO_DATA}
								tooltipPosition={tooltipPosition}
								setTooltipPosition={setTooltipPosition}
								selectcountry={selectcountry}
								GenerateExcel={GenerateExcel}
								NoDataText={NoDataText}
								displayGraph={displayGraph}
							/>
						)}
						{dataModel === Data_Mode.Table && (
							<>
								<TableView
									Table_Data={Table_Data}
									Analytics_Data={Analytics_Data}
									selectcountry={selectcountry}
									NoDataText={NoDataText}
								/>
								<AnalyticsView
									Table_Data={Table_Data}
									Analytics_Data={Analytics_Data}
									selectcountry={selectcountry}
									GenerateExcel={GenerateExcel}
								/>
							</>
						)}
						{dataModel === Data_Mode.Compare && (
							<CompareView
								Target_Data={Target_Data}
								Current_Data={Current_Data}
								tooltipPosition={ComparetooltipPosition}
								setTooltipPosition={setComparetoolPosition}
								currentCountry={currentCountry}
								targetCountry={targetCountry}
								GenerateCompareVersionExcel={GenerateCompareVersionExcel}
							/>
						)}
					</ScrollView>
				</>
			)}
		</Center>
	);
};

export default Data;
