import React from "react";
import { View, Text, Box, Input, HStack, Button } from "native-base";

const Report = (props) => {

  const createReport = () => {
    props.navigation.navigate("PersonalInformation")
  }

  return (
    <Box alignItems="center" my="10">
      <HStack space={2}>
        <Input placeholder="Search Report" w="70%" />
        <Button w="20%" onPress={createReport}>Create</Button>
      </HStack>
    </Box>
  );
};

export default Report;
