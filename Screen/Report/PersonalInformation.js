import React, { useState, useCallback } from "react";
import {
	Center,
	ScrollView,
	VStack,
	Radio,
	Pressable,
	Icon,
	Button,
	Text,
	View,
	AlertDialog,
	HStack,
} from "native-base";
import { useFormik } from "formik";
import { Gender_option } from "../../Common/Options";
import * as Yup from "yup";
import "yup-phone-lite";
import { xorBy } from "lodash";
import Card_Component from "../../sharedComponent/Card_Component";
import FormInputField from "../../sharedComponent/Form/FormInputField";
import FormRadioGroup from "../../sharedComponent/Form/FormRadioGroup";
import FormSwitch from "../../sharedComponent/Form/FormSwitch";
import FormDateComponent from "../../sharedComponent/Form/FormDateComponent";
import FontIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import _ from "lodash";
import { FancyAlert } from "react-native-expo-fancy-alerts";
import { Operation_Mode } from "../../Common/status_code";
import { useDispatch, useSelector } from "react-redux";
import { Patient } from "../../Redux/Patient/Selector";
import { PatientActions } from "../../Redux/Patient/reducer";
import { useFocusEffect } from "@react-navigation/native";
import { LOADING_STATUS } from "../../Common/status_code";

const PersonalInformation = props => {
	const dispatch = useDispatch();
	const PatientState = useSelector(Patient());
	const [showPregnantDate, setShowPregnantDate] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errorField, setErrorField] = useState([]);
	const [Updated, setUpdated] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [message, setMessage] = useState("");
	const mode = props.route.params.mode;
	const initialState = props.route.params.initialState;

	useFocusEffect(
		useCallback(() => {
			const { loading, Message, status } = PatientState;
			if (loading === LOADING_STATUS.FULFILLED && submit) {
				setMessage(Message);
				setSubmit(false);
				setUpdated(true);
			}
		}, [PatientState, submit])
	);

	const initialValues = () => {
		if (mode === Operation_Mode.create) {
			return {
				Name: "",
				Id: "",
				Age: "",
				Phone: "",
				Home: {
					Location: "",
					Telphone: "",
					Contact_Person: "",
					Contact_Person_Tel: "",
				},
				Work: {
					Location: "",
					Telphone: "",
					Contact_Person: "",
					Contact_Person_Tel: "",
				},
				Gender: "",
				Pregnant: false,
				PregnantDate: new Date(),
			};
		} else if (mode == Operation_Mode.edit) {
			const Home = initialState.Home;
			const Work = initialState.Work;
			const Gender = initialState.Gender;
			const Pregnant = initialState.Pregnant;
			const PregnantDate = initialState.PregnantDate;
			const Name = initialState.Name;
			const Id = initialState.Id;
			const Age = initialState.Age;
			const Phone = initialState.Phone;
			const Email = initialState.Email;

			return {
				Name: Name,
				Id: Id,
				Age: Age.toString(),
				Phone: Phone,
				Gender: Gender,
				Email: Email,
				Pregnant: Pregnant == null ? false : Pregnant,
				PregnantDate: PregnantDate == null ? new Date() : new Date(PregnantDate),
				Home: Home,
				Work: Work,
			};
		}
	};

	const formik = useFormik({
		//enableReinitialize: true,
		initialValues: initialValues(),
		validationSchema: Yup.object().shape({
			Name: Yup.string().required("Name is Needed"),
			Id: Yup.string().required("Id is Needed"),
			Age: Yup.number().min(0, "Age must be bigger than 0").required("Age is needed"),
			Email: Yup.string().email("Please provide a valid email address").required("Email is needed"),
			Phone: Yup.string()
				.phone("HK", "Please enter a valid phone number")
				.required("A phone number must be required"),
			Gender: Yup.string().required("Please select a gender"),
			Home: Yup.object().shape({
				Contact_Person: Yup.string().when("Home.Contact_Person_Tel", {
					is: () => {
						return (
							_.get(formik.values, "Home.Contact_Person") == "" &&
							_.get(formik.values, "Home.Contact_Person_Tel") !== ""
						);
					},
					then: Yup.string().required("Contact Person must not be null"),
				}),
				Contact_Person_Tel: Yup.string().when("Contact_Person", {
					is: () => {
						return (
							_.get(formik.values, "Home.Contact_Person") !== "" &&
							_.get(formik.values, "Home.Contact_Person_Tel") == ""
						);
					},
					then: Yup.string().required("Contact Telphone must not be null"),
					otherwise: Yup.string(),
				}),
			}),
			Work: Yup.object().shape({
				Contact_Person: Yup.string().when("Work.Contact_Person_Tel", {
					is: () => {
						return (
							_.get(formik.values, "Work.Contact_Person") == "" &&
							_.get(formik.values, "Work.Contact_Person_Tel") !== ""
						);
					},
					then: Yup.string().required("Contact Person must not be null"),
				}),
				Contact_Person_Tel: Yup.string().when("Work.Contact_Person", {
					is: () => {
						return (
							_.get(formik.values, "Work.Contact_Person") !== "" &&
							_.get(formik.values, "Work.Contact_Person_Tel") == ""
						);
					},
					then: Yup.string().required("Contact Telphone must not be null"),
					otherwise: Yup.string(),
				}),
			}),
		}),
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: values => {
			//console.log(values);
			setSubmit(true);
			var report_data = _.cloneDeep(values);
			if (report_data.Gender === "Male") {
				if ("Pregnant" in report_data) {
					delete report_data.Pregnant;
				}
				if ("PregnantDate" in report_data) {
					delete report_data.PregnantDate;
				}
			}

			var report_data = {
				Patient_data: { ...report_data },
			};
			//console.log(report_data);
			if (mode === Operation_Mode.create) {
				props.navigation.navigate("ClinicalInformation", { report_data: report_data, mode: mode });
			} else if (mode === Operation_Mode.edit) {
				const Patient_id = initialState._id;
				dispatch(
					PatientActions.editPersonalInformation({
						Patient_id: Patient_id,
						report_data: report_data,
					})
				);
			}
		},
	});

	// const onMultiChange = targetField => {
	// 	return item => {
	// 		formik.setFieldValue(targetField, xorBy(formik.values[targetField], [item], "id"));
	// 	};
	// };

	// const onChange = (targetField) => {
	//   return (val) => {
	//     formik.setFieldValue(targetField, val.toLocaleDateString("en-US"));
	//   };
	// };

	const onChangeTime = (event, selectedDate, id, callback) => {
		const currentDate = selectedDate;
		callback(false);
		// setPregnantDate(currentDate);
		formik.setFieldValue(id, currentDate);
	};

	const SubmitWithAlert = async values => {
		const validation = await formik.validateForm(values);
		//console.log(validation);
		if (!_.isEmpty(validation)) {
			setErrorField(Object.keys(validation));
			setVisible(true);
		} else {
			formik.handleSubmit();
		}
	};

	const ReturnToReportPage = () => {
		setUpdated(false);
		props.navigation.navigate("Main");
	};

	return (
		<ScrollView
			nestedScrollEnabled={true}
			contentContainerStyle={{
				paddingBottom: 60,
			}}
			width="100%"
		>
			<Center>
				<Card_Component heading={"Patient Information"}>
					<VStack space={3}>
						<FormInputField Label={"Name"} id="Name" formik={formik} isRequired={true} />
						<FormInputField Label={"Id"} id="Id" formik={formik} isRequired={true} />
						<FormInputField
							Label={"Age"}
							id="Age"
							formik={formik}
							keyboardType="numeric"
							isRequired={true}
						/>
						<FormInputField
							Label={"Phone Number"}
							id="Phone"
							formik={formik}
							keyboardType="numeric"
						/>
						<FormInputField Label={"Email"} id="Email" formik={formik} />
						<FormRadioGroup Label="Gender" formik={formik} id="Gender" options={Gender_option}>
							{Gender_option.map(d => (
								<Radio value={d.Value} size="sm" key={d.Value}>
									{d.Label}
								</Radio>
							))}
						</FormRadioGroup>
						{_.get(formik.values, "Gender") == "Female" ? (
							<FormSwitch formik={formik} Label={"Pregnant"} id="Pregnant" />
						) : null}
						{_.get(formik.values, "Gender") == "Female" && _.get(formik.values, "Pregnant") ? (
							<FormDateComponent
								Label={"Pregnant Date(Est)"}
								rightElement={
									<Pressable onPress={() => setShowPregnantDate(true)}>
										<Icon as={<FontIcon name="calendar" />} size={5} mr={2} />
									</Pressable>
								}
								id="PregnantDate"
								show={showPregnantDate}
								onChangeTime={onChangeTime}
								callback={setShowPregnantDate}
								formik={formik}
							/>
						) : null}
					</VStack>
				</Card_Component>
				<Card_Component heading={"Home Contact"}>
					<VStack space={3}>
						<FormInputField Label={"Location"} id="Home.Location" formik={formik} />
						<FormInputField Label={"Telephone"} id="Home.Telephone" formik={formik} />
						<FormInputField Label={"Contact Person"} id="Home.Contact_Person" formik={formik} />
						<FormInputField
							Label={"Telphone(Contact person)"}
							id="Home.Contact_Person_Tel"
							formik={formik}
						/>
					</VStack>
				</Card_Component>
				<Card_Component heading={"Work Contact"}>
					<VStack space={3}>
						<FormInputField Label={"Location"} id="Work.Location" formik={formik} />
						<FormInputField Label={"Telephone"} id="Work.Telephone" formik={formik} />
						<FormInputField Label={"Contact Person"} id="Work.Contact_Person" formik={formik} />
						<FormInputField
							Label={"Telphone(Contact person)"}
							id="Work.Contact_Person_Tel"
							formik={formik}
						/>
					</VStack>
				</Card_Component>
				<Button
					my={3}
					onPress={() => SubmitWithAlert(formik.values)}
					alignSelf="center"
					colorScheme="success"
					w="90%"
					rightIcon={
						mode === Operation_Mode.create ? (
							<Icon as={<FontIcon name="chevron-right" />} size={5} ml={2} />
						) : null
					}
				>
					<Text ml={2} color="white">
						{mode === Operation_Mode.create
							? "Clinical Information"
							: mode === Operation_Mode.edit
							? "Update Personal Information"
							: null}
					</Text>
				</Button>
				<AlertDialog isOpen={Updated} onClose={() => setUpdated(false)} size="full">
					<AlertDialog.Content>
						{/* <AlertDialog.CloseButton /> */}
						<AlertDialog.Header>Updated Status</AlertDialog.Header>
						<AlertDialog.Body>{message}</AlertDialog.Body>
						<AlertDialog.Footer>
							<Button w="100%" onPress={() => ReturnToReportPage()}>
								Confirm
							</Button>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog>
				<AlertDialog isOpen={visible} onClose={() => setVisible(false)} size="full">
					<AlertDialog.Content>
						<AlertDialog.Header>
							<HStack space={2} alignItems="center">
								<MaterialIcon name="error" size={30} color="red" />
								<Text color="red.400" bold>Error Status</Text>
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
							<Button w="100%" onPress={() => setVisible(false)}>
								Confirm
							</Button>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog>
			</Center>
		</ScrollView>
	);
};

export default PersonalInformation;
