import React, { useState } from "react";
import {
	Center,
	FormControl,
	HStack,
	VStack,
	ScrollView,
	Pressable,
	Icon,
	Radio,
	Button,
	Text,
	AlertDialog,
} from "native-base";
import Card_Component from "../../sharedComponent/Card_Component";
import FormInputField from "../../sharedComponent/Form/FormInputField";
import FormMultiSelect from "../../sharedComponent/Form/FormMultiSelect";
import FormSigleSelect from "../../sharedComponent/Form/FormSigleSelect";
import FormDateComponent from "../../sharedComponent/Form/FormDateComponent";
import FormRadioGroup from "../../sharedComponent/Form/FormRadioGroup";
import FontIcon from "react-native-vector-icons/FontAwesome";
import { Operation_Mode } from "../../Common/status_code";
import {
	Signs,
	Clinical_Complications,
	Patient_Status,
	report_status,
	status_Option,
	Diagnosis,
} from "../../Common/Options";
import _, { xorBy } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const ClinicalInformation = props => {
	var report_data = props.route.params.report_data;
	const mode = props.route.params.mode;
	const initialState = props.route.params.initialState;
	const Patient_id = props.route.params.Patient_id;
	const [show, setShow] = useState(false);
	const [onSetDateShow, setonSetDateShow] = useState(false);
	const [previousIllnewssDate, setpreviousIllnewssDate] = useState(false);
	const [showError, setShowError] = useState(false);
	const [errorField, setErrorField] = useState([]);

	const initialValues = () => {
		if (mode === Operation_Mode.create || mode === Operation_Mode.createWithPatientId) {
			return {
				Symptoms: {
					Sign: [],
					Symptomatic: "",
					Remark: "",
					Onset_date: new Date(),
				},
				Clinical_Complications: {
					Complications: [],
					Description: "",
				},
				Previous_Diagnosis_Malaria: {
					Previous_illness_date: new Date(),
				},
				Status_date: new Date(),
			};
		} else if (mode == Operation_Mode.edit) {
			//console.log(initialState);
			const Initial_Symptoms = initialState.Symptoms;
			const Initial_Clinical = initialState.Clinical_Complications;
			const Initial_Previous_Malaria = initialState.Previous_Diagnosis_Malaria;

			var Previous_Diagnosis_Malaria = {
				Diagnosed_Malaria_previous: Initial_Previous_Malaria.Diagnosed_Malaria_previous,
			};

			if (Initial_Previous_Malaria.Diagnosed_Malaria_previous === "Yes") {
				Previous_Diagnosis_Malaria = {
					...Previous_Diagnosis_Malaria,
					Previously_Diagnosis: {
						id: Initial_Previous_Malaria.Previously_Diagnosis,
						item: Initial_Previous_Malaria.Previously_Diagnosis,
					},
					Previous_illness_date: new Date(
						initialState.Previous_Diagnosis_Malaria.Previous_illness_date
					),
				};
			}

			return {
				Symptoms: {
					Sign: Initial_Symptoms.Sign.map(d => ({ id: d, item: d })),
					Onset_date: new Date(Initial_Symptoms.Onset_date),
					Remark: Initial_Symptoms.Remark,
					Symptomatic: Initial_Symptoms.Symptomatic,
				},
				Clinical_Complications: {
					Complications: Initial_Clinical.Complications.map(d => ({
						id: d,
						item: d,
					})),
					Description: Initial_Clinical.Description,
					//Previously_Diagnosis:{}
				},
				Previous_Diagnosis_Malaria: Previous_Diagnosis_Malaria,
				Patient_Status: { id: initialState.Patient_Status, item: initialState.Patient_Status },
				Status_date: new Date(initialState.Status_date),
				Report_Status: initialState.Report_Status,
			};
		}
	};

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object().shape({
			Symptoms: Yup.object().shape({
				Sign: Yup.array().required().min(1, "At least one Symptoms Sign"),
			}),
			Clinical_Complications: Yup.object().shape({
				Complications: Yup.array().required().min(1, "At Least one Clincial Complications"),
			}),
			Previous_Diagnosis_Malaria: Yup.object().shape({
				Diagnosed_Malaria_previous: Yup.string().required("This status must not be null"),
				Previously_Diagnosis: Yup.object().when("Diagnosed_Malaria_previous", {
					is: () => {
						const Diagnosed_Malaria_previous = _.get(
							formik.values,
							"Previous_Diagnosis_Malaria.Diagnosed_Malaria_previous"
						);
						const Previously_Diagnosis = _.get(
							formik.values,
							"Previous_Diagnosis_Malaria.Previously_Diagnosis"
						);
						return Diagnosed_Malaria_previous == "Yes" && _.isEmpty(Previously_Diagnosis);
					},
					then: Yup.object().required("Previously_Diagnosis is required"),
				}),
				Previous_illness_date: Yup.date(),
			}),
			Patient_Status: Yup.object().required("Patient status is required"),
			Status_date: Yup.date(),
			Report_Status: Yup.string().required("Report status is required"),
		}),
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: values => {
			const Clinical_data = _.cloneDeep(values);

			if (Clinical_data.Previous_Diagnosis_Malaria.Diagnosed_Malaria_previous !== "Yes") {
				if ("Previously_Diagnosis" in Clinical_data.Previous_Diagnosis_Malaria) {
					delete Clinical_data.Previous_Diagnosis_Malaria.Previously_Diagnosis;
				}
				if ("Previous_illness_date" in Clinical_data.Previous_Diagnosis_Malaria) {
					delete Clinical_data.Previous_Diagnosis_Malaria.Previous_illness_date;
				}
			} else {
				if ("Previously_Diagnosis" in Clinical_data.Previous_Diagnosis_Malaria) {
					Clinical_data.Previous_Diagnosis_Malaria.Previously_Diagnosis =
						Clinical_data.Previous_Diagnosis_Malaria.Previously_Diagnosis.item;
				}
			}

			Clinical_data.Clinical_Complications.Complications =
				Clinical_data.Clinical_Complications.Complications.map(d => d.item);
			Clinical_data.Symptoms.Sign = Clinical_data.Symptoms.Sign.map(d => d.item);
			Clinical_data.Patient_Status = Clinical_data.Patient_Status.item;

			if (mode === Operation_Mode.createWithPatientId) {
				report_data = { ...report_data, case: { ...Clinical_data, Patient_id: Patient_id } };

				props.navigation.navigate("TravelHistory", {
					report_data: report_data,
					mode: mode,
				});
			} else if (mode === Operation_Mode.create) {
				report_data = { ...report_data, case: { ...Clinical_data } };
				//console.log(report_data);
				props.navigation.navigate("TravelHistory", {
					report_data: report_data,
					mode: mode,
				});
			} else if (mode === Operation_Mode.edit) {
				props.navigation.navigate("TravelHistory", {
					report_data: { ...report_data, case: { ...Clinical_data } },
					initialState,
					mode: mode,
				});
			}
		},
	});

	const onChange = targetField => {
		return val => {
			formik.setFieldValue(targetField, val);
		};
	};

	const onChangeTime = (event, selectedDate, targetField, callback = null) => {
		const currentDate = selectedDate;
		callback(false);
		//setDate(currentDate);
		formik.setFieldValue(targetField, currentDate);
	};

	const onMultiChange = targetField => {
		return item => {
			formik.setFieldValue(targetField, xorBy(_.get(formik.values, targetField), [item], "id"));
		};
	};

	const SubmitWithAlert = async values => {
		//console.log(values);
		const validation = await formik.validateForm(values);
		//console.log(validation);

		if (!_.isEmpty(validation)) {
			//console.log(validation);
			setErrorField(Object.keys(validation));
			setShowError(true);
		} else {
			formik.handleSubmit();
		}
	};

	return (
		<ScrollView
			nestedScrollEnabled={true}
			contentContainerStyle={{ paddingBottom: 60 }}
			width="100%"
		>
			<Center>
				<Card_Component heading={"Symptoms"}>
					<FormControl>
						<VStack space={3}>
							<FormMultiSelect
								options={Signs}
								Label="Sign"
								MultiChange={onMultiChange}
								placeholder="Select Sign"
								hideInputFilter={true}
								id="Symptoms.Sign"
								formik={formik}
							/>
							<FormInputField Label={"Symptomatic"} id="Symptoms.Symptomatic" formik={formik} />
							<FormInputField
								Label={"Remark"}
								id="Symptoms.Remark"
								formik={formik}
								isTextArea={true}
							/>
							<FormDateComponent
								Label="Onset Date"
								rightElement={
									<Pressable onPress={() => setonSetDateShow(true)}>
										<Icon as={<FontIcon name="calendar" />} size={5} mr={2} />
									</Pressable>
								}
								show={onSetDateShow}
								onChangeTime={onChangeTime}
								formik={formik}
								id="Symptoms.Onset_date"
								callback={setonSetDateShow}
							/>
						</VStack>
					</FormControl>
				</Card_Component>

				<Card_Component heading={"Clinical Complications"}>
					<VStack space={3}>
						<HStack space={2} alignItems="center">
							<FormMultiSelect
								options={Clinical_Complications}
								Label="Complications"
								MultiChange={onMultiChange}
								placeholder="Complications"
								hideInputFilter={true}
								id="Clinical_Complications.Complications"
								formik={formik}
							/>
						</HStack>
						<FormInputField
							Label={"Description"}
							isTextArea={true}
							formik={formik}
							id="Clinical_Complications.Description"
						/>
					</VStack>
				</Card_Component>
				<Card_Component heading={"Previous Diagnosis Malaria"}>
					<FormRadioGroup
						Label="diagnosed Malaria (Previously)"
						formik={formik}
						id="Previous_Diagnosis_Malaria.Diagnosed_Malaria_previous"
					>
						{status_Option.map(d => (
							<Radio value={d.Value} size="sm" key={d.Value}>
								{d.Label}
							</Radio>
						))}
					</FormRadioGroup>
					{_.get(formik.values, "Previous_Diagnosis_Malaria.Diagnosed_Malaria_previous") ==
					"Yes" ? (
						<>
							<FormSigleSelect
								Label="Previously Diagnosis"
								options={Diagnosis}
								formik={formik}
								id="Previous_Diagnosis_Malaria.Previously_Diagnosis"
								onChange={onChange}
								placeholder="Previously Diagnosis"
								hideInputFilter={true}
							/>
							<FormDateComponent
								Label="Previous illness Date"
								rightElement={
									<Pressable onPress={() => setpreviousIllnewssDate(true)}>
										<Icon as={<FontIcon name="calendar" />} size={5} mr={2} />
									</Pressable>
								}
								show={previousIllnewssDate}
								onChangeTime={onChangeTime}
								formik={formik}
								id="Previous_Diagnosis_Malaria.Previous_illness_date"
								callback={setpreviousIllnewssDate}
							/>
						</>
					) : null}
				</Card_Component>
				<Card_Component heading={"Report status"}>
					<VStack space={3}>
						{/* <FormRadioGroup Label="Patient_Status" formik={formik} id="Patient_Status">
							{Patient_Status.map(d => (
								<Radio value={d.Value} size="sm" key={d.Value}>
									{d.Label}
								</Radio>
							))}
						</FormRadioGroup> */}
						<FormSigleSelect
							formik={formik}
							Label="Patient Status"
							options={Patient_Status}
							placeholder="Patient Status"
							id="Patient_Status"
							onChange={onChange}
							hideInputFilter={true}
						/>
						<FormDateComponent
							Label="Status Date"
							rightElement={
								<Pressable onPress={() => setShow(true)}>
									<Icon as={<FontIcon name="calendar" />} size={5} mr={2} />
								</Pressable>
							}
							show={show}
							onChangeTime={onChangeTime}
							formik={formik}
							id="Status_date"
							callback={setShow}
						/>
						<FormRadioGroup Label="Report Status" formik={formik} id="Report_Status">
							{report_status.map(d => (
								<Radio value={d.Value} size="sm" key={d.Value}>
									{d.Label}
								</Radio>
							))}
						</FormRadioGroup>
					</VStack>
				</Card_Component>
				<Button
					my={3}
					onPress={() => SubmitWithAlert(formik.values)}
					alignSelf="center"
					colorScheme="success"
					w="90%"
					rightIcon={
						mode === Operation_Mode.create || mode === Operation_Mode.createWithPatientId ? (
							<Icon as={<FontIcon name="chevron-right" />} size={5} ml={2} />
						) : null
					}
				>
					<Text ml={2} color="white">
						{mode === Operation_Mode.create || mode === Operation_Mode.createWithPatientId
							? "Travel History"
							: mode === Operation_Mode.edit
							? "Update Travel History"
							: null}
					</Text>
				</Button>
			</Center>
			<AlertDialog isOpen={showError} onClose={() => setShowError(false)} size="full">
				<AlertDialog.Content>
					<AlertDialog.Header>
						<HStack space={2} alignItems="center">
							<MaterialIcon name="error" size={30} color="red" />
							<Text color="red.400" bold>
								Error Status
							</Text>
						</HStack>
					</AlertDialog.Header>
					<AlertDialog.Body>
						<VStack space={3}>
							<Text fontWeight="bold" color="red.500">
								Validation Error
							</Text>
							<Text>validation error from the following field:</Text>
							<Text>{errorField.join(" , ")}</Text>
						</VStack>
					</AlertDialog.Body>
					<AlertDialog.Footer>
						<Button w="100%" onPress={() => setShowError(false)}>
							Confirm
						</Button>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog>
		</ScrollView>
	);
};

export default ClinicalInformation;
