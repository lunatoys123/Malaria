import React, { useState, useContext } from 'react'
import { VStack, Text, ScrollView, Center, Button, Box, HStack, Icon } from 'native-base'
import Card_Component from '../../sharedComponent/Card_Component'
import { useFormik } from 'formik'
import FormSwitch from '../../sharedComponent/Form/FormSwitch'
import _ from 'lodash'
import FormInputField from '../../sharedComponent/Form/FormInputField'
import FormDateComponent from '../../sharedComponent/Form/FormDateComponent'
import { Pressable } from 'react-native'
import FontIcon from 'react-native-vector-icons/FontAwesome'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { Report } from '../../Redux/Report/Selector'
import { ReportAction } from '../../Redux/Report/reducer'
import Auth_Global from '../../Context/store/Auth_Global'

const Hospitalization = (props) => {
  var report_data = props.route.params.report_data;
  const [Admit_Date, setAdmitDate] = useState([]);
  const [DischargeDate, setDischargeDate] = useState([]);
  const dispatch = useDispatch();
  const ReportState = useSelector(Report());
  const context = useContext(Auth_Global);

  const formik = useFormik({
    initialValues:{
      Hospitalization:[]
    },
    validationSchema:Yup.object().shape({
      Hospitalization: Yup.array().of(
        Yup.object().shape({
          Hospital: Yup.string().required("Hospital Name is required"),
          Street_Address: Yup.string().required("Street Address is required"),
          City: Yup.string().required("City is required"),
          Zip_Code: Yup.string(),
          Admit_Date: Yup.date().when("Discharge_Date",(Discharge_Date, schema)=>
          Discharge_Date && schema.max(Discharge_Date,"should be less than Discharge Date")),
          Discharge_Date: Yup.date()

        })
      )
    }),
    onSubmit:async(values)=>{
      const Hospitalization = _.cloneDeep(values)
      
      report_data.case = {...report_data.case, ...Hospitalization}
      //console.log(report_data);
      console.log(context.user.userInfo)

      dispatch(ReportAction.AddReport({report_data: report_data, user: context.user.userInfo}));
    }
  });

  const AddHospitalizationRecord = () =>{
    var Hospitalization = _.get(formik.values, 'Hospitalization');
    Hospitalization.push({Hospital:"", Zip_Code:"", Admit_Date: new Date(), DisCharge_Date: new Date(), Discharge_Diagnosis:""})
    setAdmitDate([...Admit_Date, false]);
    
    formik.setFieldValue('Hospitalization',Hospitalization);
  }

  const onChangeTime = async (event, selectedDate, id, callback = null) => {
    const currentDate = selectedDate;

    var admit_Date = Admit_Date
    admit_Date = admit_Date.map((d)=>false);
    setAdmitDate(admit_Date);

    var discharge_Date = DischargeDate;
    discharge_Date = discharge_Date.map((d)=>false);
    setDischargeDate(discharge_Date);

    formik.setFieldValue(id, currentDate);
  }

  const updateAdmitDate = (index) => {
    const newAdmitDate = [...Admit_Date];
    newAdmitDate[index] = true;
    setAdmitDate(newAdmitDate);
  }

  const updateDischargeDate = (index) =>{
    const newDischargeDate = [...DischargeDate];
    newDischargeDate[index] = true;
    setDischargeDate(newDischargeDate);
  }

  const RemoveHosptialRecord = (index) =>{
    var Hospitalization = _.get(formik.values, "Hospitalization");
    Hospitalization.splice(index, 1);

    var admit_Date = Admit_Date;
    admit_Date.splice(index, 1);
    setAdmitDate(admit_Date);

    formik.setFieldValue('Hospitalization',Hospitalization);
  }

  const submitwithAlert = async(values) =>{
    const validation = await formik.validateForm(values);
    console.log(validation);

    if(!_.isEmpty(validation)){

    }else{
      formik.handleSubmit();
    }
  }
  return (
    <>
        
        <ScrollView
            contentContainerStyle={{ paddingBottom: 60}}
            width="100%"
        >
            <Center>
                <Card_Component heading="Hospitalization">
                  <VStack space={2}>
                    {_.get(formik.values,'Hospitalization')!==null ? (
                        _.get(formik.values,'Hospitalization').map((d, index)=>(
                          <Box key={index} borderWidth="1" borderColor="muted.200" p={3} borderRadius="md">
                            <VStack space={3}>
                              <Box>
                                <HStack>
                                  <Text w='90%'>{`Hospitalization record ${index+1}`}</Text>
                                  <Button w='10%' size='sm' colorScheme='secondary' onPress={()=>RemoveHosptialRecord(index)}>-</Button>
                                </HStack>
                              </Box>
                              <FormInputField 
                                Label="Hospital Name"
                                formik={formik}
                                id={`Hospitalization.${index}.Hospital`}
                              />
                              <FormInputField 
                                Label="Street Address"
                                formik={formik}
                                id={`Hospitalization.${index}.Street_Address`}
                              />
                              <FormInputField 
                                Label="City"
                                formik={formik}
                                id={`Hospitalization.${index}.City`}
                              />

                              <FormInputField 
                                Label="zip code"
                                formik={formik}
                                id={`Hospitalization.${index}.Zip_Code`}
                                keyboardType='numeric'
                              />
                              <FormDateComponent 
                                Label="Admit Date"
                                rightElement={
                                  <Pressable onPress={()=>updateAdmitDate(index)}>
                                    <Icon as={<FontIcon name='calendar'/>} size={5} mr={2}/>
                                  </Pressable>
                                }
                                show={Admit_Date[index]}
                                formik={formik}
                                id={`Hospitalization.${index}.Admit_Date`}
                                onChangeTime={onChangeTime}
                              />
                              <FormDateComponent 
                                Label="Discharge Date"
                                rightElement={
                                  <Pressable onPress={()=>updateDischargeDate(index)}>
                                    <Icon as={<FontIcon name='calendar'/>} size={5} mr={2}/>
                                  </Pressable>
                                }

                                show={DischargeDate[index]}
                                formik={formik}
                                id={`Hospitalization.${index}.Discharge_Date`}
                                onChangeTime={onChangeTime}
                              />
                              <FormInputField 
                                Label="Discharge Diagnosis"
                                formik={formik}
                                id = {`Hospitalization.${index}.Discharge_Diagnosis`}
                              />
                            </VStack>
                          </Box>
                        ))
                      )
                    : null}
                  </VStack>
                  <Button onPress={()=>AddHospitalizationRecord()} my={2}>Add Hospitalization Record</Button>
                </Card_Component>
                <Button onPress={()=>submitwithAlert(formik.values)} my={2} w="90%" colorScheme='success'>Add Report</Button>
            </Center>
           
        </ScrollView>
    </>
  )
}

export default Hospitalization