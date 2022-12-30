import React, { useState, useCallback } from "react";
import { ScrollView, Center, Radio, Button, Pressable, Icon, Text, View, VStack } from "native-base";
import Card_Component from "../../sharedComponent/Card_Component";
import FormRadioGroup from "../../sharedComponent/Form/FormRadioGroup";
import { useFormik } from "formik";
import { Laboratory_result_Option, Laboratory_Positive, RDT_Options, RDT_Type_Option } from "../../Common/Options";
import * as Yup from "yup";
import _ from "lodash";
import FormSigleSelect from "../../sharedComponent/Form/FormSigleSelect";
import FormDateComponent from "../../sharedComponent/Form/FormDateComponent";
import FontIcon from "react-native-vector-icons/FontAwesome";
import FormInputField from "../../sharedComponent/Form/FormInputField";
import "yup-phone-lite";
import { useSelector, useDispatch } from "react-redux";
import { LOADING_STATUS, Operation_Mode } from "../../Common/status_code";
import { useFocusEffect } from "@react-navigation/native";
import { Report } from "../../Redux/Report/Selector";
import { ReportAction } from "../../Redux/Report/reducer";
import { FancyAlert } from "react-native-expo-fancy-alerts";
import AntIcon from "react-native-vector-icons/AntDesign";

