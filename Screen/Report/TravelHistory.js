import React,{useState} from 'react'
import {View, Text, ScrollView, Center, Button, Box, Pressable, Icon, VStack, FormControl, HStack} from 'native-base'
import { useFormik } from 'formik'
import Card_Component from '../../sharedComponent/Card_Component'
import _ from 'lodash'
import FontIcon from 'react-native-vector-icons/FontAwesome'
import FormInputField from '../../sharedComponent/Form/FormInputField'
import FormDateComponent from '../../sharedComponent/Form/FormDateComponent'
import { FancyAlert } from "react-native-expo-fancy-alerts";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import * as Yup from 'yup';

const TravelHistory = (props) => {
  var report_data = props.route.params.report_data;
  const [travelStartDate, setTravelStartDate] = useState([]);
  const [travelEndDate, setTravelEndDate] = useState([]);
  const [visible, setVisible] = useState(false);
  const [Error, setError] = useState("");
  const formik = useFormik(
    {
        //enableReinitialize: true,
        initialValues:{
            Travel_History:[]
        },
        validationSchema: Yup.object().shape({
            Travel_History: Yup.array().of(
                Yup.object().shape({
                    Location: Yup.string().required("Location is required"),
                    Date_Start: Yup.date().when("Date_End",(Date_End, schema)=>
                    Date_End && schema.max(Date_End,"should be less that date end")),
                    Date_End: Yup.date()
                })  
            )
        }),
        onSubmit: (values)=>{
            const TravelHistory = _.cloneDeep(values);

            report_data.case = {...report_data.case, ...TravelHistory};
            props.navigation.navigate("Hospitalization",{report_data: report_data})

        }
    }
  )

  const AddTravelHistory = () =>{
    var Travel_History = _.get(formik.values,'Travel_History');
    console.log(Travel_History.length);
    if(Travel_History.length >= 5){
        setVisible(true);
        setError("Travel History must be at less than 5")
    }else{
        setTravelStartDate([...travelStartDate, false]);
        setTravelEndDate([...travelEndDate, false]);
        Travel_History.push({Location:"", Date_Start:new Date(), Date_End: new Date()})
        formik.setFieldValue("Travel_History",Travel_History);
    }
    
  }

  const RemoveTravelHistory = (index) =>{
    var Travel_History = _.get(formik.values,'Travel_History');
    Travel_History.splice(index, 1);
    console.log(Travel_History);
    formik.setFieldValue("Travel_History",Travel_History);
  }

  const UpdateStartDate = (index)=>{
    const newArray = [...travelStartDate]
    newArray[index] = true;
    setTravelStartDate(newArray);
  }

  const UpdateEndDate = (index)=>{
    const newArray = [...travelEndDate]
    newArray[index] = true;
    setTravelEndDate(newArray);
  }
  const onChangeTime = async (event, selectedDate, id, callback = null) => {
    const currentDate = selectedDate;
    //callback(false);
    // setPregnantDate(currentDate);
    var Date_Start = travelStartDate
    Date_Start = Date_Start.map((d)=>false);
    setTravelStartDate(Date_Start);

    var Date_End = travelEndDate;
    Date_End = Date_End.map((d)=>false);
    setTravelEndDate(Date_End);
    formik.setFieldValue(id,currentDate)
  };


  return (
    <>
        <Button alignSelf="flex-end" mr={5} mt={5} onPress={()=>AddTravelHistory()}>Add Travel History</Button>
        <ScrollView
            contentContainerStyle={{ paddingBottom: 60}}
            width="100%"
        >
            <FormControl>
                <Center>

                    <Card_Component heading="Travel History">
                        {_.get(formik.values,'Travel_History') != null ?(
                            _.get(formik.values,'Travel_History').length == 0 ? (
                                <Text>(The patient have no Travel History)</Text>
                            ):(
                                <VStack space={2}>
                                {_.get(formik.values,'Travel_History').map((d, index)=>(
                                    <Box key={index} borderWidth="1" borderColor="muted.200" p={3} borderRadius="md">
                                        <Box>
                                            <HStack>
                                                    <Text w='90%'>{`Travel History ${index+1}`}</Text>
                                                    <Button w='10%' size='sm' colorScheme='secondary' onPress={()=>RemoveTravelHistory(index)}>-</Button>
                                            </HStack>
                                        </Box>
                                        <FormInputField Label="Location" formik={formik} id={`Travel_History.${index}.Location`} />
                                        <FormDateComponent 
                                            Label="Date Travel Started"
                                            rightElement={
                                                <Pressable onPress={() => UpdateStartDate(index)}>
                                                    <Icon as={<FontIcon name="calendar" />} size={5} mr={2} />
                                                </Pressable>
                                            }
                                            show={travelStartDate[index]}
                                            onChangeTime={onChangeTime}
                                            id={`Travel_History.${index}.Date_Start`}
                                            //callback={setTravelStartDate}
                                            formik={formik}
                                        />
                                        <FormDateComponent 
                                            Label="Date Travel Ended"
                                            rightElement={
                                                <Pressable onPress={() => UpdateEndDate(index)}>
                                                    <Icon as={<FontIcon name="calendar" />} size={5} mr={2} />
                                                </Pressable>
                                            }
                                            show={travelEndDate[index]}
                                            id={`Travel_History.${index}.Date_End`}
                                            onChangeTime={onChangeTime}
                                            //callback={setTravelEndDate}
                                            formik={formik}
                                        />
                                    </Box>
                                ))
                                }
                                </VStack>
                            )
                            
                        ) : null
                        }
                    </Card_Component>
                </Center>
            </FormControl>
            <Button onPress={formik.handleSubmit} alignSelf="flex-end" mr={5} mt={5} colorScheme="success">Hospitalization</Button>
        </ScrollView>
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
            <Text>{Error}</Text>
            <Button onPress={() => setVisible(false)} my={3}>
              OK
            </Button>
        </FancyAlert>
    </>
  )
}

export default TravelHistory