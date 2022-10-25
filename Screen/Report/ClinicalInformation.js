import React, {useState} from 'react'
import {
    Center,
    FormControl,
    HStack,
    VStack,
    ScrollView,
    Pressable,
    Icon,
    Heading,
    Radio,
    Divider
} from 'native-base'
import Card_Component from '../../sharedComponent/Card_Component'
import FormInputField from '../../sharedComponent/Form/FormInputField'
import FormMultiSelect from '../../sharedComponent/Form/FormMultiSelect'
import FormSigleSelect from '../../sharedComponent/Form/FormSigleSelect'
import FormDateComponent from '../../sharedComponent/Form/FormDateComponent'
import FormRadioGroup from '../../sharedComponent/Form/FormRadioGroup'

import FontIcon from 'react-native-vector-icons/FontAwesome'
import {Signs, Clinical_Complications, Patient_Status, report_status} from '../../Common/Options'
import _,{xorBy} from 'lodash'
import { useFormik } from 'formik'

const ClinicalInformation = () => {
    const [selectedSigns, setSelectedSigns] = useState([])
    const [selectComplications, setSelectedComplications] = useState([])
    const [patientStatus, setPatientStatus] = useState({})
    const [reportStatus, setReportStatus] = useState({})

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const formik = useFormik({
        initialValues:{
            Symptoms:{
                Sign:[]
            },
            Clinical_Complications:{
                Complications:[]
            },
            Report_Status:{
                Patient_Status:{}
            }
        }
    });

    const onChange = (targetField) => {
        return (val) => {
          formik.setFieldValue(targetField, val);
        };
    };

    const onChangeTime = (event, selectedDate, targetField) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        formik.setFieldValue(targetField, currentDate);
    };

    const onMultiChange = (targetField) => {
        return (item) => {
          formik.setFieldValue(
            targetField,
            xorBy(_.get(formik.values, targetField), [item], "id")
          );
        };
    };

    return (
        <ScrollView nestedScrollEnabled={true}
            contentContainerStyle={
                {paddingBottom: 60}
            }
            width="100%">
            <Center>
                <Card_Component heading={"Symptoms"}>
                    <FormControl>
                        <VStack space={3}>
                            <FormMultiSelect options={Signs}
                                Label="Sign"
                                MultiChange={onMultiChange}
                                SelectedArray={selectedSigns}
                                callBack={setSelectedSigns}
                                placeholder="Select Sign"
                                hideInputFilter={true}
                                id="Symptoms.Sign"
                                formik={formik}/>
                            <FormInputField Label={"Symptomatic"} id="Symptoms.Symptomatic" formik={formik}/>
                            <FormInputField Label={"Remark"} id="Symptoms.Remark" formik={formik} isTextArea={true}/>
                        </VStack>
                    </FormControl>
                </Card_Component>

                <Card_Component heading={"Clinical Complications"}>
                        <VStack space={3}>
                            <HStack space={2}
                                alignItems="center">
                                <FormMultiSelect options={Clinical_Complications}
                                    Label="Complications"
                                    MultiChange={onMultiChange}
                                    SelectedArray={selectComplications}
                                    callBack={setSelectedComplications}
                                    placeholder="Complications"
                                    hideInputFilter={true}
                                    id="Clinical_Complications.Complications"
                                    formik={formik}/>
                            </HStack>
                            <FormInputField Label={"Description"}
                                isTextArea={true} formik={formik} id="Clinical_Complications.Description"/>
                        </VStack>
                </Card_Component>
                <Card_Component heading={"Report status"}>
                    <VStack space={3}>
                        <FormRadioGroup
                            Label="Patient_Status"
                            formik={formik}
                            id="Patient_Status"
                        >
                            {Patient_Status.map((d)=>(
                                <Radio value={d.Value} size="sm">{d.Label}</Radio>
                            ))}
                        </FormRadioGroup>
                        <FormDateComponent 
                            Label="status Date"
                            rightElement={
                                <Pressable onPress={() => setShow(true)}>
                                    <Icon as={<FontIcon name="calendar"/>} size={5}mr={2}/>
                                </Pressable>
                            }
                            show={show}
                            onChangeTime={onChangeTime}
                            formik={formik}
                            id="status_date"
                        />
                        <FormRadioGroup
                            Label="Report Status"
                            formik={formik}
                            id="Report Status"
                        >
                            {
                                report_status.map((d)=>(
                                    <Radio value={d.Value} size="sm">{d.Label}</Radio>
                                ))
                            }
                        </FormRadioGroup>
                        </VStack>
                    
                </Card_Component>
            </Center>
        </ScrollView>
    )
}

export default ClinicalInformation
