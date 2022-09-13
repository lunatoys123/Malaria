import React, { useEffect } from "react";
import { View, Text, Box, Heading, Center } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Summary } from "../Redux/Summary/Selector";
import { SummaryAction } from "../Redux/Summary/reducer";

const Summary_container = (props) => {
  const dispatch = useDispatch();
  const SummaryState = useSelector(Summary());

  useEffect(() => {
    dispatch(SummaryAction.Preview());
  }, []);
  return (
    <Box safeArea>
      <Center>
        <Heading>Summary</Heading>
      </Center>
    </Box>
  );
};

export default Summary_container;
