import React, {useState} from 'react'
import {Center, FormControl, ScrollView, VStack, HStack, Radio} from 'native-base'
import {useFormik} from 'formik'
import {Gender_option} from '../../Common/Options'
import * as Yup from "yup";
import {xorBy} from 'lodash'
import Card_Component from '../../sharedComponent/Card_Component';
import FormInputField from '../../sharedComponent/Form/FormInputField';
import FormSigleSelect from '../../sharedComponent/Form/FormSigleSelect';
import FormRadioGroup from '../../sharedComponent/Form/FormRadioGroup';
import _ from 'lodash'

const PersonalInformation = () => {


    const formik = useFormik({
        initialValues: {
            Gender:{}
        },
        validationSchema: Yup.object().shape({
            Name: Yup.string().required("Name is Needed"), 
            Age: Yup.number().required("Age is needed"),
            Email: Yup.string().email("Email is Required")
        })
    })

    const onMultiChange = (targetField) => {
        return(item) => {
            formik.setFieldValue(targetField, xorBy(formik.values[targetField], [item], 'id'));
        }
    }

    const onChange = (targetField) => { 
        return (val) => {
            formik.setFieldValue(targetField, val);
        }
    }
    return (
        <ScrollView nestedScrollEnabled={true}
            contentContainerStyle={
                {paddingBottom: 60}
            }
            width="100%">
            <Center>
                <Card_Component heading={"Patient Information"}>
                    <FormControl>
                        <VStack space={3}>
                            <FormInputField Label={"Name"}
                                id="Name"
                                formik={formik}/>
                            <FormInputField Label={"Id"} id="Id" formik={formik}/>    
                            <FormInputField Label={"Age"}
                                id="Age"
                                formik={formik}
                                keyboardType="numeric"/>
                            <FormInputField Label={"Email"} id="Email" formik={formik}/>
                            <FormRadioGroup Label="Gender" formik={formik} id="Gender" options={Gender_option}/>
                        </VStack>
                    </FormControl>
                </Card_Component>
            </Center>

        </ScrollView>
    )
}

export default PersonalInformation
