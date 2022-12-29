import React, { useState } from "react";
import {
  ScrollView,
  Center,
  Radio,
  Button,
  Pressable,
  Icon,
} from "native-base";
import Card_Component from "../../sharedComponent/Card_Component";
import FormRadioGroup from "../../sharedComponent/Form/FormRadioGroup";
import { useFormik } from "formik";
import {
  Laboratory_result_Option,
  Laboratory_Positive,
  RDT_Options,
  RDT_Type_Option,
} from "../../Common/Options";
import * as Yup from "yup";
import _ from "lodash";
import FormSigleSelect from "../../sharedComponent/Form/FormSigleSelect";
import FormDateComponent from "../../sharedComponent/Form/FormDateComponent";
import FontIcon from "react-native-vector-icons/FontAwesome";
import FormInputField from "../../sharedComponent/Form/FormInputField";
import "yup-phone-lite";

const Laboratory = () => {
  const [showBloodSmearDate, setBloodSmearDate] = useState(false);
  const [showPCRDate, setPCRDate] = useState(false);
  const [showRPTDDate, setRPTDDate] = useState(false);
  const formik = useFormik({
    initialValues: {
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
    },
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
        Phone_Number: Yup.string()
          .phone("HK", "Please enter a valid phone number")
          .required("Phone Number is required"),
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
        Phone_Number: Yup.string()
          .phone("HK", "Please enter a valid phone number")
          .required("Phone Number is required"),
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
          then: Yup.string().required(
            "This field is required when RDT Type is 'Other'"
          ),
        }),
        Collection_Date: Yup.date().required("Collection Date is required"),
        Laboratory_name: Yup.string().required("Laboratory name is required"),
        Phone_Number: Yup.string()
          .phone("HK", "Please enter a valid phone number")
          .required("Phone Number is required"),
      }),
    }),
    onSubmit: (values) => {
      console.log(values);
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
              <Radio value={d.value} size="sm" key={d.value}>
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
                <Icon as={<FontIcon name="calendar" />} size={5} mr={2} />
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
              <Radio value={d.value} size="sm" key={d.value}>
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
                <Icon as={<FontIcon name="calendar" />} size={5} mr={2} />
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
              <Radio value={d.value} size="sm" key={d.value}>
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
          <FormRadioGroup formik={formik} Label={"Specify RDT"} id="RDT.Type">
            {RDT_Type_Option.map((d) => (
              <Radio value={d.value} size="sm" key={d.value}>
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
                <Icon as={<FontIcon name="calendar" />} size={5} mr={2} />
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
          Create Laboratory
        </Button>
      </Center>
    </ScrollView>
  );
};

export default Laboratory;
