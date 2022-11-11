import React, {useEffect, useContext, useState, useCallback} from "react";
import { View, Text, Box, Input, HStack, Button, Heading, VStack, Divider, ScrollView } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Case } from "../../Redux/Case/selector";
import { caseAction } from "../../Redux/Case/reducer";
import Auth_Global from "../../Context/store/Auth_Global";
import { LOADING_STATUS } from "../../Common/status_code";
import { useFocusEffect } from '@react-navigation/native';


const Report = (props) => {
  const dispatch = useDispatch();
  const CaseState = useSelector(Case());
  const context = useContext(Auth_Global);
  const [Data, setData] = useState([]);

  useFocusEffect(
    useCallback(()=>{
      const {loading, data} = CaseState;
      if(loading === LOADING_STATUS.FULFILLED){
        setData(data);
      }
    },[CaseState])
  )

  useFocusEffect(
    useCallback(()=>{
      dispatch(caseAction.getCaseByDoctorId({Doctor_id: context.user.userInfo.Doctor_id}));
    },[])
  )

  const createReport = () => {
    //console.log("button pressed")
    props.navigation.navigate("PersonalInformation")
  }

  return (
    <VStack divider={<Divider />}>
    
      <Box border="1" borderRadius="md" mt="3" p="3" alignSelf="center"> 
        <VStack space={3}>
          <HStack alignItems="center" space={2}>
            <Heading size="sm" w="50%">Your Report</Heading>
            <Box w="50%">
              <HStack alignSelf="flex-end" space={2} px="2">
                <Button colorScheme="success" size='sm'>Search</Button>
                <Button size='sm' onPress={()=>createReport()}>Create</Button>
              </HStack>
            </Box>
          </HStack>
          <Divider />
          {
            Data && Data.map((d)=> (
              <Box border="1" borderRadius="md" bg="white" shadow="3">
                <VStack space="3" divider={<Divider />}>
                  <Box px="4">
                    <Heading size="sm" pt="3">{d.Patient_Name}</Heading>
                  </Box>
                  <Box px="4">
                    <Text>Patient_id: {d.Patient_id}</Text>
                    <Text>Patient_Status: {d.Patient_Status}</Text>
                    <Text>Report Status: {d.Report_Status}</Text>
                    <Text>Status Date: {d.Status_date.substring(0,10)}</Text>
                  </Box>
                  <Box px="4" pb="4">
                    <ScrollView horizontal={true}>
                      <HStack space={2}>
                        <Button size="sm">Update Report</Button>
                        <Button size='sm'>Add Treatment</Button>
                        <Button size='sm'>Add Laboratory</Button>
                      </HStack>
                    </ScrollView>
                  </Box>
                </VStack>
              </Box>
            ))
          }
        </VStack>
      </Box>
    </VStack>
  );
};

export default Report;
