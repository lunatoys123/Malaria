import React, { useState } from 'react'
import { Center, FormControl, ScrollView, VStack, Radio, Pressable, Icon, Button, Box, Text } from 'native-base'
import { useFormik } from 'formik'
import { Gender_option } from '../../Common/Options'
import * as Yup from "yup";
import { xorBy } from 'lodash'
import Card_Component from '../../sharedComponent/Card_Component';
import FormInputField from '../../sharedComponent/Form/FormInputField';
import FormRadioGroup from '../../sharedComponent/Form/FormRadioGroup';
import FormSwitch from '../../sharedComponent/Form/FormSwitch';
import FormDateComponent from '../../sharedComponent/Form/FormDateComponent';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash'

const PersonalInformation = (props) => {
    const [showPregnantDate, setShowPregnantDate] = useState(false);
    const [PregnantDate, setPregnantDate] = useState(new Date());

    const formik = useFormik({
        initialValues: {
            Gender: {}
        },
        validationSchema: Yup.object().shape({
            Name: Yup.string().required("Name is Needed"),
            Age: Yup.number().required("Age is needed"),
            Email: Yup.string().email("Email is Required")
        }),
        onSubmit: values => {
            console.log(values)
        },
        validateOnChange: false
    })

    const onMultiChange = (targetField) => {
        return (item) => {
            formik.setFieldValue(targetField, xorBy(formik.values[targetField], [item], 'id'));
        }
    }

    const onChange = (targetField) => {
        return (val) => {
            formik.setFieldValue(targetField, val);
        }
    }

    const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowPregnantDate(false);
        setPregnantDate(currentDate);
    }

    const SubmitWithAlert = (formik)=>{
        if(!_.isEmpty(formik.errors)){
            console.log("Have Errors")
            console.log(formik.errors)
        }else{
            formik.handleSubmit();
        }
    }
    return (
        <ScrollView nestedScrollEnabled={true}
            contentContainerStyle={
                { paddingBottom: 60 }
            }
            width="100%">
            <Center>
                <Card_Component heading={"Patient Information"}>

                    <VStack space={3}>
                        <FormInputField Label={"Name"}
                            id="Name"
                            formik={formik}
                            isRequired={true} />
                        <FormInputField Label={"Id"} id="Id" formik={formik} />
                        <FormInputField Label={"Age"}
                            id="Age"
                            formik={formik}
                            keyboardType="numeric" />
                        <FormInputField Label={"Phone Number"} id="Phone" formik={formik} keyboardType="numeric" />
                        <FormInputField Label={"Email"} id="Email" formik={formik} />
                        <FormRadioGroup Label="Gender" formik={formik} id="Gender" options={Gender_option}>
                            <Radio value="Male" size="sm">Male</Radio>
                            <Radio value="Female" size="sm">Female</Radio>
                        </FormRadioGroup>
                        {_.get(formik.values, "Gender") == "Female" ? (
                            <FormSwitch formik={formik} Label={"Pregnant"} id="Pregnant" />

                        ) : null}
                        {_.get(formik.values, "Gender") == "Female" && _.get(formik.values, "Pregnant") ? (
                            <FormDateComponent
                                Label={"Pregnant Date(Est)"}
                                rightElement={
                                    <Pressable onPress={() => setShowPregnantDate(true)}>
                                        <Icon as={<FontIcon name='calendar' />} size={5} mr={2} />
                                    </Pressable>
                                }
                                date={PregnantDate}
                                show={showPregnantDate}
                                onChangeTime={onChangeTime}
                            />
                        ) : null}
                    </VStack>
                </Card_Component>
                <Card_Component heading={"Home Contact"}>

                    <VStack space={3}>
                        <FormInputField Label={"Location"} id="Home.Location" formik={formik} />
                        <FormInputField Label={"Telephone"} id="Home.Telephone" formik={formik} />
                        <FormInputField Label={"Contact Person"} id="Home.Contact_Person" formik={formik} />
                    </VStack>

                </Card_Component>
                <Card_Component heading={"Work Contact"}>
                    <VStack space={3}>
                        <FormInputField Label={"Location"} id="Work.Location" formik={formik} />
                        <FormInputField Label={"Telephone"} id="Work.Telephone" formik={formik} />
                        <FormInputField Label={"Contact Person"} id="Work.Contact_Person" formik={formik} />
                    </VStack>
                </Card_Component>
                <Box w="90%">
                    <Button
                        my={3}
                        onPress={()=>SubmitWithAlert(formik)}
                        alignSelf="flex-end"
                        colorScheme="success"
                        w='40%'
                        size='md'
                        rightIcon={<Icon as={<FontIcon name="chevron-right" />} size={5} ml={2} />}
                    >
                        Clinical Information
                    </Button>
                </Box>
            </Center>

        </ScrollView>
    )
}

export default PersonalInformation
