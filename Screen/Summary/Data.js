import React, { useEffect } from "react";
import { View, Text } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Summary } from "../../Redux/Summary/Selector";
import { SummaryAction } from "../../Redux/Summary/reducer";

const Data = (props) => {
  const option = props.route.params.option;
  const SummaryState = useSelector(Summary());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SummaryAction.WHO_Data({ option: option }));
  }, []);

  return (
    <View>
      <Text>data</Text>
    </View>
  );
};

export default Data;
