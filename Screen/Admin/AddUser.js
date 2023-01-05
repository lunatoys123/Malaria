import React, { useState, useCallback } from "react";
import { Center, Button, VStack, ScrollView } from "native-base";
import Card_Component from "../../sharedComponent/Card_Component";
import { useFormik } from "formik";
import FormInputField from "../../sharedComponent/Form/FormInputField";
import FormSigleSelect from "../../sharedComponent/Form/FormSigleSelect";
import { Role_Options } from "../../Common/Options";
import _ from "lodash";
import { GetAllHospital } from "../../Common/Admin_Function";
import { useFocusEffect } from "@react-navigation/native";
import * as Yup from "yup";

const AddUser = () => {
	const [Hospital_Options, setHospitalOptions] = useState([]);
	const formik = useFormik({
		initialValues: {
			Login_name: "",
			Email: "",
			Password: "",
			Role: "",
			Hospital_id: "",
			Phone_number: "",
		},
		validationSchema: Yup.object().shape({
			Login_name: Yup.string().required("Login Name is Required"),
			Email: Yup.string()
				.email("Please provide a valid email address")
				.required("New User email should be provided"),
			Password: Yup.string()
				.required("Password is required")
				.min(8, "must be at least 8 characters")
				.matches(/[0-9]/, "Password requires a number")
				.matches(/[a-z]/, "Password requires a lowercase letter")
				.matches(/[A-Z]/, "Password requires an uppercase letter"),
		}),
	});

	useFocusEffect(
		useCallback(() => {
			const initialize = async () => {
				const response = await GetAllHospital();
				const hospital = response.map(d => ({ id: d._id, item: d.name }));
				//console.log(hospital);
				setHospitalOptions(hospital);
			};
			initialize();
		}, [])
	);

	const onChange = targetField => {
		return val => {
			formik.setFieldValue(targetField, val);
		};
	};

	const SubmitWithAlert = async values => {
		//console.log(values);
		const validation = await formik.validateForm(values);
		//console.log(validation);

		if (!_.isEmpty(validation)) {
			console.log(validation);
		} else {
			formik.handleSubmit();
		}
	};

	return (
		<ScrollView
			nestedScrollEnabled={true}
			contentContainerStyle={{
				paddingBottom: 60,
			}}
			width="100%"
		>
			<VStack space={2}>
				<Center>
					<Card_Component heading="New User">
						<FormInputField formik={formik} Label="Login Name" id="Login_name" isRequired={true} />
						<FormInputField formik={formik} Label="Email" id="Email" isRequired={true} />
						<FormInputField
							formik={formik}
							Label="Password"
							id="Password"
							isRequired={true}
							type="password"
						/>
						<FormSigleSelect
							formik={formik}
							Label="Role"
							placeholder="Role"
							id="Role"
							options={Role_Options}
							hideInputFilter={true}
							onChange={onChange}
						/>
						<FormSigleSelect
							formik={formik}
							Label="Hospital"
							placeholder="Hospital"
							id="Hospital_id"
							options={Hospital_Options}
							hideInputFilter={true}
							onChange={onChange}
						/>
						<FormInputField
							formik={formik}
							Label="Phone Number"
							id="Phone_number"
							isRequired={true}
						/>
					</Card_Component>
				</Center>
				<Button w="90%" alignSelf="center" onPress={() => SubmitWithAlert(formik.values)}>
					Add New User
				</Button>
			</VStack>
		</ScrollView>
	);
};

export default AddUser;