const Laboratory = (props) => {
	const case_id = props.route.params.case_id;
	const mode = props.route.params.mode;
	const initialState = props.route.params.initialState;
	const dispatch = useDispatch();
	const ReportState = useSelector(Report());
	const [showBloodSmearDate, setBloodSmearDate] = useState(false);
	const [showPCRDate, setPCRDate] = useState(false);
	const [showRPTDDate, setRPTDDate] = useState(false);
	const [visible, setVisible] = useState(false);
	const [message, setMessage] = useState("");
	const [submit, setSubmit] = useState(false);

	useFocusEffect(
		useCallback(() => {
			const { loading, Message, status } = ReportState;
			if (loading === LOADING_STATUS.FULFILLED && submit) {
				setVisible(true);
				setMessage(Message);
				setSubmit(false);
				dispatch(ReportAction.Initialilze());
			}
		}, [ReportState, submit])
	);

	const initialValues = () => {
		if (mode === Operation_Mode.create) {
			return {
				Blood_Smear: {
					status: "",
					Description: "",
					Collection_Date: new Date(),
					Laboratory_name: "",
					Phone_Number: "",
				},
				PCR_of_Blood: {
					status: "",
					Description: "",
					Collection_Date: new Date(),
					Laboratory_name: "",
					Phone_Number: "",
				},
				RDT: {
					status: "",
					Description: "",
					Type: "",
					Type_Other: "",
					Collection_Date: new Date(),
					Laboratory_name: "",
					Phone_Number: "",
				},
			};
		} else if (mode === Operation_Mode.edit) {
			const Blood_Smear = initialState.Blood_Smear;
			const PCR_of_Blood = initialState.PCR_of_Blood;
			const RDT = initialState.RDT;

			return {
				Blood_Smear: {
					status: Blood_Smear.status,
					Description: { id: Blood_Smear.Description, item: Blood_Smear.Description },
					Collection_Date: new Date(Blood_Smear.Collection_Date),
					Laboratory_name: Blood_Smear.Laboratory_name,
					Phone_Number: Blood_Smear.Phone_Number,
				},
				PCR_of_Blood: {
					status: PCR_of_Blood.status,
					Description: { id: PCR_of_Blood.Description, item: PCR_of_Blood.Description },
					Collection_Date: new Date(PCR_of_Blood.Collection_Date),
					Laboratory_name: PCR_of_Blood.Laboratory_name,
					Phone_Number: PCR_of_Blood.Phone_Number,
				},
				RDT: {
					status: RDT.status,
					Description: { id: RDT.Description, item: RDT.Description },
					Type: RDT.Type,
					Type_Other: RDT.Type_Other,
					Collection_Date: new Date(RDT.Collection_Date),
					Laboratory_name: RDT.Laboratory_name,
					Phone_Number: RDT.Phone_Number,
				},
			};
		}
	};
	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object().shape({
			Blood_Smear: Yup.object().shape({
				status: Yup.string().required("Microscropy of Blood Smear is Required"),
				Description: Yup.object().when("status", {
					is: () => {
						return _.get(formik.values, "Blood_Smear.status") === "Positive";
					},
					then: Yup.object().required("This field is required"),
				}),
				Collection_Date: Yup.date().required("Collection Date is required"),
				Laboratory_name: Yup.string().required("Laboratory name is required"),
				Phone_Number: Yup.string().phone("HK", "Please enter a valid phone number").required("Phone Number is required"),
			}),
			PCR_of_Blood: Yup.object().shape({
				status: Yup.string().required("PCR of Blood status is required"),
				Description: Yup.object().when("status", {
					is: () => {
						return _.get(formik.values, "PCR_of_Blood.status") === "Positive";
					},
					then: Yup.object().required("This field is required"),
				}),
				Collection_Date: Yup.date().required("Collection Date is required"),
				Laboratory_name: Yup.string().required("Laboratory name is required"),
				Phone_Number: Yup.string().phone("HK", "Please enter a valid phone number").required("Phone Number is required"),
			}),
			RDT: Yup.object().shape({
				status: Yup.string().required("RDT status is required"),
				Description: Yup.object().when("status", {
					is: () => {
						return _.get(formik.values, "RDT.status") === "Positive";
					},
					then: Yup.object().required("This field is required"),
				}),
				Type: Yup.string().required("RDT Type is required"),
				Type_Other: Yup.string().when("Type", {
					is: () => {
						return _.get(formik.values, "RDT.Type") === "Other";
					},
					then: Yup.string().required("This field is required when RDT Type is 'Other'"),
				}),
				Collection_Date: Yup.date().required("Collection Date is required"),
				Laboratory_name: Yup.string().required("Laboratory name is required"),
				Phone_Number: Yup.string().phone("HK", "Please enter a valid phone number").required("Phone Number is required"),
			}),
		}),
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: (values) => {
			setSubmit(true);
			const Laboratory = _.cloneDeep(values);
			//console.log(Laboratory);

			const Blood_Smear = Laboratory.Blood_Smear;
			Blood_Smear.Description = Blood_Smear.status !== "Positive" ? "" : Blood_Smear.description;
			Blood_Smear.Description = Blood_Smear.Description === "" ? "" : Blood_Smear.Description.id;

			const PCR_of_Blood = Laboratory.PCR_of_Blood;
			PCR_of_Blood.Description = PCR_of_Blood.status !== "Positive" ? "" : PCR_of_Blood.description;
			PCR_of_Blood.Description = PCR_of_Blood.Description === "" ? "" : PCR_of_Blood.Description.id;

			const RDT = Laboratory.RDT;
			RDT.Description = RDT.status !== "Positive" ? "" : RDT.description;
			RDT.Description = RDT.Description === "" ? "" : RDT.Description.id;

			RDT.Type_Other = RDT.Type !== "Other" ? "" : RDT.Type_Other;

			if (mode === Operation_Mode.create) {
				dispatch(ReportAction.AddLaboratory({ case_id: case_id, Laboratory: Laboratory }));
			} else if (mode === Operation_Mode.edit) {
				const id = initialState._id;
				dispatch(ReportAction.EditLaboratory({ id: id, Laboratory: Laboratory }));
			}
		},
	});

	const onChange = (targetField) => {
		return (val) => {
			formik.setFieldValue(targetField, val);
		};
	};

	const SubmitWithAlert = async (values) => {
		//console.log("SubmitWithAlert", values);
		const validation = await formik.validateForm(values);
		if (!_.isEmpty(validation)) {
			console.log(validation);
		} else {
			formik.handleSubmit();
		}
	};

	const onChangeTime = (event, selectedDate, id, callback) => {
		const currentDate = selectedDate;
		callback(false);
		// setPregnantDate(currentDate);
		formik.setFieldValue(id, currentDate);
	};

	const ReturnToReportPage = () => {
		setVisible(false);
		props.navigation.navigate("Main");
	};

	return (
		<ScrollView
			nestedScrollEnabled={true}
			contentContainerStyle={{ paddingBottom: 60 }}
			width="100%"
		>
			<Center>
				<Card_Component heading={"Blood Smear"}>
					<FormRadioGroup
						formik={formik}
						Label="Microscropy of Blood Smear"
						Horizontal={false}
						id="Blood_Smear.status"
					>
						{Laboratory_result_Option.map((d) => (
							<Radio
								value={d.value}
								size="sm"
								key={d.value}
							>
								{d.Label}
							</Radio>
						))}
					</FormRadioGroup>
					{_.get(formik.values, "Blood_Smear.status") === "Positive" && (
						<FormSigleSelect
							options={Laboratory_Positive}
							formik={formik}
							Label="Specify (if positive)"
							placeholder="Description"
							id="Blood_Smear.Description"
							onChange={onChange}
							hideInputFilter={true}
						/>
					)}
					<FormDateComponent
						formik={formik}
						Label="Collection Date"
						rightElement={
							<Pressable onPress={() => setBloodSmearDate(true)}>
								<Icon
									as={<FontIcon name="calendar" />}
									size={5}
									mr={2}
								/>
							</Pressable>
						}
						id="Blood_Smear.Collection_Date"
						show={showBloodSmearDate}
						callback={setBloodSmearDate}
						onChangeTime={onChangeTime}
					/>
					<FormInputField
						formik={formik}
						Label="Laboratory"
						isRequired={true}
						id="Blood_Smear.Laboratory_name"
					/>
					<FormInputField
						formik={formik}
						Label="Phone Number"
						isRequired={true}
						id="Blood_Smear.Phone_Number"
						keyboardType="numeric"
					/>
				</Card_Component>
				<Card_Component heading={"PCR of Blood"}>
					<FormRadioGroup
						formik={formik}
						Label="PCR of Blood"
						Horizontal={false}
						id="PCR_of_Blood.status"
					>
						{Laboratory_result_Option.map((d) => (
							<Radio
								value={d.value}
								size="sm"
								key={d.value}
							>
								{d.Label}
							</Radio>
						))}
					</FormRadioGroup>
					{_.get(formik.values, "PCR_of_Blood.status") === "Positive" && (
						<FormSigleSelect
							options={Laboratory_Positive}
							formik={formik}
							Label="Specify (if positive)"
							placeholder="Description"
							id="PCR_of_Blood.Description"
							onChange={onChange}
							hideInputFilter={true}
						/>
					)}
					<FormDateComponent
						formik={formik}
						Label="Collection Date"
						rightElement={
							<Pressable onPress={() => setPCRDate(true)}>
								<Icon
									as={<FontIcon name="calendar" />}
									size={5}
									mr={2}
								/>
							</Pressable>
						}
						id="PCR_of_Blood.Collection_Date"
						show={showPCRDate}
						callback={setPCRDate}
						onChangeTime={onChangeTime}
					/>
					<FormInputField
						formik={formik}
						Label="Laboratory"
						isRequired={true}
						id="PCR_of_Blood.Laboratory_name"
					/>
					<FormInputField
						formik={formik}
						Label="Phone Number"
						isRequired={true}
						id="PCR_of_Blood.Phone_Number"
						keyboardType="numeric"
					/>
				</Card_Component>
				<Card_Component heading={"Rapid Diagnostic Test"}>
					<FormRadioGroup
						formik={formik}
						Label="Rapid Diagnostic Test"
						Horizontal={false}
						id="RDT.status"
					>
						{Laboratory_result_Option.map((d) => (
							<Radio
								value={d.value}
								size="sm"
								key={d.value}
							>
								{d.Label}
							</Radio>
						))}
					</FormRadioGroup>
					{_.get(formik.values, "RDT.status") === "Positive" && (
						<FormSigleSelect
							options={RDT_Options}
							formik={formik}
							Label="Specify (if positive)"
							placeholder="Description"
							id="RDT.Description"
							onChange={onChange}
							hideInputFilter={true}
						/>
					)}
					<FormRadioGroup
						formik={formik}
						Label={"Specify RDT"}
						id="RDT.Type"
					>
						{RDT_Type_Option.map((d) => (
							<Radio
								value={d.value}
								size="sm"
								key={d.value}
							>
								{d.Label}
							</Radio>
						))}
					</FormRadioGroup>
					{_.get(formik.values, "RDT.Type") === "Other" && (
						<FormInputField
							formik={formik}
							id="RDT.Type_Other"
							Label="Specify (Specify RDT)"
							isRequired={true}
						/>
					)}
					<FormDateComponent
						formik={formik}
						Label="Collection Date"
						rightElement={
							<Pressable onPress={() => setRPTDDate(true)}>
								<Icon
									as={<FontIcon name="calendar" />}
									size={5}
									mr={2}
								/>
							</Pressable>
						}
						id="RPT.Collection_Date"
						show={showRPTDDate}
						callback={setRPTDDate}
						onChangeTime={onChangeTime}
					/>
					<FormInputField
						formik={formik}
						Label="Laboratory"
						isRequired={true}
						id="RDT.Laboratory_name"
					/>
					<FormInputField
						formik={formik}
						Label="Phone Number"
						isRequired={true}
						id="RDT.Phone_Number"
						keyboardType="numeric"
					/>
				</Card_Component>

				<Button
					w="90%"
					alignSelf="center"
					mt="3"
					onPress={() => SubmitWithAlert(formik.values)}
				>
					{mode === Operation_Mode.create ? "Submit Laboratory" : mode === Operation_Mode.edit ? "Update Laboratory" : null}
				</Button>
				<FancyAlert
					visible={visible}
					icon={
						<View
							style={{
								flex: 1,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "red",
								borderRadius: 50,
								width: "100%",
							}}
						>
							<AntIcon
								name="checkcircle"
								size={30}
								color="white"
							/>
						</View>
					}
					style={{ backgroundColor: "white" }}
				>
					<VStack>
						<Text>{message}</Text>
						<Button
							onPress={() => ReturnToReportPage(false)}
							my={3}
						>
							OK
						</Button>
					</VStack>
				</FancyAlert>
			</Center>
		</ScrollView>
	);
};

export default Laboratory;
