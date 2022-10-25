import React, { useState } from "react";
import {
  Center,
  ScrollView,
  VStack,
  Radio,
  Pressable,
  Icon,
  Button,
  Box,
  Text,
  View,
  Heading,
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

const PersonalInformation = (props) => {
  const [showPregnantDate, setShowPregnantDate] = useState(false);
  const [PregnantDate, setPregnantDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [errorField, setErrorField] = useState([]);

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      Name: "",
      Id: "",
      Age: "",
      Phone: "",
      Home: {
        Location:"",
        Telphone:"",
        Contact_Person:"",
        Contact_Person_Tel:""
      },
      Work: {
        Location:"",
        Telphone:"",
        Contact_Person:"",
        Contact_Person_Tel:""
      },
      Gender: "",
    },
    validationSchema: Yup.object().shape({
      Name: Yup.string().required("Name is Needed"),
      Id: Yup.string().required("Id is Needed"),
      Age: Yup.number()
        .min(0, "Age must be bigger than 0")
        .required("Age is needed"),
      Email: Yup.string()
        .email("Please provide a valid email address")
        .required("Email is needed"),
      Phone: Yup.string()
        .phone("HK", "Please enter a valid phone number")
        .required("A phone number must be required"),
      Gender: Yup.string().required("Please select a gender"),
      Home: Yup.object().shape({
        Contact_Person: Yup.string().when("Home.Contact_Person_Tel",{
            is: ()=>{
                return (_.get(formik.values,"Home.Contact_Person")=="" && _.get(formik.values,"Home.Contact_Person_Tel")!=="")
            },
            then: Yup.string().required("Contact Person must not be null")
        }),
        Contact_Person_Tel: Yup.string().when("Home.Contact_Person",{
            is: () => {
                return(_.get(formik.values,"Home.Contact_Person")!=="" && _.get(formik.values,"Home.Contact_Person_Tel")=="");
            },
            then: Yup.string().required("Contact Telphone must not be null"),
            otherwise: Yup.string()
        })
      }),
      Work:Yup.object().shape({
        Contact_Person:Yup.string().when("Work.Contact_Person_Tel",{
            is: ()=>{
                return (_.get(formik.values,"Work.Contact_Person")=="" && _.get(formik.values,"Work.Contact_Person_Tel")!=="")
            },
            then: Yup.string().required("Contact Person must not be null")
        }),
        Contact_Person_Tel: Yup.string().when("Work.Contact_Person",{
            is: () => {
                return(_.get(formik.values,"Work.Contact_Person")!=="" && _.get(formik.values,"Work.Contact_Person_Tel")=="");
            },
            then: Yup.string().required("Contact Telphone must not be null"),
            otherwise: Yup.string()
        })
      })
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);

      const report_data = values
      if(report_data.Gender === "Male"){
        if("Pregnant" in report_data){
          delete report_data.Pregnant;
        }
        if("PregnantDate" in report_data){
          delete report_data.PregnantDate
        }
      }
      props.navigation.navigate("ClinicalInformation",{report_data: values})
    },
  });

  const onMultiChange = (targetField) => {
    return (item) => {
      formik.setFieldValue(
        targetField,
        xorBy(formik.values[targetField], [item], "id")
      );
    };
  };

  const onChange = (targetField) => {
    return (val) => {
      formik.setFieldValue(targetField, val.toLocaleDateString("en-US"));
    };
  };

  const onChangeTime = (event, selectedDate, id) => {;
    const currentDate = selectedDate;
    setShowPregnantDate(false);
    // setPregnantDate(currentDate);
    formik.setFieldValue(id,currentDate);
  };

  const SubmitWithAlert = async (values) => {
    const validation = await formik.validateForm(values);
    console.log(validation)
    if (!_.isEmpty(validation)) {
      setErrorField(Object.keys(validation));
      setVisible(true);
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
        <Card_Component heading={"Patient Information"}>
          <VStack space={3}>
            <FormInputField
              Label={"Name"}
              id="Name"
              formik={formik}
              isRequired={true}
            />
            <FormInputField
              Label={"Id"}
              id="Id"
              formik={formik}
              isRequired={true}
            />
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
            <FormRadioGroup
              Label="Gender"
              formik={formik}
              id="Gender"
              options={Gender_option}
            >
             {Gender_option.map((d)=>(
              <Radio value={d.Value} size="sm">{d.Label}</Radio>
             ))}
            </FormRadioGroup>
            {_.get(formik.values, "Gender") == "Female" ? (
              <FormSwitch formik={formik} Label={"Pregnant"} id="Pregnant" />
            ) : null}
            {_.get(formik.values, "Gender") == "Female" &&
            _.get(formik.values, "Pregnant") ? (
              <FormDateComponent
                Label={"Pregnant Date(Est)"}
                rightElement={
                  <Pressable onPress={() => setShowPregnantDate(true)}>
                    <Icon as={<FontIcon name="calendar" />} size={5} mr={2} />
                  </Pressable>
                }
                id="PregnantDate"
                date={PregnantDate}
                show={showPregnantDate}
                onChangeTime={onChangeTime}
                formik={formik}
              />
            ) : null}
          </VStack>
        </Card_Component>
        <Card_Component heading={"Home Contact"}>
          <VStack space={3}>
            <FormInputField
              Label={"Location"}
              id="Home.Location"
              formik={formik}
            />
            <FormInputField
              Label={"Telephone"}
              id="Home.Telephone"
              formik={formik}
            />
            <FormInputField
              Label={"Contact Person"}
              id="Home.Contact_Person"
              formik={formik}
            />
            <FormInputField
              Label={"Telphone(Contact person)"}
              id="Home.Contact_Person_Tel"
              formik={formik}
            />
          </VStack>
        </Card_Component>
        <Card_Component heading={"Work Contact"}>
          <VStack space={3}>
            <FormInputField
              Label={"Location"}
              id="Work.Location"
              formik={formik}
            />
            <FormInputField
              Label={"Telephone"}
              id="Work.Telephone"
              formik={formik}
            />
            <FormInputField
              Label={"Contact Person"}
              id="Work.Contact_Person"
              formik={formik}
            />
            <FormInputField
              Label={"Telphone(Contact person)"}
              id="Work.Contact_Person_Tel"
              formik={formik}
            />
          </VStack>
        </Card_Component>
        <Box w="90%">
          <Button
            my={3}
            onPress={() => SubmitWithAlert(formik.values)}
            alignSelf="flex-end"
            colorScheme="success"
            w="40%"
            size="md"
            rightIcon={
              <Icon as={<FontIcon name="chevron-right" />} size={5} ml={2} />
            }
          >
            <Text ml={2} color="white">
              Clinical Information
            </Text>
          </Button>
        </Box>
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
              <MaterialIcon name="error" size={30} color="white" />
            </View>
          }
          style={{ backgroundColor: "white" }}
        >
          <VStack space={3}>
            <Text fontWeight="bold" color="red.500">
              Validation Error
            </Text>
            <Text>validation error from the following field:</Text>
            <Text>{errorField.join(" , ")}</Text>
            <Button onPress={() => setVisible(false)} my={3}>
              OK
            </Button>
          </VStack>
        </FancyAlert>
      </Center>
    </ScrollView>
  );
};

export default PersonalInformation;
