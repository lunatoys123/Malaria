import React, {useState} from 'react'
import {
    Center,
    FormControl,
    HStack,
    VStack,
    ScrollView,
    Pressable,
    Icon,
    Heading
} from 'native-base'
import Card_Component from '../../sharedComponent/Card_Component'
import FormInputField from '../../sharedComponent/Form/FormInputField'
import FormMultiSelect from '../../sharedComponent/Form/FormMultiSelect'
import FormSigleSelect from '../../sharedComponent/Form/FormSigleSelect'
import FormDateComponent from '../../sharedComponent/Form/FormDateComponent'

import FontIcon from 'react-native-vector-icons/FontAwesome'
import {Signs, Clinical_Complications, Patient_Status, report_status} from '../../Common/Options'
import {xorBy} from 'lodash'

const ClinicalInformation = () => {
    const [selectedSigns, setSelectedSigns] = useState([])
    const [selectComplications, setSelectedComplications] = useState([])
    const [patientStatus, setPatientStatus] = useState({})
    const [reportStatus, setReportStatus] = useState({})

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onMultiChange = (targetField, targetCallback) => {
        return(item) => targetCallback(xorBy(targetField, [item], 'id'));
    }

    const onChange = (targetCallback) => {
        return(val) => targetCallback(val);
    }

    const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
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
                                hideInputFilter={true}/>
                            <FormInputField Label={"Symptomatic"}/>
                            <FormInputField Label={"Remark"}
                                isTextArea={true}/>
                        </VStack>
                    </FormControl>
                </Card_Component>

                <Card_Component heading={"Clinical Complications"}>
                    <FormControl>
                        <VStack space={3}>
                            <HStack space={2}
                                alignItems="center">
                                <FormMultiSelect options={Clinical_Complications}
                                    Label="Complications"
                                    MultiChange={onMultiChange}
                                    SelectedArray={selectComplications}
                                    callBack={setSelectedComplications}
                                    placeholder="Complications"
                                    hideInputFilter={true}/>
                            </HStack>
                            <FormInputField Label={"Description"}
                                isTextArea={true}/>
                        </VStack>
                    </FormControl>
                </Card_Component>
                <Card_Component heading={"Report status"}>
                    <FormControl>
                        <VStack space={3}>
                            <FormSigleSelect options={Patient_Status}
                                Label="Patient Status"
                                onChange={onChange}
                                seletedValue={patientStatus}
                                callBack={setPatientStatus}
                                placeholder="Patient Status"
                                hideInputFilter={true}
                            />
                            <FormDateComponent 
                                Label="status Date"
                                rightElement={
                                    <Pressable onPress={() => setShow(true)}>
                                        <Icon as={<FontIcon name="calendar"/>} size={5}mr={2}/>
                                    </Pressable>
                                }
                                show={show}
                                date={date}
                                onChangeTime={onChangeTime}
                            />
                            <FormSigleSelect
                                Label="Report status"
                                options={report_status}
                                onChange={onChange}
                                seletedValue={reportStatus}
                                callBack={setReportStatus}
                                placeholder="Report status"
                                hideInputFilter={true}
                            />
                        </VStack>
                    </FormControl>
                </Card_Component>
            </Center>
        </ScrollView>
    )
}

export default ClinicalInformation
